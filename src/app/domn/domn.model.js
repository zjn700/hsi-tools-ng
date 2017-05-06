"use strict";
var Domain = (function () {
    function Domain(qnn, title, sequence, id, questions) {
        this.qnn = qnn;
        this.title = title;
        this.sequence = sequence;
        this.id = id;
        this.questions = questions;
    }
    return Domain;
}());
exports.Domain = Domain;
