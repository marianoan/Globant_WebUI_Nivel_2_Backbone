var app = app || {};

// Contact View

app.ContactView = Backbone.View.extend({

    //Cada item es un tr.
    tagName: 'tr',

    // El template para cada item.
    template: _.template($('#item-template').html()),
    
    // Los eventos de cada item.
    events: {
        'click .edit': 'edit',
        'click .destroy': 'clear',
        'click #edit_button': 'close', 
    },

    initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove); 
    },

    //Renderea todo el item.
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));

        this.$td_name_input = this.$('#td_name_input');
        this.$td_address_input = this.$('#td_address_input');
        this.$td_mobile_input = this.$('#td_mobile_input');
        this.$td_phone_input = this.$('#td_phone_input');
        this.$td_email_input = this.$('#td_email_input');
        this.$td_edit_button = this.$('#td_edit_button');

        this.$name_input = this.$('#edit_name_input');
        this.$address_input = this.$('#edit_address_input');
        this.$mobile_input = this.$('#edit_mobile_input');
        this.$phone_input = this.$('#edit_phone_input');
        this.$email_input = this.$('#edit_email_input');

        this.$name = this.$('#name');
        this.$address = this.$('#address');
        this.$mobile = this.$('#mobile');
        this.$phone = this.$('#phone');
        this.$email = this.$('#email');
        this.$actions = this.$('#actions');

        return this;
    },

    

    //Borra el item.
    clear: function () {
        this.model.destroy();
    },

    edit: function () {
        this.$name.hide();
        this.$address.hide();
        this.$mobile.hide();
        this.$phone.hide();
        this.$email.hide();
        this.$actions.hide();

        this.$td_name_input.show();
        this.$td_address_input.show();
        this.$td_mobile_input.show();
        this.$td_phone_input.show();
        this.$td_email_input.show();
        this.$td_edit_button.show();

        this.$name_input.focus();
    },

    //Cierro la vista de edicion y guardo el item.
    close: function () {
        var name = this.$name_input.val().trim();
        var address = this.$address_input.val().trim();
        var mobile = this.$mobile_input.val().trim();
        var phone = this.$phone_input.val().trim();
        var email = this.$email_input.val().trim();


        if (name) {
            this.model.save({ name: name, address: address, mobile: mobile, phone: phone, email: email });
            this.render();
        }

    }

   

   
});