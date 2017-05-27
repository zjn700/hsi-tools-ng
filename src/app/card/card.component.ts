import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { Question } from './qstn/qstn.model';
import { Answer } from './ansr/ansr.model';
import { CardService } from './card.service';

//import { Domain } from  '../domn/domn.model';
//import { AnsrRationaleComponent } from './ansr/ansr-rationale/ansr-rationale.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() ptitle:string;
  @Input() q_content:string;
  @Input() q_number:string;
  @Input() a_details:Answer;
  @Input() a_value:boolean;
  @Input() inTextInput:boolean;
  @Input() showIntegrationCard:boolean;
  
  
  private fullScreen:boolean = false;
  private riskValue:number = null;
  private showMessage=false;
  private message=''
  
  private alive:boolean = true;
  
  constructor(private cardService: CardService ) { }
  
  ngOnDestroy(){
    this.alive = false;
    this.a_details = null;
  }
  
  ngOnInit(){
    
    //this.fullScreen = this.a_details.riskValue != null;
    if (this.a_details) {
        this.fullScreen = this.a_details.riskValue != null;
        this.riskValue = this.cardService.convertRiskValue(this.a_details.riskValue)
    }    
    
    this.cardService.answerSelected
      .takeWhile(() => this.alive)
      .subscribe(answer => {
          this.fullScreen = answer;
      })
    
    this.cardService.fullScreen
      .takeWhile(() => this.alive)
      .subscribe(value => {
        this.fullScreen = value;
      })
      
    this.cardService.toggleFullScreen
      .takeWhile(() => this.alive)
      .subscribe(()=> {
        //this.fullScreen = !this.fullScreen
        this.toggleFullScreen()
      })
      
    this.cardService.riskValue
      .takeWhile(() => this.alive)
      .subscribe(value => {
        this.riskValue = value;
      })
    
    this.cardService.focusOnText
      .takeWhile(() => this.alive)
      .subscribe(() => {
       if (!this.inTextInput && this.a_value!=null) {
          this.showThisMessage('Text keyboard shortcuts are now enabled.')
       }
      })
    
    this.cardService.escapePressed
      .takeWhile(() => this.alive)
      .subscribe(value => {
        if (this.inTextInput) {
          this.showThisMessage('Application keyboard shortcuts are now enabled')
        }
      })    
    
    this.cardService.updateThisAnswer
      .takeWhile(() => this.alive)
      .subscribe((answer: Answer) => {
        this.riskValue = this.cardService.convertRiskValue(answer.riskValue);
      })

  }
  
  showThisMessage(message) {
    this.message=message;
    this.showMessage=true;
    setTimeout(()=>{this.showMessage=false}, 1500)    
  }
  
  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
    console.log(this.riskValue)
  }

  // onEscape(event){
  //   console.log('event')
  //   console.log(event)
  // }
  
  
  
  
    ////for zac:  child/parent demo
  @Output() middleChildMessage: EventEmitter<string>  = new EventEmitter<string>()
  childMessage:string;
  go=false;
  ////
  
  // private answer: Answer;
  // private answers: Answer[] = [];
  
  onMessageFromChild(message){
    if (this.go) {
      this.childMessage = message;
      console.log("this.childMessage")
      console.log(this.childMessage)
      this.middleChildMessage.emit(message)
      this.go = !this.go

    } else {
      this.childMessage = '';
      this.middleChildMessage.emit('')
      this.go = !this.go
    }
    console.log('go ' + this.go)
  }
  
}
