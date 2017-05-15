import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopMenuService } from './shared/top-menu.service';
import { CardService } from './card/card.service';
import { KEY_CODE } from './shared/key-code.enum'

export enum TOP_MENU{
  AUTH = 0,       //'/logout',
  PROJECTS = 1,   //'/project',
  TOOLS =  2,     //'/tools',
  CART = 3,       //'/crt-qnns',
  PRAT = 4,       // '/at-qnns',
  QUESTIONS = 5   //'/questions'
}

@Directive({
  selector: '[appTopMenu]'
})
export class TopMenuDirective implements OnInit {
  private menuItem;
  private inTextInput = false;

  
  constructor(private router: Router, private cardService: CardService, private topMenuService: TopMenuService, private el: ElementRef) { }
  
  private menuItemSelected(menuItem){
    var route:string ='';
    switch(menuItem) {
    case TOP_MENU.AUTH:
        route='/logout'
        break;
    case TOP_MENU.PROJECTS:
        route='/project'
        break;
    case TOP_MENU.TOOLS:
        route='/tools'
        break;
    case TOP_MENU.CART:
        route='/crt-qnns'
        break;
    case TOP_MENU.PRAT:
        route='/at-qnns'
        break;
    case TOP_MENU.QUESTIONS:
        route='/questions'
        break;
    default:
        route='';

}
    if (route.length > 0 ) {
      this.router.navigate([route]) 
    }

  }
  
  ngOnInit(){
    this.cardService.textInputSelected
      .subscribe((textInputSelected: boolean) => {
        this.inTextInput = textInputSelected;
    })
  }
  
  @HostListener('body:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    
    this.inTextInput = this.cardService.isInTextInput(event)
    

    if (!this.inTextInput) {
      let menuItems = document.getElementsByClassName("unblocked"); 
      if ((event.keyCode === KEY_CODE.RIGHT_ARROW  && event.shiftKey) || event.keyCode === KEY_CODE.RIGHT_BRACKET) {   //&& event.ctrlKe
        for (let i=0; i < menuItems.length; i++) {
          if (menuItems[i].classList.contains('active')){
            if (i != menuItems.length-1) {
              menuItems[i].classList.remove('active')
              let selectedMenuItem = menuItems[i+1]
              selectedMenuItem.classList.add('active');
              this.menuItemSelected(i+1) 
              break;
            }
          }
        }
      }
      
      if ((event.keyCode === KEY_CODE.LEFT_ARROW && event.shiftKey) || event.keyCode === KEY_CODE.LEFT_BRACKET) {
        for (let i=0; i < menuItems.length; i++) {
          if (menuItems[i].classList.contains('active')) {
            if (i != 0) {
              menuItems[i].classList.remove('active')
              let selectedMenuItem = menuItems[i-1]
              selectedMenuItem.classList.add('active');
              this.menuItemSelected(i-1) 
              break;
            }
          }
        }
      }
    }
    
  } 
}
