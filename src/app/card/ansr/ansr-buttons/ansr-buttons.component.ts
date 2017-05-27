import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CardService} from '../../../card/card.service';
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'app-ansr-buttons',
  templateUrl: './ansr-buttons.component.html',
  styleUrls: ['./ansr-buttons.component.css']
})
export class AnsrButtonsComponent implements OnInit, OnDestroy {
  @Input() a_value:boolean = null;
  @Input() a_details;
  private alive: boolean = true;


  constructor(private cardService: CardService) { }

  ngOnDestroy(){
    this.alive=false
  }
  
  ngOnInit(){
    this.cardService.escapePressed
      .takeWhile(() => this.alive)
      .subscribe((data:boolean)=>{
        console.log('escapePressed')
        
        let menuItemList = document.getElementsByClassName("selected-btn"); 
        console.log('menuItemList')
        console.log(menuItemList)
        if (menuItemList.length>0) {
          let noButton = <HTMLElement>menuItemList[0]
          noButton.focus();
        }

      })
  }
  
  emitAnswerSelected(value){
    if (this.a_value != value) {
      this.cardService.emitAnswerSelected(value)
      this.a_details.value = value; 
      this.cardService.emitUpdateThisAnswer(this.a_details);
      if (value) {   // value
        console.log('yes-focus on text')
        this.cardService.emitFocusOnText();
      } else {
        this.cardService.emitFocusOnRisk();
      }
    }
  }

}