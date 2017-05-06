import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTopMenuMouse]'
})
export class TopMenuMouseDirective {
  
  constructor(private el: ElementRef) { }
  
  @HostListener('mouseup') onMouseUp() {
       let menuItems = document.getElementsByClassName("unblocked"); 
       for (let i=0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active')
       }
       this.el.nativeElement.classList.add('active');
  }
}
