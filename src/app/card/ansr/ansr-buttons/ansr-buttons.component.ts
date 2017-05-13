import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { CardService} from '../../../card/card.service';

@Component({
  selector: 'app-ansr-buttons',
  templateUrl: './ansr-buttons.component.html',
  styleUrls: ['./ansr-buttons.component.css']
})
export class AnsrButtonsComponent implements OnInit {
  @Input() a_value:boolean = null;

  constructor(private el: ElementRef, private cardService: CardService) { }
  
  // @HostListener('mousedown') onMouseDown() {
  //       this.el.nativeElement.classList.add('buttonDown')
  // }
  
  // @HostListener('mouseup') onMouseUp() {
  //       this.el.nativeElement.classList.remove('buttonDown')
  // }
  
  ngOnInit() { }
  
  emitAnswerSelected(answer, button){
    if (this.a_value != answer) {
      this.cardService.emitAnswerSelected(answer)
    }
  }

}
