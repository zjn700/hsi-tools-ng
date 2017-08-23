'use strict'
import {Component, 
        OnInit,
        HostListener, 
        OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Domain } from './domn.model';
import { Question } from '../card/qstn/qstn.model';
import { Answer } from '../card/ansr/ansr.model';
import { SessionState } from '../state/state.model'
import { AuthService } from '../users/auth.service'
import { DomainService } from './domn.service';
import { CardService } from '../card/card.service';
import { ProjectService } from '../proj/proj.service';
import { Project } from '../proj/proj.model';
import { KEY_CODE } from '../shared/key-code.enum';
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'app-domn',
  templateUrl: './domn.component.html',
  styleUrls: ['./domn.component.css']
})
export class DomnComponent implements OnInit, OnDestroy {

  qnnTitle: string;
  projectTitle: string;
  domain: Domain;
  private domains: Domain[] = [];
  private questions: Question[] = [];
  private answers: Answer[] = [];
  private activeProject: Project
  
  private projectId:string
  q_content: string;
  q_number: string;
  a_value = null;
  a_details: Answer;
  activeQuestionNumber:number = 1;
  activeDomainNumber = 1;
  isInitialized = false;
  atFirstQuestion=true;
  atLastQuestion=false;
  showMenu=false;
  showIntegrationCard=false;
  inTextInput = false;
  menuItemSelected = false;
  answerSelected = null;
  
  private alive: boolean = true;

  
  childMessage:string;

  onMessageFromChild2(message){
    this.childMessage = message;
    // console.log(this.childMessage)
  }
  
  @HostListener('click', ['$event']) onClick(event:Event) {
    // console.log(this.authService.isTokenExpired())

    if (this.isInitialized) {
      // console.log('initialized')
      this.inTextInput = this.cardService.isInTextInput(event);
    }
  }
  
  @HostListener('window:keyup', ['$event'])    //  event.ctrlKey or altKey or shiftKey) 

  keyEvent(event: KeyboardEvent) {
    // console.log(this.authService.isTokenExpired())

    if (this.inTextInput && this.isInitialized) {
      if (event.keyCode === KEY_CODE.T_KEY) {
        // console.log('t')
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

      
      if (event.keyCode === KEY_CODE.ESCAPE_KEY || (event.keyCode === KEY_CODE.BACKSPACE_KEY && event.ctrlKey)) {  //KEY_CODE.ENTER_KEY) {
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
      
      if (event.keyCode === KEY_CODE.Y_KEY || (event.keyCode === KEY_CODE.EQUALS_KEY && event.shiftKey)) {
         this.cardService.emitAnswerKeyPressed(true)
      }
      
      if (event.keyCode === KEY_CODE.N_KEY  || (event.keyCode === KEY_CODE.DASH_KEY && event.shiftKey)) {
         this.cardService.emitAnswerKeyPressed(false)
      }
      
      if (event.keyCode === KEY_CODE.BACKSPACE_KEY) {
         this.cardService.emitAnswerKeyPressed(null)
      }      
      
    }
  }

  constructor(private domainService: DomainService, 
              private cardService: CardService,
              private projectService: ProjectService,
              private authService: AuthService,
              private router:Router) { }

  checkAndUpdate(n){   // if user doesn't leave the domain, state isn't updated
    // console.log(n)     // ...so run periodic checks for changes while...
    n++                // ...user is still logged in and still in this domain
    if (this.alive) {
      if (!this.authService.isTokenExpired()) {
        if (this.projectService.isStateUpdateRequired(this.a_details)) {
          this.projectService.updateProject(this.projectService.activeProject)
            .takeWhile(() => this.alive)
            .subscribe(result => {
                // // console.log('result');
                // // console.log(result);
                setTimeout(()=>this.checkAndUpdate(n), 15000)
            })     
        } else {
          setTimeout(()=>this.checkAndUpdate(n), 15000);
        }
      } 
    }
  }

  ngOnDestroy(){
    if (!this.authService.isTokenExpired()) {
      if (this.projectService.activeProject) {
        this.projectService.updateProject(this.projectService.activeProject)
         .takeWhile(() => this.alive)
         .subscribe(result => {
            this.alive = false;
  
         }) } else {
           this.projectService.resetActiveProject(localStorage.getItem('pid'))
           // console.log('no activeProject');
           localStorage.removeItem('qnnId')
           localStorage.removeItem('pid');
           this.router.navigate(['/project'])

           this.alive = false;

           //this.authService.showWarning.emit(true)
         }
    } else {
      this.alive = false;
    }
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
  
  ngOnInit() {
    // console.log('domn init')    
    
    // get values from localStorage for use in the html view
    this.projectTitle = localStorage.getItem('ptitle');
    this.qnnTitle = localStorage.getItem('qnnTitle');
    this.projectId = localStorage.getItem('pid')
    
    //this.activeProject = this.projectService.activeProject
    
    // begin:  set up subscriptions...
    
    // get question domains
    this.domainService.getDomains()
      .takeWhile(() => this.alive)
      .subscribe((domains: Domain[])=>{
        this.domains = domains;
        
        if (localStorage.getItem('resume') == 'true' && this.projectService.activeProject) {  // resume where left off
          this.domainService.addDomainAnswers(domains[this.projectService.activeProject.state.domainNumber-1])  // extra step for initialization only
            .takeWhile(() => this.alive)
            .subscribe(answers => {
                this.domain = domains[this.projectService.activeProject.state.domainNumber-1];
                this.questions = this.domain.questions;
                this.activeDomainNumber = this.domain.sequence;
                this.activeQuestionNumber = this.projectService.activeProject.state.questionNumber;
                this.testAnswersArray(this.domains[this.domains.length-1].answers,0)
                this.updateContent(this.projectService.activeProject.state.questionNumber-1);
                this.cleanUpFormat();
                this.checkAndUpdate(0);

          })
        } else {   // start from the beginning
            this.domainService.addDomainAnswers(domains[0])  // extra step for initialization only
              .takeWhile(() => this.alive)
              .subscribe(answers => {
                this.domain = domains[0];
                this.questions = this.domain.questions;
                this.activeDomainNumber = this.domain.sequence;
                this.testAnswersArray(this.domains[this.domains.length-1].answers,0)
                this.updateContent(0);
                this.cleanUpFormat();
                localStorage.setItem('resume', 'true')
                this.checkAndUpdate(0);

            })          
        }
    })
    
    this.authService.showWarning  // if token is about to expire, then update the project state
      .takeWhile(() => this.alive)
      .subscribe(loggingOut => {
        this.projectService.updateProject(this.projectService.activeProject)
        .takeWhile(() => this.alive)
        .subscribe(result => {
            // console.log('showWarning-update-project');
            // console.log(result);
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
      
        // update the answers values in memory (answer array) before submitting to the db
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
              // add field values created by the db to the in memory array
              this.domain.answers[answer.sequence-1].id = data.obj._id   
              this.domain.answers[answer.sequence-1].dateCreated = data.obj.dateCreated
              if (this.domain.answers[answer.sequence-1].value==true) {
                this.cardService.emitFocusOnText();
              }
            })
        } else {   // otherwise update the existing answer
          // console.log('answer before upd in db call')
          // console.log(answer)
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
          // console.log('addAnswerToDb() buttons')
        } else {
          // console.log('updateAnswerInDb buttons')
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
        // console.log('this.activeQuestionNumber')
        // console.log(this.activeQuestionNumber)
        if (typeof this.activeQuestionNumber === 'string'){
          alert('yep')
        }
       if (this.activeQuestionNumber < this.domain.questions.length) {
          this.activeQuestionNumber = this.activeQuestionNumber + 1;
          // console.log(this.activeQuestionNumber)

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
    // console.log('getThisQuestion')
    // console.log(question)

    this.activeQuestionNumber = question.sequence;
    
    this.updateContent(this.activeQuestionNumber-1);
    this.cleanUpFormat();
    this.toggleMenu();
  }
  
  updateContent(index) {
    // console.log('this.domain.questions[index].content=====================')
    // console.log('index')
    // console.log(index)
    // console.log(this.domain.questions[index].content)

    this.q_content = this.domain.questions[index].content;
    this.a_value = this.domain.answers[index].value;
    this.a_details = this.domain.answers[index];
    this.cardService.setFullScreen(this.a_details)
    this.cardService.setRiskValue(this.a_details.riskValue);
    this.cardService.emitUpdatedQuestionNumber(index)
    this.updateState();
  }
  
  updateState(){
    var t_state = new SessionState(
      location.pathname,
      localStorage.getItem('qnnId'),
      localStorage.getItem('qnnTitle'),
      localStorage.getItem('qnnAbbreviation'),
      this.domain.id,
      this.domain.sequence,
      this.a_details.sequence,
      null,
      new Date()
      ); 
    if (this.projectService.activeProject)  {
      this.projectService.updateState(localStorage.getItem('qnnId'), t_state)
      // console.log('updateState');
      // console.log(this.projectService.activeProject)
      //this.projectService.activeProject.state = t_state;
    }
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
