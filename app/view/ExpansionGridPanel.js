/**
 * 修改 by 杜鹏宇 on 2015/07/01
 * 拓展包库面板
 */

Ext.define('DesignApp.view.ExpansionGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.expansiongridpanel',

    requires: [
        'Ext.grid.column.Column'
    ],

    height: 500,
    width: 130,
    title: Language.expansion,
    scroll: 'vertical',
    store: 'ExpansionLoadStore',
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
                        return '<img src="resources/images/expansionLoad/'+value+'.png">';
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});