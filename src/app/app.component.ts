import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './users/auth.service';
import { ProjectService } from './proj/proj.service';
import { SelectorService } from './selectors/selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthService, 
              private projectService: ProjectService, 
              private selectorService: SelectorService) { }
              
  ngOnInit(){

  }

  ngAfterViewInit(){
    let menuItemList = document.getElementsByClassName("unblocked");  
    console.log(menuItemList.length)
    if (menuItemList.length > 0) {
      console.log(location.pathname);
      for (let i=0; i < menuItemList.length; i++) {
        menuItemList[i].classList.remove('active')
        if (menuItemList[i].getAttribute('href') == location.pathname) {
            menuItemList[i].classList.add('active')
        }    
      }    
    }    
  }
  
  isLoggedIn() {
        return this.authService.isLoggedIn();   
  }
  
  projectIsSelected() {
        return this.projectService.projectIsSelected();   
  }
  
  qnnIsSelected(){
        return this.selectorService.qnnIsSelected();   
    }  
  
  
}
