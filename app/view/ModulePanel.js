/**
 * 修改 by 杜鹏宇 on 2015/01/01
 * 组件面板
 */

Ext.define('DesignApp.view.ModulePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modulepanel',

    requires: [
        'DesignApp.view.BasicComponentGridPanel',
        'DesignApp.view.ExpansionGridPanel',
        'Ext.grid.Panel'
    ],

    width: 130,
    layout: 'accordion',
    collapsible: true,
    resizable:false,
    minWidth:10,
    maxWidth:130,
    animCollapse: true,
    split:true,
    splitter: Ext.define("DesignApp.resizer.Splitter",{override:"Ext.resizer.Splitter",size:3}),
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'basiccomponentgridpanel'
                },
                {
                    xtype:'expansiongridpanel'
                }
            ]
        });

        me.callParent(arguments);
    }
});