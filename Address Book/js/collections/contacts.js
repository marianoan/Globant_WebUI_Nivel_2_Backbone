var app = app || {};

// Contact Collection

var ContactList = Backbone.Collection.extend({

    model: app.Contact,

    // Save in local storage
    localStorage: new Backbone.LocalStorage('contact_list_backbone'),

    // Filter down the list of all todo items that are finished.
    active: function () {
        return this.filter(function (contact) {
            return contact.get('active');
        });
    },


    // Filter down the list to only todo items that are still not finished.
    inactive: function () {
        return this.without.apply(this, this.active());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function (contact) {
        return contact.get('order');
    }
});

// Create our global collection of **Todos**.
app.Contacts = new ContactList();