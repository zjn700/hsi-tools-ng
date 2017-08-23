import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import "rxjs/add/operator/takeWhile";

import { IntegrationService } from './intgrn.service';
import { Integration } from './intgrn.model';
import { DomainService } from '../domn/domn.service';
import { ProjectService } from '../proj/proj.service';
import { TopMenuService } from '../shared/top-menu.service';

@Component({
  selector: 'app-intgrn',
  templateUrl: './intgrn.component.html',
  styleUrls: ['./intgrn.component.css']
})
export class IntgrnComponent implements OnInit, OnDestroy {
  // internal
  private domainList:string[] = [];
  private integrations: Integration[] = [];
  // output
  private projectTitle:string;
  private qnnTitle:string;
  private evaluationTitle:string;
  private activeEvaluation:Integration;
  // state:
  public showHeuristics:boolean = true;  // also output
  public showForm:boolean = false;
  private showErrorMessage:boolean = false;
  private showDupeErrorMessage:boolean = false
  private pauseForDupe:boolean = false
  private isInEditMode:boolean = false;
  private alive:boolean = true;
  public isInitialized = false;

  // checkboxes:
  private mp:boolean=false;
  private sa:boolean=false;
  private pe:boolean=false;
  private oh:boolean=false;
  private tr:boolean=false;
  private su:boolean=false;
  private hu:boolean=false;
  private ha:boolean=false;
  private en:boolean=false;
  
  constructor(private domnService: DomainService, 
              private projectService: ProjectService,
              private integrationService: IntegrationService,
              private router: Router,
              private topMenuService: TopMenuService) { }

  ngOnDestroy() {
    this.alive = false;
  }
  
  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
    this.qnnTitle = localStorage.getItem('qnnTitle')

    // this.integrationService.getIntegrationsFromDb()
    //   .takeWhile(() => this.alive)
    //   .subscribe(
    //     (integrations: Integration[]) => {
    //       this.integrations = integrations; 
    //       this.isInitialized = true;
    //     }
    //   );

    if (this.projectService.activeProject)  {
      // console.log('this.projectService.activeProject.state.url')
      // console.log(this.projectService.activeProject.state.url)
      this.projectService.activeProject.state.url = location.pathname;
      this.projectService.activeProject.state.dateModified = new Date();
      this.projectService.projectIsUpdated.emit(true);
        //this.projectService.activeProject.state = t_state;
    }


    this.integrationService.updateActiveIntegration
      .takeWhile(() => this.alive)
      .subscribe((integration)=>{
        this.evaluationTitle = integration.title;
        this.activeEvaluation = integration;
        this.showHeuristics=false;
        this.showErrorMessage = false;
        this.showDupeErrorMessage = false;

      })

    this.integrationService.editEvauationTitle
      .takeWhile(() => this.alive)
      .subscribe((integration)=>{
        this.evaluationTitle = integration.title;
        this.activeEvaluation = integration;
        this.clearAll()
        for (var i=0; i < integration.domainList.length; i++) { 
          this.domainList.push(integration.domainList[i])
          this.toggleByTitle(integration.domainList[i])
        }
        this.isInEditMode = true;
        this.showForm=!this.showForm
        window.scrollTo(0, 0);
      })      
  }
  
  buildEvaluationTitle() {
    let t_title = ''
    for (var i=0; i < this.domainList.length; i++) {
      t_title += this.domainList[i]
      if (i < this.domainList.length -1) {
        t_title += ' vs '
      }
    } 
    return t_title
  }
  
  checkDomainListForDuplicates() {
    // console.log('checkDomainListForDuplicates')
    let total = 0
    let t_integrations = this.integrationService.getIntegrations();
    
    // if (t_integrations.length==0) {
    //           this.router.navigate(['/project']);
    //           this.topMenuService.updateTopMenu('/project')
              
    //           return null
    //     }
    
    // this.integrationService.getIntegrationsFromDb()
    //   .subscribe((integrations:Integration[])=>{
    //     let total = 0;
    //     let t_integrations = integrations;
    //     for (var i=0; i < t_integrations.length; i++) {
    //       for (var j=0; j < t_integrations[i].domainList.length; j++) {
    //         for (var k=0; k < this.domainList.length; k++) {
    //           if (this.domainList[k] == t_integrations[i].domainList[j]) {
    //           total++
    //           }
    //         }
    //       }
    //       if (total ==  this.domainList.length && total == t_integrations[i].domainList.length) {
    //         return i
    //       } else {
    //         total = 0;
    //       }
    //     }
    //     return null
    //   })
    for (var i=0; i < t_integrations.length; i++) {
      for (var j=0; j < t_integrations[i].domainList.length; j++) {
        for (var k=0; k < this.domainList.length; k++) {
          if (this.domainList[k] == t_integrations[i].domainList[j]) {
            total++
          }
        }
      }
      if (total ==  this.domainList.length && total == t_integrations[i].domainList.length) {
        return i
      } else {
        total = 0;
      }
    }
    return null
  }
  
  
  checkDomainListForDuplicatesx() {
    // console.log('checkDomainListForDuplicates')
    //let total = 0
    //let t_integrations = this.integrationService.getIntegrations();
    this.integrationService.getIntegrationsFromDb()
      .subscribe((integrations:Integration[])=>{
        let total = 0;
        // console.log("integrations")
        // console.log(integrations)
        
        let t_integrations = integrations;
        for (var i=0; i < t_integrations.length; i++) {
          for (var j=0; j < t_integrations[i].domainList.length; j++) {
            for (var k=0; k < this.domainList.length; k++) {
              if (this.domainList[k] == t_integrations[i].domainList[j]) {
               total++
              }
            }
          }
          if (total ==  this.domainList.length && total == t_integrations[i].domainList.length) {
            return i
          } else {
            total = 0;
          }
        }
        return null
      })
    // for (var i=0; i < t_integrations.length; i++) {
    //   for (var j=0; j < t_integrations[i].domainList.length; j++) {
    //     for (var k=0; k < this.domainList.length; k++) {
    //       if (this.domainList[k] == t_integrations[i].domainList[j]) {
    //         total++
    //       }
    //     }
    //   }
    //   if (total ==  this.domainList.length && total == t_integrations[i].domainList.length) {
    //     return i
    //   } else {
    //     total = 0;
    //   }
    // }
    // return null
  }
  
  goToEvaluation(){                     // save button or edit title button clicked
    if (this.domainList.length < 2 ){   // need 2 domains for valid response
      this.showErrorMessage = true;
      this.showDupeErrorMessage = false;

    } else {                            // if at least 2 domains selected
      if (this.isInEditMode){           // ...if edit title button was pressed
        let index = this.checkDomainListForDuplicates()
        if ( index != null) {           // there is a dupe
          this.isInEditMode = false;
          this.showDupeErrorMessage = true;
          this.pauseForDupe = !this.pauseForDupe

        } else {
            this.evaluationTitle = this.buildEvaluationTitle()
            this.activeEvaluation.title = this.evaluationTitle;
            this.activeEvaluation.domainList.length = 0;
            for (var i=0; i < this.domainList.length; i++) { 
              this.activeEvaluation.domainList.push(this.domainList[i])
              this.toggleByTitle(this.domainList[i])
            }            
            this.integrationService.updateEvalDateModifiedById(this.activeEvaluation.id);
            
            this.isInEditMode = false;
            this.showHeuristics=false;
            this.showErrorMessage = false;
            this.showDupeErrorMessage = false;
        }
      } else {
        let index = this.checkDomainListForDuplicates()
        if ( index != null) {
          this.pauseForDupe = !this.pauseForDupe
          if (this.pauseForDupe) {
            this.showDupeErrorMessage = true;
          } else {
            this.evaluationTitle = this.buildEvaluationTitle()
            // if (this.activeEvaluation.archived) {
            //   this.activeEvaluation.archived = false
            // }
            this.integrationService.updateIntegration(index, this.domainList, this.evaluationTitle);
            
            this.showHeuristics=false;
            this.showErrorMessage = false;
            this.showDupeErrorMessage = false;
          }
        } else {
          this.evaluationTitle = this.buildEvaluationTitle();
          this.integrationService.addIntegration(this.domainList, this.evaluationTitle)
         
          this.showHeuristics=false;
          this.showErrorMessage = false;
          this.showDupeErrorMessage = false;
        }
      }
    }
  }
  
  toggleByTitle(title){
    switch(title) {
    case 'Manpower':
      this.mp = true;
      break;
    case 'Safety':
      this.sa = true;
      break;
    case 'Personnel':
      this.pe = true;
      break;
    case 'Occupational Health':
      this.oh = true;
      break;
    case 'Training':
      this.tr = true
      break;
    case 'Survivability':
      this.su = true;
      break;
    case 'Human Factors':
      this.hu = true;
      break;
    case 'Habitability':
      this.ha = true;
      break;
    case 'Environment':
      this.en = true
      break;
    }
  }
  
  toggleCheckbox(item){
    switch(item.id) {
    case 'mp':
      this.mp = !this.mp;
      this.updateDomainList('Manpower')
      break;
    case 'sa':
      this.sa = !this.sa;
      this.updateDomainList('Safety')
      break;
    case 'pe':
      this.pe = !this.pe;
      this.updateDomainList('Personnel')
      break;
    case 'oh':
      this.oh = !this.oh;
      this.updateDomainList('Occupational Health')
      break;
    case 'tr':
      this.tr = !this.tr
      this.updateDomainList('Training')
      break;
    case 'su':
      this.su = !this.su;
      this.updateDomainList('Survivability')
      break;
    case 'hu':
      this.hu = !this.hu;
      this.updateDomainList('Human Factors')
      break;
    case 'ha':
      this.ha = !this.ha;
      this.updateDomainList('Habitability')
      break;
    case 'en':
      this.en = !this.en;
      this.updateDomainList('Environment')
      break;
    }
  }
 
  updateDomainList(domainTitle){   // if the domain is in the list, remove it; if not, add it
    var wasNotInList = true;
    for (var i=0; i < this.domainList.length; i++) {
      if (this.domainList[i] == domainTitle) {
        this.domainList.splice(i, 1);
        wasNotInList = false;
        return;
      }
    }
    if (wasNotInList) { 
      this.domainList.push(domainTitle)
    }
    if (this.domainList.length >= 2) {
        this.showErrorMessage = false;
    }
  }
 
  toggleMPT(){   // MPT button clicked
    this.clearAll();
    this.mp = true;
    this.pe = true;
    this.tr = true;
    this.updateDomainList('Manpower')
    this.updateDomainList('Personnel')
    this.updateDomainList('Training')
  }
  
  toggleESOH(){  // ESOH button clicked
    this.clearAll();
    this.sa = true;
    this.oh = true;
    this.en = true;
    this.updateDomainList('Environment')
    this.updateDomainList('Safety')
    this.updateDomainList('Occupational Health')
  }
 
  clearAll() {
    this.domainList.length = 0;
    this.showErrorMessage = false
    this.showDupeErrorMessage = false
    this.mp = false;
    this.sa = false;
    this.pe = false;
    this.oh = false;
    this.tr = false;
    this.su = false;
    this.hu = false;
    this.ha = false;
    this.en = false;    
  }

  addEval(){
    this.showForm=!this.showForm
    this.clearAll();
    window.scrollTo(0, 0);
  }
  
  onHideMe(){
    this.showHeuristics=true;
    this.showForm=false;
  }
  
}
