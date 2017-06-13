"use strict";
var SessionState = (function () {
    function SessionState(url, qnnId, qnnTitle, qnnAbbreviation, domainId, domainNumber, questionNumber, user, dateModified, id) {
        this.url = url;
        this.qnnId = qnnId;
        this.qnnTitle = qnnTitle;
        this.qnnAbbreviation = qnnAbbreviation;
        this.domainId = domainId;
        this.domainNumber = domainNumber;
        this.questionNumber = questionNumber;
        this.user = user;
        this.dateModified = dateModified;
        this.id = id;
    }
    return SessionState;
}());
exports.SessionState = SessionState;
