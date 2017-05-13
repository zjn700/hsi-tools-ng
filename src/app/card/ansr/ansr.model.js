"use strict";
var Answer = (function () {
    function Answer(projectId, domainId, sequence, value, riskValue, rationale, dateCreated, dateModified, id) {
        this.projectId = projectId;
        this.domainId = domainId;
        this.sequence = sequence;
        this.value = value;
        this.riskValue = riskValue;
        this.rationale = rationale;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
        this.id = id;
    }
    return Answer;
}());
exports.Answer = Answer;
