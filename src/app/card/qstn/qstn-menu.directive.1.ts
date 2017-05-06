import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { CardService } from '../card.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  ENTER_KEY = 13
}

@Directive({ selector: '[myHighlight]' })
export class QstnMenuDirective {
  
    menuItems = document.getElementsByClassName("menuItem"); //.classList.add('selected');
    selectedMenuItem = null;
  
    constructor(private el: ElementRef, private cardService: CardService) {
       //el.nativeElement.style.backgroundColor = 'yellow';
    }
    
    @HostListener('mouseenter') onMouseEnter() {
       this.highlight('tomato');
       console.log('m-enter')
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
        console.log('add selected');
        this.menuItemSelected();
        
      }
    }
      
    private menuItemSelected(){
      this.cardService.emitMenuItemSelected()
    }

      // this.el.nativeElement.previousElementSibling.style.backgroundColor = null
      // this.el.nativeElement.style.backgroundColor = color;
      // this.el.nativeElement.nextElementSibling.style.backgroundColor = 'blue'
    
    @HostListener('window:keyup', ['$event'])
      keyEvent(event: KeyboardEvent) {
        console.log(event);
        //if (!this.inRationale) {
          if (event.keyCode === KEY_CODE.DOWN_ARROW) {
            console.log(document.getElementsByClassName('menuItem'))
            // let menuItems = document.getElementsByClassName("menuItem"); //.classList.add('selected');
            // let selectedMenuItem = null;
            let menuItems = this.menuItems;
            for (let i=0; i < menuItems.length; i++) {
                if (menuItems[i].classList.contains('selected')) {
                    menuItems[i].classList.remove('selected')
                    if (i == menuItems.length -1 ) {
                        this.selectedMenuItem = menuItems[i]
                    } else {
                        this.selectedMenuItem = menuItems[i+1]
                    }
                    break; 
                } else {
                    this.selectedMenuItem = menuItems[0]
                }
            }
            this.selectedMenuItem.classList.add('selected');
            this.menuItemSelected()

          }
    }
}
//console.log(this.el.nativeElement.children);
            // .classList.contains("x")
            //this.el.nativeElement.firstElementChild.style.backgroundColor = 'green';

             //this.getNextDomain()
             //this.showMenu = false;
             //http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript//console.log(this.el.nativeElement.children);
            // .classList.contains("x")
            //this.el.nativeElement.firstElementChild.style.backgroundColor = 'green';

             //this.getNextDomain()
             //this.showMenu = false;
             //http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
// import { HostBinding, HostListener, ElementRef, Renderer } from '@angular/core'


// export class QstnMenuDirective {
//   @HostBinding('class.card-outline-primary')private ishovering: boolean;

//   constructor(private el: ElementRef,
//               private renderer: Renderer) {
//     // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
//   }

//   @HostListener('mouseover') onMouseOver() {
//     let part = this.el.nativeElement.querySelector('.menuItem');
//     console.log('====================')
//     this.renderer.setElementStyle(part, 'display', 'block');
//     this.ishovering = true;
//   }

//   @HostListener('mouseout') onMouseOut() {
//     let part = this.el.nativeElement.querySelector('.menuItem');
//     this.renderer.setElementStyle(part, 'display', 'none');
//     this.ishovering = false;
//   }
// }