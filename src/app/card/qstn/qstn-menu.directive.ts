import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { CardService } from '../card.service';

@Directive({ selector: '[myHighlight]' })
export class QstnMenuDirective {
  
    menuItems = document.getElementsByClassName("menuItem"); //.classList.add('selected');
    selectedMenuItem = null;
  
    constructor(private el: ElementRef, private cardService: CardService) {
       //el.nativeElement.style.backgroundColor = 'yellow';
    }
    
    @HostListener('mouseenter') onMouseEnter() {
       this.highlight('tomato');
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(null);
    }

    private highlight(color: string) {
      let menuItems = this.menuItems;
      for (let i=0; i < menuItems.length; i++) {
        if (menuItems[i].classList.contains('selected')) {
            menuItems[i].classList.remove('selected')
        }
      }
      if (!this.el.nativeElement.classList.contains('ol')) {
        this.selectedMenuItem = this.el.nativeElement;
        this.selectedMenuItem.classList.add('selected');
        this.menuItemSelected();
      }
    }
      
    private menuItemSelected(){
      this.cardService.emitMenuItemSelected()
    }
}
