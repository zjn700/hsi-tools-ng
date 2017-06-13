"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/Rx');
var rxjs_1 = require('rxjs');
var domn_model_1 = require('./domn.model');
var qstn_model_1 = require('../card/qstn/qstn.model');
var ansr_model_1 = require('../card/ansr/ansr.model');
var DomainService = (function () {
    function DomainService(http, projectService) {
        this.http = http;
        this.projectService = projectService;
        this.questions = [];
        this.domains = [];
        this.lastActiveProject = '';
        this.lastActiveQnn = '';
    }
    DomainService.prototype.getOneAnswer = function (domain, sequence) {
        var queryString = '/' + sequence + '?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id;
        this.http.get('/answers' + queryString)
            .map(function (response) {
            console.log(response);
        });
    };
    DomainService.prototype.updateRequired = function () {
        if (this.lastActiveProject == localStorage.getItem('pid')) {
            if (this.lastActiveQnn == localStorage.getItem('qnnId')) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };
    DomainService.prototype.getDomains = function () {
        var _this = this;
        if (!this.updateRequired()) {
            console.log('update not Required');
            return this.http.get('/domain/dummy') // returns nothing, but creates the required observable
                .map(function (response) {
                return _this.domains; // pass back the current domain array
            });
        }
        else {
            console.log('update Required');
            this.domains.length = 0; // empty the current array
        }
        return this.http.get('/domain/' + localStorage.getItem('qnnId'))
            .map(function (response) {
            if (response.json().obj.length == 0) {
                console.log("response is empty");
                return _this.questions = response.json().obj;
            }
            var domains = response.json().obj;
            var t_domains = [];
            for (var _i = 0, domains_1 = domains; _i < domains_1.length; _i++) {
                var domain = domains_1[_i];
                var t_Answers = [];
                t_domains.push(new domn_model_1.Domain(domain.qnn, domain.title, domain.sequence, domain._id, domain.questions, t_Answers));
            }
            // build answers array for each domain
            var j = 0;
            var _loop_1 = function(domain) {
                _this.addDomainAnswers(domain)
                    .subscribe(function (answers) {
                    domain.answers = answers;
                });
            };
            for (var _a = 0, t_domains_1 = t_domains; _a < t_domains_1.length; _a++) {
                var domain = t_domains_1[_a];
                _loop_1(domain);
            }
            _this.lastActiveProject = localStorage.getItem('pid');
            _this.lastActiveQnn = localStorage.getItem('qnnId');
            _this.domains = t_domains;
            return _this.domains;
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    DomainService.prototype.addDomainAnswers = function (domain) {
        var t_domain = domain;
        var queryString = '?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id;
        return this.http.get('/answers' + queryString)
            .map(function (response) {
            var answers = response.json().obj;
            var t_Answers = [];
            for (var i = 0; i < domain.questions.length; i++) {
                t_Answers.push(new ansr_model_1.Answer(localStorage.getItem('pid'), domain.id, i + 1, null));
            }
            if (t_Answers.length > 0) {
                for (var _i = 0, answers_1 = answers; _i < answers_1.length; _i++) {
                    var answer = answers_1[_i];
                    var i = answer.sequence - 1;
                    t_Answers[i].value = answer.value;
                    t_Answers[i].riskValue = answer.riskValue;
                    t_Answers[i].rationale = answer.rationale;
                    t_Answers[i].dateCreated = answer.dateCreated;
                    t_Answers[i].dateModified = answer.dateModified;
                    t_Answers[i].id = answer._id;
                }
            }
            return t_Answers;
        });
    };
    DomainService.prototype.getDomainQuestions = function (domainId) {
        var _this = this;
        return this.http.get('/domain/questions/' + domainId)
            .map(function (response) {
            if (response.json().obj.length == 0) {
                return _this.questions = response.json().obj;
            }
            var questions = response.json().obj.questions;
            var transformedQstns = [];
            for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
                var question = questions_1[_i];
                transformedQstns.push(new qstn_model_1.Question(question.sequence, question.content));
            }
            _this.questions = transformedQstns;
            return transformedQstns;
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    DomainService.prototype.sortDomainList = function () {
        return this.domains.sort(function (a, b) {
            if (a.sequence < b.sequence) {
                return -1;
            }
            if (a.sequence > b.sequence) {
                return 1;
            }
            return 0;
        });
    };
    DomainService = __decorate([
        core_1.Injectable()
    ], DomainService);
    return DomainService;
}());
exports.DomainService = DomainService;
