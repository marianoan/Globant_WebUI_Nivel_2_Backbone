// Todo Router
// ----------

var Workspace = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    setFilter: function (param) {
        // Set the current filter to be used
        if (param) {
            param = param.trim();
        }
        app.ContactFilter = param || '';

        // Trigger a collection filter event, causing hiding/unhiding
        // of Todo view items
        app.Contacts.trigger('filter');
    }
});

app.ContactRouter = new Workspace();
Backbone.history.start();