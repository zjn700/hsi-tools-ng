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
var CardService = (function () {
    function CardService(http) {
        this.http = http;
        this.questionSelected = new core_1.EventEmitter();
        this.textInputSelected = new core_1.EventEmitter();
        this.menuItemSelected = new core_1.EventEmitter();
        this.answerSelected = new core_1.EventEmitter();
        this.updateThisAnswer = new core_1.EventEmitter();
        this.escapePressed = new core_1.EventEmitter();
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
    CardService.prototype.emitTextInputSelected = function (selected) {
        this.textInputSelected.emit(selected);
    };
    CardService.prototype.emitMenuItemSelected = function () {
        this.menuItemSelected.emit(true);
    };
    CardService.prototype.emitUpdateThisAnswer = function (answer) {
        this.updateThisAnswer.emit(answer);
    };
    CardService.prototype.emitAnswerSelected = function (answer) {
        this.answerSelected.emit(answer);
    };
    CardService.prototype.emitEscapePressed = function (value) {
        this.escapePressed.emit(value);
    };
    CardService.prototype.addAnswerToDb = function (answer) {
        answer.dateCreated = answer.dateModified;
        var headers = new http_1.Headers({ 'content-Type': 'application/json' });
        var body = JSON.stringify(answer);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('/answers' + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            return result;
        })
            .catch(function (error) { return rxjs_1.Observable.throw(error); });
    };
    CardService.prototype.updateAnswerInDb = function (answer) {
        var headers = new http_1.Headers({ 'content-Type': 'application/json' });
        var body = JSON.stringify(answer);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('/answers/' + answer.id + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            return result;
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
// getAnswers(domain: Domain){
//   // use pid
//   //console.log('in getAnswers')
//   // const headers = new Headers({'content-Type': 'application/json'})
//   //   let query = {
//   //     projectId: localStorage.getItem('pid'),
//   //     domainId: domain.id,
//   //   } 
//     // const body = JSON.stringify(query)
//     const queryString = '?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id;
//     //console.log(queryString)
//     // const token = localStorage.getItem('token') 
//     //     ? '?token=' + localStorage.getItem('token')
//     //     : '';
//     return this.http.get('/answers' + queryString) //, body, {headers: headers})
//             .map((response: Response) => {
//               //console.log('response')
//               //console.log(response)
//               let answers = response.json().obj;
//               let t_Answers: Answer[] = [];
//               for (let i=0; i < domain.questions.length; i++) {
//                 t_Answers.push(new Answer(
//                     localStorage.getItem('pid'), 
//                     domain.id,
//                     i+1,
//                     null));
//               }
//               if (answers.length != 0 ) {  //response.json().obj.length != 0) {
//                 for (let answer of answers) {
//                   let i = answer.sequence-1;
//                   //t_Answers[i].projectId = answer.projectId;
//                   //t_Answers[i].domainId = answer.domainId;
//                   //t_Answers[i].sequence = answer.sequence;
//                   t_Answers[i].value = answer.value;
//                   t_Answers[i].riskValue = answer.riskValue;
//                   t_Answers[i].rationale = answer.rationale;
//                   t_Answers[i].dateCreated = answer.dateCreated;
//                   t_Answers[i].dateModified = answer.dateModified;
//                   t_Answers[i].id = answer._id;
//                 }
//               }
//               answers = t_Answers;
//               t_Answers = []
//               //console.log(answers);
//               return answers
//                 //this.domains = this.sortDomainList();
//                 //return transformedDomns;
//               // const answer = new Answer(
//               //         result.obj.projectId, 
//               //         result.obj.domainId,[]
//               //         result.obj.sequence,
//               //         result.obj.value,
//               //         result.obj.riskValue,
//               //         result.obj.rationale,
//               //         result.obj.dateCreated,
//               //         result.obj.dateModified,
//               //         result.obj._id);
//               // this.answers.push(answer);
//               // this.answers = this.sortList();
//               // // this.projectIsUpdated.emit(true)
//               // return this.answers;
//             })
//             //.catch((error: Response) => Observable.throw(error));
// }
// // getAnswer(domainId, sequence){
// //   // use pid
// // }
// updateAnswer(answer: Answer){
// }
// addAnswer(answer: Answer){
//     const headers = new Headers({'content-Type': 'application/json'})
//     const body = JSON.stringify(answer)
//     const token = localStorage.getItem('token') 
//         ? '?token=' + localStorage.getItem('token')
//         : '';
//     return this.http.post('/answers' + token, body, {headers: headers})
//             .map((response: Response) => {
//                 const result = response.json();
//                 const answer = new Answer(
//                         result.obj.projectId, 
//                         result.obj.domainId,
//                         result.obj.sequence,
//                         result.obj.value,
//                         result.obj.riskValue,
//                         result.obj.rationale,
//                         result.obj.dateCreated,
//                         result.obj.dateModified,
//                         result.obj._id);
//                 return answer;
//             })
//             .catch((error: Response) => Observable.throw(error));
// }
