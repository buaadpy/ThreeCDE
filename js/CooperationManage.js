/******************************************
 * 类名：协同管理
 * 作用：负责协同操作的数据传输和同步
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var CooperationManage = function () {
    this.ws = null;//websocket连接
    this.isHost = false;//主机标记
}
CooperationManage.prototype = {
    //与服务器建立WebSocket通信
    startWebSocket: function (flag) {
        this.isHost = flag;
        if ('WebSocket' in window) {
            try {
                this.ws = new WebSocket("ws://" + Struct.SERVICE_URL + "/WebsocketAction/"
                    + Struct.userID.toString() + "/" + Struct.teamID.toString() + "/" + flag);
            } catch (e) {
                Ext.MessageBox.show({title: Language.hint, msg: Language.msgwebsocketfail, buttons: Ext.Msg.OK});
            }
        }
        else {
            Ext.MessageBox.show({title: Language.hint, msg: Language.msgwebsocketnosup, buttons: Ext.Msg.OK});
        }

        this.ws.onopen = function (evt) {
            //主机建立环境时需要发送场景数据到服务器
            if (Struct.cooperationManage.isHost) {
                var json = {
                    'sceneData': Struct.storageManage.getSceneJsonData(),
                    'lockData': Struct.structManage.getLockList(),
                    'userID': Struct.userID,
                    'teamID': Struct.teamID,
                    'command': "Update"
                };
                var message = JSON.stringify(json);
                //将大消息拆分发送
                while (message.length > 1024 * 4) {
                    Struct.cooperationManage.ws.send('S' + message.substr(0, 1024 * 4));
                    message = message.substr(1024 * 4);
                }
                Struct.cooperationManage.ws.send('E' + message);
            }
        };

        this.ws.onclose = function (evt) {
            console.log(evt);
            Struct.coFlag = false;
            if (!Struct.cooperationManage.isHost) Struct.sceneManage.resetScene();
            Struct.structManage.groupPanel.queryById('btnNewCo').setDisabled(false);
            Struct.structManage.groupPanel.queryById('btnCloseCo').setDisabled(true);
            Struct.structManage.groupPanel.queryById('btnJoinCo').setDisabled(false);
            Struct.structManage.groupPanel.queryById('btnLeaveCo').setDisabled(true);
            alert(Language.msgbreakup);
        };

        //设置监听响应
        this.ws.onmessage = function (event) {
            if (event.data == null) return;
            var json = JSON.parse(event.data);
            var no = Struct.structManage.searchIndexByID(json.id);
            var temp = Struct.structures[no];
            switch (json.command) {
                //增 指令
                case "Addition":
                    var model = new Structure();
                    Struct.structures.push(model);
                    model.initBySynchronous(json.id, json.position, json.rotation, json.scale, json.data, function () {
                        Struct.structManage.refresh();
                        Struct.render();
                        Struct.windowManage.updateLW();
                    });
                    break;
                //删 指令
                case "Delete":
                    temp.delete();
                    Struct.structures.splice(no, 1);
                    break;
                //改 指令
                case "Modify":
                    temp.refresh(json.position, json.rotation, json.scale);
                    temp.data = json.data.data;
                    break;
                //锁 指令
                case "LockControl":
                    //data为true时加锁，反之解锁
                    if (json.data == null || json.data.flag) {
                        temp.lock();
                        temp.unselect();
                    }
                    else {
                        temp.unlock();
                    }
                    break;
                //并 指令
                case "Combine":
                    //data参数不为null时表示组合，否则表示分离
                    if (json.data != null && json.data != false) {
                        var model = new Structure();
                        Struct.structures.push(model);
                        model.id = json.id;
                        model.initByCombina(json.data);
                        Struct.structManage.deleteByID(json.data, false);
                        Struct.structManage.searchModelByID(json.id).lock();
                        Struct.render();
                    }
                    else {
                        var idList = Struct.structManage.breakByID(json.id);
                        if (json.data != false) {
                            Struct.structManage.unselectById(idList);
                            Struct.structManage.lockById(idList);
                        }
                    }
                    break;
                //添加合并,添加组合体
                case "AddandCmb":
                    Struct.structManage.callBackCount = json.data.length;
                    for (var i = 0; i < json.data.length; i++) {
                        Struct.structManage.idLists[i] = json.data[i].id;
                        var model = new Structure();
                        Struct.structures.push(model);
                        model.initBySynchronous(json.data[i].id, json.data[i].position, json.data[i].rotation, json.data[i].scale, json.data[i], function () {
                            Struct.structManage.callBackCount--;
                            //需要加载完成才合并，故使用回调
                            if (Struct.structManage.callBackCount == 0) {
                                Struct.structManage.combineByID(Struct.structManage.idLists, json.id);
                                Struct.structManage.idLists = [];
                            }
                        });
                    }
                    break;
                //场景初始化
                case "Init":
                    Struct.storageManage.reRenderSceneByData(JSON.parse(json.sceneData));
                    //考虑组件模型初始化的延迟，对组件加锁推迟2s。但组件太多时仍有加锁发生在模型组装完成之前而加锁失败的风险
                    setTimeout(function () {
                        Struct.storageManage.initLockState(json.lockData);
                        Struct.render();
                        Ext.MessageBox.show({title: Language.hint, msg: Language.msgjoinsuccess, buttons: Ext.Msg.OK});
                    }, "2000");
                    break;
                //关闭连接
                case "Close":
                    Struct.coFlag = false;
                    Struct.cooperationManage.ws.close();
                    Struct.sceneManage.resetScene();
                    Ext.MessageBox.show({title: Language.hint, msg: Language.msgcloseconnect, buttons: Ext.Msg.OK});
                    break;
                default :
                    break;
            }
            //更新相关显示
            Struct.structManage.refresh();
            Struct.render();
        }
    },

    //向服务器发出消息指令
    sendInfo: function (command, id, data) {
        //非协同工作时忽略操作
        if (this.ws == null || this.ws.readyState != 1) return;
        var temp = Struct.structManage.searchModelByID(id);
        //添加时间戳
        var myDate = new Date();
        switch (command) {
            //增 指令
            case "Addition":
                var json = {
                    'time': myDate.getTime(),
                    'userID': Struct.userID,
                    'teamID': Struct.teamID,
                    'command': command,
                    'id': id,
                    'data': {
                        'pathobj': temp.pathobj,
                        'pathmtl': temp.pathmtl,
                        'data': temp.data
                    },
                    'position': {
                        'x': temp.object.position.x,
                        'y': temp.object.position.y,
                        'z': temp.object.position.z
                    },
                    'rotation': {
                        'x': temp.object.rotation.x,
                        'y': temp.object.rotation.y,
                        'z': temp.object.rotation.z
                    },
                    'scale': {
                        'x': temp.object.scale.x,
                        'y': temp.object.scale.y,
                        'z': temp.object.scale.z
                    }
                };
                break;
            //删\并 指令
            case "Delete":
            case "Combine":
                var json = {
                    'time': myDate.getTime(),
                    'userID': Struct.userID,
                    'teamID': Struct.teamID,
                    'command': command,
                    'id': id,
                    'data': data
                }
                break;
            //改 指令
            case "Modify":
                var json = {
                    'time': myDate.getTime(),
                    'userID': Struct.userID,
                    'teamID': Struct.teamID,
                    'command': command,
                    'id': id,
                    'data': {
                        'data': temp.data
                    },
                    'position': {
                        'x': temp.object.position.x,
                        'y': temp.object.position.y,
                        'z': temp.object.position.z
                    },
                    'rotation': {
                        'x': temp.object.rotation.x,
                        'y': temp.object.rotation.y,
                        'z': temp.object.rotation.z
                    },
                    'scale': {
                        'x': temp.object.scale.x,
                        'y': temp.object.scale.y,
                        'z': temp.object.scale.z
                    }
                };
                break;
            //锁 指令
            case "LockControl":
                var json = {
                    'time': myDate.getTime(),
                    'userID': Struct.userID,
                    'teamID': Struct.teamID,
                    'command': command,
                    'id': id,
                    'data': {
                        'flag': data
                    }
                };
                break;
            //添加合并
            case "AddandCmb":
                var json = {
                    'time': myDate.getTime(),
                    'userID': Struct.userID,
                    'teamID': Struct.teamID,
                    'command': command,
                    'id': id,
                    'data': data
                };
                break;
            default :
                break;
        }
        this.ws.send(JSON.stringify(json));

        //更新场景数据
        var json = {
            'sceneData': Struct.storageManage.getSceneJsonData(),
            'lockData': Struct.structManage.getLockList(),
            'userID': Struct.userID,
            'teamID': Struct.teamID,
            'command': "Update"
        }
        var message = JSON.stringify(json);
        //对大数据进行分片发送
        while (message.length > 1024 * 4) {
            this.ws.send('S' + message.substr(0, 1024 * 4));
            message = message.substr(1024 * 4);
        }
        this.ws.send('E' + message);
    }
}