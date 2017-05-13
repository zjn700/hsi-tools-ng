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
var ansr_model_1 = require('./ansr/ansr.model');
var CardService = (function () {
    function CardService(http) {
        this.http = http;
        this.questionSelected = new core_1.EventEmitter();
        this.textInputSelected = new core_1.EventEmitter();
        this.menuItemSelected = new core_1.EventEmitter();
        this.answerSelected = new core_1.EventEmitter();
        this.setActiveAnswer = new core_1.EventEmitter();
        this.getNewAnswers = new core_1.EventEmitter();
        this.domain = null;
        this.sequence = null;
        this.answers = [];
    }
    CardService.prototype.getQuestion = function (question) {
        this.questionSelected.emit(question);
    };
    CardService.prototype.isInTextInput = function (event) {
        if (event.srcElement.tagName == 'TEXTAREA' || event.target.getAttribute("type") == 'text') {
            this.textInputSelected.emit(true);
            return true;
        }
        else {
            this.textInputSelected.emit(false);
            return false;
        }
    };
    CardService.prototype.emitTextInputSelected = function () {
        this.textInputSelected.emit(true);
    };
    CardService.prototype.emitMenuItemSelected = function () {
        this.menuItemSelected.emit(true);
    };
    CardService.prototype.emitSetActiveAnswer = function (number) {
        this.setActiveAnswer.emit(number);
    };
    CardService.prototype.emitGetAnswers = function (domain, sequence) {
        if (!(this.domain === domain && this.sequence === sequence)) {
            this.domain = domain;
            this.sequence = sequence;
            this.getNewAnswers.emit({ domain: domain, sequence: sequence });
        }
    };
    CardService.prototype.emitAnswerSelected = function (answer) {
        //console.log('emitAnswerSelected = ' + answer)
        this.answerSelected.emit(answer);
    };
    CardService.prototype.getAnswers = function (domain) {
        // use pid
        //console.log('in getAnswers')
        // const headers = new Headers({'content-Type': 'application/json'})
        //   let query = {
        //     projectId: localStorage.getItem('pid'),
        //     domainId: domain.id,
        //   } 
        // const body = JSON.stringify(query)
        var queryString = '?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id;
        //console.log(queryString)
        // const token = localStorage.getItem('token') 
        //     ? '?token=' + localStorage.getItem('token')
        //     : '';
        return this.http.get('/answers' + queryString) //, body, {headers: headers})
            .map(function (response) {
            //console.log('response')
            //console.log(response)
            var answers = response.json().obj;
            var t_Answers = [];
            for (var i = 0; i < domain.questions.length; i++) {
                t_Answers.push(new ansr_model_1.Answer(localStorage.getItem('pid'), domain.id, i + 1, null));
            }
            if (answers.length != 0) {
                for (var _i = 0, answers_1 = answers; _i < answers_1.length; _i++) {
                    var answer = answers_1[_i];
                    var i = answer.sequence - 1;
                    //t_Answers[i].projectId = answer.projectId;
                    //t_Answers[i].domainId = answer.domainId;
                    //t_Answers[i].sequence = answer.sequence;
                    t_Answers[i].value = answer.value;
                    t_Answers[i].riskValue = answer.riskValue;
                    t_Answers[i].rationale = answer.rationale;
                    t_Answers[i].dateCreated = answer.dateCreated;
                    t_Answers[i].dateModified = answer.dateModified;
                    t_Answers[i].id = answer._id;
                }
            }
            answers = t_Answers;
            t_Answers = [];
            //console.log(answers);
            return answers;
            //this.domains = this.sortDomainList();
            //return transformedDomns;
            // const answer = new Answer(
            //         result.obj.projectId, 
            //         result.obj.domainId,[]
            //         result.obj.sequence,
            //         result.obj.value,
            //         result.obj.riskValue,
            //         result.obj.rationale,
            //         result.obj.dateCreated,
            //         result.obj.dateModified,
            //         result.obj._id);
            // this.answers.push(answer);
            // this.answers = this.sortList();
            // // this.projectIsUpdated.emit(true)
            // return this.answers;
        });
        //.catch((error: Response) => Observable.throw(error));
    };
    CardService.prototype.getAnswer = function (domainId, sequence) {
        // use pid
    };
    CardService.prototype.updateAnswer = function (answer) {
    };
    CardService.prototype.addAnswer = function (answer) {
        var headers = new http_1.Headers({ 'content-Type': 'application/json' });
        var body = JSON.stringify(answer);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('/answers' + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var answer = new ansr_model_1.Answer(result.obj.projectId, result.obj.domainId, result.obj.sequence, result.obj.value, result.obj.riskValue, result.obj.rationale, result.obj.dateCreated, result.obj.dateModified, result.obj._id);
            // this.projects.push(project);
            // this.projects = this.sortProjectList();
            // this.projectIsUpdated.emit(true)
            return answer;
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    CardService.prototype.sortList = function (answers) {
        return answers.sort(function (a, b) {
            if (a.sequence < b.sequence) {
                return -1;
            }
            if (a.sequence > b.sequence) {
                return 1;
            }
            return 0;
        });
    };
    CardService = __decorate([
        core_1.Injectable()
    ], CardService);
    return CardService;
}());
exports.CardService = CardService;
