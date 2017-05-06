import { Component } from '@angular/core';
import { AuthService } from './users/auth.service';
import { ProjectService } from './proj/proj.service';
import { SelectorService } from './selectors/selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, 
              private projectService: ProjectService, 
              private selectorService: SelectorService) { }

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
