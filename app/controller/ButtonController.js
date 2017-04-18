/**
 * 修改 by 杜鹏宇 on 2016/01/22
 * 按钮面板的响应
 */

Ext.define('DesignApp.controller.ButtonController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'buttongrouppanel',
            selector: 'buttongrouppanel'
        },
        {
            ref: 'modulepanel',
            selector: 'modulepanel'
        }
    ],

    onLaunch: function (application) {
    },

    init: function (application) {
        this.control({
            //新建结构文件按钮
            '#btnNewStructFile': {
                click: this.btnNewStructFileClick
            },
            //导出文件按钮
            '#btnExport': {
                click: this.btnExportClick
            },
            //退出按钮
            '#btnBack': {
                click: this.btnBackClick
            },

            //新建协同任务
            '#btnNewCo': {
                click: this.btnNewCoClick
            },
            //关闭协同任务
            '#btnCloseCo': {
                click: this.btnCloseCoClick
            },
            //加入协同任务
            '#btnJoinCo': {
                click: this.btnJoinCoClick
            },
            //退出协同任务
            '#btnLeaveCo': {
                click: this.btnLeaveCoClick
            },

            //漫游模式按钮
            '#btnViewMode': {
                click: this.btnViewModeClick
            },
            //初始化视角按钮
            '#btnInitview': {
                click: this.btnInitviewClick
            },
            //演示视频按钮
            '#btnMovie': {
                click: this.btnMovieClick
            },

            //列表板按钮
            '#btnList': {
                click: this.btnListClick
            },
            //属性版按钮
            '#btnAdvancedPanel': {
                click: this.btnAdvancedPanelClick
            },

            //平移按钮
            '#btnTranslate': {
                click: this.btnTranslateClick
            },
            //旋转按钮
            '#btnRotate': {
                click: this.btnRotateClick
            },
            //缩放按钮
            '#btnScale': {
                click: this.btnScaleClick
            },

            //组合按钮
            '#btnCombine': {
                click: this.btnCombineClick
            },
            //分离按钮
            '#btnSeparate': {
                click: this.btnSeparateClick
            },
            //吸附按钮
            '#btnAssembly': {
                click: this.btnAssemblyClick
            },

            //按X方向对齐
            '#btnAlignmentX': {
                click: this.btnAlignmentXClick
            },
            //按Y方向对齐
            '#btnAlignmentY': {
                click: this.btnAlignmentYClick
            },
            //按Z方向对齐
            '#btnAlignmentZ': {
                click: this.btnAlignmentZClick
            },

            //选择框按钮
            '#btnSelectBox': {
                click: this.btnSelectBoxClick
            },
            //复制按钮
            '#btnCopy': {
                click: this.btnCopyClick
            },
            //删除按钮
            '#btnDelete': {
                click: this.btnDeleteClick
            }
        });
    },

    //新建结构文件按钮响应
    btnNewStructFileClick: function () {
        Ext.MessageBox.confirm(Language.hint, Language.msgnotsave, function (btn) {
            if (btn == 'yes') {
                {
                    Struct.sceneManage.resetScene();
                }
            }
        });
        this.getButtongrouppanel().queryById('StructMenu').menu.hide();
    },

    //导出按钮
    btnExportClick: function () {
        Ext.MessageBox.show({title: Language.hint, msg: Language.msgpleasewait});
        var me = this;
        setTimeout(function () {
            //导出obj数据文件
            me.getButtongrouppanel().queryById('StructMenu').menu.hide();
            var aLink = document.createElement('a');
            var data = Struct.storageManage.exportObj();
            var blob = new Blob([data]);
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            aLink.download = 'data.obj';
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt);
            Ext.MessageBox.show({title: Language.hint, msg: Language.msgexport, buttons: Ext.Msg.OK});
            //导出mtl数据文件
            me.getButtongrouppanel().queryById('StructMenu').menu.hide();
            var aLink = document.createElement('a');
            var data = "resources/objmodel/Struct.mtl";
            var blob = new Blob([data]);
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            aLink.download = 'data.mtl';
            aLink.href = "resources/objmodel/Struct.mtl";
            aLink.dispatchEvent(evt);
            Ext.MessageBox.show({title: Language.hint, msg: Language.msgexport, buttons: Ext.Msg.OK});
        }, "1000");//为了弹出等待窗口而不让页面卡住设置的延迟
    },

    //返回注销按钮
    btnBackClick: function () {
        window.location.href = "index.html";
    },

    //漫游模式按钮响应
    btnViewModeClick: function () {
        if (!Struct.sceneManage.viewSwitch) {
            Struct.sceneManage.viewSwitch = true;
            Struct.sceneManage.initView();
            Struct.sceneManage.viewMode();
        } else {
            Struct.sceneManage.viewSwitch = false;
        }
    },

    //恢复初始视角按钮
    btnInitviewClick: function () {
        Struct.sceneManage.initView();
    },

    //演示视频按钮响应
    movieWindow: null,
    btnMovieClick: function () {
        if (this.movieWindow == null)
            this.movieWindow = Ext.create('DesignApp.view.VideoDemoWindow');
        this.movieWindow.show();
    },

    //建立协同环境
    btnNewCoClick: function () {
        if (!Struct.coFlag) {
            Struct.teamID = CreateID.createEnvironmentID();
            Struct.coFlag = true;
            Struct.cooperationManage.startWebSocket(true);
            Ext.MessageBox.show({title: Language.hint, msg: Language.msgbuildsuccess + Struct.teamID, icon: Ext.Msg.RIGHT, buttons: Ext.Msg.OK});
            Struct.structManage.groupPanel.queryById('btnNewCo').setDisabled(false);
            Struct.structManage.groupPanel.queryById('btnCloseCo').setDisabled(false);
            Struct.structManage.groupPanel.queryById('btnJoinCo').setDisabled(true);
            Struct.structManage.groupPanel.queryById('btnLeaveCo').setDisabled(true);
        } else
        //如果已经建立了协同环境就告知用户id
            Ext.MessageBox.show({title: Language.hint, msg: Language.msgshowid + Struct.teamID, icon: Ext.Msg.RIGHT, buttons: Ext.Msg.OK});
    },

    //关闭协同环境
    btnCloseCoClick: function () {
        Struct.coFlag = false;
        Struct.cooperationManage.ws.close();
        Struct.structManage.allUnlock();
        Ext.MessageBox.show({title: Language.hint, msg: Language.msgclose, buttons: Ext.Msg.OK});
        Struct.structManage.groupPanel.queryById('btnNewCo').setDisabled(false);
        Struct.structManage.groupPanel.queryById('btnCloseCo').setDisabled(true);
        Struct.structManage.groupPanel.queryById('btnJoinCo').setDisabled(false);
        Struct.structManage.groupPanel.queryById('btnLeaveCo').setDisabled(true);
    },

    //加入协同环境
    btnJoinCoClick: function () {
        Ext.MessageBox.prompt(Language.msgjoin, Language.msginputid, function (btn, text) {
            if (btn == "ok") {
                Struct.sceneManage.resetScene();
                Struct.coFlag = true;
                Struct.teamID = text;
                Struct.cooperationManage.startWebSocket(false);
                Ext.MessageBox.show({title: Language.hint, msg: Language.msgjoinwait});
                Struct.structManage.groupPanel.queryById('btnNewCo').setDisabled(true);
                Struct.structManage.groupPanel.queryById('btnCloseCo').setDisabled(true);
                Struct.structManage.groupPanel.queryById('btnJoinCo').setDisabled(true);
                Struct.structManage.groupPanel.queryById('btnLeaveCo').setDisabled(false);
            }
        });
    },

    //退出协同环境
    btnLeaveCoClick: function () {
        Struct.coFlag = false;
        if (Struct.structures != null) {
            var total = Struct.structures.length;
            for (var i = 0; i < total; i++) {
                if (Struct.structures[i].selectFlag) {
                    Struct.structures[i].unselect();
                    Struct.cooperationManage.sendInfo("LockControl", Struct.structures[i].id, false);
                }
            }
            console.log("结构锁资源释放完毕");
        }
        Struct.cooperationManage.ws.close();
        Struct.sceneManage.resetScene();
        Ext.MessageBox.show({title: Language.hint, msg: Language.msgexit, buttons: Ext.Msg.OK});
        Struct.structManage.groupPanel.queryById('btnNewCo').setDisabled(false);
        Struct.structManage.groupPanel.queryById('btnCloseCo').setDisabled(true);
        Struct.structManage.groupPanel.queryById('btnJoinCo').setDisabled(false);
        Struct.structManage.groupPanel.queryById('btnLeaveCo').setDisabled(true);
    },

    //“列表板”按钮
    btnListClick: function () {
        var basePosition = this.getModulepanel().getPosition();
        Struct.windowManage.openListWindow(basePosition[0], basePosition[1]);
    },
    //“属性板”按钮
    btnAdvancedPanelClick: function () {
        var basePosition = this.getModulepanel().getPosition();
        Struct.windowManage.openControlWindow(basePosition[0], basePosition[1]);
    },

    //“位移”按钮
    btnTranslateClick: function () {
        Struct.structManage.translateControl();
    },
    //“旋转”按钮
    btnRotateClick: function () {
        Struct.structManage.rotateControl();
    },
    //“缩放”按钮
    btnScaleClick: function () {
        Struct.structManage.scaleControl();
    },

    //“组合”按钮
    btnCombineClick: function () {
        Struct.structManage.combinaOperate();
    },
    //“分离”按钮
    btnSeparateClick: function () {
        Struct.structManage.breakOperate();
    },
    //“装配”按钮
    btnAssemblyClick: function () {
        Struct.structManage.assemblyReady();
    },

    //“X轴对齐”按钮
    btnAlignmentXClick: function () {
        this.getButtongrouppanel().queryById('StructAlign').menu.hide();
        Struct.structManage.alignmentX();
    },
    //“Y轴对齐”按钮
    btnAlignmentYClick: function () {
        this.getButtongrouppanel().queryById('StructAlign').menu.hide();
        Struct.structManage.alignmentY();
    },
    //“Z轴对齐”按钮
    btnAlignmentZClick: function () {
        this.getButtongrouppanel().queryById('StructAlign').menu.hide();
        Struct.structManage.alignmentZ();
    },

    //"选择框"按钮
    btnSelectBoxClick: function () {
        Struct.structManage.allUnselect();
        Struct.sceneManage.boxFlag = 0;
    },
    //“复制”按钮
    btnCopyClick: function () {
        Struct.structManage.structCopy();
    },
    //“删除”按钮
    btnDeleteClick: function () {
        Struct.structManage.selectDelete();
    }
});