import { Injectable, EventEmitter } from '@angular/core';
import { Question } from './qstn/qstn.model';

@Injectable()
export class CardService {
  questionSelected = new EventEmitter<Question>();
  textInputSelected = new EventEmitter<boolean>();
  menuItemSelected = new EventEmitter<boolean>();
  
  getQuestion(question: Question) {
      this.questionSelected.emit(question)
  }
  
  rationaleSelected() {
      this.textInputSelected.emit(true)
  }
  
  emitMenuItemSelected() {
     this.menuItemSelected.emit(true)
  }
}