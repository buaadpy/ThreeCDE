/**
 * 修改 by 杜鹏宇 on 2016/01/22
 * 属性面板的响应
 */

Ext.define('DesignApp.controller.AdvancedController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'AdvancedControlWindow',
            selector: 'AdvancedControlWindow'
        }
    ],

    init: function (application) {
        this.control({
            '#structName': {
                change: this.structNameChange
            },
            '#structQuality': {
                change: this.structQualityChange
            },
            '#powerConsumption': {
                change: this.powerConsumptionChange
            },
            '#structPositionX': {
                change: this.positionChange
            },
            '#structPositionY': {
                change: this.positionChange
            },
            '#structPositionZ': {
                change: this.positionChange
            },
            '#structRotationX': {
                change: this.rotationChange
            },
            '#structRotationY': {
                change: this.rotationChange
            },
            '#structRotationZ': {
                change: this.rotationChange
            },
            '#structSizeX': {
                change: this.sizeChange
            },
            '#structSizeY': {
                change: this.sizeChange
            },
            '#structSizeZ': {
                change: this.sizeChange
            }
        });
    },

    //组件名字改变
    structNameChange: function () {
        Struct.windowManage.structNameChange();
    },
    //组件质量改变
    structQualityChange: function () {
        Struct.windowManage.structQualityChange();
    },
    //组件功耗改变
    powerConsumptionChange: function () {
        Struct.windowManage.powerConsumptionChange();
    },
    //修正场景中物体位置
    positionChange: function () {
        Struct.windowManage.positionChange();
    },
    //修正场景中物体转向
    rotationChange: function () {
        Struct.windowManage.rotationChange();
    },
    //修正场景中物体缩放
    sizeChange: function () {
        Struct.windowManage.sizeChange();
    }
});