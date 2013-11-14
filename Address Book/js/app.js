define([
  'jquery',
  'underscore',
  'backbone',
  'collections/Contacts',
  'views/ContactView',
  'models/Contact'
], function ($, _, Backbone, Contacts, ContactView, Contact) {

    return Backbone.View.extend({

        el: '#address_book_app',

        //Eventos de la vista
        events: {
            'click #save_button': 'create_contact',
            'click .icn_view_users': 'view_contacts_list',
            'click .icn_add_user': 'add_contact'
        },

        //Inicializo y traigo la coleccion de contactos
        initialize: function () {
            this.collection = new Contacts();

            console.log(this.collection);

            this.$new_contact = this.$('#new_contact');
            this.$contact_list = this.$('#contact_list');
            this.$input_new_name = this.$('#new_name_input');
            this.$input_new_address = this.$('#new_address_input');
            this.$input_new_mobile = this.$('#new_mobile_input');
            this.$input_new_phone = this.$('#new_phone_input');
            this.$input_new_email = this.$('#new_email_input');

            this.$contact_list.show();
            this.$new_contact.hide();

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);


            this.collection.fetch();
        },

        //Atributos para un nuevo contacto
        newAttributes: function () {
            return {
                name: this.$input_new_name.val().trim(),
                address: this.$input_new_address.val().trim(),
                mobile: this.$input_new_mobile.val().trim(),
                phone: this.$input_new_phone.val().trim(),
                email: this.$input_new_email.val().trim(),
            };
        },

        create_contact: function (event) {
            this.collection.create(this.newAttributes());
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

        addOne: function (contact) {
            var view = new ContactView({ model: contact });
            $('#contacts_table').append(view.render().el);
        },

        addAll: function () {
            this.$('#contacts_table').html('');
            this.collection.each(this.addOne, this);
        }

    });

});