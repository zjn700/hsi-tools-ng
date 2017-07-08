import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import "rxjs/add/operator/takeWhile";

import { CardService } from '../../../card/card.service';
import { Answer } from '../ansr.model'

@Component({
  selector: 'app-ansr-risk-details',
  templateUrl: './ansr-risk-details.component.html',
  styleUrls: ['./ansr-risk-details.component.css']
})
export class AnsrRiskDetailsComponent implements OnInit, OnDestroy {
  @Input() a_value:boolean = null;
  @Input() a_details;
   // Display
  //@Input() showStrategies:boolean=false;
  public showCheckboxes:boolean=false;
  public showTextAreas:boolean=false;
  
  public myForm: FormGroup;
  private alive: boolean = true;

  // Radio button groups:
  // Strategy
  public strategy:string=null;
  public ac:boolean=false;  // Accept
  public tr:boolean=false;  // Transfer
  public av:boolean=false;  // Avoid
  public co:boolean=false;  // Control
  // Impact
  public cs:boolean=false;  // Cost
  public sc:boolean=false;  // Schedule
  public pe:boolean=false;  // Performand
  // Stakeholder
  public yeS:boolean=false;  // yes
  public noS:boolean=false;  // no
  // Documented
  public yeD:boolean=false;  // yes
  public noD:boolean=false;  // no  
  
  //textAreas 
  public plan_start_content:string = '';
  public tracking_start_content:string = '';
  
  constructor(private cardService: CardService) { }
  
  ngOnDestroy(){
    this.alive=false;
  }
  
  ngOnInit() {
    this.myForm = new FormGroup({
      plan: new FormControl(null),
      tracking: new FormControl(null)
    })
  
  
  this.cardService.updatedQuestionNumber
    .takeWhile(() => this.alive)
    .subscribe((index: number) => {
        this.showCheckboxes=false;
        this.showTextAreas=false;
        console.log(this.a_details.riskDetails)
        //this.strategy = this.a_details.riskDetails.strategy
        // this.ac = false;
        // this.tr = false;
        // this.av = false;
        // this.co = false;
    })
      
    console.log('ngOnInit')
    
  }
  
  showCheckBoxes(value) {
    this.showCheckboxes = value;
    if (value) {
      console.log('this.a_details.riskDetails.strategy')
      console.log(this.a_details)
      console.log(this.a_details.riskDetails[0].strategy)
      if (this.a_details.riskDetails[0].strategy == 'av' || this.a_details.riskDetails[0].strategy == 'co') {
        this.showTextAreas = true;
      } 
    } else {
      this.showTextAreas = false;
    }
  }
  
  updateAnswer(){
    console.log('this.a_details')
    console.log(this.a_details)
    this.cardService.emitUpdateThisAnswer(this.a_details);
  }
  
  updateRadioStrategy(item){
    this.ac = false;
    this.tr = false;
    this.av = false;
    this.co = false;
    this.showCheckboxes = true;
    this.strategy=item.id;
    this.a_details.riskDetails[0].strategy = item.id; 
    this.updateAnswer();
    
    switch(item.id) {
    case 'ac':
      this.ac = true;
      this.showTextAreas = false;
      //this.updateDomainList('Manpower')
      break;
    case 'tr':
      this.tr = true;
      this.showTextAreas = false;
      //this.updateDomainList('Safety')
      break;
    case 'av':
      this.av = true;
      this.showTextAreas = true;
      //this.updateDomainList('Safety')
      break;
    case 'co':
      this.co = true;
      this.showTextAreas = true;
      //this.updateDomainList('Safety')
      break;
    }
  }
  
  updateRadioImpact(item){
    this.cs = false;
    this.sc = false;
    this.pe = false;
    this.a_details.riskDetails[0].impact = item.id; 
    this.updateAnswer();
    
    // switch(item.id) {
    // case 'cs':
    //   this.cs = true;
    //   //this.updateDomainList('Manpower')
    //   break;
    // case 'sc':
    //   this.sc = true;
    //   //this.updateDomainList('Safety')
    //   break;
    // case 'pe':
    //   this.pe = true;
    //   //this.updateDomainList('Safety')
    //   break;
    // }
  }  
  
  updateRadioStakeholders(item){
    this.yeS = false;
    this.noS = false;
    let t_val=false;
    console.log('item')
    console.log(item.id)
    if (item.id=='yeS') {
      t_val = true
    }
    this.a_details.riskDetails[0].stakeholdersInformed = t_val; 
    this.updateAnswer();
    

    // switch(item.id) {
    // case 'yeS':
    //   this.yeS = true;
    //   //this.updateDomainList('Manpower')
    //   break;
    // case 'noS':
    //   this.noS = true;
    //   //this.updateDomainList('Safety')
    //   break;
    // }
  }    

  updateRadioDocumented(item){
    this.yeD = false;
    this.noD = false;
    let t_val = false;
    if (item.id=='yeD') {
      t_val = true
    }
    this.a_details.riskDetails[0].documented = t_val; 
    this.updateAnswer();

    // switch(item.id) {
    // case 'yeD':
    //   this.yeD = true;
    //   //this.updateDomainList('Manpower')
    //   break;
    // case 'noD':
    //   this.noD = true;
    //   //this.updateDomainList('Safety')
    //   break;
    // }
  } 


    // Try to use (focus) and (focusout) instead of onfocus and onfocusout
  
  setStartPlan(event){  // (focus)
    this.plan_start_content = this.myForm.value.plan;
    this.cardService.emitTextInputSelected(true);
    //console.log(event.srcElement.tagName)

  }
  
  updatePlanAnswer(event){  // (focusout)
      if (this.plan_start_content != this.myForm.value.plan) {
        this.a_details.riskDetails[0].mitigationPlan = this.myForm.value.plan; 
        this.cardService.emitUpdateThisAnswer(this.a_details);
      }
      this.cardService.emitTextInputSelected(false);

  }


  setStartTracking(event){  // (focus)
    this.tracking_start_content = this.myForm.value.tracking;
    this.cardService.emitTextInputSelected(true);
    //console.log(event.srcElement.tagName)

  }
  
  updateTrackingAnswer(event){  // (focusout)
      if (this.tracking_start_content != this.myForm.value.tracking) {
        this.a_details.riskDetails[0].planTracking = this.myForm.value.tracking; 
        this.cardService.emitUpdateThisAnswer(this.a_details);
      }
      this.cardService.emitTextInputSelected(false);

  }
}
