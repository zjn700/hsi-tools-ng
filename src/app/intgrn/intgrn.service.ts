import { Injectable, EventEmitter } from '@angular/core';
import { Integration } from './intgrn.model';

@Injectable()
export class IntegrationService {
  // questionSelected = new EventEmitter<Question>();
  // textInputSelected = new EventEmitter<boolean>();
  
  private integrations:Integration[] = [];
  public updatedIntegrationList = new EventEmitter<Integration[]>();
  public updateActiveIntegration = new EventEmitter<Integration>();
  public editEvauationTitle = new EventEmitter<Integration>();
  
  getIntegrations(){
    return this.integrations
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
        new Date(t_date).getTime().toString()
      )
    this.integrations.push(t_integration);
    this.setActiveIntegration(t_integration.id);
    this.sortEvalList();
    this.updatedIntegrationList.emit(this.integrations)

  }
  
  updateEvalDateModifiedById(evalId){
    for (var i=0;i < this.integrations.length; i++) {
      if (this.integrations[i].id == evalId) {
        this.integrations[i].dateModified = new Date();
        this.sortEvalList();
        this.updatedIntegrationList.emit(this.integrations)
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
    this.updatedIntegrationList.emit(this.integrations)
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
     for (var i=0; i < this.integrations.length; i++) {
      if (this.integrations[i].id == evaluation.id ) {
          console.log(this.integrations[i])
          this.integrations.splice(i, 1);
          return this.updatedIntegrationList.emit(this.integrations)
      }
    }    
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