"use strict";
var Domain = (function () {
    function Domain(qnn, title, sequence, id, questions, answers) {
        this.qnn = qnn;
        this.title = title;
        this.sequence = sequence;
        this.id = id;
        this.questions = questions;
        this.answers = answers;
    }
    return Domain;
}());
exports.Domain = Domain;
