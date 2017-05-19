import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Domain } from './domn.model';
import { Question } from '../card/qstn/qstn.model';
import { Answer } from '../card/ansr/ansr.model';

@Injectable()
export class DomainService {
    private questions: Question[] = [];
    private domains: Domain[] = [];

    constructor(private http: Http) { }

    getOneAnswer(domain, sequence){
        const queryString = '/'+ sequence +'?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id
        this.http.get('/answers' + queryString)
            .map((response: Response) => {
                console.log(response)
            })
    }

    getDomains(){
        return this.http.get('/domain/' + localStorage.getItem('qnnId'))
            .map((response: Response) => {
                if (response.json().obj.length == 0) {
                    console.log("response is empty");
                    return this.questions = response.json().obj;
                } 
                const domains = response.json().obj;
                let t_domains: Domain[] = [];
                for (let domain of domains) {
                    let t_Answers: Answer[] = []
                    t_domains.push(new Domain(
                        domain.qnn,
                        domain.title,
                        domain.sequence,
                        domain._id,
                        domain.questions,
                        t_Answers))
                }
                ////new
                let j = 0;
                for (let domain of t_domains) {
                    this.addDomainAnswers(domain)
                        .subscribe(answers => {
                            domain.answers = answers
                    })
                }
                        
                this.domains = t_domains
                return this.domains
            })
            .catch((error: Response) => Observable.throw(error));
    }    
    
    addDomainAnswers(domain){
        let t_domain = domain;
        //for (let domain of t_domains) {
            const queryString = '?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id;
            return this.http.get('/answers' + queryString)
                .map((response: Response) => {
                    let answers = response.json().obj;
                    let t_Answers: Answer[] = [];
                    for (let i=0; i < domain.questions.length; i++) {
                      t_Answers.push(new Answer(
                          localStorage.getItem('pid'), 
                          domain.id,
                          i+1,
                          null));
                    }     
                    if (t_Answers.length > 0 ) {  //response.json().obj.length != 0) {
                      for (let answer of answers) {
                         let i = answer.sequence-1;
                         t_Answers[i].value = answer.value;
                         t_Answers[i].riskValue = answer.riskValue;
                         t_Answers[i].rationale = answer.rationale;
                         t_Answers[i].dateCreated = answer.dateCreated;
                         t_Answers[i].dateModified = answer.dateModified;
                         t_Answers[i].id = answer._id;
                      }
                    }                   
                    //need to add in actual answers returned from query
                    //domain.answers = t_Answers
                    return t_Answers    //t_domains
                })
    }
    
    getDomainQuestions(domainId){
        return this.http.get('/domain/questions/' + domainId)
            .map((response: Response) => {
                if (response.json().obj.length == 0) {
                    return this.questions = response.json().obj;
                } 
                const questions = response.json().obj.questions;
                let transformedQstns: Question[] = [];
                for (let question of questions) {
                    transformedQstns.push(new Question(
                        question.sequence,
                        question.content))
                }
                this.questions = transformedQstns;
                return transformedQstns;
            })
            .catch((error: Response) => Observable.throw(error));
    }
    
    
    sortDomainList() {   // alpabetical order
       return  this.domains.sort(function(a, b){
                if ( a.sequence < b.sequence ) {
                    return -1;}
                if ( a.sequence > b.sequence ) {
                    return 1;}
                return 0;
              })
    }

}