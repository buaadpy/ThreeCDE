/**
 * 修改 by 杜鹏宇 on 2015/07/01
 * 操作按钮面板
 */

Ext.define('DesignApp.view.ButtonGroupPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.buttongrouppanel',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.container.ButtonGroup',
        'Ext.button.Button'
    ],
    padding:'2 2 0 2', // 上边距   右边距 下边距   左边距
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items:
                        [
                            {
                                text: Language.menu,//'Menu',//'菜单',
                                itemId:'StructMenu',
                                xtype: 'button',
                                iconCls: 'menu',
                                menu: [
                                    {
                                        xtype: 'buttongroup',
                                        columns: 1,
                                        defaults: {
                                            iconAlign: 'left',
                                            width: 100
                                        },
                                        items: [
                                            {
                                                text: Language.new,//'New',//'新建',
                                                itemId: 'btnNewStructFile',
                                                xtype: 'button',
                                                iconCls: 'addTask'
                                            },
//                                            {
//                                                text: Language.open,//'Open',//'打开',
//                                                itemId: 'btnOpenStructFile',
//                                                xtype: 'button',
//                                                iconCls: 'openTask'
//                                            },
//                                            {
//                                                text: Language.save,//'Save',//'保存',
//                                                itemId: 'btnSaveStructFile',
//                                                xtype: 'button',
//                                                iconCls: 'saveTask'
//                                            },
//                                            {
//                                                text: Language.saveas,//'Save',//'另存为',
//                                                itemId: 'btnSaveAsStructFile',
//                                                xtype: 'button',
//                                                iconCls: 'download'
//                                            },
                                            {
                                                text: Language.export,//'Export',//'导出',
                                                itemId: 'btnExport',
                                                xtype: 'button',
                                                iconCls: 'exportTask'
                                            },
                                            {
                                                text: Language.back,//'Back',//'退出',
                                                itemId: 'btnBack',
                                                xtype: 'button',
                                                iconCls: 'back'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: Language.collaborate,//'Collaborate',//'协同',
                                itemId:'collaboration',
                                xtype: 'button',
                                iconCls: 'earthAreaCover',
                                menu: [
                                    {
                                        xtype: 'buttongroup',
                                        columns: 1,
                                        defaults: {
                                            iconAlign: 'left',
                                            width: 100
                                        },
                                        items: [
                                            {
                                                text: Language.build,//'Build',//'协同',
                                                itemId: 'btnNewCo',
                                                xtype: 'button',
                                                iconCls: 'satellite'
                                            },
                                            {
                                                text: Language.close,//'Close',//'关闭',
                                                itemId: 'btnCloseCo',
                                                xtype: 'button',
                                                iconCls: 'reset',
                                                disabled: true
                                            },
                                            {
                                                text: Language.join,//'Join',//'加入',
                                                itemId: 'btnJoinCo',
                                                xtype: 'button',
                                                iconCls: 'coveranalysis'
                                            },
                                            {
                                                text: Language.exit,//'Exit',//'退出',
                                                itemId: 'btnLeaveCo',
                                                xtype: 'button',
                                                iconCls: 'back',
                                                disabled: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: Language.operate,//'Operate',//'属性板',
                                itemId: 'btnAdvancedPanel',
                                iconCls: 'propertyPanel',
                                xtype: 'button'
                            },
                            {
                                text: Language.list,//'List',//'列表板',
                                itemId: 'btnList',
                                iconCls: 'listPanel',
                                xtype: 'button'
                            },
                            {
                                text: Language.translate,//'Translate',//'平移',
                                itemId: 'btnTranslate',
                                iconCls: 'translate',
                                xtype: 'button',
                                disabled: true
                            },
                            {
                                text: Language.rotate,//'Rotate',//'旋转',
                                itemId: 'btnRotate',
                                iconCls: 'rotate',
                                xtype: 'button',
                                disabled: true
                            },
                            {
                                text: Language.scale,//'Scale',//'缩放',
                                itemId: 'btnScale',
                                iconCls: 'scale',
                                xtype: 'button',
                                disabled: true
                            },
                            {
                                text: Language.combine,//'Combine',//'组合',
                                itemId: 'btnCombine',
                                iconCls: 'combine',
                                xtype: 'button',
                                disabled: true
                            },
                            {
                                text: Language.separate,//'Separate',//'分离',
                                itemId: 'btnSeparate',
                                iconCls: 'separate',
                                xtype: 'button',
                                disabled: true
                            },
                            {
                                text: Language.assembly,//'Assembly',//'吸附',
                                itemId: 'btnAssembly',
                                iconCls: 'assembly',
                                xtype: 'button'
                            },
                            {
                                text: Language.align,//'Align',//'对齐',
                                xtype: 'button',
                                itemId: 'StructAlign',
                                iconCls: 'align',
                                disabled: true,
                                menu: [
                                    {
                                        xtype: 'buttongroup',
                                        columns: 1,
                                        defaults: {
                                            iconAlign: 'left',
                                            width: 100
                                        },
                                        items: [
                                            {
                                                text: Language.byX,//'By X',//'按X',
                                                itemId: 'btnAlignmentX',
                                                iconCls: 'x',
                                                xtype: 'button'
                                            },
                                            {
                                                text: Language.byY,//'By Y',//'按Y',
                                                itemId: 'btnAlignmentY',
                                                iconCls: 'y',
                                                xtype: 'button'

                                            },
                                            {
                                                text: Language.byZ,//'By Z',//'按Z',
                                                itemId: 'btnAlignmentZ',
                                                iconCls: 'z',
                                                xtype: 'button'

                                            }
                                        ]}
                                ]
                            },
                            {
                                text: Language.box,//'Box',//选框',
                                itemId: 'btnSelectBox',
                                iconCls: 'selectBox',
                                xtype: 'button'
                            },
                            {
                                text: Language.copy,//'Copy',//'复制',
                                itemId: 'btnCopy',
                                iconCls: 'copy',
                                xtype: 'button',
                                disabled: true
                            },
                            {
                                text: Language.delete,//'Delete',//'删除',
                                itemId: 'btnDelete',
                                iconCls: 'delete',
                                xtype: 'button',
                                disabled: true
                            },
//                            {
//                                text: Language.undo,//'Undo',//'撤销',
//                                itemId: 'btnUndo',
//                                iconCls: 'back',
//                                xtype: 'button',
//                                disabled: true
//                            },
//                            {
//                                text: Language.observe,//'Observe',//'观察',
//                                xtype: 'button',
//                                iconCls: 'observe',
//                                itemId: 'StructObservation',
//                                menu: [
//                                    {
//                                        xtype: 'buttongroup',
//                                        columns: 1,
//                                        defaults: {
//                                            iconAlign: 'left',
//                                            width: 100
//                                        },
//                                        items: [
                                            {
                                                text: Language.view,//'View',//'漫游',
                                                itemId: 'btnViewMode',
                                                iconCls: 'view',
                                                xtype: 'button'
                                            },
                                            {
                                                text: Language.init,//'Init',//'初始',
                                                itemId: 'btnInitview',
                                                iconCls: 'initView',
                                                xtype: 'button'

                                            },
//                                        ]}
//                                ]
//                            },
                            {
                                text: Language.movie,//'演示',
                                itemId: 'btnMovie',
                                xtype: 'button',
                                iconCls: 'movie'
                            },
                            {
                                text: Language.welcome,//'欢迎您',
                                itemId: 'welcomeName',
                                xtype: 'label',
                                margin: '0 0 0 50'
                            }
                        ]
                }
                ]
        });

        me.callParent(arguments);
    }
});