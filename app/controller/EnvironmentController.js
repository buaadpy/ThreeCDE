/**
 * 修改 by 杜鹏宇 on 2016/01/22
 * 场景初始化
 */

//防止未保存退出
window.onbeforeunload = beforeUnload;
function beforeUnload() {
    var warning = "您即将离开此页面，请注意";
    return warning;
}

//Todo 非正常断开无法释放锁
window.onbeforeunload = beforeUnload;
function beforeUnload() {
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

    Ext.MessageBox.show({title: '解锁操作', msg: '资源正在释放，请稍候……'});
}

Ext.define('DesignApp.controller.EnvironmentController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'scenepanel',
            selector: 'scenepanel'
        },
        {
            ref: 'buttongrouppanel',
            selector: 'buttongrouppanel'
        },
        {
            ref: 'modulepanel',
            selector: 'modulepanel'
        }
    ],

    //屏幕改变重绘函数
    resizePanel: function (com, width, height) {
        if (Struct.renderer != null && Struct.renderer != undefined) {
            Struct.container.height = height;
            Struct.container.width = width;
            Struct.renderer.setSize(width, height);
            Struct.camera.aspect = width / height;
            Struct.camera.updateProjectionMatrix();
            Struct.structManage.refresh();
            //动态更新小地图位置
            var x = this.getModulepanel().getPosition();
            var y = this.getModulepanel().getHeight();
            Struct.sceneManage.sceneMap.changePosition(x[0] - 113, x[1] + y - 113);
            Struct.render();
        }
    },

    init: function (application) {
        this.control({
            //屏幕重绘响应
            'scenepanel': {
                resize: this.resizePanel
            }
        });
    },

    //页面初始化时调用
    onLaunch: function () {
        //场景初始化
        Struct.init(this.getScenepanel().body.getHeight(), this.getScenepanel().body.getWidth(), 'structDesign');
        //建立工作环境
        Struct.work("DesignApp.view", this.getButtongrouppanel());
        //场景刷新
        Struct.render();
        //动态更新小地图位置
        var x = this.getModulepanel().getPosition();
        var y = this.getModulepanel().getHeight();
        Struct.sceneManage.sceneMap.changePosition(x[0] - 113, x[1] + y - 113);
        //首次登陆提示
        Ext.MessageBox.show({title: Language.hint, msg: Language.welcomeword, icon: Ext.Msg.INFO, buttons: Ext.Msg.OK});
        //设置用户信息
        var name = window.location.search;
        name = name.substring(name.indexOf('?') + 2, name.length);
        Struct.userID = CreateID.createUserID(name);
        this.getButtongrouppanel().queryById("welcomeName").setText(Language.welcome + "：" + getCharFromUtf8(name));
    }
});