import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs'

import { Integration } from './intgrn.model';

@Injectable()
export class IntegrationService {
  // questionSelected = new EventEmitter<Question>();
  // textInputSelected = new EventEmitter<boolean>();
  private dbAccessed:boolean = false;
  
  private integrations:Integration[] = [];
  public updatedIntegrationList = new EventEmitter<Integration[]>();
  public updateActiveIntegration = new EventEmitter<Integration>();
  public editEvauationTitle = new EventEmitter<Integration>();
  public lastActiveProject:string = '';
  public lastActiveQnn:string = '';
    
  constructor(private http: Http) { }

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
  
  getIntegrations(){
    return this.integrations
  }
  
  getIntegrationsFromDb(){
    if (!this.updateRequired()) {
       console.log('update not Required')
       console.log(this.integrations)
        return this.http.get('/integrations/dummy')  // returns nothing, but creates the required observable
            .map((response:Response)=> {
                console.log('none')
                return this.integrations  // pass back the current integration array
            })
    } else {
        console.log('update Required');
        this.integrations.length = 0;
        //const queryString = '/'+ sequence +'?projectId=' + localStorage.getItem('pid') + '&qnnId=' + localStorage.getItem('qnnId')
        const queryString = '?projectId=' + localStorage.getItem('pid') + '&qnnId=' + localStorage.getItem('qnnId')
        return this.http.get('/integrations' + queryString)      
            .map((response: Response) => {
                console.log('intgrn response')
                console.log(response)
                if (response.json().obj.length == 0) {
                    this.integrations = response.json().obj;
                    console.log('response.json()')
                    console.log(response.json())
                    this.lastActiveProject=localStorage.getItem('pid')       
                    this.lastActiveQnn=localStorage.getItem('qnnId')                      
                    return this.integrations;
                } 
                const integrations = response.json().obj;
                let t_integrations: Integration[] = [];
                //let i = 0;
                for (let integration of integrations) {
                    t_integrations.push(new Integration (
                        integration.projectId,
                        integration.qnnId,
                        integration.domainList,
                        integration.title,
                        // convert from iso date format -- for sorting
                        integration.dateCreated = new Date(integration.dateCreated),
                        integration.dateModified = new Date(integration.dateModified),
                        integration.archived,
                        integration._id,
                        integration.risksIssuesConcerns,
                        integration.mitigationStrategy))
                        //i++
                }
                this.integrations = t_integrations;
                this.dbAccessed = true;
                
                this.lastActiveProject=localStorage.getItem('pid')       
                this.lastActiveQnn=localStorage.getItem('qnnId')                 
                return t_integrations;
            })
            //.catch((error: Response) => Observable.throw(error));
    }
  }  
  
  getSortedEvals(){
    this.sortEvalList();
    this.updatedIntegrationList.emit(this.integrations)
  }
  
  addIntegration(domainList: string[], title: string){
    console.log('in addIntegration');
    console.log(domainList)
    let t_domainList = [];
    for (let title of domainList) {
      t_domainList.push(title)
    }
    let t_date = new Date();
    let t_integration = new Integration(
        localStorage.getItem('pid'),
        localStorage.getItem('qnnId'),
        t_domainList,
        title,
        t_date,
        t_date,
        false
        //new Date(t_date).getTime().toString()
      )
    
    this.addIntegrationToDb(t_integration)
      .subscribe((response)=>{
        console.log('response')
        console.log(response)
        console.log(t_integration)
        t_integration.id = response.obj._id
        
        this.integrations.push(t_integration);
        this.setActiveIntegration(t_integration.id);
        this.sortEvalList();
        this.updatedIntegrationList.emit(this.integrations)        
        
      })
      
      
    // this.integrations.push(t_integration);
    // this.setActiveIntegration(t_integration.id);
    // this.sortEvalList();
    // this.updatedIntegrationList.emit(this.integrations)

  }
  
  testAddToDb(){
    return this.http.get('/integrations/dummy')  // returns nothing, but creates the required observable
        .map((response:Response)=> {
          return response
            //return this.projects  // pass back the current domain array
        })    
  }
  
  addIntegrationToDb(evaluation){
    // //project = this.addState(project)
    
    const headers = new Headers({'content-Type': 'application/json'})
    const body = JSON.stringify(evaluation)
    const token = localStorage.getItem('token') 
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.post('/integrations' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result;
            })
            .catch((error: Response) => Observable.throw(error));    
  }
  
  updateEvalDateModifiedById(evalId){
    for (var i=0;i < this.integrations.length; i++) {
      if (this.integrations[i].id == evalId) {
        this.integrations[i].dateModified = new Date();
        this.sortEvalList();
        this.updateIntegrationInDb(this.integrations[i])
          .subscribe(()=>{
              this.updatedIntegrationList.emit(this.integrations)

          })
        //this.updatedIntegrationList.emit(this.integrations)
      }
    }
  }
  
  updateIntegration(index, domainList: string[], title) {
    let t_domainList = [];
    for (let title of domainList) {
      t_domainList.push(title)
    }
    this.integrations[index].domainList = t_domainList;
    this.integrations[index].title =  title;
    this.integrations[index].dateModified = new Date();
    this.setActiveIntegration(this.integrations[index].id)
    this.sortEvalList();
    console.log('before updateIntegrationInDb')
    this.updateIntegrationInDb(this.integrations[index])
      .subscribe(()=>{
        console.log('return updateIntegrationInDb')
        this.updatedIntegrationList.emit(this.integrations)
      })
    //this.updatedIntegrationList.emit(this.integrations)
  }
  
  updateIntegrationInDb(integration: Integration) {
      console.log('integration')
      console.log(integration)
      if (integration) {
          const headers = new Headers({'content-Type': 'application/json'})
          const body = JSON.stringify(integration);
          const token = localStorage.getItem('token') 
              ? '?token=' + localStorage.getItem('token')
              : '';
          return this.http.patch('/integrations/' + integration.id + token, body, {headers: headers})
                  .map((response: Response) => {
                      response.json();
                      console.log('response.json()')
                      console.log(response.json())
                      //this.projectIsUpdated.emit(true);
                      //this.projects = this.sortProjectList();
                      
                  })
                  .catch((error: Response) => Observable.throw(error)); 
      }
  }  
  
  
  archiveEvaluation(integration: Integration) {
      console.log('integration')
      console.log(integration)
      if (integration) {
          const headers = new Headers({'content-Type': 'application/json'})
          const body = JSON.stringify(integration);
          const token = localStorage.getItem('token') 
              ? '?token=' + localStorage.getItem('token')
              : '';
          return this.http.patch('/integrations/archive/' + integration.id + token, body, {headers: headers})
                  .map((response: Response) => {
                      response.json();
                      console.log('response.json()')
                      console.log(response.json())
                      //this.projectIsUpdated.emit(true);
                      //this.projects = this.sortProjectList();
                      
                  })
                  .catch((error: Response) => Observable.throw(error)); 
      }
  }
    
  
  setActiveIntegration(integrationId) {
    for (var i=0; i < this.integrations.length; i++) {
      if (this.integrations[i].id == integrationId ) {
          console.log(this.integrations[i])
          this.updateActiveIntegration.emit(this.integrations[i]);
          return;
      }
    }
    //this.updateActiveIntegration.emit(integration)
  }
  
  editThisEvaluationTitle(evaluationId){
     for (var i=0; i < this.integrations.length; i++) {
      if (this.integrations[i].id == evaluationId ) {
          console.log(this.integrations[i])
          this.sortEvalList();
          return this.editEvauationTitle.emit(this.integrations[i])
      }
    }   
  }
  
  archiveThisEvaluation(evaluation) {
      this.archiveEvaluation(evaluation)
            .subscribe(()=>{
                return this.updatedIntegrationList.emit(this.integrations)
            })
  }
    
  //   for (var i=0; i < this.integrations.length; i++) {
  //     if (this.integrations[i].id == evaluation.id ) {
  //         this.integrations.splice(i, 1);
  //         // this.deleteIntegration(evaluation)
  //         this.archiveEvaluation(evaluation)
  //           .subscribe(()=>{
  //               return this.updatedIntegrationList.emit(this.integrations)
  //           })
          
  //         //return this.updatedIntegrationList.emit(this.integrations)
  //     }
  //   }    
  // }
 
  deleteIntegration(evaluation: Integration){
      const token = localStorage.getItem('token') 
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.delete('/integrations/' + evaluation.id + token)
          .map((response: Response) => {
              console.log(response.json())
          })
          .catch((error: Response) => Observable.throw(error)); 
  } 
 
  
  sortEvalList() {  // reverse chrono order -- newest first
      console.log('sorting...')
     return  this.integrations.sort(function(a, b){
              //if ( a.title > b.title ) {
              if ( a.dateModified > b.dateModified) {
                  return -1;}
              if ( a.dateModified < b.dateModified ) {
                  return 1;}
              return 0;
            })
  }  
  
  
}