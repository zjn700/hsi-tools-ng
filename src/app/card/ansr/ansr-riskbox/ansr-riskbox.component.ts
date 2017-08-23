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

  ngOnInit() {
    this.cardService.focusOnRisk
      .subscribe(()=>{
        let t_riskCell = <HTMLElement>document.getElementsByClassName("td-selected")[0];
        // console.log('t_riskCell')
        // console.log(t_riskCell)
        if (!t_riskCell) {
          t_riskCell = <HTMLElement>document.getElementsByClassName("th1")[0]; 
          // console.log('t_riskCell2')
          // console.log(t_riskCell)
        }
        if (t_riskCell) {
          setTimeout(function(){ t_riskCell.focus(); }, 500);
        }
      })
    
  }
  
  onClick(riskValue){
    if (this.a_details.riskValue != riskValue) {
      this.a_details.riskValue = riskValue; 
      this.cardService.emitUpdateThisAnswer(this.a_details);
      this.cardService.setFullScreen(this.a_details);
      this.cardService.emitFocusOnText();
      //// console.log(this.cardService.convertRiskValue(this.a_details.riskValue))
    }
  }
  

}
