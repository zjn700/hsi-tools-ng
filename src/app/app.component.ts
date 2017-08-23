import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './users/auth.service';
import { ProjectService } from './proj/proj.service';
import { SelectorService } from './selectors/selector.service';
import { DomainService } from './domn/domn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public showWarningMessage:boolean=false
  public warningMessage:string= ''
  public isVis = true;
  
  constructor(private authService: AuthService, 
              private projectService: ProjectService, 
              private selectorService: SelectorService,
              private domainService: DomainService) { }
              
  ngOnInit(){
    localStorage.clear();
    
    this.authService.showWarning
      .subscribe(showMessage =>{
        // // console.log('9999999999999999')
        // // console.log(showMessage)
        this.showWarningMessage = showMessage
        this.warningMessage = 'Your session has expired. Please sign in again.'

      })
  }

  ngAfterViewInit(){
    let menuItemList = document.getElementsByClassName("unblocked");  
    // console.log(menuItemList.length)
    if (menuItemList.length > 0) {
      // console.log(location.pathname);
      for (let i=0; i < menuItemList.length; i++) {
        menuItemList[i].classList.remove('active')
        if (menuItemList[i].getAttribute('href') == location.pathname) {
            menuItemList[i].classList.add('active')
        }    
      }    
    }    
  }
  
  // showWarning(event){
  //   // console.log('showWarning')
  //   // console.log(event)
  //   this.showWarningMessage = event;
  //   this.warningMessage = 'yep'
  // }
  onClick(){
    // console.log(this.authService.isTokenExpired())
  }
  
  onButtonClick(){
    this.authService.forceLogout();
    this.showWarningMessage = false;

  }  
  onKeyup(){
    // console.log('app comp keyup')
  }
  
  isLoggedIn() {
        return this.authService.isLoggedIn();   
  }
  
  bobIsOn(){
    return localStorage.getItem('userId') == "q300AWOoBnVGqkRZ"
  }
  
  doShowMessage(){
    return this.showWarningMessage
  }
  
  projectIsSelected() {
        return this.projectService.projectIsSelected();   
  }
  
  qnnIsSelected(){
        return this.selectorService.qnnIsSelected();   
    }  
  
  questionsLoaded() {
    return this.domainService.questionsLoaded();
  }
  
}
