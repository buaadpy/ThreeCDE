/**
 * 修改 by 杜鹏宇 on 2014/07/01
 * 基础模型库面板
 */

Ext.define('DesignApp.view.BasicComponentGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.basiccomponentgridpanel',

    requires: [
        'Ext.grid.column.Column'
    ],

    height: 500,
    width: 130,
    title: Language.basicModel,
    scroll: 'vertical',
    store: 'BasicLoadStore',
    hideHeaders:true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    hideHeaders:true,
                    width:120,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return '<img src="resources/images/basicLoad/'+value+'.png">';
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});