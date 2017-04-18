package webSocket;

import javax.websocket.Session;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by 杜鹏宇 on 2015/01/01.
 * 用户管理类
 */

public class UserManage {
    public List<User> userList = new CopyOnWriteArrayList<User>();

    //增加用户
    public void addUser(String userId, String teamId, Session socket, boolean isHost){
        userList.add(new User(userId, teamId, socket, isHost));
    };

    //删除用户
    public void removeUser(String userId){
        for (int i = 0; i < userList.size(); i++)
            if (userList.get(i).getUserId().equals(userId)) {
                userList.remove(i);
                break;
            }
    };

    //查询用户
    public User findUser(String userId){
        for (int i = 0; i < userList.size(); i++)
            if (userList.get(i).getUserId().equals(userId)) return userList.get(i);
        return null;
    };

    //检验组存在
    public boolean tryJoin(String teamId){
        for (int i = 0; i < userList.size(); i++){
            if (userList.get(i).getTeamId().equals(teamId) && userList.get(i).isHost())
                return true;
        }
        return false;
    }
}