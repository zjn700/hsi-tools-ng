import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Question } from './qstn/qstn.model';
import { Answer } from './ansr/ansr.model';
import { Domain } from  '../domn/domn.model';
import { CardService } from './card.service';
import { AnsrRationaleComponent } from './ansr/ansr-rationale/ansr-rationale.component';

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
  @Input() a_rationale;

  // @Input() a_value;
  // @Input() a_riskValue;
  // @Input() a_rationale;
//Input() questions:Question[];
  
  @ViewChild(AnsrRationaleComponent) ansrRationale: AnsrRationaleComponent;  // not part of child/parent demo

  // for zac:  child/parent demo
  @Output() middleChildMessage: EventEmitter<string>  = new EventEmitter<string>()
  childMessage:string;
  go=true;
  ///
  
  private answer: Answer;
  private answers: Answer[] = [];
  private answerSelected:boolean;
  //private a_value;
  private a_riskValue;
  //private a_rationale;
  private hideRiskBox:boolean = true;
  private hideRationale:boolean = true;
  
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
  
  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.cardService.answerSelected
      .subscribe((answer: boolean) => {
        //console.log('card ' + answer)
        this.answerSelected = answer;
        if (answer) {
          this.hideRationale= !answer;
          this.hideRiskBox =  answer;
        } else {
          this.hideRationale = answer;
          this.hideRiskBox = answer;          
        }
      })
      
    // this.cardService.setActiveAnswer
    //   .subscribe((num: number) => {
    //     this.setCurrentAnswer(num);
    //   })
      
    // this.cardService.getNewAnswers
    //   .subscribe(data => {
    //     console.log(data);
    //     this.getAnswers(data.domain, data.sequence);
    //     data = null;
        
    //   })
  }
  
  
  getAnswers(domain: Domain, currentAnswer) {     // get answers, put in this.answers[] with blanks for each unanswered question
    // console.log('card component get answers');
    // console.log('domain')
    // console.log(domain)
    this.cardService.getAnswers(domain)
       .subscribe(data => {
         console.log(data);
         this.answers=[];
         this.answers = data;
         this.answer = this.answers[currentAnswer-1]
         data =[];
         //console.log(this.answer)
         })
  }
  
  setCurrentAnswer(sequence) {
    this.answer = this.answers[sequence-1];
    console.log(this.answer)
    ////this.cardService.getAnswer(domainId, sequence);
    // this.a_rationale = this.answers[sequence-1].rationale;
    // this.a_riskvalue = this.answers[sequence-1].riskValue
    // this.a_value = this.answers[sequence-1].value
  }
  
  // move this to save or run  before a new question is selected
  getAnswer(domainId, sequence) {
    this.cardService.getAnswer(domainId, sequence)
  }
  
  saveAnswer(domainId, sequence) {
    // getAnswer here then if answer is not returned add a new, else update the one returned
    
    if (!this.answer) {    // if (this.answers[sequence-1).id = null) {
      var dateCreated = new Date();
      var answer = new Answer(
        localStorage.getItem('pid'),
        domainId,
        sequence,
        this.answerSelected,
        null,
        this.ansrRationale.getRationale(),
        dateCreated,
        dateCreated
      )
      this.cardService.addAnswer(answer)
        .subscribe((answer: Answer) => {
          console.log(answer);
          this.answer = answer
        })
    } else {
      this.answer.value = this.answerSelected;
      //this.answer.riskValue = this.riskBox.getRisk()
      this.answer.rationale = this.ansrRationale.getRationale();
      this.answer.dateModified = new Date();
      this.cardService.updateAnswer(this.answer)
      // .subscribe((answer: Answer) => {
      //   console.log(answer);
      //   this.answer = answer;
      // })
    }
  }
  
  
  // updateAnswer() {
    
  //   this.answer.value = this.answerSelected;
  //   //this.answer.riskValue = this.riskBox.getRisk()
  //   this.answer.rationale = this.ansrRationale.getRationale();
  //   this.answer.dateModified = new Date();
    
  //   // var answer = new Answer {
  //   //   projectId: this.answer.projectId,
  //   //   domainId: this.answer.domainId,
  //   //   sequence: this.answer.sequence,
  //   //   value: this.answerSelected,
  //   //   riskValue: null,  // this.riskBox.getRisk(),
  //   //   rationale: this.ansrRationale.getRationale(),
  //   //   dateCreated: this.answer.dateCreated,
  //   //   dateModified: new Date(),
  //   //   id: this.answer.id
  //   // }
    
  //   this.cardService.updateAnswer(this.answer)
  //     // .subscribe((answer: Answer) => {
  //     //   console.log(answer);
  //     //   this.answer = answer;
  //     // })
  // }  

}
