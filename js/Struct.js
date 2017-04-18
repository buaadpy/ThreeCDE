/******************************************
 * 类名：结构设计场景
 * 作用：维护所有全局变量
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var Struct = {
    //服务器地址
    SERVICE_URL: 'localhost:8080/server',

    //3D场景绘制六大元素
    container: null, //容器
    renderer: null,//渲染器
    scene: null,//场景
    camera: null,//相机
    light: null,//光照
    structures: null,//结构组件

    //管理系统
    sceneManage: null,//场景管理
    structManage: null,//结构管理
    cooperationManage: null,//协同管理
    storageManage: null,//存储管理
    windowManage: null,//面板管理

    //用户控制
    userID: null,//用户id
    teamID: null,//组id
    coFlag: null,//协同标记

    //初始化
    init: function (height, width, divname) {
        //获取容器
        Struct.container = document.getElementById(divname);
        Struct.container.height = height;
        Struct.container.width = width;
        //创建Three.js渲染器
        if (Struct.renderer == null) {
            Struct.renderer = new THREE.WebGLRenderer({antialias: true});
            Struct.renderer.setSize(Struct.container.width, Struct.container.height);
            Struct.renderer.setClearColor(0x000000, 1.0);//0xCFCFCF
            Struct.container.appendChild(Struct.renderer.domElement);
        }
        //创建Three.js场景
        Struct.scene = new THREE.Scene();
        //创建相机，并添加到场景中
        Struct.camera = new THREE.PerspectiveCamera(45, Struct.container.width / Struct.container.height, 1, 31000);
        Struct.camera.position.set(0, 300, 600);
        Struct.camera.lookAt({x: 0, y: 0, z: 0 });
        //创建一个平行光光源照射到物体上
        Struct.light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        Struct.light.position.addVectors(Struct.camera.position, new THREE.Vector3(0, 0, 0));
        Struct.scene.add(Struct.light);
        //创建指示轴
        Struct.scene.add(new THREE.AxisHelper(1000));
        //创建结构列表
        Struct.structures = [];

        //创建管理器
        Struct.sceneManage = new SceneManage();
        Struct.structManage = new StructManage();
        Struct.cooperationManage = new CooperationManage();
        Struct.storageManage = new StorageManage();
        Struct.windowManage = new WindowManage();

        //设置用户标识
        Struct.userID = 0;
        Struct.teamID = 0;
        Struct.coFlag = false;
    },

    //建立辅助逻辑
    work: function (parent, buttonPanel) {
        //创建辅助线
        Struct.sceneManage.drawGrid();
        //添加坐标系指示
        Struct.sceneManage.addSceneMap();
        //添加视角控制器
        Struct.sceneManage.addOrbitControl();
        //添加变换控制器
        Struct.structManage.addTransformControl();
        //添加鼠标控制器
        Struct.structManage.addMouseControl();
        //添加键盘监听器
        Struct.structManage.addKeyListener();
        //连接属性面板
        Struct.windowManage.resetManage(parent);
        //连接按钮面板
        Struct.structManage.groupPanel = buttonPanel;
        //开启动画渲染
        Struct.animate();
    },

    //场景渲染
    render: function () {
        this.renderer.render(this.scene, this.camera);
    },

    //动画变换
    transform: function (object, position, rotation, duration) {
        new TWEEN.Tween(object.position)
            .to({ x: position.x, y: position.y, z: position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: rotation.x, y: rotation.y, z: rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(this.render)
            .start();
    },
    animate: function () {
        requestAnimationFrame(Struct.animate);
        TWEEN.update();
    }
}