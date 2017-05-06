import { Injectable, EventEmitter } from '@angular/core';
import { Question } from './qstn.model';

@Injectable()
export class QstnService {
  questionSelected = new EventEmitter<Question>();
  textInputSelected = new EventEmitter<boolean>();
  //menuItemSelectd = new EventEmitter<boolean>();
    
  // getQuestion(question: Question) {
  //     this.questionSelected.emit(question)
  // }
  
  // emitMenuItemSelected() {
  //   this.menuItemSelectd.emit(true)
  // }

//   rationaleSelected(question: Question) {
//       this.textInputSelected.emit(true)
//   }
}