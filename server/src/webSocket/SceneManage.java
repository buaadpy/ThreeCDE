package webSocket;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by 杜鹏宇 on 2015/01/01.
 * 场景管理类
 */

public class SceneManage {
    public List<Scene> sceneList = new CopyOnWriteArrayList<Scene>();

    //增加场景
    public void addScene(String teamId, String data, String lockId){
        sceneList.add(new Scene(teamId, data, lockId));
    }

    //删除场景
    public void removeScene(String teamId){
        for (int i = 0; i < sceneList.size(); i++){
            if (sceneList.get(i).getTeamId().equals(teamId)) {
                sceneList.remove(i);
                return;
            }
        }
    }

    //修改场景
    public void refreshScene(String teamId, String data, String lockId){
        for (int i = 0; i < sceneList.size(); i++){
            if (sceneList.get(i).getTeamId().equals(teamId)) {
                sceneList.get(i).setData(data);
                sceneList.get(i).setLockId(lockId);
                return;
            }
        }
    }

    //获取场景数据
    public String getSceneData(String teamId){
        for (int i = 0; i < sceneList.size(); i++){
            if (sceneList.get(i).getTeamId().equals(teamId)) {
                return sceneList.get(i).getData();
            }
        }
        return "";
    };

    //获取场景锁信息
    public String getSceneLock(String teamId){
        for (int i = 0; i < sceneList.size(); i++){
            if (sceneList.get(i).getTeamId().equals(teamId)) {
                return sceneList.get(i).getLockId();
            }
        }
        return "";
    };

    //给指定场景增加锁
    public boolean addLock(String teamId, String lock){
        for (int i = 0; i < sceneList.size(); i++){
            if (sceneList.get(i).getTeamId().equals(teamId)) {
                return sceneList.get(i).addToLockList(lock);
            }
        }
        return false;
    };

    //给指定场景删除锁
    public void removeLock(String teamId, String lock){
        for (int i = 0; i < sceneList.size(); i++){
            if (sceneList.get(i).getTeamId().equals(teamId)) {
                sceneList.get(i).removeFromLockList(lock);
                break;
            }
        }
    };
}