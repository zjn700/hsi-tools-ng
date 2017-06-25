import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { IntegrationService } from '../intgrn.service';
import { Integration } from '../intgrn.model';

@Component({
  selector: 'app-intgrn-completed',
  templateUrl: './intgrn-completed.component.html',
  styleUrls: ['./intgrn-completed.component.css']
})
export class IntgrnCompletedComponent implements OnInit, OnDestroy {
  
  @Input() projectTitle:string;
  @Input() qnnTitle:string;
  @Output() hideMe:EventEmitter<boolean> = new EventEmitter<boolean>();  
  private integrations: Integration[] = [];
  private alive: boolean = true;
  private isInitialized = false;

  constructor(private integrationService: IntegrationService) { }

  ngOnDestroy() {
    this.alive =false;
  }
  ngOnInit() {
    //this.integrations = this.integrationService.getIntegrations()
    this.integrationService.getIntegrationsFromDb()
      .subscribe((integrations: Integration[])=>{
        console.log('completed')
        this.integrations = integrations;
        this.isInitialized = true;
        
      })
    
    this.integrationService.updatedIntegrationList
      .subscribe((integrations: Integration[])=> {
        this.integrations = integrations;
      })
  }

  hideCompleted(){
    this.hideMe.emit(true)
  }
  
  onResumeEvaluation(evaluation){
    this.integrationService.setActiveIntegration(evaluation.id)
  }
  
  onEdit(evaluation){
    this.integrationService.editThisEvaluationTitle(evaluation.id)
  }
 
  onArchive(evaluation){
    this.integrationService.archiveThisEvaluation(evaluation)
    
  } 
  
}
