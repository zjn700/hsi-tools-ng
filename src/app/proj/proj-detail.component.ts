import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';
import { Project } from "./proj.model";
import { ProjectService } from './proj.service';
import { TopMenuService } from '../shared/top-menu.service';

@Component({
  selector: 'app-proj-detail',
  templateUrl: './proj-detail.component.html',
  styleUrls: ['./proj-detail.component.css']
    
})
export class ProjDetailComponent {
    
    @Input() project: Project;

    constructor(private projectService: ProjectService, private topMenuService: TopMenuService, private router: Router) { }
    
    onEdit() {
        console.log('in onEdit')
        //this.editClicked.emit('Batman lives');
        this.projectService.editProject(this.project);
        window.scrollTo(0,0);
    }
    
    onDelete(){
        this.projectService.deleteProject(this.project)
            .subscribe(
                result => console.log(result))
    }
    
    onGoToProject(button) {
      localStorage.setItem('resume', 'false');
      localStorage.setItem('pid', this.project.id);
      localStorage.setItem('ptitle', this.project.title.valueOf());
      this.router.navigate([button.getAttribute('ng-reflect-router-link')]);   //(['/tools']) 
      this.topMenuService.updateTopMenu(button);
      this.projectService.setActiveProject(this.project);
      localStorage.removeItem('qnnId');


    }
    
    onResumeProject(){
      console.log('this.project.state.url')    
      console.log(this.project.state.url)    
      localStorage.setItem('resume', 'true')
      localStorage.setItem('pid', this.project.id);
      localStorage.setItem('ptitle', this.project.title.valueOf());
      localStorage.setItem('qnnId', this.project.state.qnnId);
      localStorage.setItem('qnnTitle', this.project.state.qnnTitle);
      localStorage.setItem('qnnAbbreviation', this.project.state.qnnAbbreviation);
      //this.router.navigate(['/questions'])
      this.router.navigate([this.project.state.url])
      //this.topMenuService.updateTopMenu('/questions')
      this.topMenuService.updateTopMenu(this.project.state.url)
      this.projectService.setActiveProject(this.project)
        
    }
}