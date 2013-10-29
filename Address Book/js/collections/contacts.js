define([
  'underscore',
  'backbone',
  'localStorage',
  'models/Contact',
], function (_, Backbone, localStorage,Contact) {

    var Contacts = Backbone.Collection.extend({
        model: Contact,

        localStorage: new localStorage('contact_list_backbone'),

        //url: "js/collection.html",

        nextOrder: function () {
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        },

        comparator: function (contact) {
            return contact.get('order');
        }


    });
    // You don't usually return a collection instantiated
    return Contacts;
});
