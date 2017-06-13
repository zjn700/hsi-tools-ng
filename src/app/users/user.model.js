"use strict";
var User = (function () {
    function User(email, password, firstName, lastName, office, phone, id) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.office = office;
        this.phone = phone;
        this.id = id;
    }
    return User;
}());
exports.User = User;
