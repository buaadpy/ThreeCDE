Ext.define('DesignApp.view.DesignViewport', {
    extend: 'Ext.container.Viewport',
    alias:'widget.designviewport',
    //使用requires进行动态加载
    requires: [
        'Ext.tab.Panel',
        'DesignApp.view.ButtonGroupPanel',
        'DesignApp.view.DesignPanel'
    ],

    layout: 'border',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'buttongrouppanel',
                    itemId: 'buttonGroupPanel',
                    region: 'north'
                },
                {
                    xtype:'designpanel',
                    itemId:'DesignPanel',
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }
});