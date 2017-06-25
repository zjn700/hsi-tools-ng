import { Component, OnInit, Input, EventEmitter,HostListener } from '@angular/core';
import { Question } from './qstn.model';
import { Answer } from '../ansr/ansr.model';
import { QstnMenuDirective } from './qstn-menu.directive';
import { CardService } from '../card.service';
import { KEY_CODE } from '../../shared/key-code.enum';

@Component({
  selector: 'app-qstn-menu',
  templateUrl: './qstn-menu.component.html',
  styleUrls: ['./qstn-menu.component.css']
})
export class QstnMenuComponent implements OnInit {
  @Input() questions:Question[];
  @Input() answers:Answer[];
  
  
  
  @HostListener('body:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if (event.keyCode === KEY_CODE.ENTER_KEY) {
        let menuItems = document.getElementsByClassName("selected");
        if (menuItems.length > 0) {
          this.getThisQuestion(this.questions[parseInt(menuItems[0].id) - 1]);
        }
      }

      if (event.keyCode === KEY_CODE.DOWN_ARROW || event.keyCode === KEY_CODE.SPACE_BAR  || event.keyCode === KEY_CODE.RIGHT_ARROW) {
        let menuItems = document.getElementsByClassName("menuItem");
        let selectedMenuItem = menuItems[0];
        
        for (let i=0; i < menuItems.length; i++) {
            if (menuItems[i].classList.contains('selected')) {
                  menuItems[i].classList.remove('selected') 
                  if (menuItems[i+1]) {
                    selectedMenuItem = menuItems[i+1]
                  } else {
                    selectedMenuItem =menuItems[i]
                  }
                  break;
            } 
        }
        selectedMenuItem.classList.add('selected');
        this.menuItemSelected()
      }
      
      if (event.keyCode === KEY_CODE.UP_ARROW  || event.keyCode === KEY_CODE.LEFT_ARROW) { // && event.ctrlKey or altKey or shiftKey) {
        let menuItems = document.getElementsByClassName("menuItem");
        let selectedMenuItem = menuItems[0];
        
        for (let i=0; i < menuItems.length; i++) {
            if (menuItems[i].classList.contains('selected')) {
                  menuItems[i].classList.remove('selected') 
                  if (menuItems[i-1]) {
                    selectedMenuItem = menuItems[i-1]
                  } else {
                    selectedMenuItem =menuItems[i]
                  }
                  break;
            } 
        }
        selectedMenuItem.classList.add('selected');
        this.menuItemSelected()
      }
  }
    
  constructor(private cardService: CardService) { }

  ngOnInit() { }
  
  getThisQuestion(question){
    this.cardService.getQuestion(question);
  }

  private menuItemSelected(){
      this.cardService.emitMenuItemSelected()
  }  

}
