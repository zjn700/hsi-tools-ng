import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  public showReturnToTopButton=false;
  public printing = false;
  
  constructor() { }

  @HostListener('mouseover') onMouseOver() {
    // console.log('mouseover')
    this.showReturnToTopButton = document.body.scrollTop > 500;
    // this.printing =  document.body.scrollTop < 500;
  }
  
  ngOnInit() {
  }
  
  
  scrollToElement(elementId) {
    // console.log('document.body.scrollTop')
    // console.log(document.body.scrollTop)
    let element = document.getElementById(elementId);
    if (element) {
      this.showReturnToTopButton = true;
      element.scrollIntoView(true);
      document.body.scrollTop -= 60;
      // console.log(document.body.scrollTop)

    }
  }  
  
  returnToTop(){
    window.scrollTo(0, 0);
    this.showReturnToTopButton = false;
    
  }
  
  scrollTo(hash) {
    // console.log('scrollTo ' + hash)
    location.hash = "#" + hash;
  }
  
  printPage() {
    window.scrollTo(0, 0);
    setTimeout(()=>{
      this.printing=true
      setTimeout(()=>{
        window.print();
        setTimeout(()=>{
          this.printing=false;
        },400)
      }, 200)
    }, 300)
  }

}
