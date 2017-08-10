import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  
  scrollToElement(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView(true);
      document.body.scrollTop -= 60;
    }
  }  
  
  scrollTo(hash) {
    console.log('scrollTo ' + hash)
    location.hash = "#" + hash;
  }

}
