/******************************************
 * 类名：面板管理
 * 作用：管理各种面板的控制
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var WindowManage = function () {
    this.controlWindow = null;//属性板
    this.useCounter = 0;//属性版关联结构数
    this.useID = null;//当前属性版指示的结构id
    this.changeFlag = false;//防止属性版重复修正开关

    this.listWindow = null;//列表板
}
WindowManage.prototype = {
    //重置面板管理器
    resetManage: function (parent) {
        this.controlWindow = Ext.create(parent + '.AdvancedControlWindow');
        this.controlWindow.hide();
        this.listWindow = Ext.create(parent + '.StructListWindow');
        this.listWindow.hide();
        this.useCounter = 0;
        this.useID = null;
    },

    //打开属性板
    openControlWindow: function (x, y) {
        if (this.controlWindow.isVisible()) {
            this.controlWindow.hide();
        } else {
            this.controlWindow.setPosition(x - this.controlWindow.width, y);
            this.controlWindow.show();
        }
    },

    //更新属性板
    updateCW: function (flag, id, data, position, rotation, boxsize) {
        //flag为真表示选中组件增加，反之减少
        if (flag) {
            this.useCounter++;
            this.useID = id;
        } else {
            this.useCounter--;
        }
        //仅在选中一个组件时显示数据
        if (this.useCounter == 1)
            this.changeData(data, position, rotation, boxsize);
        else
            this.changeData(null, null, null, null);
    },

    //改变属性面板数据
    changeData: function (data, position, rotation, size) {
        //只在选中一个结构的情况下显示数据
        if (this.useCounter == 1) {
            if (data == null || position == null || rotation == null || size == null) return;
            this.setBoxValue('structName', data.name);
            this.setBoxValue('structQuality', data.quality);
            this.setBoxValue('powerConsumption', data.consumption);
            this.setBoxValue('structPositionX', position.x);
            this.setBoxValue('structPositionY', position.y);
            this.setBoxValue('structPositionZ', position.z);
            this.setBoxValue('structRotationX', 180 * rotation.x / Math.PI);
            this.setBoxValue('structRotationY', 180 * rotation.y / Math.PI);
            this.setBoxValue('structRotationZ', 180 * rotation.z / Math.PI);
            this.setBoxValue('structSizeX', size.x / 100);
            this.setBoxValue('structSizeY', size.y / 100);
            this.setBoxValue('structSizeZ', size.z / 100);
        } else {
            this.setBoxValue('structName', "");
            this.setBoxValue('structQuality', "");
            this.setBoxValue('powerConsumption', "");
            this.setBoxValue('structPositionX', "");
            this.setBoxValue('structPositionY', "");
            this.setBoxValue('structPositionZ', "");
            this.setBoxValue('structRotationX', "");
            this.setBoxValue('structRotationY', "");
            this.setBoxValue('structRotationZ', "");
            this.setBoxValue('structSizeX', "");
            this.setBoxValue('structSizeY', "");
            this.setBoxValue('structSizeZ', "");
        }
    },

    //输入合法性检查
    inputCheck: function (data, max, min) {
        if (data == '-') return data;
        if (isNaN(data)) return 0;
        if (data > max) return max;
        if (data < min) return min;
        return data;
    },

    //设置输入框的值
    setBoxValue: function (name, value) {
        this.changeFlag = true;
        this.controlWindow.queryById(name).setValue(value);
    },

    //属性面板响应名字改变
    structNameChange: function () {
        if (this.changeFlag)
            this.changeFlag = false;
        else {
            if (this.useCounter != 1) return;
            var model = Struct.structManage.searchModelByID(this.useID);
            //纠正错误输入
            var data = this.controlWindow.queryById('structName').getValue();
            if (data.length > 32) {
                data = data.substr(0, 32);
                this.setBoxValue('structName', data);
            }
            model.data.name = data;
            Struct.cooperationManage.sendInfo("Modify", model.id);
            this.updateLW();
        }
    },

    //属性面板响应质量改变
    structQualityChange: function () {
        if (this.changeFlag)
            this.changeFlag = false;
        else {
            if (this.useCounter != 1) return;
            var model = Struct.structManage.searchModelByID(this.useID);
            //纠正错误输入
            var data = this.inputCheck(this.controlWindow.queryById('structQuality').getValue(), 99999, 0);
            if (data != '-') {
                this.setBoxValue('structQuality', data);
                model.data.quality = parseFloat(data);
                Struct.cooperationManage.sendInfo("Modify", model.id);
            }
        }
    },

    //属性面板响应功率改变
    powerConsumptionChange: function () {
        if (this.changeFlag)
            this.changeFlag = false;
        else {
            if (this.useCounter != 1) return;
            var model = Struct.structManage.searchModelByID(this.useID);
            //纠正错误输入
            var data = this.inputCheck(this.controlWindow.queryById('powerConsumption').getValue(), 99999, 0);
            if (data != '-') {
                this.setBoxValue('powerConsumption', data);
                model.data.consumption = parseFloat(data);
                Struct.cooperationManage.sendInfo("Modify", model.id);
            }
        }
    },

    //属性面板响应位置改变
    positionChange: function () {
        if (this.changeFlag)
            this.changeFlag = false;
        else {
            if (this.useCounter != 1) return;
            var model = Struct.structManage.searchModelByID(this.useID);
            //纠正错误输入
            var data = {
                x: this.inputCheck(this.controlWindow.queryById('structPositionX').getValue(), 1000, -1000),
                y: this.inputCheck(this.controlWindow.queryById('structPositionY').getValue(), 1000, -1000),
                z: this.inputCheck(this.controlWindow.queryById('structPositionZ').getValue(), 1000, -1000)
            }
            if (data.x != '-') this.setBoxValue('structPositionX', data.x);
            if (data.y != '-') this.setBoxValue('structPositionY', data.y);
            if (data.z != '-') this.setBoxValue('structPositionZ', data.z);
            if (data.x != '-' && data.y != '-' && data.z != '-') {
                model.refresh(new THREE.Vector3(data.x, data.y, data.z), null, null);
                Struct.render();
                Struct.cooperationManage.sendInfo("Modify", model.id);
            }
        }
    },

    //属性面板响应角度改变
    rotationChange: function () {
        if (this.changeFlag)
            this.changeFlag = false;
        else {
            if (this.useCounter != 1) return;
            var model = Struct.structManage.searchModelByID(this.useID);
            //纠正错误输入
            var data = {
                x: this.inputCheck(this.controlWindow.queryById('structRotationX').getValue(), 360, -360),
                y: this.inputCheck(this.controlWindow.queryById('structRotationY').getValue(), 360, -360),
                z: this.inputCheck(this.controlWindow.queryById('structRotationZ').getValue(), 360, -360)
            }
            if (data.x != '-') this.setBoxValue('structRotationX', data.x);
            if (data.y != '-') this.setBoxValue('structRotationY', data.y);
            if (data.z != '-') this.setBoxValue('structRotationZ', data.z);
            if (data.x != '-' && data.y != '-' && data.z != '-') {
                model.refresh(null, new THREE.Vector3(data.x * Math.PI / 180, data.y * Math.PI / 180, data.z * Math.PI / 180), null);
                Struct.render();
                Struct.cooperationManage.sendInfo("Modify", model.id);
            }
        }
    },

    //属性面板响应尺寸改变
    sizeChange: function () {
        if (this.changeFlag)
            this.changeFlag = false;
        else {
            if (this.useCounter != 1) return;
            var model = Struct.structManage.searchModelByID(this.useID);
            if (model.combinaFlag) {
                this.setBoxValue('structSizeX', "");
                this.setBoxValue('structSizeY', "");
                this.setBoxValue('structSizeZ', "");
                return;
            }
            var initSize = model.data.initSize;
            //纠正错误输入
            var data = {
                x: this.inputCheck(this.controlWindow.queryById('structSizeX').getValue(), 20, 0.01),
                y: this.inputCheck(this.controlWindow.queryById('structSizeY').getValue(), 20, 0.01),
                z: this.inputCheck(this.controlWindow.queryById('structSizeZ').getValue(), 20, 0.01)
            };
            if (data.x != '-') this.setBoxValue('structSizeX', data.x);
            if (data.y != '-') this.setBoxValue('structSizeY', data.y);
            if (data.z != '-') this.setBoxValue('structSizeZ', data.z);
            if (data.x != '-' && data.y != '-' && data.z != '-') {
                model.refresh(
                    null, null,
                    //包络尺寸转化为缩放比例
                    new THREE.Vector3(data.x * 100 / initSize.x, data.y * 100 / initSize.y, data.z * 100 / initSize.z)
                );
                Struct.render();
                Struct.cooperationManage.sendInfo("Modify", model.id);
            }
        }
    },

    //打开列表板
    openListWindow: function (x, y) {
        if (this.listWindow.isVisible()) {
            this.listWindow.hide();
        } else {
            this.updateLW();
            this.listWindow.setPosition(0, y);
            this.listWindow.show();
        }
    },

    //更新列表板
    updateLW: function () {
        this.listWindow.removeAll(true);
        var array = [];
        if (Struct.structures.length == 0) return;
        for (var i = 0; i < Struct.structures.length; i++) {
            //为每个组件添加一个checkbox
            array[array.length] = {
                boxLabel: Struct.structures[i].data.name,
                inputValue: i,
                checked: Struct.structures[i].selectFlag,
                itemId: Struct.structures[i].id % 10000,
                columnWidth: 0.7,
                disabled: Struct.structures[i].lockFlag,
                listeners: {
                    change: function () {
                        if (this.checked) {
                            Struct.structures[this.inputValue].select();
                            Struct.cooperationManage.sendInfo("LockControl", Struct.structures[this.inputValue].id, true);
                        }
                        else {
                            Struct.structures[this.inputValue].unselect();
                            Struct.cooperationManage.sendInfo("LockControl", Struct.structures[this.inputValue].id, false);
                        }
                        Struct.render();
                    }
                },
                xtype: 'checkboxfield'
            }
            //添加控制可见的小眼睛图标
            var icon = 'visibile';
            if (!Struct.structures[i].visibleFlag) icon = 'invisible';
            array[array.length] = {
                xtype: 'button',
                iconCls: icon,
                style: {
                    background: '#1f2833',
                    border: '0'
                },
                inputValue: i,
                listeners: {
                    click: function () {
                        if (this.iconCls == 'visibile') {
                            this.setIconCls('invisible');
                            Struct.structures[this.inputValue].hidden();
                        }
                        else {
                            this.setIconCls('visibile');
                            Struct.structures[this.inputValue].visible();
                        }
                        Struct.render();
                    }
                },
                columnWidth: 0.2
            }
            //添加组合体的子项
            if (Struct.structures[i].combinaFlag) {
                for (var j = 0; j < Struct.structures[i].data.nameList.length; j++)
                    array[array.length] = {
                        html: '----  ' + Struct.structures[i].data.nameList[j],
                        xtype: 'component',
                        margin: '0 0 0 20',
                        columnWidth: 1
                    }
            }
        }
        //填充面板内容
        this.listWindow.add(
            {
                margin: '10, 10, 10, 10',
                xtype: 'fieldset',
                layout: 'column',
                items: array
            }
        );
    }
}