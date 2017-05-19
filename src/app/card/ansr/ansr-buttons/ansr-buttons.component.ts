import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CardService} from '../../../card/card.service';

@Component({
  selector: 'app-ansr-buttons',
  templateUrl: './ansr-buttons.component.html',
  styleUrls: ['./ansr-buttons.component.css']
})
export class AnsrButtonsComponent implements OnInit {
  @Input() a_value:boolean = null;
  @Input() a_details;

  constructor(private cardService: CardService, private elementRef:ElementRef) { }
  
  ngOnInit(){
    this.cardService.escapePressed
      .subscribe((data:boolean)=>{
        let menuItemList = document.getElementsByClassName("selected-neg"); 
        let noButton = <HTMLElement>menuItemList[0]
        noButton.focus();
      })
  }
  
  emitAnswerSelected(value){
    if (this.a_value != value) {
      this.cardService.emitAnswerSelected(value)
      this.a_details.value = value; 
      this.cardService.emitUpdateThisAnswer(this.a_details);
    }
  }

}