/******************************************
 * 类名：组件类
 * 作用：组件实体
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var Structure = function () {
    //结构编号，用随机的16位码来标识
    this.id = CreateID.createStructID();
    //id列表，供组合体保存子结构的id
    this.idList = [];
    //结构三维本体
    this.object = new THREE.Object3D();
    //结构OBJ文件路径，基础结构则为名字，组合体则为数组
    this.pathobj = null;
    //结构mtl文件路径，基础结构则为名字，组合体则为数组
    this.pathmtl = null;
    //包络盒，组合体则为数组
    this.boxHelper = null;
    //选择标记
    this.selectFlag = false;
    //子结点选择标记
    this.childSelectFlag = false;
    //锁定标记
    this.lockFlag = false;
    //组合体标记
    this.combinaFlag = false;
    //设置该组件是否可见
    this.visibleFlag = true;
    //附属数据
    this.data = {
        name: '',//名字
        nameList: [],//供组合体使用
        quality: 0,//质量
        qualityList: [],//供组合体使用
        consumption: 0,//功耗
        consumptionList: [],//供组合体使用
        initSize: 0,//初始尺寸
        initSizeList: []//供组合体使用
    };
}
Structure.prototype = {
    //使用协同数据进行初始化
    initBySynchronous: function (id, position, rotation, scale, data, callback) {
        this.id = id;
        this.data = data.data;
        this.initByOBJMTL(data.pathobj, data.pathmtl, position, rotation, scale, callback);
    },

    //用OBJ-MTL文件进行初始化
    initByOBJMTL: function (pathobj, pathmtl, position, rotation, scale, callBackFun) {
        this.pathobj = pathobj;
        this.pathmtl = pathmtl;
        var _this = this;
        (new THREE.OBJMTLLoader()).load(pathobj, pathmtl, function (object) {
            _this.object.add(object);
            _this.boxHelper = new THREE.BoxHelper(object.children[object.children.length - 1]);
            var vertices = _this.boxHelper.vertices;
            _this.data.initSize = {
                x: vertices[0].x - vertices[1].x,
                y: vertices[0].y - vertices[3].y,
                z: vertices[0].z - vertices[4].z
            };
            Struct.render();
            if (callBackFun != null) callBackFun();
        });
        this.refresh(position, rotation, scale);
        Struct.scene.add(this.object);
    },

    //组合体进行初始化
    initByCombina: function (idList) {
        var point = new THREE.Vector3(0, 0, 0);
        this.pathobj = [];
        this.pathmtl = [];
        this.boxHelper = [];
        for (var i = 0; i < idList.length; i++) {
            var model = Struct.structManage.searchModelByID(idList[i]);
            //复制数据信息
            this.idList[i] = model.id;
            this.pathobj[i] = model.pathobj;
            this.pathmtl[i] = model.pathmtl;
            this.data.nameList[i] = model.data.name;
            this.data.quality += model.data.quality;
            this.data.qualityList[i] = model.data.quality;
            this.data.consumption += model.data.consumption;
            this.data.consumptionList[i] = model.data.consumption;
            this.data.initSizeList[i] = model.data.initSize;
            this.boxHelper[i] = new THREE.BoxHelper(
                model.object.children[0].children[model.object.children[0].children.length - 1]);
            this.object.add(model.object);
            point.add(model.object.position);
        }
        this.combinaFlag = true;
        this.object.position.set(point.x / idList.length, point.y / idList.length, point.z / idList.length);
        Struct.scene.add(this.object);
        //设置被组合组件的新位置
        for (var i = 0; i < idList.length; i++) {
            Struct.structManage.searchModelByID(idList[i]).object.position.sub(this.object.position);
        }
        //随机一个组合体名称
        this.data.name = "Combine" + (Math.floor(Math.random() * 8999 + 1000)).toString();
    },

    //结构转为选中状态
    select: function () {
        if (this.selectFlag) return;
        this.selectFlag = true;
        //控制按钮的观察者模式
        Struct.structManage.selectTotal++;
        Struct.structManage.observerPattern();
        //附着控制轴
        Struct.structManage.transformControl.attach(this.object);
        if (Struct.structManage.selectTotal != 1)
            Struct.structManage.transformControl.detach(this.object);
        Struct.render();
        //高亮包络盒
        if (!this.combinaFlag)
            Struct.scene.add(this.boxHelper);
        else
            for (var i = 0; i < this.boxHelper.length; i++) {
                Struct.scene.add(this.boxHelper[i]);
                Struct.render();
            }
        //关联属性板
        Struct.windowManage.updateCW(true, this.id, this.data, this.object.position, this.object.rotation,
            {x: this.object.scale.x * this.data.initSize.x, y: this.object.scale.y * this.data.initSize.y, z: this.object.scale.z * this.data.initSize.z});
    },

    //结构转为未选中状态
    unselect: function () {
        if (!this.selectFlag) return;
        this.selectFlag = false;
        //控制按钮的观察者模式
        Struct.structManage.selectTotal--;
        Struct.structManage.observerPattern();
        //附着控制轴
        Struct.structManage.transformControl.detach(this.object);
        //高亮包络盒
        if (!this.combinaFlag)
            Struct.scene.remove(this.boxHelper);
        else
            for (var i = 0; i < this.boxHelper.length; i++) {
                Struct.scene.remove(this.boxHelper[i]);
            }
        //关联属性板
        Struct.windowManage.updateCW(false, this.id, this.data, this.object.position, this.object.rotation,
            {x: this.object.scale.x * this.data.initSize.x, y: this.object.scale.y * this.data.initSize.y, z: this.object.scale.z * this.data.initSize.z});
    },

    //将结构锁定
    lock: function () {
        if (this.lockFlag) return;
        this.lockFlag = true;
        if (this.selectFlag) this.unselect();

        //对锁定组件透明化
        var draw = function (object) {
            for (var i = 0; i < object.children.length; i++) {
                var t = object.children[i];
                for (var j = 0; j < t.children.length; j++) {
                    t.children[j].material.opacity = 0.5;
                    t.children[j].material.transparent = true;
                }
            }
        }

        if (!this.combinaFlag) {
            draw(this.object);
        } else {
            for (var i = 0; i < this.idList.length; i++)
                draw(this.object.children[i]);
        }
        Struct.render();
    },

    //将结构解锁
    unlock: function () {
        if (!this.lockFlag) return;
        this.lockFlag = false;

        //对锁定组件透明化
        var draw = function (object) {
            for (var i = 0; i < object.children.length; i++) {
                var t = object.children[i];
                for (var j = 0; j < t.children.length; j++) {
                    t.children[j].material.opacity = 1;
                    t.children[j].material.transparent = false;
                }
            }
        }

        if (!this.combinaFlag) {
            draw(this.object);
        } else {
            for (var i = 0; i < this.idList.length; i++)
                draw(this.object.children[i]);
        }
        Struct.render();
    },

    //更新结构三维数据
    refresh: function (position, rotation, scale) {
        if (position != null) {
            this.object.position.set(position.x, position.y, position.z);
        }
        if (rotation != null) {
            this.object.rotation.set(rotation.x, rotation.y, rotation.z);
        }
        if (scale != null) {
            this.object.scale.set(scale.x, scale.y, scale.z);
        }
        //更新控制轴
        if (this.selectFlag)
            Struct.structManage.transformControl.update();
    },

    //移除结构
    delete: function () {
        this.unselect();
        this.boxHelper = null;
        Struct.scene.remove(this.object);
        this.object = null;
    },

    //结构切换成可见状态
    visible: function () {
        if (this.visibleFlag) return;
        this.visibleFlag = true;
        Struct.scene.add(this.object);
        if (!this.selectFlag) return;
        //对于选中的组件还要恢复控制轴和盒子
        Struct.structManage.transformControl.attach(this.object);
        if (Struct.structManage.selectTotal != 1)
            Struct.structManage.transformControl.detach(this.object);
        if (!this.combinaFlag)
            Struct.scene.add(this.boxHelper);
        else
            for (var i = 0; i < this.boxHelper.length; i++) {
                Struct.scene.add(this.boxHelper[i]);
            }
    },

    //结构切换成隐藏状态
    hidden: function () {
        if (!this.visibleFlag) return;
        this.visibleFlag = false;
        if (!this.selectFlag) {
            Struct.scene.remove(this.object);
            return;
        }
        //对于选中的组件还要隐藏控制轴和盒子
        Struct.structManage.transformControl.detach(this.object);
        if (!this.combinaFlag)
            Struct.scene.remove(this.boxHelper);
        else
            for (var i = 0; i < this.boxHelper.length; i++) {
                Struct.scene.remove(this.boxHelper[i]);
            }
        Struct.scene.remove(this.object);
    },

    //获得包络尺寸
    getBoxSize: function () {
        var size = {
            x: this.data.initSize.x * this.object.scale.x,
            y: this.data.initSize.y * this.object.scale.y,
            z: this.data.initSize.z * this.object.scale.z
        }
        return size;
    }
}