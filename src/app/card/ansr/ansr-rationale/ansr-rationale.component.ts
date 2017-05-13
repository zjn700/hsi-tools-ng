import { Component, OnInit, HostListener, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

import { CardService } from '../../card.service';

@Component({
  selector: 'app-ansr-rationale',
  templateUrl: './ansr-rationale.component.html',
  styleUrls: ['./ansr-rationale.component.css']
})
export class AnsrRationaleComponent implements OnInit, OnChanges {
  
  @Input() a_value:boolean = null;
  @Input() a_rationale;
  @Input() a_details;
  
  private myForm: FormGroup;
  private start_content:string;
  
  constructor(private cardService: CardService ) { }
  
  ngOnInit() {
    this.myForm = new FormGroup({
      comment: new FormControl(null)
      //comment: new FormControl(this.a_details.rationale)
    })
  }
  
  getRationale(){
    return this.myForm.value.comment
  }
  // Try to use (focus) and (focusout) instead of onfocus and onfocusout

  onClick(){
    this.cardService.emitTextInputSelected();
    this.a_details.rationale = this.myForm.value.comment; //this.a_rationale; //this.myForm.value.comment
    this.cardService.emitUpdateThisAnswer(this.a_details);

  }
  
  setStart($event){  // (focus)
    this.start_content = this.myForm.value.comment;
  }
  
  updateAnswer($event){  // (focusout)
      console.log('000000000000000000');
      console.log(this.start_content);
      console.log(this.myForm.value.comment)
      if (this.start_content != this.myForm.value.comment) {
        console.log('yep, it changed')
        this.a_details.rationale = this.myForm.value.comment; //this.a_rationale; //this.myForm.value.comment
        this.cardService.emitUpdateThisAnswer(this.a_details);
      }
      
    }

  ngOnChanges(){
    console.log('here in ngOnChanges')
    // if (this.myForm) {
    //   console.log(this.myForm.value.comment)
    // }
    // if (this.a_details){
    //   this.a_details.rationale = this.a_rationale; //.myForm.value.comment
    //   //this.cardService.emitUpdateThisAnswer(this.a_details);
    //   this.myForm.value.comment ='';
    //   console.log('this.a_details in ansr-rationale')
    //   console.log(this.a_details)
    // }
  }
  
  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      this.cardService.emitTextInputSelected();
  }
}
