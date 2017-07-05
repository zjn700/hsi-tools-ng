import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { ProjectService } from '../proj/proj.service'
import { Domain } from './domn.model';
import { Question } from '../card/qstn/qstn.model';
import { Answer } from '../card/ansr/ansr.model';

@Injectable()
export class DomainService {
    private questions: Question[] = [];
    private domains: Domain[] = [];
    public lastActiveProject:string = '';
    public lastActiveQnn:string = '';

    constructor(private http: Http, private projectService: ProjectService) { }

    getOneAnswer(domain, sequence){
        const queryString = '/'+ sequence +'?projectId=' + localStorage.getItem('pid') + '&domainId=' + domain.id
        this.http.get('/answers' + queryString)
            .map((response: Response) => {
                console.log(response)
            })
    }

    updateRequired(){
        if (this.lastActiveProject == localStorage.getItem('pid')) {
            if ( this.lastActiveQnn == localStorage.getItem('qnnId')){
                return false
                
            } else {
                return true;  
            }            
        } else {
            return true; 
        }
    }
    
    getDomains(){

        if (!this.updateRequired()) {
            console.log('update not Required')
            return this.http.get('/domain/dummy')  // returns nothing, but creates the required observable
                .map((response:Response)=> {
                    return this.domains   // pass back the current domain array
                })

        } else {
            console.log('update Required');
                this.domains.length = 0;  // empty the current array

        }
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
                
                // build answers array for each domain
                let j = 0;
                for (let domain of t_domains) {
                    this.addDomainAnswers(domain)
                        .subscribe(answers => {
                            domain.answers = answers
                    })
                }
                this.lastActiveProject=localStorage.getItem('pid')       
                this.lastActiveQnn=localStorage.getItem('qnnId')       
                this.domains = t_domains
                return this.domains
            })
            .catch((error: Response) => Observable.throw(error));
    }    
    
    addDomainAnswers(domain){
        let t_domain = domain;
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
                if (t_Answers.length > 0 ) {  // add answer details stored in the db
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
                console.log(t_Answers)
                return t_Answers    
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