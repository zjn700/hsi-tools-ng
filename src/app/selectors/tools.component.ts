import { Component, OnInit } from '@angular/core';

import { TopMenuService } from '../shared/top-menu.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  projectTitle: string;
  
  constructor(private topMenuService: TopMenuService) { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
  }
  
  onClick(button){
    console.log(button)
    this.topMenuService.updateTopMenu(button)
  }
}
    
    // console.log(event.getAttribute('ng-reflect-router-link'))
    //       let menuItems = document.getElementsByClassName("topMenuItem"); 
    //   for (let i=0; i < menuItems.length; i++) {
    //         menuItems[i].classList.remove('active')
    //           if (menuItems[i].getAttribute('href') == event.getAttribute('ng-reflect-router-link')) {
    //           menuItems[i].classList.add('active')
    //           }
    //   }
    //   // for (let i=0; i < menuItems.length; i++) {
      //       console.log(menuItems[i].getAttribute('href'))
      //       console.log(event.getAttribute('href'))
      //       // if (menuItems[i].getAttribute('href') == event.getAttribute('ng-reflect-router-link')) {
      //       //   menuItems[i].classList.add('active')
      //       // }
      //       //menuItems[i].classList.remove('active')
      // }
