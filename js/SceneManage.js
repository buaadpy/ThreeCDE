/******************************************
 * 类名：场景管理
 * 作用：负责场景的各种逻辑
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var SceneManage = function () {
    this.orbitControl = null;//视角控制器
    this.gridHelper = null;//网格辅助线
    this.sceneMap = null;//场景指示图

    //漫游功能使用
    this.viewAngle = Math.PI / 2;//漫游视角
    this.viewSwitch = false;//漫游模式开关
    this.center = null;//旋转中心

    //多选框功能使用
    this.boxFlag = -1;//状态标记
    this.selectBox = document.createElement("div");//虚线选框
    this.startPoint = {x: 0, y: 0};//记录点击下去的初始点
}
SceneManage.prototype = {
    //重置新的场景
    resetScene: function () {
        //重置视角
        this.initView();
        //删除组件
        var idList = [];
        for (var i = 0; i < Struct.structures.length; i++)
            idList[idList.length] = Struct.structures[i].id;
        Struct.structManage.deleteByID(idList, false);
        Struct.structures = [];
        Struct.render();
    },

    //漫游模式
    viewMode: function () {
        //计算组件几何中心作为旋转中心
        if (Struct.sceneManage.center == null) {
            Struct.sceneManage.center = new THREE.Vector3(0, 0, 0);
            if (Struct.structures.length != 0) {
                for (var i = 0; i < Struct.structures.length; i++) {
                    Struct.sceneManage.center.x += Struct.structures[i].object.position.x;
                    Struct.sceneManage.center.y += Struct.structures[i].object.position.y;
                    Struct.sceneManage.center.z += Struct.structures[i].object.position.z;
                }
                Struct.sceneManage.center.x /= Struct.structures.length;
                Struct.sceneManage.center.y /= Struct.structures.length;
                Struct.sceneManage.center.z /= Struct.structures.length;
            }
        }
        //旋转相机
        Struct.sceneManage.viewAngle = (Struct.sceneManage.viewAngle + 0.01) % (2 * Math.PI);
        Struct.camera.position.x = 900 * Math.cos(Struct.sceneManage.viewAngle) + Struct.sceneManage.center.x;
        Struct.camera.position.y = Struct.sceneManage.center.y;
        Struct.camera.position.z = 900 * Math.sin(Struct.sceneManage.viewAngle) + Struct.sceneManage.center.z;
        Struct.camera.lookAt({x: Struct.sceneManage.center.x, y: Struct.sceneManage.center.y, z: Struct.sceneManage.center.z });
        Struct.light.position.addVectors(Struct.camera.position, new THREE.Vector3(0, 0, 0));
        Struct.render();
        //更新小地图
        if (Struct.sceneManage.sceneMap != null)
            Struct.sceneManage.sceneMap.update({x: Struct.sceneManage.center.x, y: Struct.sceneManage.center.y, z: Struct.sceneManage.center.z});
        if (Struct.sceneManage.viewSwitch)
            requestAnimationFrame(Struct.sceneManage.viewMode);
        else
            Struct.sceneManage.center = null;
    },

    //恢复初始视角
    initView: function () {
        console.log(Struct.structures);
        Struct.camera.position.set(0, 300, 600);
        Struct.camera.lookAt({x: 0, y: 0, z: 0 });
        Struct.light.position.addVectors(Struct.camera.position, new THREE.Vector3(0, 0, 0));
        //恢复视角控制器参数
        this.orbitControl.target = new THREE.Vector3();
        this.orbitControl.center = this.orbitControl.target;
        Struct.structManage.refresh();
        Struct.render();
        //更新指示图
        if (this.sceneMap != null)
            this.sceneMap.update({x: 0, y: 0, z: 0});
    },

    //选择框拉取选择
    selectBoxControl: function (event) {
        //终止点点击
        if (this.boxFlag == 1) {
            Struct.container.parentNode.removeChild(this.selectBox);
            //判断每个物体映射到屏幕的位置是否在选择框内
            for (var i = 0; i < Struct.structures.length; i++) {
                if (Struct.structures[i].lockFlag || (!Struct.structures[i].visibleFlag)) continue;
                var temp = this.getObjectScreenPosition(Struct.structures[i].object.position);
                if (temp.x >= this.startPoint.x && temp.x <= event.clientX && temp.y >= this.startPoint.y && temp.y <= event.clientY) {
                    Struct.structures[i].select();
                    Struct.cooperationManage.sendInfo("LockControl", Struct.structures[i].id, true);
                    Struct.render();
                }
            }
            this.boxFlag = -1;
            //更新列表板
            Struct.windowManage.updateLW();
            Struct.render();
        }
        //初始点点击
        if (this.boxFlag == 0) {
            //确定选择框的左上角
            this.startPoint.x = event.clientX;
            this.startPoint.y = event.clientY;
            this.selectBox.style.left = event.clientX + "px";
            this.selectBox.style.top = event.clientY + "px";
            this.selectBox.style.zIndex = 6;
            this.selectBox.style.position = "fixed";
            this.selectBox.style.height = 1 + "px";
            this.selectBox.style.width = 1 + "px";
            this.selectBox.style.display = "block";
            this.selectBox.style.border = "dotted 2px white";
            Struct.container.parentNode.appendChild(this.selectBox);
            this.boxFlag = 1;
            //当鼠标向左上角移动时也能改变
            this.selectBox.addEventListener('mousemove', function (event) {
                Struct.sceneManage.selectBox.style.width = (event.clientX - Struct.sceneManage.startPoint.x) + "px";
                Struct.sceneManage.selectBox.style.height = (event.clientY - Struct.sceneManage.startPoint.y) + "px";
            }, false);
        }
    },

    //绘制标尺网格
    drawGrid: function () {
        this.gridHelper = new THREE.GridHelper(1000, 50);
        this.gridHelper.position = new THREE.Vector3(0, -1, 0);
        Struct.scene.add(this.gridHelper);
        Struct.render();
    },

    //添加视角控制器
    addOrbitControl: function () {
        this.orbitControl = new THREE.OrbitControls(Struct.camera, Struct.container);
        this.orbitControl.addEventListener('change', function (event) {
            Struct.structManage.refresh();
            Struct.light.position.addVectors(Struct.camera.position, new THREE.Vector3(0, 0, 0));
            Struct.renderer.render(Struct.scene, Struct.camera);
            if (Struct.sceneManage.sceneMap != null)
                Struct.sceneManage.sceneMap.update(event.target.target);
            //当视角缩放太小时恢复至初始视角
            var temp = Struct.camera.position;
            if (temp.x * temp.x + temp.y * temp.y + temp.z * temp.z > 3 * 5000 * 5000) Struct.sceneManage.initView();
        });
    },

    //获取三维空间坐标转二维屏幕坐标
    getObjectScreenPosition: function (worldPosition) {
        var projected = worldPosition.clone();
        (new THREE.Projector).projectVector(projected, Struct.camera);
        return { x: (1 + projected.x) * Struct.container.width / 2 + Struct.container.getBoundingClientRect().left,
            y: (1 - projected.y) * Struct.container.height / 2 + Struct.container.getBoundingClientRect().top };
    },

    //添加场景指示小地图
    addSceneMap: function () {
        this.sceneMap = new SceneMap();
        this.sceneMap.init();
    }
}