/**
 * 修改 by 杜鹏宇 on 2016/01/22
 * 组件库面板响应，加载组件模型到场景
 */

Ext.define('DesignApp.controller.ModuleController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'basicComponentGridPanel',
            selector: 'basiccomponentgridpanel'
        },
        {
            ref: 'expansiongridPanel',
            selector: 'expansiongridpanel'
        }
    ],

    init: function (application) {
        this.control({
            //基础模型模块
            'basiccomponentgridpanel': {
                itemdblclick: this.basicLoad
            },
            //扩展包模型模块
            'expansiongridpanel': {
                itemdblclick: this.expansionLoad
            }
        });
    },

    //导入模型
    loadModel: function (name, path) {
        var model = new Structure();
        Struct.structures.push(model);
        var startPoint = new THREE.Vector3(-200, 0, -200);
        model.initByOBJMTL(path + name + '.obj',
                path + name + '.mtl', startPoint, null, null,
            function () {
                model.data.name = name;
                Struct.structManage.allUnselect();
                model.select();
                Struct.structManage.refresh();
                Struct.render();
                Struct.windowManage.updateLW();
                Struct.sceneManage.initView();
                Struct.cooperationManage.sendInfo("LockControl", model.id, true);
            });
        Struct.render();
        Struct.cooperationManage.sendInfo("Addition", model.id);
    },

    //基础结构项选择
    basicLoad: function (grid, rowindex, e) {
        record = grid.getSelectionModel().getSelection();
        if (record != 'undefined') {
            this.loadModel(record[0].data.name, 'resources/objmodel/basic/')
        }
    },

    //拓展包结构项选择
    expansionLoad: function (grid, rowindex, e) {
        record = grid.getSelectionModel().getSelection();
        if (record != 'undefined') {
            this.loadModel(record[0].data.name, 'resources/objmodel/expansion/')
        }
    }
});