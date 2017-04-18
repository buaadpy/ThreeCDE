/******************************************
 * 类名：指示地图
 * 作用：右下角指示场景方向的小地图
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var SceneMap = function () {
    this.map = null;//标识框
    this.scene = null;//小场景
    this.renderer = null;//小渲染器
    this.camera = null;//小相机
    this.sgridHelper = null;//小地板
    this.lasttarget = null;//记录上次目标点
    this.mapPoint = {
        x: 765,
        y: 578
    };//小地图偏移位置
    this.symble = {
        x: document.createElement("div"),
        y: document.createElement("div"),
        z: document.createElement("div")
    };//XYZ指示文字
}
SceneMap.prototype = {
    //初始化
    init: function () {
        //添加框
        this.map = document.createElement("div");
        this.map.style.left = this.mapPoint.x + "px";
        this.map.style.top = this.mapPoint.y + "px";
        this.map.style.position = "fixed";
        this.map.style.display = "block";
        this.map.style.height = 100 + "px";
        this.map.style.width = 100 + "px";
        Struct.container.parentNode.appendChild(this.map);
        //添加小渲染器
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(95, 95);
        this.renderer.setClearColor(0x000000, 0);
        this.map.appendChild(this.renderer.domElement);
        //添加小场景
        this.scene = new THREE.Scene();
        //创建小相机，并添加到场景中
        this.camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
        this.camera.position.set(0, 140, 280);
        this.camera.lookAt({x: 0, y: 0, z: 0 });
        //创建一个平行光光源照射到物体上
        var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.addVectors(this.camera.position, new THREE.Vector3(0, 0, 0));
        this.scene.add(light);
        //添加小地板
        this.sgridHelper = new THREE.GridHelper(100, 25);
        this.sgridHelper.position = new THREE.Vector3(0, -5, 0);
        this.scene.add(this.sgridHelper);
        //添加坐标轴
        this.scene.add(new THREE.AxisHelper(100));
        this.renderer.render(this.scene, this.camera);
        this.lasttarget = {x: 0, y: 0, z: 0};
        //添加XYZ标识
        this.symble.x.style.zIndex = 3;
        this.symble.x.style.position = "fixed";
        this.symble.x.style.left = this.mapPoint.x + 76 + "px";
        this.symble.x.style.top = this.mapPoint.y + 50 + "px";
        this.symble.x.style.display = "block";
        this.symble.x.innerHTML = '<B style="color:White">X</B>';
        this.map.parentNode.appendChild(this.symble.x);
        this.symble.y.style.zIndex = 3;
        this.symble.y.style.position = "fixed";
        this.symble.y.style.left = this.mapPoint.x + 50 + "px";
        this.symble.y.style.top = this.mapPoint.y + 18 + "px";
        this.symble.y.style.display = "block";
        this.symble.y.innerHTML = '<B style="color:White">Y</B>';
        this.map.parentNode.appendChild(this.symble.y);
        this.symble.z.style.zIndex = 3;
        this.symble.z.style.position = "fixed";
        this.symble.z.style.left = this.mapPoint.x + 50 + "px";
        this.symble.z.style.top = this.mapPoint.y + 67 + "px";
        this.symble.z.style.display = "block";
        this.symble.z.innerHTML = '<B style="color:White">Z</B>';
        this.map.parentNode.appendChild(this.symble.z);
    },

    //同步更新坐标轴指示图
    update: function (target) {
        //将三维坐标转换为二维坐标
        var getXYZPosition = function (a, b, c) {
            var projected = new THREE.Vector3(a, b, c);
            (new THREE.Projector).projectVector(projected, Struct.sceneManage.sceneMap.camera);
            return { x: (1 + projected.x) * 100 / 2,
                y: (1 - projected.y) * 100 / 2};
        }

        //鼠标右键拖拽场景不移动
        if (target != null) {
            if (this.lasttarget.x != target.x || this.lasttarget.y != target.y || this.lasttarget.z != target.z) {
                this.lasttarget.x = target.x;
                this.lasttarget.y = target.y;
                this.lasttarget.z = target.z;
                if (!(target.x == 0 && target.y == 0 && target.z == 0)) return;
            }
        }
        //改变照相机
        this.camera.position.z = Math.sqrt((283 * 283 * Struct.camera.position.z * Struct.camera.position.z) /
            (Struct.camera.position.x * Struct.camera.position.x + Struct.camera.position.z * Struct.camera.position.z));
        if (Struct.camera.position.z < 0) this.camera.position.z *= -1;
        this.camera.position.x = this.camera.position.z * Struct.camera.position.x / Struct.camera.position.z;
        this.camera.position.y = this.camera.position.z * Struct.camera.position.y / Struct.camera.position.z;
        this.camera.lookAt({x: 0, y: 0, z: 0 });
        this.renderer.render(this.scene, this.camera);
        //更新XYZ标识位置
        this.symble.x.style.left = this.mapPoint.x + getXYZPosition(70, 0, 0).x + "px";
        this.symble.x.style.top = this.mapPoint.y + getXYZPosition(70, 0, 0).y + "px";
        this.symble.y.style.left = this.mapPoint.x + getXYZPosition(0, 80, 0).x + "px";
        this.symble.y.style.top = this.mapPoint.y + getXYZPosition(0, 80, 0).y + "px";
        this.symble.z.style.left = this.mapPoint.x + getXYZPosition(0, 0, 80).x + "px";
        this.symble.z.style.top = this.mapPoint.y + getXYZPosition(0, 0, 80).y + "px";
    },

    //将地图位置移动
    changePosition: function (x, y) {
        this.mapPoint.x = x;
        this.mapPoint.y = y;
        this.map.style.left = this.mapPoint.x + "px";
        this.map.style.top = this.mapPoint.y + "px";
        this.update();
    }
}