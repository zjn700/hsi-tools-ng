"use strict";
var Integration = (function () {
    function Integration(projectId, qnnId, domainList, title, dateCreated, dateModified, id, risksIssuesConcerns, mitigationStrategy) {
        this.projectId = projectId;
        this.qnnId = qnnId;
        this.domainList = domainList;
        this.title = title;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
        this.id = id;
        this.risksIssuesConcerns = risksIssuesConcerns;
        this.mitigationStrategy = mitigationStrategy;
    }
    return Integration;
}());
exports.Integration = Integration;
