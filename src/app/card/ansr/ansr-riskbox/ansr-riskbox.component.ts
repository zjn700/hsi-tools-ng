import { Component, OnInit, Input } from '@angular/core';
import { CardService} from '../../../card/card.service';

@Component({
  selector: 'app-ansr-riskbox',
  templateUrl: './ansr-riskbox.component.html',
  styleUrls: ['./ansr-riskbox.component.css']
})
export class AnsrRiskboxComponent implements OnInit {
  @Input() a_value:boolean = null;
  @Input() a_details;

  constructor(private cardService: CardService) { }

  ngOnInit() { }
  
  onClick(riskValue){
    if (this.a_details.riskValue != riskValue) {
      this.a_details.riskValue = riskValue; 
      this.cardService.emitUpdateThisAnswer(this.a_details);
    }
  }

}
