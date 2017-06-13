"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var rxjs_1 = require('rxjs');
var proj_model_1 = require('./proj.model');
var state_model_1 = require('../state/state.model');
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        this.projects = [];
        this.projectIsInEditMode = new core_1.EventEmitter();
        this.projectIsUpdated = new core_1.EventEmitter();
        this.dbAccessed = false;
    }
    ProjectService.prototype.getActiveProject = function () {
        return this.activeProject;
    };
    ProjectService.prototype.setActiveProject = function (project) {
        console.log('reset activeProject');
        this.activeProject = project;
    };
    ProjectService.prototype.resetActiveProject = function (projectId) {
        console.log(this.projects);
    };
    ProjectService.prototype.isStateUpdateRequired = function (answer) {
        if (this.activeProject) {
            if (answer.projectId != this.activeProject.id) {
                console.log('state update required');
                return true;
            }
            if (localStorage.getItem('qnnId') != this.activeProject.state.qnnId) {
                console.log('state update required');
                return true;
            }
            if (answer.domainId != this.activeProject.state.domainId) {
                console.log('state update required');
                return true;
            }
            if (answer.sequence != this.activeProject.state.questionNumber) {
                console.log('state update required');
                return true;
            }
        }
        console.log("no state update req'd");
        return false;
    };
    ProjectService.prototype.addState = function (project) {
        var t_state = new state_model_1.SessionState(null, null, null, null, null, null, null, null, new Date());
        console.log(t_state);
        project.state = t_state;
        return project;
    };
    ProjectService.prototype.addProject = function (project) {
        var _this = this;
        project = this.addState(project);
        var headers = new http_1.Headers({ 'content-Type': 'application/json' });
        var body = JSON.stringify(project);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('/projects' + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var project = new proj_model_1.Project(result.obj.title, result.obj.description, result.obj._id, result.obj.dateCreated, result.obj.users, result.obj.state);
            project.state.dateModified = new Date(project.state.dateModified);
            _this.projects.push(project);
            _this.projects = _this.sortProjectList();
            _this.projectIsUpdated.emit(true);
            localStorage.removeItem('qnnId');
            return project;
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    ProjectService.prototype.getProjects = function () {
        var _this = this;
        if (this.dbAccessed) {
            console.log('update not Required');
            return this.http.get('/projects/dummy') // returns nothing, but creates the required observable
                .map(function (response) {
                return _this.projects; // pass back the current domain array
            });
        }
        else {
            return this.http.get('/projects')
                .map(function (response) {
                if (response.json().obj.length == 0) {
                    return _this.projects = response.json().obj;
                }
                var projects = response.json().obj;
                var transformedProjects = [];
                var i = 0;
                for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
                    var project = projects_1[_i];
                    transformedProjects.push(new proj_model_1.Project(project.title, project.description, project._id, project.dateCreated, project.users, project.state));
                    // convert from iso date format -- for sorting
                    projects[i].state.dateModified = new Date(projects[i].state.dateModified);
                    i++;
                }
                _this.projects = transformedProjects;
                _this.dbAccessed = true;
                return transformedProjects;
            })
                .catch(function (error) { return rxjs_1.Observable.throw(error); });
        }
    };
    ProjectService.prototype.deleteProject = function (project) {
        this.projects.splice(this.projects.indexOf(project), 1);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('/projects/' + project.id + token)
            .map(function (response) {
            response.json();
            if (project.id == localStorage.getItem('pid')) {
                localStorage.removeItem('qnnId');
                localStorage.removeItem('pid');
            }
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    ProjectService.prototype.editProject = function (project) {
        this.projectIsInEditMode.emit(project);
    };
    ProjectService.prototype.updateProject = function (project) {
        var _this = this;
        if (project) {
            var headers = new http_1.Headers({ 'content-Type': 'application/json' });
            var body = JSON.stringify(project);
            var token = localStorage.getItem('token')
                ? '?token=' + localStorage.getItem('token')
                : '';
            return this.http.patch('/projects/' + project.id + token, body, { headers: headers })
                .map(function (response) {
                response.json();
                _this.projectIsUpdated.emit(true);
                //this.projects = this.sortProjectList();
            })
                .catch(function (error) { return rxjs_1.Observable.throw(error); });
        }
    };
    ProjectService.prototype.sortProjectList = function () {
        console.log('sorting...');
        return this.projects.sort(function (a, b) {
            //if ( a.title > b.title ) {
            if (a.state.dateModified > b.state.dateModified) {
                return -1;
            }
            if (a.state.dateModified < b.state.dateModified) {
                return 1;
            }
            return 0;
        });
    };
    ProjectService.prototype.projectIsSelected = function () {
        return localStorage.getItem('pid') !== null;
    };
    ProjectService = __decorate([
        core_1.Injectable()
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
