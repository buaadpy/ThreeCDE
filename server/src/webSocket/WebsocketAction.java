package webSocket;

import org.json.JSONObject;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * Created by 杜鹏宇 on 2015/07/01.
 * WebSocket类,负责与网页端通信
 */


@ServerEndpoint(value = "/WebsocketAction/{userid}/{teamid}/{ishost}")
public class WebsocketAction {
    public static UserManage userManage = new UserManage();
    public static SceneManage sceneManage = new SceneManage();

    public Session session;//会话
    public String userId;//用户id
    public String teamId;//组id
    public StringBuilder temp;//消息缓存区

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        System.out.println("Session closed");
        //若主机关闭，则需要注销场景，以及将关闭消息告知其他用户
        if (userManage.findUser(this.userId).isHost()) {
            sceneManage.removeScene(this.teamId);
            try {
                JSONObject json = new JSONObject();
                json.put("command", "Close");
                json.put("userID", this.userId);
                json.put("teamID", this.teamId);
                for (User u : userManage.userList) {
                    if (u.getTeamId().equals(this.teamId) && !(u.getUserId().equals(userId)))
                        u.getSocket().getBasicRemote().sendText(json.toString());
                }
            } catch (IOException e) {
                e.printStackTrace();
            } catch (Throwable e) {
                System.out.printf(e.toString());
            }
        }
        //注销用户信息
        userManage.removeUser(this.userId);
        this.session = null;
        System.out.println("onClose");
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println(throwable);
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config,
                       @PathParam("userid") String userId, @PathParam("teamid") String teamId, @PathParam("ishost") boolean isHost) {
        System.out.println("Session opened");
        this.session = session;
        this.userId = userId;
        this.teamId = teamId;
        //主机用户需要注册新场景
        if (isHost) {
            userManage.addUser(userId, teamId, this.session, isHost);
            sceneManage.addScene(teamId, "", "");
        }else if (!isHost && userManage.tryJoin(teamId)) {
            userManage.addUser(userId, teamId, this.session, isHost);
            //分机用户需要得到场景数据
            try {
                JSONObject json = new JSONObject();
                json.put("command", "Init");
                json.put("sceneData", sceneManage.getSceneData(teamId));
                json.put("lockData", sceneManage.getSceneLock(teamId));
                this.session.getBasicRemote().sendText(json.toString());
            }catch (IOException e) {
                e.printStackTrace();
            } catch (Throwable e) {
                System.out.printf(e.toString());
            }
        } else {
            try {
                this.session.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @OnMessage
    public void onMessage(String str) {
        //场景数据更新。S表示消息还未发完，E表示发完
        if (str.charAt(0) == 'S'){
            if (this.temp == null || this.temp.length() <= 0) this.temp = new StringBuilder();
            str = str.substring(1,str.length());
            this.temp.append(new StringBuilder(str));
            return;
        }
        if (str.charAt(0) == 'E') {
            if (this.temp == null || this.temp.length() <= 0) this.temp = new StringBuilder();
            str = str.substring(1,str.length());
            this.temp.append(new StringBuilder(str));
            //更新场景数据
            try {
                JSONObject json = new JSONObject(this.temp.toString());
                if (json.getString("command").equals("Update")) {
                    sceneManage.refreshScene(json.getString("teamID"), json.getString("sceneData"), json.getString("lockData"));
                    this.temp = new StringBuilder();
                    return;
                }
            } catch (Throwable e) {
                System.out.printf(e.toString());
            }
        }

        //防止锁冲突
        try {
            JSONObject json = new JSONObject(str);
            if (json.getString("command").equals("LockControl")) {
                if (((new JSONObject(json.getString("data"))).getString("flag")).equals("true")) {
                    String id = json.getString("id");
                    //加锁若发生冲突，则要让后来者加锁
                    if (!sceneManage.addLock(this.teamId, id)) {
                        try {
                            JSONObject com = new JSONObject();
                            com.put("command", "LockControl");
                            com.put("id", id);
                            com.put("userID", this.userId);
                            com.put("teamID", this.teamId);
                            this.session.getBasicRemote().sendText(com.toString());
                        }catch (IOException e) {
                            e.printStackTrace();
                        } catch (Throwable e) {
                            System.out.printf(e.toString());
                        }
                        return;
                    }
                }
                else
                    sceneManage.removeLock(this.teamId, json.getString("id"));
            }
        } catch (org.json.JSONException e1) {
            e1.printStackTrace();
        }

        //向分组用户转发指令
        try {
            JSONObject json = new JSONObject(str);
            String userId = json.getString("userID");
            String teamId = json.getString("teamID");
            for (User u : userManage.userList) {
                if (u.getTeamId().equals(teamId) && !(u.getUserId().equals(userId)))
                    u.getSocket().getBasicRemote().sendText(str);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Throwable e) {
            System.out.printf(e.toString());
        }
    }
}
