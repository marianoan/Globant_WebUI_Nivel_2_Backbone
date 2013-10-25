var app = app || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
app.ContactView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'tr',

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
        'click .toggle': 'toggleActive', // NEW
        'dblclick label': 'edit',
        'click .destroy': 'clear',           // NEW
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);        // NEW
        this.listenTo(this.model, 'visible', this.toggleVisible); // NEW
    },

    // Re-renders the titles of the todo item.
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('active', this.model.get('active')); // NEW
        this.toggleVisible();
        this.$input_new_name = this.$('#new_name_input');
        this.$input_new_address = this.$('#new_address_input');
        this.$input_new_mobile = this.$('#new_mobile_input');
        this.$input_new_phone = this.$('#new_phone_input');
        this.$input_new_email = this.$('#new_email_input');
        return this;
    },

    // NEW - Toggles visibility of item
    toggleVisible: function () {
        this.$el.toggleClass('hidden', this.isHidden());
        
    },

    // NEW - Determines if item should be hidden
    isHidden: function () {
        var isActive = this.model.get('active');
        return ( // hidden cases only
            (!isActive)
        );
    },

    // NEW - Toggle the `"completed"` state of the model.
    toggleActive: function () {
        this.model.toggle();
    },

    // NEW - Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function () {
        this.model.destroy();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function () {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function () {
        var value = this.$input.val().trim();

        if (value) {
            this.model.save({ title: value });
        }

        this.$el.removeClass('editing');
    }

   

   
});