"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var rxjs_1 = require('rxjs');
var intgrn_model_1 = require('./intgrn.model');
var IntegrationService = (function () {
    function IntegrationService(http) {
        this.http = http;
        // questionSelected = new EventEmitter<Question>();
        // textInputSelected = new EventEmitter<boolean>();
        this.dbAccessed = false;
        this.integrations = [];
        this.updatedIntegrationList = new core_1.EventEmitter();
        this.updateActiveIntegration = new core_1.EventEmitter();
        this.editEvauationTitle = new core_1.EventEmitter();
    }
    IntegrationService.prototype.getIntegrations = function () {
        return this.integrations;
    };
    IntegrationService.prototype.getProjects = function () {
        var _this = this;
        if (this.dbAccessed) {
            console.log('update not Required');
            return this.http.get('/projects/dummy') // returns nothing, but creates the required observable
                .map(function (response) {
                return _this.integrations; // pass back the current domain array
            });
        }
        else {
            return this.http.get('/integrations')
                .map(function (response) {
                if (response.json().obj.length == 0) {
                    return _this.integrations = response.json().obj;
                }
                var integrations = response.json().obj;
                var t_evaluations = [];
                var i = 0;
                for (var _i = 0, integrations_1 = integrations; _i < integrations_1.length; _i++) {
                    var integration = integrations_1[_i];
                    t_evaluations.push(new intgrn_model_1.Integration(integration.projectId, integration.qnnId, integration.domainList, integration.title, integration.dateCreated = new Date(integration.dateCreated), integration.state));
                    // convert from iso date format -- for sorting
                    projects[i].state.dateModified = new Date(projects[i].state.dateModified);
                    i++;
                }
                _this.projects = t_evaluations;
                _this.dbAccessed = true;
                return t_evaluations;
            })
                .catch(function (error) { return rxjs_1.Observable.throw(error); });
        }
    };
    IntegrationService.prototype.getSortedEvals = function () {
        this.sortEvalList();
        this.updatedIntegrationList.emit(this.integrations);
    };
    IntegrationService.prototype.addIntegration = function (domainList, title) {
        var _this = this;
        console.log('in addIntegration');
        console.log(domainList);
        var t_domainList = [];
        for (var _i = 0, domainList_1 = domainList; _i < domainList_1.length; _i++) {
            var title_1 = domainList_1[_i];
            t_domainList.push(title_1);
        }
        var t_date = new Date();
        var t_integration = new intgrn_model_1.Integration(localStorage.getItem('pid'), localStorage.getItem('qnnId'), t_domainList, title, t_date, t_date, new Date(t_date).getTime().toString());
        this.addIntegrationToDb(t_integration)
            .subscribe(function (response) {
            console.log('response');
            console.log(response);
            console.log(t_integration);
            t_integration.id = response.obj._id;
            _this.integrations.push(t_integration);
            _this.setActiveIntegration(t_integration.id);
            _this.sortEvalList();
            _this.updatedIntegrationList.emit(_this.integrations);
        });
        // this.integrations.push(t_integration);
        // this.setActiveIntegration(t_integration.id);
        // this.sortEvalList();
        // this.updatedIntegrationList.emit(this.integrations)
    };
    IntegrationService.prototype.testAddToDb = function () {
        return this.http.get('/integrations/dummy') // returns nothing, but creates the required observable
            .map(function (response) {
            return response;
            //return this.projects  // pass back the current domain array
        });
    };
    IntegrationService.prototype.addIntegrationToDb = function (evaluation) {
        // //project = this.addState(project)
        var headers = new http_1.Headers({ 'content-Type': 'application/json' });
        var body = JSON.stringify(evaluation);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('/integrations' + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            // const project = new Project(
            //     result.obj.title, 
            //     result.obj.description,
            //     result.obj._id,
            //     result.obj.dateCreated,
            //     result.obj.users,
            //     result.obj.state);
            //     project.state.dateModified = new Date(project.state.dateModified)
            // this.projects.push(project);
            // this.projects = this.sortProjectList();
            // this.projectIsUpdated.emit(true)
            // localStorage.removeItem('qnnId')
            return result;
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    IntegrationService.prototype.updateEvalDateModifiedById = function (evalId) {
        for (var i = 0; i < this.integrations.length; i++) {
            if (this.integrations[i].id == evalId) {
                this.integrations[i].dateModified = new Date();
                this.sortEvalList();
                this.updatedIntegrationList.emit(this.integrations);
            }
        }
    };
    IntegrationService.prototype.updateIntegration = function (index, domainList, title) {
        var t_domainList = [];
        for (var _i = 0, domainList_2 = domainList; _i < domainList_2.length; _i++) {
            var title_2 = domainList_2[_i];
            t_domainList.push(title_2);
        }
        this.integrations[index].domainList = t_domainList;
        this.integrations[index].title = title;
        this.integrations[index].dateModified = new Date();
        this.setActiveIntegration(this.integrations[index].id);
        this.sortEvalList();
        this.updatedIntegrationList.emit(this.integrations);
    };
    IntegrationService.prototype.setActiveIntegration = function (integrationId) {
        for (var i = 0; i < this.integrations.length; i++) {
            if (this.integrations[i].id == integrationId) {
                console.log(this.integrations[i]);
                this.updateActiveIntegration.emit(this.integrations[i]);
                return;
            }
        }
        //this.updateActiveIntegration.emit(integration)
    };
    IntegrationService.prototype.editThisEvaluationTitle = function (evaluationId) {
        for (var i = 0; i < this.integrations.length; i++) {
            if (this.integrations[i].id == evaluationId) {
                console.log(this.integrations[i]);
                this.sortEvalList();
                return this.editEvauationTitle.emit(this.integrations[i]);
            }
        }
    };
    IntegrationService.prototype.archiveThisEvaluation = function (evaluation) {
        for (var i = 0; i < this.integrations.length; i++) {
            if (this.integrations[i].id == evaluation.id) {
                console.log(this.integrations[i]);
                this.integrations.splice(i, 1);
                return this.updatedIntegrationList.emit(this.integrations);
            }
        }
    };
    IntegrationService.prototype.sortEvalList = function () {
        console.log('sorting...');
        return this.integrations.sort(function (a, b) {
            //if ( a.title > b.title ) {
            if (a.dateModified > b.dateModified) {
                return -1;
            }
            if (a.dateModified < b.dateModified) {
                return 1;
            }
            return 0;
        });
    };
    IntegrationService = __decorate([
        core_1.Injectable()
    ], IntegrationService);
    return IntegrationService;
}());
exports.IntegrationService = IntegrationService;
