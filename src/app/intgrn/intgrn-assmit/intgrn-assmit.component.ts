import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import "rxjs/add/operator/takeWhile";

import { IntegrationService } from '../intgrn.service';
import { Integration } from '../intgrn.model';

@Component({
  selector: 'app-intgrn-assmit',
  templateUrl: './intgrn-assmit.component.html',
  styleUrls: ['./intgrn-assmit.component.css']
})
export class IntgrnAssmitComponent implements OnInit, OnDestroy {

  @Input() showHeuristics:boolean
  @Input() projectTitle:string;
  @Input() qnnTitle:string;
  @Input() evaluationTitle:string;
  @Input() activeEvaluation:Integration;
  @Output() hideMe:EventEmitter<boolean> = new EventEmitter<boolean>();
  public myForm: FormGroup;
  public showCompleted=false;
  private integration: Integration;
  private alive: boolean = true;


  constructor(private integrationService: IntegrationService, private router:Router) { }

  ngOnInit() {
    // console.log('this.activeEvaluation');
    // console.log(this.activeEvaluation);
    
    this.myForm = new FormGroup({
      risks: new FormControl(null),
      strategy: new FormControl(null)
    })
  }
  
  ngOnDestroy(){
    this.alive = false;
  }
  
  updateAnswer(input){
    switch (input.id) {
    case 'risks':
      this.activeEvaluation.risksIssuesConcerns=input.value;
      //this.activeEvaluation.dateModified = new Date();
      break;
    case 'strategy':
      this.activeEvaluation.mitigationStrategy=input.value;
      //this.activeEvaluation.dateModified = new Date();
      break;  
    }
    this.integrationService.updateEvalDateModifiedById(this.activeEvaluation.id)

    
  }
  
  onClickPrev(){
    this.hideMe.emit(true)
  }
  
  onClickNext(){
    //this.showCompleted = true;
  }
  
  onHideMe() {
    this.showCompleted=false;
  }
  
  onRestore(evaluation){
    evaluation.archived = false;
    this.integrationService.archiveThisEvaluation(evaluation)

  }
  
  onCancel() {
     this.hideMe.emit(true)


  }

}
