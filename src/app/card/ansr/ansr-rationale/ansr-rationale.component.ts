import { Component, OnInit, HostListener, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CardService } from '../../card.service';

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
  
  constructor(private cardService: CardService ) { }
  
  ngOnInit() {
    this.myForm = new FormGroup({
      comment: new FormControl(null)
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
