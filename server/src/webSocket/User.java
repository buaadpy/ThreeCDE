package webSocket;

import javax.websocket.Session;

/**
 * Created by 杜鹏宇 on 2015/01/01.
 * 用户类
 */

public class User {
    private String userId;//用户id
    private String teamId;//用户组id
    private Session socket;//网络连接
    private boolean isHost;//主机标记

    public User(String userId, String teamId, Session socket, boolean isHost) {
        this.userId = userId;
        this.teamId = teamId;
        this.socket = socket;
        this.isHost = isHost;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public Session getSocket() {
        return socket;
    }

    public void setSocket(Session socket) {
        this.socket = socket;
    }

    public boolean isHost() {
        return isHost;
    }

    public void setHost(boolean isHost) {
        this.isHost = isHost;
    }
}