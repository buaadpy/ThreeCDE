Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.*'
]);
//Ext.Appliaction作为MVC的入口，创建一个应用实例
Ext.application({
    stores: [
        'BasicLoadStore',
        'ExpansionLoadStore'
    ],
    controllers: [
        'AdvancedController',
        'EnvironmentController',
        'ModuleController',
        'ButtonController'
    ],
    views:[
        'DesignApp.view.DesignViewport',
        'DesignApp.view.AdvancedControlWindow',
        'DesignApp.view.StructListWindow',
        'DesignApp.view.VideoDemoWindow'
    ],
    name: 'DesignApp',

    //This is fired as soon as the page is ready
    launch: function() {
        Ext.create('DesignApp.view.DesignViewport');
        Ext.optionsToolbarAlign = 'br-br';
    }
});