var app = app || {};


var ContactList = Backbone.Collection.extend({

    model: app.Contact,

    localStorage: new Backbone.LocalStorage('contact_list_backbone'),

   
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
.
app.Contacts = new ContactList();