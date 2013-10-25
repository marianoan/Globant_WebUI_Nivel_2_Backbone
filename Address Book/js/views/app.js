var app = app || {};

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#address_book_app',

    // Our template for the line of statistics at the bottom of the app.
    //statsTemplate: _.template($('#stats-template').html()),

    // New
    // Delegated events for creating new items, and clearing completed ones.
    events: {
        //'keypress #new-todo': 'createOnEnter',
        'click #save_button': 'create_contact',
        //'click #clear-completed': 'clearCompleted',
        //'click #toggle-all': 'toggleAllComplete',
        'click #change_view': 'toggleActive',
        'click .icn_view_users': 'view_contacts_list',
        'click .icn_add_user': 'add_contact'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
        this.$('#new_contact').hide();
        this.$('#contact_list').show();

        this.$input_new_name = this.$('#new_name_input');
        this.$input_new_address = this.$('#new_address_input');
        this.$input_new_mobile = this.$('#new_mobile_input');
        this.$input_new_phone = this.$('#new_phone_input');
        this.$input_new_email = this.$('#new_email_input');
        //this.allCheckbox = this.$('#toggle-all')[0];
        //this.$input = this.$('#new-todo');
        //this.$footer = this.$('#footer');
        //this.$main = this.$('#main');

        this.listenTo(app.Contacts, 'add', this.addOne);
        this.listenTo(app.Contacts, 'reset', this.addAll);

        // New
        this.listenTo(app.Contacts, 'change:active', this.filterOne);
        this.listenTo(app.Contacts, 'filter', this.filterAll);
        this.listenTo(app.Contacts, 'all', this.render);

        //app.Contacts.fetch();
    },

    // New
    // Generate the attributes for a new Todo item.
    newAttributes: function () {
        return {
            name: this.$input_new_name.val().trim(),
            address: this.$input_new_address.val().trim(),
            mobile: this.$input_new_mobile.val().trim(),
            phone: this.$input_new_phone.val().trim(),
            email: this.$input_new_email.val().trim(),
            order: app.Contacts.nextOrder(),
            active: true
        };
    },

    // New
    // If you hit return in the main input field, create new Todo model,
    // persisting it to localStorage.
    create_contact: function (event) {
        app.Contacts.create(this.newAttributes());
        this.$input_new_name.val('');
        this.$input_new_address.val('');
        this.$input_new_mobile.val('');
        this.$input_new_phone.val('');
        this.$input_new_email.val('');
        this.view_contacts_list();
    },

    view_contacts_list: function () {
        this.$('#new_contact').hide();
        this.$('#contact_list').show();
    },

    add_contact: function () {
        this.$('#new_contact').show();
        this.$('#contact_list').hide();
    },

    toggleActive: function () {
        app.Contacts.fetch({ data: { active: true } });
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (contact) {
        var view = new app.ContactView({ model: contact });
        $('#contacts_table').append(view.render().el);
    },

    //Add all items in the **Todos** collection at once.
    addAll: function () {
        this.$('#contacts_table').html('');
        app.Contacts.each(this.addOne, this);
    },

    // New
    filterOne: function (contact) {
        contact.trigger('active');
    },

    filterAll: function () {
        app.Contacts.each(this.filterOne, this);
    }

    // New
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    /*render: function () {
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if (app.Todos.length) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
              .removeClass('selected')
              .filter('[href="#/' + (app.TodoFilter || '') + '"]')
              .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    }

    

    // New
    


    

    // New
    // Clear all completed todo items, destroying their models.
    clearCompleted: function () {
        _.invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    // New
    toggleAllComplete: function () {
        var completed = this.allCheckbox.checked;

        app.Todos.each(function (todo) {
            todo.save({
                'completed': completed
            });
        });
    },*/

    


});