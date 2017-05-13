'use strict'
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DomainService } from './domn.service';
import { Domain } from './domn.model';
import { Question } from '../card/qstn/qstn.model';
import { Answer } from '../card/ansr/ansr.model';
import { QstnService } from '../card/qstn/qstn.service';
import { CardService } from '../card/card.service';
import { KEY_CODE } from '../shared/key-code.enum';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-domn',
  templateUrl: './domn.component.html',
  styleUrls: ['./domn.component.css'],
})
export class DomnComponent implements OnInit {
  qnnTitle: string;
  projectTitle: string;
  domain: Domain;
  private domains: Domain[] = [];
  private questions: Question[] = [];
  private answers: Answer[] = [];
  a_details: Answer;
  q_content: string;
  q_number: string;
  a_domain: string;
  a_value = null;
  a_rationale: String;
  activeQuestionNumber = 1;
  activeDomainNumber = 1;
  isInitialized = false;
  atFirstQuestion=true;
  atLastQuestion=false;
  showMenu=false;
  inTextInput = false;
  menuItemSelected = false;
  answerSelected = null;
  childMessage:string;

  onMessageFromChild2(message){
    this.childMessage = message;
    console.log(this.childMessage)
  }
  
  @ViewChild(CardComponent) card: CardComponent

  
  //@HostListener('click', ['$event.target']) onClick(ev:Event) {
  @HostListener('click', ['$event']) onClick(event:Event) {
    
      this.inTextInput = this.cardService.isInTextInput(event);
  }
  
  // @HostListener('document:keypress', ['$event'])
  // && event.ctrlKey or altKey or shiftKey) 
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.inTextInput && this.isInitialized) {
      //console.log(event.keyCode)
      if ((event.keyCode === KEY_CODE.RIGHT_ARROW  && event.ctrlKey) || event.keyCode === KEY_CODE.GREATER_THAN) {
        this.getNextDomain()
        return;
      }
  
      if ((event.keyCode === KEY_CODE.LEFT_ARROW  && event.ctrlKey) || event.keyCode === KEY_CODE.LESS_THAN) {
        this.getPrevDomain();
        return;
      }
      
      if (event.keyCode === KEY_CODE.RIGHT_ARROW && !this.showMenu) {
        this.getNextQuestion()
        return;
      }
  
      if (event.keyCode === KEY_CODE.LEFT_ARROW  && !this.showMenu) {
        this.getPrevQuestion()
        return;
      }
      
      if (event.keyCode === KEY_CODE.ENTER_KEY) {
          this.menuItemSelected=false;
      }

      
      if (event.keyCode === KEY_CODE.ESCAPE_KEY) {  //KEY_CODE.ENTER_KEY) {
        if (this.showMenu) {   ///(this.menuItemSelected) {
          this.showMenu=false;
          this.menuItemSelected=false;
        } //else {
        //  this.toggleMenu()
        //}
      }
      
      if (event.keyCode === KEY_CODE.SPACE_BAR) {
         if (!this.menuItemSelected) {
          this.showMenu=true;
        }
      }
      
      if (event.keyCode === KEY_CODE.DOWN_ARROW) {
        this.showMenu = true;
      }
      
      if (event.keyCode === KEY_CODE.UP_ARROW) {
      }      
      
    }
  }

  constructor(private domainService: DomainService, 
              private cardService: CardService) { }

  ngOnInit() {
    
    this.projectTitle = localStorage.getItem('ptitle');
    this.qnnTitle = localStorage.getItem('qnnTitle');
    
    this.domainService.getDomains()
      .subscribe((domains: Domain[])=>{
        this.domains = domains;
        this.domainService.addDomainAnswers(domains[0])  // extra step for initialization only
          .subscribe(answers => {
            this.domain = domains[0];
            this.questions = this.domain.questions;
            this.activeDomainNumber = this.domain.sequence;
            console.log(this.domain.answers[0].domainId);
            // this.a_domain = this.domain.answers[0].domainId;
            // this.a_domain = '';
            // this.q_content = this.domain.questions[0].content;
            // this.a_value = this.domain.answers[0].value;
            // this.a_rationale = this.domain.answers[0].rationale;
            this.updateContent(0);
            this.cleanUpFormat();
            this.isInitialized=true
        })


    })
    

    this.cardService.questionSelected
      .subscribe(
        (question: Question) => {
          this.getThisQuestion(question);
    })       
    
    this.cardService.menuItemSelected
      .subscribe((selected: boolean) => {
        this.menuItemSelected = selected;
    })
      
    this.cardService.textInputSelected
      .subscribe((selected: boolean) => {
        this.inTextInput = selected;
    })
    
    this.cardService.updateThisAnswer
      .subscribe((answer: Answer) => {
      console.log('dom update')
        console.log(this.domain.answers[answer.sequence-1].sequence)
        console.log(this.domain.answers[answer.sequence-1].rationale)
        this.domain.answers[answer.sequence-1].rationale = answer.rationale;
        this.domain.answers[answer.sequence-1].value = answer.value;
        console.log(this.domain.answers[answer.sequence-1].rationale)

      })

    this.cardService.answerSelected
      .subscribe((selected: boolean) => {
        console.log("888888888888888888")
        this.answerSelected = selected;
        this.domain.answers[this.activeQuestionNumber-1].value = selected;
        this.a_value = selected;
        
    })
    
    
  }

  getDomainQuestions(domain){   // question menu
    if (!(this.domain == domain)) {
      this.domain = domain;
      this.questions = this.domain.questions;
      this.activeQuestionNumber = this.domain.questions[0].sequence;
      this.activeDomainNumber = domain.sequence;
      console.log(this.domain.answers[0])
      // this.q_content = this.domain.questions[0].content;
      // this.a_value = this.domain.answers[0].value;
      this.updateContent(0);

      this.cleanUpFormat();
    }
  }
  
  toggleMenu(){
    this.showMenu=!this.showMenu
  }
  
  getNextDomain() {
    //console.log('getNextDomain')
    if (this.domain.sequence < this.domains.length) {
        this.domain = this.domains[this.domain.sequence]
        //this.card.getAnswers(this.domain, 1)
        console.log('getNextDomain')
        //this.cardService.emitGetAnswers(this.domain, 1)

        this.questions = this.domain.questions;
        this.activeDomainNumber = this.domain.sequence
        this.activeQuestionNumber = 1; 
        // console.log(this.domain.answers[this.activeQuestionNumber-1])

        // this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
        // this.a_value = this.domain.answers[this.activeQuestionNumber-1].value;
        // this.a_rationale = this.domain.answers[this.activeQuestionNumber-1].rationale
        this.updateContent(this.activeQuestionNumber-1);


    }
    this.cleanUpFormat();
  }
  
  getPrevDomain() {
    if (this.domain.sequence > 1 ) { 
        this.domain = this.domains[this.domain.sequence -2 ]
        //this.card.getAnswers(this.domain, this.domain.questions.length);
        console.log('getPrevDomain')
        //this.cardService.emitGetAnswers(this.domain, this.domain.questions.length)
        this.questions = this.domain.questions;
        this.activeDomainNumber = this.domain.sequence;
        this.activeQuestionNumber = this.domain.questions.length;
        this.updateContent(this.activeQuestionNumber-1);

        // console.log(this.domain.answers[this.activeQuestionNumber-1])
        // this.q_content = this.domain.questions[this.activeQuestionNumber-1].content
        // this.a_value = this.domain.answers[this.activeQuestionNumber-1].value;
        
        
    }
    //this.card.setCurrentAnswer(this.activeQuestionNumber)

    this.cleanUpFormat();
  }
  
  getNextQuestion() {
       // var 
       //this.card.saveAnswer(this.activeDomainNumber, this.activeQuestionNumber)
       if (this.activeQuestionNumber < this.domain.questions.length) {
         this.activeQuestionNumber += 1;
         //this.cardService.broadcastAnswer()
         //this.card.setCurrentAnswer(this.activeQuestionNumber)
         //this.cardService.emitSetActiveAnswer(this.activeQuestionNumber)
        // console.log(this.domain.answers[this.activeQuestionNumber-1])
        // console.log(this.domain.answers)
         this.updateContent(this.activeQuestionNumber-1);

        // this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
        // this.a_value = this.domain.answers[this.activeQuestionNumber-1].value;
        // this.a_rationale = this.domain.answers[this.activeQuestionNumber-1].rationale
         
       } else {
         if (this.domain.sequence < this.domains.length) {
           this.domain = this.domains[this.domain.sequence];
           //this.card.getAnswers(this.domain, 1)
          // console.log('getNextQuestion')
           //this.cardService.emitGetAnswers(this.domain, 1)

           this.activeDomainNumber = this.domain.sequence
           this.activeQuestionNumber = 1; 
           this.updateContent(this.activeQuestionNumber-1);

          // console.log(this.domain.answers[this.activeQuestionNumber-1])

          // this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
          // this.a_value = this.domain.answers[this.activeQuestionNumber-1].value;
          // this.a_rationale = this.domain.answers[this.activeQuestionNumber-1].rationale


         }
       }
       this.cleanUpFormat();
  }
  
  getPrevQuestion() {
       if (this.activeQuestionNumber > 1)  {
         this.activeQuestionNumber -= 1;
         this.updateContent(this.activeQuestionNumber-1);

         //this.card.setCurrentAnswer(this.activeQuestionNumber)
         //this.cardService.emitSetActiveAnswer(this.activeQuestionNumber)
        // console.log(this.domain.answers[this.activeQuestionNumber-1])

        // this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
        // this.a_value = this.domain.answers[this.activeQuestionNumber-1].value;
        // this.a_rationale = this.domain.answers[this.activeQuestionNumber-1].rationale
 
       } else {
         if (this.domain.sequence > 1 ) { 
           this.domain = this.domains[this.domain.sequence -2 ]
           //this.card.getAnswers(this.domain, this.domain.questions.length);
          // console.log("getPrevQuestion")
           //this.cardService.emitGetAnswers(this.domain, this.domain.questions.length)
           
           this.activeDomainNumber = this.domain.sequence;
           this.activeQuestionNumber = this.domain.questions.length;
           this.updateContent(this.activeQuestionNumber-1);

          // console.log(this.domain.answers[this.activeQuestionNumber-1])

          // this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
          // this.a_value = this.domain.answers[this.activeQuestionNumber-1].value;
          // this.a_rationale = this.domain.answers[this.activeQuestionNumber-1].rationale
          
          // this.a_domain = this.domain.answers[this.activeQuestionNumber-1].domainId;

         }
       }
       //this.card.setCurrentAnswer(this.activeQuestionNumber)

       this.cleanUpFormat();
  }
  
  getThisQuestion(question: Question){
    //console.log('getThisQuestion')
    console.log('hre in get this question')
    console.log(this.activeQuestionNumber)
    console.log(this.a_value)
    console.log(this.a_rationale)
    console.log(this.domain.answers[this.activeQuestionNumber-1].rationale    )
    console.log(this.domain.answers)
    
    this.activeQuestionNumber = question.sequence;
    this.updateContent(this.activeQuestionNumber-1);
    console.log('hre after activeQuestionNumber assigned')
    console.log(this.activeQuestionNumber)
    console.log(this.a_value)
    console.log(this.a_rationale)
    console.log(this.domain.answers[this.activeQuestionNumber-1].rationale    )
    console.log(this.domain.answers)

    // console.log(this.domain.answers[this.activeQuestionNumber-1])

    //this.q_content = question.content;
    // this.a_value = this.domain.answers[this.activeQuestionNumber-1].value;

    this.cleanUpFormat();
    this.toggleMenu();
    //this.cardService.emitSetActiveAnswer(this.activeQuestionNumber)
   // setTimeout(this.card.setCurrentAnswer(this.activeQuestionNumber), 2000);

    //this.card.setCurrentAnswer(this.activeQuestionNumber)
    
  }
  
  updateContent(index) {
      //console.log(this.q_content)
      console.log(this.a_value)
      console.log(this.a_rationale)
      console.log(this.a_details)

      console.log('=============')
      this.q_content = this.domain.questions[index].content;
      this.a_value = this.domain.answers[index].value;
      this.a_rationale = this.domain.answers[index].rationale  
      this.a_details = this.domain.answers[index];
      //console.log(this.q_content)
      console.log(this.a_value)
      console.log(this.a_rationale)
      console.log(this.a_details)
       
  }
  
  cleanUpFormat(){
    this.q_number = this.formatQuestionNumber();
    this.checkEdges();
  }
  
  formatQuestionNumber(){
    var q_number = this.activeDomainNumber.toString();
    if (this.activeQuestionNumber < 10) {
      q_number = q_number.concat('.0', this.activeQuestionNumber.toString());
    } else {
      q_number = q_number.concat('.', this.activeQuestionNumber.toString());
    }
    return q_number
  }
  
  checkEdges() {
    if (this.activeDomainNumber ==1 && this.activeQuestionNumber == 1) {
      this.atFirstQuestion=true
    } else {
      this.atFirstQuestion = false;
    }
    if (this.activeDomainNumber == this.domains.length
      && this.activeQuestionNumber == this.domain.questions.length) {
        this.atLastQuestion=true
    } else {
        this.atLastQuestion=false
    }
  }
  
}
