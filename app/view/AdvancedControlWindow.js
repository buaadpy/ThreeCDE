/**
 * 修改 by 杜鹏宇 on 2015/07/01
 * 属性控制面板的界面
 */

Ext.define('DesignApp.view.AdvancedControlWindow', {
    alias: 'widget.advancedcontrolwindow',
    extend: 'Ext.window.Window',
    requires: [
        'Ext.panel.Panel',
        'Ext.form.field.Number'
    ],
    height: 500,
    width: 270,
    title: 'Operate Panel',
    closeAction: 'hide',
    resizable: false,
    collapsible: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            bodyPadding: 10,

            items: [{
                xtype: 'fieldset',
                title: Language.information,
                layout:'anchor',
                defaults:{
                    anchor:'100%',
                    labelWidth:120,
                    labelAlign: 'center'
                },
                collapsible:false,
                collapsed: false,
                items:[{
                    xtype: 'textfield',
                    itemId: 'structName',
                    id: 'structName',
                    fieldLabel: Language.sname,
                    value: ''
                },
                {
                    xtype: 'textfield',
                    itemId: 'structQuality',
                    id: 'structQuality',
                    fieldLabel: Language.squality,
                    value: ''
                },
                {
                    xtype: 'textfield',
                    itemId: 'powerConsumption',
                    id: 'powerConsumption',
                    fieldLabel: Language.spower,
                    value: ''
                }
                ]},

                {
                    xtype: 'fieldset',
                    title: Language.sparameters,
                    layout:'anchor',
                    defaults:{
                        anchor:'100%',
                        labelWidth:120,
                        labelAlign: 'center'
                        //labelSeparator: ' '
                    },
                    collapsible:false,
                    collapsed: false,
                    items:[{
                        xtype: 'numberfield',
                        itemId: 'structPositionX',
                        id: 'structPositionX',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structPositionX');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structPositionX');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-1);
                        },
                        fieldLabel: Language.spositionX,
                        value: '',
                        maxValue: 1000,
                        minValue: -1000
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structPositionY',
                        id: 'structPositionY',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structPositionY');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structPositionY');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-1);
                        },
                        fieldLabel: Language.spositionY,
                        value: '',
                        maxValue: 1000,
                        minValue: -1000
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structPositionZ',
                        id: 'structPositionZ',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structPositionZ');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structPositionZ');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-1);
                        },
                        fieldLabel: Language.spositionZ,
                        value: '',
                        maxValue: 1000,
                        minValue: -1000
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structRotationX',
                        id: 'structRotationX',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structRotationX');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structRotationX');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-1);
                        },
                        fieldLabel: Language.srotationX,
                        value: '',
                        maxValue: 360,
                        minValue: -360
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structRotationY',
                        id: 'structRotationY',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structRotationY');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structRotationY');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-1);
                        },
                        fieldLabel: Language.srotationY,
                        value: '',
                        maxValue: 360,
                        minValue: -360
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structRotationZ',
                        id: 'structRotationZ',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structRotationZ');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structRotationZ');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-1);
                        },
                        fieldLabel: Language.srotationZ,
                        value: '',
                        maxValue: 360,
                        minValue: -360
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structSizeX',
                        id: 'structSizeX',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structSizeX');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+0.1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structSizeX');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-0.1);
                        },
                        fieldLabel: Language.ssizeX,
                        value: '',
                        maxValue: 20,
                        minValue: 0.01
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structSizeY',
                        id: 'structSizeY',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structSizeY');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+0.1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structSizeY');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-0.1);
                        },
                        fieldLabel: Language.ssizeY,
                        value: '',
                        maxValue: 20,
                        minValue: 0.01
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'structSizeZ',
                        id: 'structSizeZ',
                        onSpinUp: function(){
                            var paraENFieldCmp=Ext.getCmp('structSizeZ');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())+0.1);
                        },
                        onSpinDown: function(){
                            var paraENFieldCmp=Ext.getCmp('structSizeZ');
                            paraENFieldCmp.setValue(Number(paraENFieldCmp.getValue())-0.1);
                        },
                        fieldLabel: Language.ssizeZ,
                        value: '',
                        maxValue: 20,
                        minValue: 0.01
                    }
                    ]}
            ]
        });

        me.callParent(arguments);
    }
});