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

  constructor(private cardService: CardService) { }
  
  ngOnDestroy(){
    this.alive=false;
  }
  
  ngOnInit() {
    this.myForm = new FormGroup({
      comment: new FormControl(null)
    })
    
  this.cardService.updatedQuestionNumber
    .takeWhile(() => this.alive)
    .subscribe((index: number) => {
        console.log(this.a_details)
        console.log(index)
        this.showCheckboxes=false;
        this.showTextAreas=false;
        // this.ac = false;
        // this.tr = false;
        // this.av = false;
        // this.co = false;
    })
      
    console.log('ngOnInit')
    
  }
  
  updateRadioStrategy(item){
    this.ac = false;
    this.tr = false;
    this.av = false;
    this.co = false;
    this.showCheckboxes = true;
    
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

    switch(item.id) {
    case 'cs':
      this.cs = true;
      //this.updateDomainList('Manpower')
      break;
    case 'sc':
      this.sc = true;
      //this.updateDomainList('Safety')
      break;
    case 'pe':
      this.pe = true;
      //this.updateDomainList('Safety')
      break;
    }
  }  
  
  updateRadioStakeholders(item){
    this.yeS = false;
    this.noS = false;

    switch(item.id) {
    case 'yeS':
      this.yeS = true;
      //this.updateDomainList('Manpower')
      break;
    case 'noS':
      this.noS = true;
      //this.updateDomainList('Safety')
      break;
    }
  }    

  updateRadioDocumented(item){
    this.yeD = false;
    this.noD = false;

    switch(item.id) {
    case 'yeD':
      this.yeD = true;
      //this.updateDomainList('Manpower')
      break;
    case 'noD':
      this.noD = true;
      //this.updateDomainList('Safety')
      break;
    }
  } 

}
