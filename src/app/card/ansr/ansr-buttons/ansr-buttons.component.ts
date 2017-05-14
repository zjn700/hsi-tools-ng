import { Component, Input } from '@angular/core';
import { CardService} from '../../../card/card.service';
//import { Answer } from

@Component({
  selector: 'app-ansr-buttons',
  templateUrl: './ansr-buttons.component.html',
  styleUrls: ['./ansr-buttons.component.css']
})
export class AnsrButtonsComponent {
  @Input() a_value:boolean = null;
  @Input() a_details;

  constructor(private cardService: CardService) { }
  
  emitAnswerSelected(value){
    if (this.a_value != value) {
      this.cardService.emitAnswerSelected(value)
      this.a_details.value = value; 
      this.cardService.emitUpdateThisAnswer(this.a_details);
    }
  }

}
