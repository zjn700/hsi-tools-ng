import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
export class CardComponent implements OnInit {
  @Input() ptitle:string;
  @Input() q_content:string;
  @Input() q_number:string;
  @Input() a_details:Answer;
  @Input() a_value:boolean;
  private fullScreen:boolean = false;
  
  constructor(private cardService: CardService ) { }
  
  ngOnInit(){
    this.cardService.answerSelected
      .subscribe(answer => {
          this.fullScreen = answer;
      })
  }
  
  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
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
