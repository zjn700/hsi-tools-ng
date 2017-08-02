import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Domain } from '../domn/domn.model'

@Injectable()
export class AdminToolsService { 
    
    public qnns;
    public domains:Domain[] = [] ;
    public qnnListIsReady = new EventEmitter<boolean>();
    public qnnListIsLoaded = false;
    public qnnIsInitialized:boolean = false;
    public domainIsInitialized:boolean = false;

    public currentQnn = null
    public currentDomain = null;

    constructor(private http: Http) {}
    
    getDomains(){ 
        if (this.domains.length == 0) {
            return this.http.get('/admindomains/' + this.currentQnn._id) 
                .map((response: Response) => {
                    console.log(response);
                    //console.log(response.json().obj);
                    this.domains = response.json().obj
                    console.log(this.domains);
                    this.domainIsInitialized = true;
                    return this.domains
    
            })
            .catch((error: Response) => {Observable.throw(error); return []});
        }
        console.log('no fetch')
        return this.http.get('/domain/dummy')  // returns nothing, but creates the required observable
                .map((response:Response)=> {
                    //this.allQuestionsLoaded = true;
                    return this.domains   // pass back the current domain array
                })
    }

    getQnns(){ 
        if (this.qnns == null) {
            return this.http.get('/adminqnns') 
                .map((response: Response) => {
                    console.log(response);
                    //console.log(response.json().obj);
                    this.qnns = response.json().obj;
                    this.sortQnns(this.qnns)
                    console.log(this.qnns)
                    this.qnnListIsReady.emit(true);
                    this.qnnListIsLoaded = true;
                    this.qnnIsInitialized = true;
                    return this.qnns

            })
            .catch((error: Response) => Observable.throw(error));
        }
        return this.http.get('/domain/dummy')  // returns nothing, but creates the required observable
                .map((response:Response)=> {
                    //this.allQuestionsLoaded = true;
                    return this.qnns   // pass back the current domain array
                })        
    }
    
    addDomain(domain: Domain){
        
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(domain)
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('/admindomains' + token, body, {headers: headers})
                .map((response: Response) => {
                    const result = response.json();
                    const domain = new Domain(
                        result.obj.qnn, 
                        result.obj.title,
                        result.obj.sequence,
                        result.obj._id);
                    this.domains.push(domain);
                    this.domains = this.sortDomains(this.domains);
                    // this.projectIsUpdated.emit(true)
                    // localStorage.removeItem('qnnId')
                    return domain;
                })
                .catch((error: Response) => Observable.throw(error));
    }

    isInitialized(){
       return this.qnnIsInitialized && this.domainIsInitialized
    }
    
    getQnnList(){
        return this.qnns
    }
    
    setActiveQnn(qnn){
        this.currentQnn = qnn;
    }

    getActiveQnn(){
        return this.currentQnn
    }
    
    getDomainList(){
        return this.domains
    }
    
    sortQnns(qnnList) {  // reverse alpabetical order
        console.log('sorting...')
        return  qnnList.sort(function(a, b){
                if ( a.category < b.category) { return -1;}
                if ( a.category > b.category ) { return 1;}
                if ( a.sequence < b.sequence) { return -1;};
                if ( a.sequence > b.sequence ) { return 1;};
                return 0;
              })
    }
    
    sortDomains(domains) {  // reverse alpabetical order
        console.log('sorting...')
        return  domains.sort(function(a, b){
                if ( a.sequence < b.sequence) { return -1;};
                if ( a.sequence > b.sequence ) { return 1;};
                return 0;
              })
    }
}