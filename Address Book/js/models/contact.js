var app = app || {};

app.Contact = Backbone.Model.extend({

    //Atributos por defecto
    defaults: {
        name: '',
        address: '',
        mobile: '',
        phone: '',
        email: ''
    }

});