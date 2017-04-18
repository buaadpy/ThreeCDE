package webSocket;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by 杜鹏宇 on 2015/01/01.
 * 场景类
 */

public class Scene {
    private String teamId;//场景id
    private String data;//场景数据
    private String lockId;//加锁数据
    private List<String> lockLists;//对锁进行统一管理

    public Scene(String teamId, String data, String lockId) {
        this.teamId = teamId;
        this.data = data;
        this.lockId = lockId;
        this.lockLists = new CopyOnWriteArrayList<String>();

    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public String getLockId() {
        return lockId;
    }

    public void setLockId(String lockId) {
        this.lockId = lockId;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public boolean addToLockList(String lock) {
        if (this.lockLists.contains(lock)) return false;
        else {
            this.lockLists.add(lock);
            return true;
        }
    }

    public void removeFromLockList(String lock) {
        this.lockLists.remove(lock);
    }
}