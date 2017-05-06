import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-ansr-rationale',
  templateUrl: './ansr-rationale.component.html',
  styleUrls: ['./ansr-rationale.component.css']
})
export class AnsrRationaleComponent implements OnInit {

  constructor(private cardService: CardService ) { }

  ngOnInit() {
  }
  
  onClick(){
    this.cardService.rationaleSelected();
  }

}
