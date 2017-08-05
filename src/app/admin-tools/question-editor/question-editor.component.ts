import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import "rxjs/add/operator/takeWhile";

import { AdminToolsService } from '../admin-tools.service'
import { Question } from '../../card/qstn/qstn.model'

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit, OnDestroy {
  
  public alive:boolean = false;
  public isInitialized:boolean = false;
  public showForm:boolean = false;
  public addingQuestion:boolean = false;
  public question: Question;
  public restoreQuestion: Question;
  public questions: Question[]
  public questionForm: FormGroup;
  public startingValues:Question;

  constructor(private adminToolsService:AdminToolsService) { }
  
  ngOnDestroy(){
    this.alive = false;
  }

  ngOnInit() {
    
    this.questions = this.adminToolsService.getDomainQuestions();
    console.log('this.questions')
    console.log(this.questions)
    this.isInitialized = true;
    this.alive = true;
    
    this.questionForm = new FormGroup({
      sequence: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required)
    })

  }
  
  selectThisQuestion(question) {
    this.adminToolsService.setActiveQuestion(question);
    this.question = question;
    this.showForm = true;
    window.scrollTo(0, 0);

  }
  
  onAddQuestion(){
    this.showForm = true;
    this.addingQuestion = true;
    this.question=null;
    this.restoreQuestion = this.adminToolsService.getActiveQuestion();
    this.adminToolsService.setActiveQuestion(null)
    
    
    //this.adminToolsService.setActiveQuestion(question);

  }
  
  onClearQuestion(){
    this.showForm = false;
    this.addingQuestion = false;
    if (this.adminToolsService.getActiveQuestion() == null) {
      this.adminToolsService.setActiveQuestion(this.restoreQuestion)
    }
  }
  
  setStartingValues(question){
    this.startingValues.sequence = question.sequence;
    this.startingValues.content = question.content;
  }
  
  questionValuesHaveChanged(question) {
    if (this.startingValues.sequence != question.sequence) {
      return true;
   }
   if (this.startingValues.content != question.content) {
      return true;
   }
   return false
  }
  
  onSubmit() {
      if (this.addingQuestion) {
          const question = new Question(
            this.questionForm.value.sequence,
            this.questionForm.value.content
            )
            
          this.question = question
          this.adminToolsService.getActiveDomain().questions.push(question);
          this.adminToolsService.setActiveQuestion(question);
  
      } else {
        this.question.sequence = this.questionForm.value.sequence
        this.question.content = this.questionForm.value.content
      }  
      
      this.questions = this.adminToolsService.sortBySequenceNumber(this.adminToolsService.getActiveDomain().questions)
      
      this.showForm = false
      this.addingQuestion = false;
      this.isInitialized = false;
      // if (questionValuesHaveChanged(this.question)) {
        this.updateCurrentDomain();
      // }

  }
  
  deleteQuestion(question, index, element) {
    console.log('in deleteQuestion');
    console.log(question)
    console.log(index)
    console.log(element)
    this.questions.splice(index, 1);
    this.updateCurrentDomain();

  }
  
  reorderQuestions(){
    let index = 1;
    for (let question of this.questions) {
      question.sequence = index;
      index++;
    }
    this.updateCurrentDomain();

  }
  
  updateCurrentDomain(){
     this.adminToolsService.updateCurrentDomain()
      .takeWhile(()=> this.alive)
      .subscribe((response)=>{
        console.log(response)
        this.isInitialized = true;
      })   
  }
  
  getActiveQnn(){
    return this.adminToolsService.getActiveQnn()
  }
  
  getActiveDomain(){
    return this.adminToolsService.getActiveDomain()
  }
  
  getActiveQuestion(){
    return this.adminToolsService.getActiveQuestion()
  }
  
  isThisTheCurrenQuestion(question) {
    return question == this.adminToolsService.getActiveQuestion()
  }

  
}
