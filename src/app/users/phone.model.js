"use strict";
var Phone = (function () {
    function Phone(countryCode, number, type, note, id) {
        this.countryCode = countryCode;
        this.number = number;
        this.type = type;
        this.note = note;
        this.id = id;
    }
    return Phone;
}());
exports.Phone = Phone;
