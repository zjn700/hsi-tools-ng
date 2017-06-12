import { Component, OnInit } from '@angular/core';
import { IntegrationService } from './intgrn.service';
import { Integration } from './intgrn.model';
import { DomainService } from '../domn/domn.service';
import { ProjectService } from '../proj/proj.service';

@Component({
  selector: 'app-intgrn',
  templateUrl: './intgrn.component.html',
  styleUrls: ['./intgrn.component.css']
})
export class IntgrnComponent implements OnInit {
  private projectTitle:string;
  private qnnTitle:string;
  private evaluationTitle:string;
  private activeEvaluation:Integration;
  private showHeuristics:boolean = true;
  private domainList:string[] = [];
  private showForm = false;
  private showErrorMessage = false;
  private isInEditMode=false;
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
              private integrationService: IntegrationService) { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
    this.qnnTitle = localStorage.getItem('qnnTitle')
    
    // this.integrationService.setActiveIntegration
    //   .subscribe((integration)=>{
    //     this.evaluationTitle = integration.title;
    //     this.activeEvaluation = integration;
    //   })
    
    this.integrationService.updateActiveIntegration
      .subscribe((integration)=>{
        this.evaluationTitle = integration.title;
        this.activeEvaluation = integration;
        console.log('this.activeEvaluation000000000000')
        console.log(this.activeEvaluation)
        this.showHeuristics=false;
        this.showErrorMessage = false;
      })

    this.integrationService.editEvauationTitle
      .subscribe((integration)=>{
        this.evaluationTitle = integration.title;
        this.activeEvaluation = integration;
        this.onClear()
        for (var i=0; i < integration.domainList.length; i++) { 
          this.domainList.push(integration.domainList[i])
          this.toggleByTitle(integration.domainList[i])
        }
        console.log('this.domainList9999999')
        console.log(this.domainList)
        this.onAddHeuristic()
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
    let total = 0
    let t_integrations = this.integrationService.getIntegrations();
    for (var i=0; i < t_integrations.length; i++) {
      for (var j=0; j < t_integrations[i].domainList.length; j++) {
        for (var k=0; k < this.domainList.length; k++) {
          if (this.domainList[k] == t_integrations[i].domainList[j]) {
            total++
          }
        }
      }
      if (total ==  this.domainList.length) {
        return i
      } else {
        total = 0;
      }
    }
    return null
  }
  
  goToEvaluation(){
    if (this.domainList.length < 2 ){
      this.showErrorMessage = true;
    } else {
      let index = this.checkDomainListForDuplicates()
      if ( index != null) {
        this.evaluationTitle = this.buildEvaluationTitle()
        this.integrationService.updateIntegration(index, this.domainList, this.evaluationTitle);
        this.showHeuristics=false;
        this.showErrorMessage = false;
      } else {
        this.evaluationTitle = this.buildEvaluationTitle();
        this.showHeuristics=false;
        this.showErrorMessage = false;
        this.integrationService.addIntegration(this.domainList, this.evaluationTitle)
      }
    }
  }
  
  onHideMe(){
    this.showHeuristics=true;
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
  
  toggleMe(item){
    console.log(<HTMLElement>item.id)
    console.log(item.classList)

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
 
  updateDomainList(title){
    var wasNotInList = true;
    for (var i=0; i < this.domainList.length; i++) {
      if (this.domainList[i] == title) {
        this.domainList.splice(i, 1);
        wasNotInList = false;
        console.log(this.domainList)
        return;
      }
    }
    if (wasNotInList) { 
      this.domainList.push(title)
    }
    if (this.domainList.length >= 2) {
        this.showErrorMessage = false;
    }
    console.log(this.domainList)
    
  }
 
  toggleMPT(){
    //this.showErrorMessage = false;
    //this.domainList = [];
    this.onClear();
    this.mp = true;
    this.pe = true;
    this.tr = true;
    this.updateDomainList('Manpower')
    this.updateDomainList('Personnel')
    this.updateDomainList('Training')
  }
  
  toggleESOH(){
    //this.showErrorMessage = false;
    //this.domainList.length = 0;
    this.onClear();
    this.sa = true;
    this.oh = true;
    this.en = true;
    this.updateDomainList('Environment')
    this.updateDomainList('Safety')
    this.updateDomainList('Occupational Health')
    //this.evaluationTitle = this.buildEvaluationTitle()

  }
 
  onClear() {
    this.domainList.length = 0;
    this.showErrorMessage = false
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

  onAddHeuristic(){
    this.showForm=!this.showForm
    //this.inEditMode = false;
    //this.isError=false;
    window.scrollTo(0, 0);
    if (this.showForm) {
        //this.focusOnTitleInput()
    }
  }

}
