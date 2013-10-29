define([
  'underscore',
  'backbone'
], function (_, Backbone) {

    var Contact = Backbone.Model.extend({
        defaults: {
            name: 'noname',
            address: 'address',
            mobile: 'mobile',
            phone: 'phone',
            email: 'email'
        }
    });
    // Return the model for the module
    return Contact;
});
