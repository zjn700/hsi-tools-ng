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
var DomainService = (function () {
    function DomainService(http) {
        this.http = http;
        this.questions = [];
        this.domains = [];
    }
    DomainService.prototype.getDomains = function () {
        var _this = this;
        console.log('in getDomain');
        return this.http.get('/domain/' + localStorage.getItem('qnnId'))
            .map(function (response) {
            if (response.json().obj.length == 0) {
                console.log("response is empty");
                return _this.questions = response.json().obj;
            }
            var domains = response.json().obj;
            var transformedDomns = [];
            for (var _i = 0, domains_1 = domains; _i < domains_1.length; _i++) {
                var domain = domains_1[_i];
                transformedDomns.push(new domn_model_1.Domain(domain.qnn, domain.title, domain.sequence, domain._id, domain.questions));
            }
            _this.domains = transformedDomns;
            //this.domains = this.sortDomainList();
            return transformedDomns;
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
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
