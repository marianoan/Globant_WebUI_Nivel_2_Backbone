define([
  'underscore',
  'backbone',
  'localStorage',
  'models/Contact',
], function (_, Backbone, localStorage,Contact) {

    var Contacts = Backbone.Collection.extend({
        model: Contact,

        localStorage: new localStorage('contact_list_backbone'),


    });
    // You don't usually return a collection instantiated
    return Contacts;
});
