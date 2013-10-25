var app = app || {};

app.Contact = Backbone.Model.extend({

    // Default attributes
    defaults: {
        name: '',
        address: '',
        mobile: '',
        phone: '',
        email: '',
        active: true
    },

    // Toggle the `completed` state of this todo item.
    toggle: function () {
        this.save({
            active: !this.get('active')
        });
    }

});