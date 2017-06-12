import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  private myForm: FormGroup;
  private showCompleted=false;
  private integration: Integration;

  constructor(private integrationService: IntegrationService) { }

  ngOnInit() {
    console.log('this.activeEvaluation');
    console.log(this.activeEvaluation);
    
    this.myForm = new FormGroup({
      risks: new FormControl(null),
      strategy: new FormControl(null)
    })
  }
  
  ngOnDestroy(){
    
  }
  
  updateAnswer(input){
    console.log(input.id)
    console.log(input.value)
    console.log(this.myForm)
    console.log(this.myForm.value)
    switch (input.id) {
    case 'risks':
      console.log(this.activeEvaluation)
      this.activeEvaluation.risksIssuesConcerns=input.value
      break;
    case 'strategy':
      console.log(this.activeEvaluation)
      this.activeEvaluation.mitigationStrategy=input.value
      break;      
    }
    console.log(this.activeEvaluation)
    
    
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
}
