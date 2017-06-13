"use strict";
var Project = (function () {
    function Project(title, description, id, dateCreated, users, state, dateCompleted) {
        this.title = title;
        this.description = description;
        this.id = id;
        this.dateCreated = dateCreated;
        this.users = users;
        this.state = state;
        this.dateCompleted = dateCompleted;
    }
    return Project;
}());
exports.Project = Project;
