import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

@Injectable()
export class AdminToolsService { 
    
    public qnns;
    public domains;
    public qnnListIsReady = new EventEmitter<boolean>();
    public qnnListIsLoaded = false;
    public qnnIsInitialized:boolean = false;
    public domainIsInitialized:boolean = false;

    public currentQnn = null
    public currentDomain = null;

    constructor(private http: Http) {}
    
    getDomains(){ 
        if (this.domains == null) {
            return this.http.get('/domain') 
                .map((response: Response) => {
                    console.log(response);
                    //console.log(response.json().obj);
                    this.domains = response.json().obj
                    console.log(this.domains);
                    this.domainIsInitialized = true;
                    return this.domains
    
            })
            .catch((error: Response) => Observable.throw(error));
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
            return this.http.get('/questionnaires') 
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
}