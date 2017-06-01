'use strict'
import {Component, 
        OnInit,
        HostListener, 
        OnDestroy} from '@angular/core';
import { Domain } from './domn.model';
import { Question } from '../card/qstn/qstn.model';
import { Answer } from '../card/ansr/ansr.model';
import { AuthService } from '../users/auth.service'
import { DomainService } from './domn.service';
import { CardService } from '../card/card.service';
import { ProjectService } from '../proj/proj.service';
import { KEY_CODE } from '../shared/key-code.enum';
//import { ISubscription } from "rxjs/Subscription";
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'app-domn',
  templateUrl: './domn.component.html',
  styleUrls: ['./domn.component.css'],
})
export class DomnComponent implements OnInit, OnDestroy {

  qnnTitle: string;
  projectTitle: string;
  domain: Domain;
  private domains: Domain[] = [];
  private questions: Question[] = [];
  private answers: Answer[] = [];
  private projectId:string
  q_content: string;
  q_number: string;
  a_value = null;
  a_details: Answer;
  activeQuestionNumber = 1;
  activeDomainNumber = 1;
  isInitialized = false;
  atFirstQuestion=true;
  atLastQuestion=false;
  showMenu=false;
  showIntegrationCard=false;
  inTextInput = false;
  menuItemSelected = false;
  answerSelected = null;
  
  
  //private  isInitialized:boolean=false;
  private alive: boolean = true;

  // private subscription: ISubscription;
  // private sub_up1: ISubscription;
  // private sub_up2: ISubscription;
  // private sub_up3: ISubscription;

  
  childMessage:string;

  onMessageFromChild2(message){
    this.childMessage = message;
    console.log(this.childMessage)
  }
  
  @HostListener('click', ['$event']) onClick(event:Event) {
    console.log(this.authService.checkToken())

    if (this.isInitialized) {
      console.log('initialized')
      this.inTextInput = this.cardService.isInTextInput(event);
    }
  }
  
  @HostListener('window:keyup', ['$event'])    // && event.ctrlKey or altKey or shiftKey) 

  keyEvent(event: KeyboardEvent) {
    console.log(this.authService.checkToken())

    if (this.inTextInput && this.isInitialized) {
      if (event.keyCode === KEY_CODE.T_KEY) {
        console.log('t')
      }
    }
    
    
    if (!this.inTextInput && this.isInitialized) {
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
      
      if (event.keyCode === KEY_CODE.E_KEY) {
         if (!this.a_value) {
          this.cardService.emitToggleFullScreen()
         }
      }      
      
      if (event.keyCode === KEY_CODE.R_KEY) {
          this.cardService.emitFocusOnRisk()
      }      
      
      if (event.keyCode === KEY_CODE.T_KEY) {
         this.cardService.emitFocusOnText()
      }
      
      if (event.keyCode === KEY_CODE.Y_KEY) {
         this.cardService.emitAnswerKeyPressed(true)
      }
      
      if (event.keyCode === KEY_CODE.N_KEY) {
         this.cardService.emitAnswerKeyPressed(false)
      }
      
    }
  }

  constructor(private domainService: DomainService, 
              private cardService: CardService,
              private projectService: ProjectService,
              private authService: AuthService) { }


  ngOnDestroy(){
    this.alive = false;
    //this.projectService.lastActiveQnn = this.projectId
    //this.domainService.lastActiveQnn = this.qnnId;
    //this.domainService.lastActiveProject = this
    //this.domains.length = 0;
    //this.questions.length = 0;
    //this.answers.length = 0; 
  }

  testAnswersArray(answers, index) {  // in this case the last domain's answers
    if (!(answers.length>0)){
      index++
      if (index>360){
        this.isInitialized = true; // all answers loaded
        return
      }
      setTimeout(this.testAnswersArray(answers, index), 1000);
      return
    }
    this.isInitialized = true; // all answers loaded
  }

  ngAfterViewInit(){
      console.log('domn after view init')    
  }
  
  ngOnInit() {
      console.log('domn init')    
    
    // get values from localStorage
    this.projectTitle = localStorage.getItem('ptitle');
    this.qnnTitle = localStorage.getItem('qnnTitle');
    this.projectId = localStorage.getItem('pid')
    
    // set up subscriptions:
    
    // get question domains
    this.domainService.getDomains()
      .takeWhile(() => this.alive)
      .subscribe((domains: Domain[])=>{
        this.domains = domains;
        this.domainService.addDomainAnswers(domains[0])  // extra step for initialization only
          .takeWhile(() => this.alive)
          .subscribe(answers => {
            this.domain = domains[0];
            this.questions = this.domain.questions;
            this.activeDomainNumber = this.domain.sequence;
            this.testAnswersArray(this.domains[this.domains.length-1].answers,0)
            this.updateContent(0);
            this.cleanUpFormat();
        })
    })
      
    this.cardService.questionSelected
      .takeWhile(() => this.alive)
      .subscribe(
        (question: Question) => {
          this.getThisQuestion(question);
    })       
    
    this.cardService.menuItemSelected
      .takeWhile(() => this.alive)
      .subscribe((selected: boolean) => {
        this.menuItemSelected = selected;
    })
      
    this.cardService.textInputSelected
      .takeWhile(() => this.alive)
      .subscribe((selected: boolean) => {
        this.inTextInput = selected;
    })
    
    
    this.cardService.updateThisAnswer
      .takeWhile(() => this.alive)
      .subscribe((answer: Answer) => {
      
        // if (this.authService.checkToken()){
        //       console.log('yep expired')
        // }
        
        // uodate the answers values in memory (answer array) before submitting to the db
        this.domain.answers[answer.sequence-1].rationale = answer.rationale;
        this.domain.answers[answer.sequence-1].value = answer.value;
        if (answer.value == true){    // if answer is yes, remove risk value
          this.domain.answers[answer.sequence-1].riskValue = null;
          
        }
        this.domain.answers[answer.sequence-1].riskValue = answer.riskValue;
        this.domain.answers[answer.sequence-1].dateModified = new Date;
        answer.dateModified = this.domain.answers[answer.sequence-1].dateModified
        this.a_value =  answer.value;
        
        // if this answer has no id, it is new, so add to the db
        if (this.domain.answers[answer.sequence-1].id == null) {
          this.cardService.addAnswerToDb(answer)
            .takeWhile(() => this.alive)
            .subscribe(data => {
              // add field values created by the db
              this.domain.answers[answer.sequence-1].id = data.obj._id   
              this.domain.answers[answer.sequence-1].dateCreated = data.obj.dateCreated
              if (this.domain.answers[answer.sequence-1].value==true) {
                this.cardService.emitFocusOnText();
              }
            })
        } else {   // otherwise update the existing answer
          this.cardService.updateAnswerInDb(answer)
            .takeWhile(() => this.alive)
            .subscribe(data => console.log(data))
        }

      })

    this.cardService.answerSelected  // needs to be rolled into update function
      .takeWhile(() => this.alive)
      .subscribe((selected: boolean) => {
        this.answerSelected = selected;
        this.domain.answers[this.activeQuestionNumber-1].value = selected;
        this.a_value = selected;
        if (this.domain.answers[this.activeQuestionNumber-1].id == null) {
          console.log('addAnswerToDb() buttons')
        } else {
          console.log('updateAnswerInDb buttons')
        }
    })
    
  }

  getDomainQuestions(domain){   // question menu
    if (!(this.domain == domain)) {
      this.domain = domain;
      this.questions = this.domain.questions;
      this.activeQuestionNumber = this.domain.questions[0].sequence;
      this.activeDomainNumber = domain.sequence;
      this.updateContent(0);
      this.cleanUpFormat();
    }
  }
  
  toggleMenu(){
    this.showMenu=!this.showMenu
  }
  
  showIntegrations() {
    this.showIntegrationCard = !this.showIntegrationCard;
    }
  
  getNextDomain() {
    if (this.domain.sequence < this.domains.length) {
        this.domain = this.domains[this.domain.sequence]
        this.questions = this.domain.questions;
        this.activeDomainNumber = this.domain.sequence
        this.activeQuestionNumber = 1; 
        this.updateContent(this.activeQuestionNumber-1);
    }
    this.cleanUpFormat();
  }
  
  getPrevDomain() {
    if (this.domain.sequence > 1 ) { 
        this.domain = this.domains[this.domain.sequence -2 ]
        this.questions = this.domain.questions;
        this.activeDomainNumber = this.domain.sequence;
        this.activeQuestionNumber = this.domain.questions.length;
        this.updateContent(this.activeQuestionNumber-1);
    }
    this.cleanUpFormat();
  }
  
  getNextQuestion() {
       if (this.activeQuestionNumber < this.domain.questions.length) {
         this.activeQuestionNumber += 1;
         this.updateContent(this.activeQuestionNumber-1);
       } else {
         if (this.domain.sequence < this.domains.length) {
           this.domain = this.domains[this.domain.sequence];
           this.questions = this.domain.questions;
           this.activeDomainNumber = this.domain.sequence;
           this.activeQuestionNumber = 1; 
           this.updateContent(this.activeQuestionNumber-1);
         }
       }
       this.cleanUpFormat();
  }
  
  getPrevQuestion() {
       if (this.activeQuestionNumber > 1)  {
         this.activeQuestionNumber -= 1;
         this.updateContent(this.activeQuestionNumber-1);
       } else {
         if (this.domain.sequence > 1 ) { 
           this.domain = this.domains[this.domain.sequence -2 ];
           this.questions = this.domain.questions;
           this.activeDomainNumber = this.domain.sequence;
           this.activeQuestionNumber = this.domain.questions.length;
           this.updateContent(this.activeQuestionNumber-1);
         }
       }
       this.cleanUpFormat();
  }
  
  getThisQuestion(question: Question){
    this.activeQuestionNumber = question.sequence;
    this.updateContent(this.activeQuestionNumber-1);
    this.cleanUpFormat();
    this.toggleMenu();
  }
  
  updateContent(index) {
    this.q_content = this.domain.questions[index].content;
    this.a_value = this.domain.answers[index].value;
    this.a_details = this.domain.answers[index];
    this.cardService.setFullScreen(this.a_details)
    this.cardService.setRiskValue(this.a_details.riskValue);
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
  
  checkEdges() {   // first and final questions
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
