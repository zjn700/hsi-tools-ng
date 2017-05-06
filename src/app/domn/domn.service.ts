import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Domain } from './domn.model';
import { Question } from '../card/qstn/qstn.model'

@Injectable()
export class DomainService {
    private questions: Question[] = [];
    private domains: Domain[] = [];
    
    constructor(private http: Http) { }
    
    getDomains(){
        console.log('in getDomain')
        return this.http.get('/domain/' + localStorage.getItem('qnnId'))
            .map((response: Response) => {
                if (response.json().obj.length == 0) {
                    console.log("response is empty");
                    return this.questions = response.json().obj;
                } 
                const domains = response.json().obj;
                let transformedDomns: Domain[] = [];
                for (let domain of domains) {
                    transformedDomns.push(new Domain(
                        domain.qnn,
                        domain.title,
                        domain.sequence,
                        domain._id,
                        domain.questions))
                }
                this.domains = transformedDomns;
                //this.domains = this.sortDomainList();

                return transformedDomns;
            })
            .catch((error: Response) => Observable.throw(error));
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