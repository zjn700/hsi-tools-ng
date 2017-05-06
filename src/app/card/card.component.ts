import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from './qstn/qstn.model';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() ptitle:string;
  @Input() q_content:string;
  @Input() q_number:string;
  @Input() questions:Question[];
  
  @Output() middleChildMessage: EventEmitter<string>  = new EventEmitter<string>()
  childMessage:string;
  go=true;
  
  onMessageFromChild(message){
    if (this.go) {
      this.childMessage = message;
      console.log(this.childMessage)
      this.middleChildMessage.emit(message)
      this.go = !this.go

    } else {
      this.childMessage = '';
      this.middleChildMessage.emit('')
      this.go = !this.go
    }
    console.log(this.go)
  }
  
  constructor() { }

  ngOnInit() {
  }

}
