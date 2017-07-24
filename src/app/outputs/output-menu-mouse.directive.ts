import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOutputMenuMouse]'
})
export class OutputMouseDirective {
  
  constructor(private el: ElementRef) { }
  
  @HostListener('mouseup') onMouseUp() {
      console.log('HERE IN MENU')
       let menuItems = document.getElementsByClassName("menu-item-link"); 
       console.log(menuItems)
       for (let i=0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active')
       }
       this.el.nativeElement.classList.add('active');
  }
}