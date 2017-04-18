/******************************************
 * 类名：语言包
 * 作用：利用全局变量的原理切换中英文
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var Language = {
}

var changeToEnglish = function () {
    Language.type = "E";

	Language.username = "Username";
	Language.password = "Password";
    Language.title = "3D Collaborative Design Environment";
    Language.login = "LogIn";
    Language.register = "New User?";
    Language.forget = "Forget Password?";
    Language.logintip = "Please input an user name.";
    Language.wronguser = "Wrong username or password, please try again.";
    Language.registertip = "Please input a password.(init 0000)";

    Language.basicModel = "Basic Model";
    Language.platForm = "Plat Form";
    Language.internalLoad = "Internal Load";
    Language.externalLoad = "External Load";
    Language.expansion = "Expansion";
    Language.newDesign = "New Design";

    Language.menu = "Menu";
    Language.new = "New";
    Language.open = "Open";
    Language.save = "Save";
    Language.saveas = "Save As";
    Language.export = "Export";
    Language.back = "Back";
    Language.collaborate = "Collaborate";
    Language.build = "Build";
    Language.close = "Close";
    Language.join = "Join";
    Language.exit = "Exit";
    Language.operate = "Operate";
    Language.list = "List";
    Language.translate = "Translate";
    Language.rotate = "Rotate";
    Language.scale = "Scale";
    Language.combine = "Combine";
    Language.separate = "Separate";
    Language.assembly = "Assembly";
    Language.align = "Align";
    Language.byX = "By X";
    Language.byY = "By Y";
    Language.byZ = "By Z";
    Language.box = "Box";
    Language.copy = "Copy";
    Language.delete = "Delete";
    Language.undo = "Undo";
    Language.observe = "Observe";
    Language.view = "View";
    Language.init = "Init";
    Language.movie = "Movie";
    Language.welcome = "Welcome";

    Language.information = "Information";
    Language.sname = "Name";
    Language.squality = "Quality(kg)";
    Language.spower = "Power(w)";
    Language.sparameters = "3D Parameters";
    Language.spositionX = "Position-X";
    Language.spositionY = "Position-Y";
    Language.spositionZ = "Position-Z";
    Language.srotationX = "Rotation-X";
    Language.srotationY = "Rotation-Y";
    Language.srotationZ = "Rotation-Z";
    Language.ssizeX = "Size-X(m)";
    Language.ssizeY = "Size-Y(m)";
    Language.ssizeZ = "Size-Z(m)";

    Language.hint = "Hint";
    Language.msgwebsocketfail = "Websocket is bulit fail.";
    Language.msgwebsocketnosup = "Sorry, Your browser does not support WebSocket.";

    Language.msgload = "Loading……";
    Language.msgloaderror = "Loading error.";
    Language.msgsave = "Saving，please wait for a moment……";
    Language.msgsavefailfolder = "Save failed (folder created without success)";
    Language.msgsavesuccess = "Successfully saved.";
    Language.msgsavefailjson = "Failed to save (save data files without success)";

    Language.msgoperationcancel = "The operation was canceled.";
    Language.msgonlychoose = "Please only choose one object.";
    Language.msgchooseone = "Please choose one object.";
    Language.msgchooseonecombine = "Please choose one combine object."
    Language.msgerror = "Error, please try again.";

    Language.msgnotsave = "Your work has not be saved, continue？";
    Language.msgfilename = "FileName";
    Language.msginputname = "Please input file name:";
    Language.msgpleasewait = "Please wait for a moment...";
    Language.msgexport = "data export over.";
    Language.msgbuildsuccess = "Collaborative environment is built successfully，the ID is ";
    Language.msgshowid = "Your collaborative environment ID is ";
    Language.msgjoin = "Join Environment";
    Language.msginputid = "Please input the environment ID:";

    Language.msgcloseconnect = "Host closes the work environment.";
    Language.msgjoinwait = "Please wait for joining...";
    Language.msgjoinsuccess = "Joining success.";
    Language.msgexit = "You have exit from the environment.";
    Language.msgclose = "You have close the environment.";
    Language.msgbreakup = "Connect break up.";

    Language.welcomeword = "Welcome you to visit the collaborative design environment, if you are the first time to visit the system, it is recommended to click on the right corner of the demo button to watch the video.";
}

var changeToChinese = function () {
    Language.type = "C";

	Language.username = "用户名";
	Language.password = "密码";
    Language.title = "三维协同设计环境";
    Language.login = "  登录  ";
    Language.register = "新用户？";
    Language.forget = "忘记密码？";
    Language.logintip = "请您输入一个用户名";
    Language.wronguser = "用户名不存在或密码错误，请您重试";
    Language.registertip = "请设置您的密码(默认为0000)";

    Language.basicModel = "基础模型";
    Language.platForm = "卫星平台";
    Language.internalLoad = "内部载荷";
    Language.externalLoad = "外部载荷";
    Language.expansion = "拓展包";
    Language.newDesign = "新设计";

    Language.menu = "菜单";
    Language.new = "新建";
    Language.open = "打开";
    Language.save = "保存";
    Language.saveas = "另存为";
    Language.export = "导出";
    Language.back = "注销";
    Language.collaborate = "协同";
    Language.build = "建立";
    Language.close = "关闭";
    Language.join = "加入";
    Language.exit = "退出";
    Language.operate = "操作板";
    Language.list = "列表板";
    Language.translate = "平移";
    Language.rotate = "旋转";
    Language.scale = "缩放";
    Language.combine = "组合";
    Language.separate = "分离";
    Language.assembly = "吸附";
    Language.align = "对齐";
    Language.byX = "按X轴";
    Language.byY = "按Y轴";
    Language.byZ = "按Z轴";
    Language.box = "选框";
    Language.copy = "复制";
    Language.delete = "删除";
    Language.undo = "撤销";
    Language.observe = "观察";
    Language.view = "漫游";
    Language.init = "初始";
    Language.movie = "演示";
    Language.welcome = "欢迎";

    Language.information = "基础信息";
    Language.sname = "名称";
    Language.squality = "质量(千克)";
    Language.spower = "功率(瓦)";
    Language.sparameters = "三维属性";
    Language.spositionX = "空间位置-X";
    Language.spositionY = "空间位置-Y";
    Language.spositionZ = "空间位置-Z";
    Language.srotationX = "欧拉转角-X";
    Language.srotationY = "欧拉转角-Y";
    Language.srotationZ = "欧拉转角-Z";
    Language.ssizeX = "尺寸-X(米)";
    Language.ssizeY = "尺寸-Y(米)";
    Language.ssizeZ = "尺寸-Z(米)";

    Language.hint = "提示";
    Language.msgwebsocketfail = "连接建立失败";
    Language.msgwebsocketnosup = "对不起，您的浏览器不支持WebSocket";

    Language.msgload = "加载中，请稍后……";
    Language.msgloaderror = "加载失败";
    Language.msgsave = "保存中，请稍后……";
    Language.msgsavefailfolder = "保存失败 (文件夹创建失败)";
    Language.msgsavesuccess = "保存成功";
    Language.msgsavefailjson = "保存失败 (数据文件创建失败)";

    Language.msgoperationcancel = "操作中止";
    Language.msgonlychoose = "请仅选中一个组件";
    Language.msgchooseone = "请至少选择一个组件";
    Language.msgchooseonecombine = "请选择一个组合体";
    Language.error = "未知错误，请重试";

    Language.msgnotsave = "您将新建一个设计，确定吗？";
    Language.msgfilename = "文件名";
    Language.msginputname = "请输入文件名:";
    Language.msgpleasewait = "请等待...";
    Language.msgexport = "数据导出完成";
    Language.msgbuildsuccess = "协同环境开放成功，ID为 ";
    Language.msgshowid = "您的协同环境ID为 ";
    Language.msgjoin = "加入协同环境";
    Language.msginputid = "请输入指定的ID:";

    Language.msgcloseconnect = "主席关闭了协同工作环境";
    Language.msgjoinwait = "正在加入，请稍后……";
    Language.msgjoinsuccess = "加入成功";
    Language.msgexit = "您已退出当前协同环境";
    Language.msgclose = "您已关闭协同环境";
    Language.msgbreakup = "连接中断";

    Language.welcomeword = "欢迎您登陆协同设计环境，如果您是第一次登陆本系统，建议点击右上角 演示 按钮观看操作视频";
}