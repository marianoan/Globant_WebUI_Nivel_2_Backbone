var person = Object.create(null);
var contact_list = [];



function forEach(list, callback) {
    if (list !== null) {
        for (var n = 0; n < list.length; n++) {
            callback.call(list[n]);
        }
    }
    
}

//Retrieve contacts from localStorage
function retrieveContacts() {
    var retrievedObject = localStorage.getItem('contacts_list');
    if (retrievedObject !== null) {
        contact_list = JSON.parse(retrievedObject);
    }
    
}

//Save contacts to localStorage
function saveContacts() {
    localStorage.setItem('contacts_list', JSON.stringify(contact_list));
}

//Fill the table with the contacts 
function update_table(contacts,$table) {
    var i = 0;
    $table.html("");
    forEach(contacts, function () {
        $table.append('<tr><td>' + this.name +
            '</td><td>' + this.address +
            '</td><td>' + this.mobile +
            '</td><td>' + this.phone +
            '</td><td>' + this.email +
            '</td><td>' +
            "<input type='image' id='" + i + "' class='edit_contact' src='images/icn_edit.png' title='Edit'>" +
            "<input type='image' id='" + i + "' class='remove_contact' src='images/icn_trash.png' title='Trash'></td></tr>");
        i++;
    });

    //Function to remove
    $(".remove_contact").on("click", function () {
        contact_list.splice(this.id, 1);
        update_table(contact_list, $("#contacts_table"));
        saveContacts();
    });

    //Function to edit
    $(".edit_contact").on("click", function () {
        $("#edit_contact_dialog").dialog("open");
        $("#edit_name_input").val(contact_list[this.id].name);
        $("#edit_address_input").val(contact_list[this.id].address);
        $("#edit_mobile_input").val(contact_list[this.id].mobile);
        $("#edit_phone_input").val(contact_list[this.id].phone);
        $("#edit_email_input").val(contact_list[this.id].email);
        $("#edit_id_input").val(this.id);
    });
}

function reset_form() {
    $("#new_contact_form").find("input[type=text]").val('');
};

$(document).ready(function () {
    //First retrieve the contacts from localStorage
    retrieveContacts();
    //Set the dialog window to edit
    $("#edit_contact_dialog").dialog({
        autoOpen: false,
        modal: true,
        height: 500,
        width: 680,
        buttons: {
            'Save': function () {
                var id = $("#edit_id_input").val();
                contact_list[id].name = $("#edit_name_input").val();
                contact_list[id].address = $("#edit_address_input").val();
                contact_list[id].mobile = $("#edit_mobile_input").val();
                contact_list[id].phone = $("#edit_phone_input").val();
                contact_list[id].email = $("#edit_email_input").val();
                update_table(contact_list, $("#contacts_table"));
                saveContacts();
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            
        }
    });
    update_table(contact_list, $("#contacts_table"));
    $(".tablesorter").tablesorter();
    $("#contact_list").show();
    $("#new_contact_form").hide();

    $(".icn_add_user").on("click", function () {
        $("#contact_list").hide();
        $("#new_contact_form").show();
    });

    $(".icn_view_users").on("click", function () {
        $("#contact_list").show();
        update_table(contact_list, $("#contacts_table"));
        $("#new_contact_form").hide();
    });

    $("#alert").on("click", function () {
        $("#alert").fadeOut();
    });

    

    $("#save_button").on("click", function () {
        var contact = Object.create(person);
        contact.name = $("#new_name_input").val();
        contact.address = $("#new_address_input").val();
        contact.mobile = $("#new_mobile_input").val();
        contact.phone = $("#new_phone_input").val();
        contact.email = $("#new_email_input").val();

        contact_list.push(contact);
        saveContacts();
        $("#alert").removeClass("alert_info").addClass("alert_success").html("").html('The contact has been save').show();
        $("#new_contact_form").hide();
        $("#contact_list").show();
        update_table(contact_list, $("#contacts_table"));
        reset_form();

    });


    $("#reset_button").on("click", function () {
        reset_form();
    });

});

