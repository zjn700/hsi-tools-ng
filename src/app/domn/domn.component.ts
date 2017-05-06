import { Component, OnInit, HostListener } from '@angular/core';
import { DomainService } from './domn.service';
import { Domain } from './domn.model';
import { Question } from '../card/qstn/qstn.model';
import { QstnService } from '../card/qstn/qstn.service';
import { CardService } from '../card/card.service';
import { KEY_CODE } from '../shared/key-code.enum';

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
  q_content: string;
  q_number: string;
  activeQuestionNumber = 1;
  activeDomainNumber = 1;
  isInitialized = false;
  atFirstQuestion=true;
  atLastQuestion=false;
  showMenu=false;
  inRationale = false;
  menuItemSelected = false;
  
  childMessage:string;

  onMessageFromChild2(message){
    this.childMessage = message;
    console.log(this.childMessage)
  }
  
  
  //@HostListener('click', ['$event.target']) onClick(ev:Event) {
  @HostListener('click', ['$event']) onClick(ev:Event) {
    if (ev.srcElement.id == 'comment'){
      this.inRationale = true;
    } else {
      this.inRationale = false;
    }
  }
  
  // @HostListener('document:keypress', ['$event'])
  // && event.ctrlKey or altKey or shiftKey) 
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.inRationale && this.isInitialized) {
      
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
        if (this.menuItemSelected) {
          this.menuItemSelected=false
        } else {
          this.toggleMenu()
        }
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
        this.domain = domains[0];
        this.questions = this.domain.questions;
        this.activeDomainNumber = this.domain.sequence
        this.q_content = this.domain.questions[0].content;
        this.cleanUpFormat();
        this.isInitialized=true
    })
      
    this.cardService.questionSelected.subscribe(
      (question: Question) => {
        this.getThisQuestion(question);
    })       
    
    this.cardService.menuItemSelected
      .subscribe((selected: boolean) => {
        this.menuItemSelected = selected;
    })
      
    this.cardService.textInputSelected
      .subscribe((selected: boolean) => {
        this.inRationale = selected;
    })
    
  }

  getDomainQuestions(domain){
    this.domain = domain;
    this.questions = this.domain.questions;
    this.activeQuestionNumber = this.domain.questions[0].sequence;
    this.activeDomainNumber = domain.sequence;
    this.q_content = this.domain.questions[0].content;
    this.cleanUpFormat();
  }
  
  toggleMenu(){
    this.showMenu=!this.showMenu
  }
  
  getNextDomain() {
    if (this.domain.sequence < this.domains.length) {
        this.domain = this.domains[this.domain.sequence]
        this.questions = this.domain.questions;
        this.activeDomainNumber = this.domain.sequence
        this.activeQuestionNumber = 1; 
        this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
    }
    this.cleanUpFormat();
  }
  
  getPrevDomain() {
    if (this.domain.sequence > 1 ) { 
        this.domain = this.domains[this.domain.sequence -2 ]
        this.questions = this.domain.questions;
        this.activeDomainNumber = this.domain.sequence;
        this.activeQuestionNumber = this.domain.questions.length;
        this.q_content = this.domain.questions[this.activeQuestionNumber-1].content
    }
    this.cleanUpFormat();
  }
  
  getNextQuestion() {
       if (this.activeQuestionNumber < this.domain.questions.length) {
         this.activeQuestionNumber += 1;
         this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
       } else {
         if (this.domain.sequence < this.domains.length) {
           this.domain = this.domains[this.domain.sequence]
           this.activeDomainNumber = this.domain.sequence
           this.activeQuestionNumber = 1; 
           this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
         }
       }
       this.cleanUpFormat();
  }
  
  getPrevQuestion() {
       if (this.activeQuestionNumber > 1)  {
         this.activeQuestionNumber -= 1;
         this.q_content = this.domain.questions[this.activeQuestionNumber-1].content;
       } else {
         if (this.domain.sequence > 1 ) { 
           this.domain = this.domains[this.domain.sequence -2 ]
           this.activeDomainNumber = this.domain.sequence;
           this.activeQuestionNumber = this.domain.questions.length;
           this.q_content = this.domain.questions[this.activeQuestionNumber-1].content
         }
       }
       this.cleanUpFormat();
  }
  
  getThisQuestion(question: Question){
    this.activeQuestionNumber = question.sequence;
    this.q_content = question.content;
    this.cleanUpFormat();
    this.toggleMenu();
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
