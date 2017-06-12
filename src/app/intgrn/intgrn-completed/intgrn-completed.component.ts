import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IntegrationService } from '../intgrn.service';
import { Integration } from '../intgrn.model';

@Component({
  selector: 'app-intgrn-completed',
  templateUrl: './intgrn-completed.component.html',
  styleUrls: ['./intgrn-completed.component.css']
})
export class IntgrnCompletedComponent implements OnInit {
  
  @Input() projectTitle:string;
  @Input() qnnTitle:string;
  @Output() hideMe:EventEmitter<boolean> = new EventEmitter<boolean>();  
  private integrations: Integration[] = [];
  

  constructor(private integrationService: IntegrationService) { }

  ngOnInit() {
    this.integrations = this.integrationService.getIntegrations()
    
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
 
  onArchive(){
    
  } 
  
}
