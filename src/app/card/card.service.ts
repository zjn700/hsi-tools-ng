import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Domain } from '../domn/domn.model';
import { Question } from './qstn/qstn.model';
import { Answer } from './ansr/ansr.model';

@Injectable()
export class CardService {
  questionSelected = new EventEmitter<Question>();
  textInputSelected = new EventEmitter<boolean>();
  menuItemSelected = new EventEmitter<boolean>();
  answerSelected = new EventEmitter<boolean>();
  updateThisAnswer = new EventEmitter<Answer>();
  escapePressed = new EventEmitter<boolean>();
  
  private domain: Domain = null;
  private sequence: number = null;
  private answers: Answer[] = []
  
  constructor(private http: Http) { }
  
  getQuestion(question: Question) {    // for question menu
      this.questionSelected.emit(question)
  }
  
  isInTextInput(event) {   // used by TopMenuDirective & DomnComponent
    if (event.srcElement.tagName == 'TEXTAREA' || event.target.getAttribute("type") == 'text'){ 
        this.textInputSelected.emit(true)
        return true
      } else {
        this.textInputSelected.emit(false)
        return false
    }
  }
  
  emitTextInputSelected(selected) {   // used by AnsrRationlaComponent
      this.textInputSelected.emit(selected)
  }
  
  emitMenuItemSelected() {
     this.menuItemSelected.emit(true)
  }
  
  emitUpdateThisAnswer(answer: Answer ) {
        this.updateThisAnswer.emit(answer)
  }
  
  emitAnswerSelected(answer) {   // yes/no buttons
     this.answerSelected.emit(answer);
  }
  
  emitEscapePressed(value) {
    this.escapePressed.emit(value)
  }
  
  addAnswerToDb(answer: Answer){
    answer.dateCreated  = answer.dateModified
    const headers = new Headers({'content-Type': 'application/json'})
    const body = JSON.stringify(answer)
    const token = localStorage.getItem('token') 
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.post('/answers' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result
            })
            .catch((error: Response) => Observable.throw(error));
  }

  updateAnswerInDb(answer: Answer) {
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(answer);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('/answers/' + answer.id + token, body, {headers: headers})
                .map((response: Response) => {
                    const result = response.json();
                    return result
                })
                .catch((error: Response) => Observable.throw(error)); 
  }
  
  sortList(answers) {  // numerical order - lowest to highest
       return  answers.sort(function(a, b){
                if ( a.sequence < b.sequence ) {
                    return -1;}
                if ( a.sequence > b.sequence ) {
                    return 1;}
                return 0;
              })
    }
   
}  

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
  
