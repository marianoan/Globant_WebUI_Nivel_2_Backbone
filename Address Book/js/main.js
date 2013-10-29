require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    baseUrl: 'js',
    paths: {
        jquery: 'jquery.min',
        underscore: 'underscore-min',
        backbone: 'backbone-min',
        localStorage: 'backbone.localStorage'
    }

});

require([

  // Load our app module and pass it to our definition function
  'App',
], function (App) {
    // The "app" dependency is passed in as "App"
    new App();
});