import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  public showReturnToTopButton=false;
  
  constructor() { }

  @HostListener('mouseover') onMouseOver() {
    console.log('mouseover')
    this.showReturnToTopButton = document.body.scrollTop > 1000
    // this.glossaryOn = true;
    // setTimeout(()=>this.glossaryOn = false, 2000)
  }
  
  ngOnInit() {
  }
  
  
  scrollToElement(elementId) {
    console.log('document.body.scrollTop')
    console.log(document.body.scrollTop)
    let element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView(true);
      document.body.scrollTop -= 60;
      console.log(document.body.scrollTop)

    }
  }  
  
  returnToTop(){
    window.scrollTo(0, 0);
  }
  
  scrollTo(hash) {
    console.log('scrollTo ' + hash)
    location.hash = "#" + hash;
  }

}
