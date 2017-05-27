import { Component, OnInit, HostListener, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CardService } from '../../card.service';
import { KEY_CODE } from '../../../shared/key-code.enum';


@Component({
  selector: 'app-ansr-rationale',
  templateUrl: './ansr-rationale.component.html',
  styleUrls: ['./ansr-rationale.component.css']
})
export class AnsrRationaleComponent implements OnInit {
 
  @Input() a_value:boolean = null;
  @Input() a_details;
  
  private myForm: FormGroup;
  private start_content:string;
  
  @HostListener('window:keyup', ['$event'])    // && event.ctrlKey or altKey or shiftKey) 
    keyEvent(event: KeyboardEvent) {
        console.log('event.keyCode');
        console.log(event.keyCode)
      
      if (event.keyCode === KEY_CODE.ESCAPE_KEY) {
        console.log('escape')
        //console.log(this.elementRef.nativeElement.previousSibling);
        ///////// let buttonList = document.getElementsByClassName("btn-xl"); 
        //console.log(buttonList)
        //console.log(buttonList[0].classList);
        console.log('event.keyCode');
        console.log(event.keyCode)
        this.cardService.emitEscapePressed(true);
        //btn btn-primary btn-xl selected-pos
        return;
      }
    }
      
  constructor(private cardService: CardService, private elementRef: ElementRef ) { }
  
  ngOnInit() {
    this.myForm = new FormGroup({
      comment: new FormControl(null)
    })
    
    this.cardService.focusOnText
      .subscribe(()=>{
          let t_textArea = <HTMLElement>document.getElementsByClassName("rationalText")[0];
          if (t_textArea) {
            t_textArea.focus();
          }
      })
  }
  
  getRationale(){
    return this.myForm.value.comment
  }
  
  // Try to use (focus) and (focusout) instead of onfocus and onfocusout
  
  setStart(){  // (focus)
    this.start_content = this.myForm.value.comment;
    this.cardService.emitTextInputSelected(true);

    console.log(event.srcElement.tagName)

  }
  
  updateAnswer(){  // (focusout)
      if (this.start_content != this.myForm.value.comment) {
        this.a_details.rationale = this.myForm.value.comment; 
        this.cardService.emitUpdateThisAnswer(this.a_details);
      }
      this.cardService.emitTextInputSelected(false);

    }
  
}
