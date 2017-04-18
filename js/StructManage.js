/******************************************
 * 类名：结构管理
 * 作用：负责组件的逻辑操作
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var StructManage = function () {
    //变换控制
    this.transformControl = null;//变换控制器
    this.transformFlag = false;//变换标记

    //按键控制
    this.ctrlFlag = false;//检测ctrl键是否按下

    //吸附功能使用
    this.assemblyFlag = -1;//吸附开关
    this.assemblyObjectA = {
        No: null,
        cNo: null,
        Position: null,
        Normal: null,
        Scale: null
    };//吸附对象A
    this.assemblyObjectB = {
        No: null,
        cNo: null,
        Position: null,
        Normal: null,
        Scale: null
    };//吸附对象B
    this.symbleline = null;//标识线
    this.symblebegin = null;//标识点A
    this.symbleend = null;//标识点B

    //组合功能使用
    this.callBackCount = 0;//回调计数
    this.magicnumber = 0;//供回掉使用
    this.combid = [];//保存组合体id
    this.idLists = [];//保存id序列

    //观察者模式使用
    this.selectTotal = 0;//组件选择数量
    this.groupPanel = null;//连接按钮面板
}
StructManage.prototype = {
    //按钮观察者模式
    observerPattern: function () {
        if (this.selectTotal >= 1) {
            this.groupPanel.queryById('btnTranslate').setDisabled(false);
            this.groupPanel.queryById('btnRotate').setDisabled(false);
            this.groupPanel.queryById('btnScale').setDisabled(false);
            this.groupPanel.queryById('btnSeparate').setDisabled(false);
            this.groupPanel.queryById('btnCopy').setDisabled(false);
            this.groupPanel.queryById('btnDelete').setDisabled(false);
        } else {
            this.groupPanel.queryById('btnTranslate').setDisabled(true);
            this.groupPanel.queryById('btnRotate').setDisabled(true);
            this.groupPanel.queryById('btnScale').setDisabled(true);
            this.groupPanel.queryById('btnSeparate').setDisabled(true);
            this.groupPanel.queryById('btnCopy').setDisabled(true);
            this.groupPanel.queryById('btnDelete').setDisabled(true);
        }
        if (this.selectTotal >= 2) {
            this.groupPanel.queryById('btnTranslate').setDisabled(true);
            this.groupPanel.queryById('btnRotate').setDisabled(true);
            this.groupPanel.queryById('btnScale').setDisabled(true);
            this.groupPanel.queryById('btnCombine').setDisabled(false);
            this.groupPanel.queryById('StructAlign').setDisabled(false);
        } else {
            this.groupPanel.queryById('btnCombine').setDisabled(true);
            this.groupPanel.queryById('StructAlign').setDisabled(true);
        }
    },

    //添加键盘监听
    addKeyListener: function () {
        window.addEventListener('keydown', function (e) {
            //ctrl键的多选操作
            if (e.ctrlKey || window.event.ctrlKey) {
                Struct.structManage.ctrlFlag = true;
            }
            //delete键的删除操作
            if (e.keyCode == 46 || window.event.keyCode == 46) {
                Struct.structManage.selectDelete();
            }
            //全选操作
            if ((e.keyCode == 65 || window.event.keyCode == 65) && Struct.structManage.ctrlFlag) {
                Struct.structManage.allSelect();
            }
            //复制操作
            if ((e.keyCode == 67 || window.event.keyCode == 67) && Struct.structManage.ctrlFlag) {
                Struct.structManage.structCopy();
            }
        }, false);
        window.addEventListener('keyup', function (e) {
            Struct.structManage.ctrlFlag = false;
        }, false);
    },

    //添加鼠标事件控制器
    addMouseControl: function () {
        Struct.renderer.domElement.onclick = function (event) {
            //移动控制轴时不检测单击选择
            if (Struct.structManage.transformFlag) return;
            //射线法选中物体
            var raycaster = new THREE.Raycaster();
            var projector = new THREE.Projector();
            var directionVector = new THREE.Vector3(((event.clientX - Struct.container.getBoundingClientRect().left) / Struct.container.width ) * 2 - 1,
                    -((event.clientY - Struct.container.getBoundingClientRect().top) / Struct.container.height ) * 2 + 1, 1);
            projector.unprojectVector(directionVector, Struct.camera);
            raycaster.set(Struct.camera.position, directionVector.sub(Struct.camera.position).normalize());
            Struct.structManage.clickSelect(raycaster.intersectObjects(Struct.scene.children, true));
        };

        Struct.renderer.domElement.ondblclick = function (event) {
            if (Struct.sceneManage.viewSwitch)
                Struct.sceneManage.viewSwitch = false;
            if (Struct.structManage.assemblyFlag == -1) {
                //双击取消所有选择
                Struct.structManage.allUnselect();
            } else {
                //中断吸附操作
                Ext.MessageBox.show({title: Language.hint, msg: Language.msgoperationcancel, buttons: Ext.Msg.OK});
                Struct.scene.remove(Struct.structManage.symbleline);
                Struct.structManage.symbleline = null;
                Struct.scene.remove(Struct.structManage.symblebegin);
                Struct.scene.remove(Struct.structManage.symbleend);
                Struct.render();
                document.body.style.cursor = 'default';
                Struct.scene.add(Struct.structManage.transformControl);
                Struct.structManage.assemblyFlag = -1;
            }
        };

        Struct.renderer.domElement.onmouseup = function (event) {
            Struct.sceneManage.selectBoxControl(event);
            if (Struct.windowManage.useCounter != 1) return;
            for (var i = 0; i < Struct.structures.length; i++)
                if (Struct.structures[i].selectFlag) {
                    Struct.windowManage.changeData(
                        Struct.structures[i].data, Struct.structures[i].object.position, Struct.structures[i].object.rotation, Struct.structures[i].getBoxSize()
                    );
                    Struct.cooperationManage.sendInfo("Modify", Struct.structures[i].id);
                }
        };

        Struct.renderer.domElement.onmousedown = function (event) {
            Struct.sceneManage.selectBoxControl(event);
        };

        Struct.renderer.domElement.onmousemove = function (event) {
            Struct.structManage.transformFlag = false;
            //显示吸附辅助线
            if (Struct.structManage.assemblyFlag == 1) {
                //射线法选中物体
                var raycaster = new THREE.Raycaster();
                var projector = new THREE.Projector();
                var directionVector = new THREE.Vector3(((event.clientX - Struct.container.getBoundingClientRect().left) / Struct.container.width ) * 2 - 1,
                        -((event.clientY - Struct.container.getBoundingClientRect().top) / Struct.container.height ) * 2 + 1, 1);
                projector.unprojectVector(directionVector, Struct.camera);
                raycaster.set(Struct.camera.position, directionVector.sub(Struct.camera.position).normalize());
                var intersects = raycaster.intersectObjects(Struct.scene.children, true);
                var point = null;
                if (intersects.length != 0)
                    point = Struct.structManage.mousePoint(intersects);
                if (point != null) {
                    Struct.structManage.symbleline.geometry.vertices[1] = point;
                    Struct.structManage.symbleend.position = point;
                }
                else {
                    Struct.structManage.symbleline.geometry.vertices[1] = Struct.structManage.symbleline.geometry.vertices[0].clone();
                    Struct.structManage.symbleend.position = Struct.structManage.symblebegin.position;
                }
                Struct.structManage.symbleline.geometry.verticesNeedUpdate = true;
                Struct.render();
            }
            //控制选择框
            if (Struct.sceneManage.boxFlag == 1) {
                Struct.sceneManage.selectBox.style.width = (event.clientX - Struct.sceneManage.startPoint.x) + "px";
                Struct.sceneManage.selectBox.style.height = (event.clientY - Struct.sceneManage.startPoint.y) + "px";
            }
        };
    },

    //添加变换控制器
    addTransformControl: function () {
        this.transformControl = new THREE.TransformControls(Struct.camera, Struct.container);
        this.transformControl.addEventListener('change', function () {
            Struct.structManage.transformFlag = true;
            //防止越界操作
            var safeTest = Struct.structManage.searchModelByID(Struct.windowManage.useID).object;
            if (safeTest.position.x > 1000) {
                safeTest.position.x = 1000;
                Struct.structManage.transformControl.attach(safeTest);
            }
            if (safeTest.position.y > 1000) {
                safeTest.position.y = 1000;
                Struct.structManage.transformControl.attach(safeTest);
            }
            if (safeTest.position.z > 1000) {
                safeTest.position.z = 1000;
                Struct.structManage.transformControl.attach(safeTest);
            }
            if (safeTest.position.x < -1000) {
                safeTest.position.x = -1000;
                Struct.structManage.transformControl.attach(safeTest);
            }
            if (safeTest.position.y < -1000) {
                safeTest.position.y = -1000;
                Struct.structManage.transformControl.attach(safeTest);
            }
            if (safeTest.position.z < -1000) {
                safeTest.position.z = -1000;
                Struct.structManage.transformControl.attach(safeTest);
            }
            if (safeTest.scale.x <= 0) safeTest.scale.x = 0.1;
            if (safeTest.scale.y <= 0) safeTest.scale.y = 0.1;
            if (safeTest.scale.z <= 0) safeTest.scale.z = 0.1;
            Struct.renderer.render(Struct.scene, Struct.camera);
        });
        Struct.scene.add(this.transformControl);
    },

    //隐藏控制轴
    hideTransformControl: function () {
        this.transformControl.gizmo["translate"].hide();
        this.transformControl.gizmo["rotate"].hide();
        this.transformControl.gizmo["scale"].hide();
        Struct.render();
    },

    //转为位移控制状态
    translateControl: function () {
        this.transformControl.setMode('translate');
        Struct.render();
    },

    //转为旋转控制状态
    rotateControl: function () {
        this.transformControl.setMode('rotate');
        Struct.render();
    },

    //转为缩放控制状态
    scaleControl: function () {
        this.transformControl.setMode('scale');
        Struct.render();
    },

    //X轴对齐
    alignmentX: function () {
        //计算X坐标的平均值，按此值对齐
        var ty = 0;
        var tz = 0;
        var number = 0;
        if (Struct.structures.length <= 1) return;
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                ty += Struct.structures[i].object.position.y;
                tz += Struct.structures[i].object.position.z;
                number++;
            }
        }
        if (number <= 1) return;
        ty /= number;
        tz /= number;
        TWEEN.removeAll();
        for (var i = 0; i < Struct.structures.length; i++) {
            var model = Struct.structures[i];
            if (model.selectFlag) {
                //动画效果
                Struct.transform(model.object, new THREE.Vector3(model.object.position.x, ty, tz), model.object.rotation, 500);
            }
        }
        Struct.render();
        //通知协同
        setTimeout(function () {
            for (var i = 0; i < Struct.structures.length; i++)
                if (Struct.structures[i].selectFlag)
                    Struct.cooperationManage.sendInfo("Modify", Struct.structures[i].id);
        }, "1000");
    },

    //Y轴对齐
    alignmentY: function () {
        //计算Y坐标的平均值，按此值对齐
        var tx = 0;
        var tz = 0;
        var number = 0;
        if (Struct.structures.length <= 1) return;
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                tx += Struct.structures[i].object.position.x;
                tz += Struct.structures[i].object.position.z;
                number++;
            }
        }
        if (number <= 1) return;
        tx /= number;
        tz /= number;
        TWEEN.removeAll();
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                //动画效果
                Struct.transform(Struct.structures[i].object, new THREE.Vector3(tx, Struct.structures[i].object.position.y, tz), Struct.structures[i].object.rotation, 500);
            }
        }
        Struct.render();
        //通知协同
        setTimeout(function () {
            for (var i = 0; i < Struct.structures.length; i++)
                if (Struct.structures[i].selectFlag)
                    Struct.cooperationManage.sendInfo("Modify", Struct.structures[i].id);
        }, "1000");
    },

    //Z轴对齐
    alignmentZ: function () {
        //计算Z坐标的平均值，按此值对齐
        var tx = 0;
        var ty = 0;
        var number = 0;
        if (Struct.structures.length <= 1) return;
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                tx += Struct.structures[i].object.position.x;
                ty += Struct.structures[i].object.position.y;
                number++;
            }
        }
        if (number <= 1) return;
        tx /= number;
        ty /= number;
        TWEEN.removeAll();
        for (var i = 0; i < Struct.structures.length; i++) {
            var model = Struct.structures[i];
            if (model.selectFlag) {
                //动画效果
                Struct.transform(model.object, new THREE.Vector3(tx, ty, model.object.position.z), model.object.rotation, 500);
            }
        }
        Struct.render();
        //通知协同
        setTimeout(function () {
            for (var i = 0; i < Struct.structures.length; i++)
                if (Struct.structures[i].selectFlag)
                    Struct.cooperationManage.sendInfo("Modify", Struct.structures[i].id);
        }, "1000");
    },

    //组合操作
    combinaOperate: function () {
        var idList = new Array();
        //先解散已组合结构，化整为零
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag && Struct.structures[i].combinaFlag) {
                idList[idList.length] = Struct.structures[i].id;
            }
        }
        for (var i = 0; i < idList.length; i++) {
            this.breakByID(Struct.structures[this.searchIndexByID(idList[i])].id);
            Struct.cooperationManage.sendInfo("Combine", idList[i], false);
        }
        idList = new Array();
        //重新统计需要组合的组件
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                idList[idList.length] = Struct.structures[i].id;
            }
        }
        this.combineByID(idList);
        Struct.cooperationManage.sendInfo("Combine", Struct.structures[Struct.structures.length - 1].id, idList);
    },

    //使用指定id物体组合
    combineByID: function (idList, id) {
        var model = new Structure();
        Struct.structures.push(model);
        if (id != null) model.id = id;
        model.initByCombina(idList);
        this.deleteByID(idList, false);
        if (id == null) Struct.structures[Struct.structures.length - 1].select();
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //分离操作
    breakOperate: function () {
        //一个都不选或者选中多个都不行
        var id = null;
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                if (id != null) {
                    Ext.MessageBox.show({title: Language.hint, msg: Language.msgonlychoose, buttons: Ext.Msg.OK});
                    return;
                }
                else
                    id = Struct.structures[i].id;
            }
        }
        if (id == null) {
            Ext.MessageBox.show({title: Language.hint, msg: Language.msgchooseone, buttons: Ext.Msg.OK});
            return;
        }
        //选中的不是组合体也不行
        var no = Struct.structManage.searchIndexByID(id);
        if (!Struct.structures[no].combinaFlag) {
            Ext.MessageBox.show({title: Language.hint, msg: Language.msgchooseonecombine, buttons: Ext.Msg.OK});
            return;
        }
        Struct.cooperationManage.sendInfo("Combine", id);
        this.breakByID(id);
    },

    //拆解指定id的组合体
    breakByID: function (id) {
        var no = this.searchIndexByID(id);
        var idList = Struct.structures[no].idList;
        //重新建立子组件
        for (var i = 0; i < Struct.structures[no].object.children.length; i++) {
            var model = new Structure();
            Struct.structures.push(model);
            model.id = idList[i];
            model.object.add(Struct.structures[no].object.children[i].children[0]);
            //设置每个分解后组件的三维信息
            model.object.applyMatrix(Struct.structures[no].object.children[i].matrixWorld);
            Struct.scene.add(model.object);
            model.pathobj = Struct.structures[no].pathobj[i];
            model.pathmtl = Struct.structures[no].pathmtl[i];

            model.boxHelper = new THREE.BoxHelper(
                model.object.children[0].children[model.object.children[0].children.length - 1]);
            //附加数据
            model.data.name = Struct.structures[no].data.nameList[i];
            model.data.quality = Struct.structures[no].data.qualityList[i];
            model.data.consumption = Struct.structures[no].data.consumptionList[i];
            model.data.initSize = Struct.structures[no].data.initSizeList[i];
            model.select();
            Struct.render();
        }
        //删除组合体
        Struct.structures[no].delete();
        Struct.structures.splice(no, 1);
        Struct.render();
        Struct.windowManage.updateLW();
        return idList;
    },

    //吸附准备
    assemblyReady: function () {
        document.body.style.cursor = 'crosshair';
        this.assemblyFlag = 0;
        this.allUnselect();
        Struct.scene.remove(Struct.structManage.transformControl);
    },

    //实施吸附操作
    assemblyAction: function (intersect) {
        //向量绕ZYX三轴旋转
        var rotateByZYX = function (a, b) {
            a.applyMatrix4(Matrixs.axisZRotationMatrix(b.z));
            a.applyMatrix4(Matrixs.axisYRotationMatrix(b.y));
            a.applyMatrix4(Matrixs.axisXRotationMatrix(b.x));
            a.normalize();
        }
        //吸附的第二阶段
        if (this.assemblyFlag == 1) {
            this.assemblyObjectA.Scale = new THREE.Vector3(Struct.structures[this.assemblyObjectA.No].object.scale.x,
                Struct.structures[this.assemblyObjectA.No].object.scale.y, Struct.structures[this.assemblyObjectA.No].object.scale.z);
            //获取选中面的法向量及击中位置
            this.assemblyObjectA.Position = new THREE.Vector3(intersect.point.x, intersect.point.y, intersect.point.z);
            this.assemblyObjectA.Normal = new THREE.Vector3(intersect.face.normal.x, intersect.face.normal.y, intersect.face.normal.z);
            if (Struct.structures[this.assemblyObjectA.No].combinaFlag) {
                rotateByZYX(this.assemblyObjectA.Normal, Struct.structures[this.assemblyObjectA.No].object.children[this.assemblyObjectA.cNo].rotation);
            }
            rotateByZYX(this.assemblyObjectA.Normal, Struct.structures[this.assemblyObjectA.No].object.rotation);
            //获得让法向量反向平行的旋转矩阵
            var change = Matrixs.vectorRotation(this.assemblyObjectB.Normal, this.assemblyObjectA.Normal);
            //安全测试，防止吸附故障
            var safeTest = Struct.structures[this.assemblyObjectB.No].object.clone();
            safeTest.applyMatrix(change);
            //恢复成吸附前状态
            var recovery = function (me) {
                Struct.scene.remove(me.symbleline);
                me.symbleline = null;
                Struct.scene.remove(me.symblebegin);
                Struct.scene.remove(me.symbleend);
                Struct.scene.add(Struct.structManage.transformControl);
                me.assemblyFlag = -1;
                document.body.style.cursor = 'default';
            }
            if (isNaN(safeTest.position.x) || isNaN(safeTest.position.y) || isNaN(safeTest.position.z) || this.assemblyObjectA.No == this.assemblyObjectB.No) {
                Ext.MessageBox.show({title: Language.hint, msg: Language.msgerror, buttons: Ext.Msg.OK});
                Struct.cooperationManage.sendInfo("LockControl", Struct.structures[this.assemblyObjectB.No].id, false);
                recovery(this);
                return;
            }
            var lPosition = Struct.structures[this.assemblyObjectB.No].object.position.clone();
            var lRotation = Struct.structures[this.assemblyObjectB.No].object.rotation.clone();
            Struct.structures[this.assemblyObjectB.No].object.applyMatrix(change);
            this.assemblyObjectB.Position.applyMatrix4(change);
            var nPosition = Struct.structures[this.assemblyObjectB.No].object.position.clone();
            var nRotation = Struct.structures[this.assemblyObjectB.No].object.rotation.clone();
            //移动组件完成吸附
            //xyz数据复制
            var dataCopy = function (a, b) {
                a.x = b.x;
                a.y = b.y;
                a.z = b.z;
            }
            dataCopy(Struct.structures[this.assemblyObjectB.No].object.position, lPosition);
            dataCopy(Struct.structures[this.assemblyObjectB.No].object.rotation, lRotation);
            TWEEN.removeAll();
            Struct.transform(Struct.structures[this.assemblyObjectB.No].object,
                new THREE.Vector3(nPosition.x - (this.assemblyObjectB.Position.x - this.assemblyObjectA.Position.x),
                        nPosition.y - (this.assemblyObjectB.Position.y - this.assemblyObjectA.Position.y),
                        nPosition.z - (this.assemblyObjectB.Position.z - this.assemblyObjectA.Position.z)),
                nRotation, 500);
            dataCopy(Struct.structures[this.assemblyObjectB.No].object.scale, this.assemblyObjectB.Scale);
            Struct.render();
            recovery(this);
            setTimeout(function () {
                Struct.cooperationManage.sendInfo("Modify", Struct.structures[Struct.structManage.assemblyObjectB.No].id);
//                Struct.structures[Struct.structManage.assemblyObjectA.No].select();
                Struct.structures[Struct.structManage.assemblyObjectB.No].select();
//                Struct.structManage.combinaOperate();
                Struct.render();
            }, "1000");
        } else if (this.assemblyFlag == 0) {//吸附的第一阶段
            this.assemblyObjectB.Scale = new THREE.Vector3(Struct.structures[this.assemblyObjectB.No].object.scale.x,
                Struct.structures[this.assemblyObjectB.No].object.scale.y, Struct.structures[this.assemblyObjectB.No].object.scale.z);
            //获取选中面的法向量及击中位置
            this.assemblyObjectB.Position = new THREE.Vector3(intersect.point.x, intersect.point.y, intersect.point.z);
            this.assemblyObjectB.Normal = new THREE.Vector3(intersect.face.normal.x, intersect.face.normal.y, intersect.face.normal.z);
            if (Struct.structures[this.assemblyObjectB.No].combinaFlag) {
                rotateByZYX(this.assemblyObjectB.Normal, Struct.structures[this.assemblyObjectB.No].object.children[this.assemblyObjectB.cNo].rotation);
            }
            rotateByZYX(this.assemblyObjectB.Normal, Struct.structures[this.assemblyObjectB.No].object.rotation);
            //反向
            this.assemblyObjectB.Normal.x *= -1;
            this.assemblyObjectB.Normal.y *= -1;
            this.assemblyObjectB.Normal.z *= -1;
            this.assemblyFlag = 1;
            //添加指示线
            var geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3(intersect.point.x, intersect.point.y, intersect.point.z),
                new THREE.Vector3(intersect.point.x, intersect.point.y, intersect.point.z)
            );
            this.symbleline = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xffffff}));
            Struct.scene.add(this.symbleline);
            if (this.symblebegin == null)
                this.symblebegin = new THREE.Mesh(new THREE.SphereGeometry(5, 5, 5), new THREE.MeshBasicMaterial({color: 0xffffff}));
            this.symblebegin.position = intersect.point;
            Struct.scene.add(this.symblebegin);
            if (this.symbleend == null)
                this.symbleend = new THREE.Mesh(new THREE.SphereGeometry(5, 5, 5), new THREE.MeshBasicMaterial({color: 0xffffff}));
            this.symbleend.position = intersect.point;
            Struct.scene.add(this.symbleend);
            Struct.cooperationManage.sendInfo("LockControl", Struct.structures[this.assemblyObjectB.No].id, true);
        }
    },

    //复制
    structCopy: function () {
        //xyz数据复制
        var dataCopy = function (a, b) {
            a.x = b.x;
            a.y = b.y;
            a.z = b.z;
        }
        TWEEN.removeAll();
        //将选中的组件复制
        for (var i = 0; i < Struct.structures.length; i++) {
            var temp = Struct.structures[i];
            if (!temp.selectFlag) continue;
            if (!temp.combinaFlag) {
                var model = new Structure();
                Struct.structures.push(model);
                //生成复制体
                model.initByOBJMTL(temp.pathobj, temp.pathmtl,
                    new THREE.Vector3(temp.object.position.x,
                        temp.object.position.y,
                        temp.object.position.z));
                Struct.render();
                //复制数据
                dataCopy(model.object.rotation, temp.object.rotation);
                dataCopy(model.object.scale, temp.object.scale);
                model.data.name = temp.data.name + '(2)';
                model.data.quality = temp.data.quality;
                model.data.consumption = temp.data.consumption;
                model.data.initSize = temp.data.initSize;
                model.object.position.addVectors(model.object.position, new THREE.Vector3(50, 50, 50));
                Struct.cooperationManage.sendInfo("Addition", model.id);
                model.object.position.subVectors(model.object.position, new THREE.Vector3(50, 50, 50));
                //动画效果
                Struct.transform(model.object,
                    new THREE.Vector3(model.object.position.x + 50, model.object.position.y + 50, model.object.position.z + 50),
                    model.object.rotation, 300);
            }
            else {
                //ToDo 当data太大时websocket会崩溃，要做分段发送
                if (temp.idList.length > 6) {
                    Ext.MessageBox.show({title: Language.hint, msg: "开发者：目前版本不支持过于复杂的组合体进行复制，非常抱歉", icon: Ext.Msg.ERROR, buttons: Ext.Msg.OK});
                    continue;
                }
                Struct.structManage.magicnumber = i;
                //计算复制体的信息
                var dataInfo = [];
                for (var j = 0; j < temp.idList.length; j++) {
                    dataInfo[dataInfo.length] = {
                        id: CreateID.createStructID(),
                        pathobj: temp.pathobj[j],
                        pathmtl: temp.pathmtl[j],
                        position: {
                            x: temp.object.position.x + temp.object.children[j].position.x,
                            y: temp.object.position.y + temp.object.children[j].position.y,
                            z: temp.object.position.z + temp.object.children[j].position.z
                        },
                        rotation: {
                            x: temp.object.children[j].rotation.x,
                            y: temp.object.children[j].rotation.y,
                            z: temp.object.children[j].rotation.z
                        },
                        scale: {
                            x: temp.object.children[j].scale.x * temp.object.scale.x,
                            y: temp.object.children[j].scale.y * temp.object.scale.y,
                            z: temp.object.children[j].scale.z * temp.object.scale.z
                        },
                        data: temp.data
                    }
                }
                //生成复制体，其中由于等待模型加载完成而使用回调
                Struct.structManage.callBackCount = dataInfo.length;
                for (var j = 0; j < dataInfo.length; j++) {
                    Struct.structManage.idLists[j] = dataInfo[j].id;
                    var model = new Structure();
                    Struct.structures.push(model);
                    model.initBySynchronous(dataInfo[j].id, dataInfo[j].position, dataInfo[j].rotation, dataInfo[j].scale, dataInfo[j], function () {
                        Struct.structManage.callBackCount--;
                        if (Struct.structManage.callBackCount == 0) {
                            Struct.structManage.combineByID(Struct.structManage.idLists, CreateID.createStructID());
                            Struct.structManage.idLists = [];
                            //复制体的三维信息
                            var t = Struct.structures[Struct.structures.length - 1];
                            dataCopy(t.object.position, Struct.structures[Struct.structManage.magicnumber].object.position);
                            dataCopy(t.object.rotation, Struct.structures[Struct.structManage.magicnumber].object.rotation);
                            dataCopy(t.object.scale, Struct.structures[Struct.structManage.magicnumber].object.scale);
                            //协同添加组合体
                            var dataInfo = [];
                            for (var j = 0; j < t.idList.length; j++) {
                                dataInfo[dataInfo.length] = {
                                    id: t.idList[j],
                                    pathobj: t.pathobj[j],
                                    pathmtl: t.pathmtl[j],
                                    position: {
                                        x: t.object.position.x + t.object.children[j].position.x + 50,
                                        y: t.object.position.y + t.object.children[j].position.y + 50,
                                        z: t.object.position.z + t.object.children[j].position.z + 50
                                    },
                                    rotation: {
                                        x: t.object.children[j].rotation.x,
                                        y: t.object.children[j].rotation.y,
                                        z: t.object.children[j].rotation.z
                                    },
                                    scale: {
                                        x: t.object.children[j].scale.x * t.object.scale.x,
                                        y: t.object.children[j].scale.y * t.object.scale.y,
                                        z: t.object.children[j].scale.z * t.object.scale.z
                                    },
                                    data: t.data
                                }
                            }
                            Struct.cooperationManage.sendInfo("AddandCmb", t.id, dataInfo);
                            Struct.cooperationManage.sendInfo("Modify", t.id);
                            //动画效果
                            Struct.transform(t.object,
                                new THREE.Vector3(t.object.position.x + 50, t.object.position.y + 50, t.object.position.z + 50),
                                t.object.rotation, 300);
                        }
                    });
                }
            }
        }
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //删除选中的物体
    selectDelete: function () {
        //先执行删除动画
        TWEEN.removeAll();
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                Struct.transform(Struct.structures[i].object,
                    new THREE.Vector3(0, 10000, 0),
                    new THREE.Vector3(0, 0, 0), 300);
            }
        }
        //发送协同删除消息
        setTimeout(function () {
            for (var i = 0; i < Struct.structures.length; i++) {
                if (Struct.structures[i].selectFlag) {
                    var id = Struct.structures[i].id;
                    Struct.structures[i].delete();
                    Struct.structures.splice(i, 1);
                    Struct.cooperationManage.sendInfo("Delete", id);
                    i--;
                }
            }
            Struct.render();
            Struct.windowManage.changeData(null, null, null, null);
            Struct.windowManage.updateLW();
        }, "700");
    },

    //删除指定id列表的物体
    deleteByID: function (id, flag) {
        for (var i = 0; i < id.length; i++) {
            var no = Struct.structManage.searchIndexByID(id[i]);
            Struct.structures[no].delete();
            Struct.structures.splice(no, 1);
            if (flag == null) Struct.cooperationManage.sendInfo("Delete", id[i]);
        }
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //全部选择操作
    allSelect: function () {
        for (var i = 0; i < Struct.structures.length; i++) {
            if (!Struct.structures[i].lockFlag && !Struct.structures[i].selectFlag) {
                Struct.structures[i].select();
                Struct.cooperationManage.sendInfo("LockControl", Struct.structures[i].id, true);
            }
        }
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //全部取消选择操作
    allUnselect: function (flag) {
        if (Struct.structures.length == 0) return null;
        var idList = [];
        var total = Struct.structures.length;
        for (var i = 0; i < total; i++) {
            if (Struct.structures[i].selectFlag) {
                idList[idList.length] = Struct.structures[i].id;
                Struct.structures[i].unselect();
                if (flag == null) {
                    Struct.cooperationManage.sendInfo("LockControl", Struct.structures[i].id, false);
                }
            }
        }
        Struct.render();
        Struct.windowManage.updateLW();
        return idList;
    },

    //将指定ID取消选中
    unselectById: function (idList) {
        for (var i = 0; i < idList.length; i++)
            Struct.structures[this.searchIndexByID(idList[i])].unselect();
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //将指定ID锁定
    lockById: function (idList) {
        for (var i = 0; i < idList.length; i++)
            Struct.structures[this.searchIndexByID(idList[i])].lock();
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //全部取消锁定操作
    allUnlock: function () {
        if (Struct.structures.length == 0) return null;
        var total = Struct.structures.length;
        for (var i = 0; i < total; i++) {
            if (Struct.structures[i].lockFlag) {
                Struct.structures[i].unlock();
            }
        }
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //查找指定id的组件返回队列索引
    searchIndexByID: function (id) {
        for (var i = 0; i < Struct.structures.length; i++)
            if (Struct.structures[i].id == id)
                return i;
        return 0;
    },

    //查找指定id的组件返回组件
    searchModelByID: function (id) {
        for (var i = 0; i < Struct.structures.length; i++)
            if (Struct.structures[i].id == id)
                return Struct.structures[i];
        return null;
    },

    //刷新显示
    refresh: function () {
        for (var i = 0; i < Struct.structures.length; i++) {
            Struct.structures[i].refresh();
        }
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //鼠标指示的物体击中点
    mousePoint: function (intersects) {
        //遍历整个射线击穿的对象
        var flag = false;
        for (var i = 0; i < intersects.length; i++) {
            if (flag) break;
            var intersectID = intersects[i].object.id;
            if (intersectID == null) continue;
            //搜索当前击中的对象是不是卫星结构对象
            for (var j = 0; j < Struct.structures.length; j++) {
                if (flag) break;
                var temp = Struct.structures[j];
                if (temp.lockFlag) continue;
                //扫描所有可能的id
                if (!temp.combinaFlag) {
                    if (temp.object.children[0].id == intersectID)
                        flag = true;
                    else
                        for (var k = 0; k < temp.object.children[0].children.length; k++)
                            if (temp.object.children[0].children[k].id == intersectID) {
                                flag = true;
                                break;
                            }
                } else {
                    for (var l = 0; l < temp.object.children.length; l++) {
                        if (temp.object.children[l].children[0].id == intersectID) {
                            flag = true;
                            break;
                        } else
                            for (var k = 0; k < temp.object.children[l].children[0].children.length; k++)
                                if (temp.object.children[l].children[0].children[k].id == intersectID) {
                                    flag = true;
                                    break;
                                }
                        if (flag) break;
                    }
                }
                //找到匹配的id
                if (flag) {
                    return intersects[i].point;
                }
            }
        }
        return null;
    },

    //单击选取函数
    clickSelect: function (intersects) {
        if (!(intersects.length > 0 && Struct.structures.length >= 1)) return;
        //遍历整个射线击穿的对象
        var flag = false;
        //用于记录组合体中的子组件
        var childNo = 0;
        for (var i = 0; i < intersects.length; i++) {
            if (flag) break;
            var intersectID = intersects[i].object.id;
            if (intersectID == null) continue;
            //搜索当前击中的对象是不是卫星结构对象
            for (var j = 0; j < Struct.structures.length; j++) {
                if (flag) break;
                var temp = Struct.structures[j];
                if (temp.lockFlag) continue;
                //扫描所有可能的id
                if (!temp.combinaFlag) {
                    if (temp.object.children[0].id == intersectID)
                        flag = true;
                    else
                        for (var k = 0; k < temp.object.children[0].children.length; k++)
                            if (temp.object.children[0].children[k].id == intersectID) {
                                flag = true;
                                break;
                            }
                } else {
                    for (var l = 0; l < temp.object.children.length; l++) {
                        if (temp.object.children[l].children[0].id == intersectID) {
                            flag = true;
                            childNo = l;
                            break;
                        } else
                            for (var k = 0; k < temp.object.children[l].children[0].children.length; k++)
                                if (temp.object.children[l].children[0].children[k].id == intersectID) {
                                    flag = true;
                                    childNo = l;
                                    break;
                                }
                        if (flag) break;
                    }
                }
                //找到匹配的id
                if (flag) {
                    //先检测吸附操作
                    if (this.assemblyFlag == 0) {
                        this.assemblyObjectB.No = j;
                        this.assemblyObjectB.cNo = childNo;
                        this.assemblyAction(intersects[i]);
//                        Ext.MessageBox.show({title: "操作提示", msg: "（2/2）请单击被吸附物体某一面", buttons: Ext.Msg.OK});
                    } else if (this.assemblyFlag == 1) {
                        this.assemblyObjectA.No = j;
                        this.assemblyObjectA.cNo = childNo;
                        this.assemblyAction(intersects[i]);
                    } else {
                        //组合体再次单击可选中其子结构
//                        if (Struct.structures[j].combinaFlag && Struct.structures[j].selectFlag){
//                            if (!Struct.structures[j].childSelectFlag) {
//                                for (var i = 0; i < Struct.structures.length; i++) {
//                                    if (i == j) continue;
//                                    if (Struct.structures[i].selectFlag)
//                                        Struct.structures[i].unselect();
//                                }
//                                this.transformControl.attach(Struct.structures[j].object.children[childNo]);
//                                for (i = 0; i < Struct.structures[j].object.children.length; i++) {
//                                    if (i == childNo) continue;
//                                    Struct.scene.remove(Struct.structures[j].boxHelper[i]);
//                                }
//                                Struct.structures[j].childSelectFlag = true;
//                            }else{
//                                Struct.structures[j].unselect();
//                                Struct.structures[j].select();
//                                Struct.structures[j].childSelectFlag = false;
//                            }
//                        }else
                        {
                            if (temp.combinaFlag && !temp.selectFlag)
                                temp.childSelectFlag = false;
                            if (!Struct.structManage.ctrlFlag) this.allUnselect();
                            temp.select();
                            Struct.cooperationManage.sendInfo("LockControl", temp.id, true);
                            Struct.windowManage.updateLW();
                        }
                    }
                    flag = true;
                    Struct.render();
                    break;
                }
            }
        }
    },

    //获取锁定列表信息
    getLockList: function () {
        var idlist = [];
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].lockFlag || Struct.structures[i].selectFlag)
                idlist[idlist.length] = Struct.structures[i].id;
        }
        return idlist.join();
    }
}