import { Component, OnInit, HostListener, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import "rxjs/add/operator/takeWhile";

import { Project } from "./proj.model";
import { ProjectService } from './proj.service';
import { CardService } from '../card/card.service';
import { AuthService } from '../users/auth.service';
//import { TopMenuService } from '../shared/top-menu.service';

@Component({
  selector: 'app-proj',
  templateUrl: './proj.component.html',
  styleUrls: ['./proj.component.css']

})
export class ProjectComponent implements OnInit, OnDestroy {
    project: Project;
    private alive: boolean = true;
    
  @HostListener('click', ['$event']) 
  onClick(event:Event) {
    console.log(this.authService.checkToken())
  }
  
  @HostListener('window:keyup', ['$event'])     
  keyEvent(event: KeyboardEvent) {
    console.log(this.authService.checkToken())    
  }    
    
    constructor(private projectService: ProjectService, 
                private cardService:CardService, 
                private authService: AuthService,
                private router: Router) { }
    
    onSave(form: NgForm, titleInput){
        if (this.project) {
            // edit
            this.project.title = form.value.title;
            this.project.description = form.value.desc;

            this.projectService.updateProject(this.project)
                .takeWhile(() => this.alive)
                .subscribe(result => {
                    console.log('result');
                    console.log(result);
                } ) 
            this.project = null;
            form.resetForm();

        } else {
            // create
            const project = new Project(
                form.value.title,                   // title
                form.value.desc,                    // description
                '',                                 // id
                new Date(),                         // dateCreated 
                [localStorage.getItem('userId')] )  // users
                
            this.projectService.addProject(project)      
                .takeWhile(() => this.alive)
                .subscribe(
                    project => {console.log(project); 
                    localStorage.setItem('pid', project.id);
                    localStorage.setItem('ptitle', project.title.valueOf());
                    this.projectService.setActiveProject(project)

                    this.router.navigate(['/tools']);},
                    error => console.log(error),
                     //ng-reflect-router-link')])   //(['/tools']) 

            );            
        }
        
        this.project = null;

        form.resetForm();
        titleInput.focus()
    }
    
    onClear(form: NgForm, titleInput){
        this.project = null;
        form.resetForm();
        titleInput.focus()

    }
    
    ngOnInit(){
      console.log('proj init')    
      this.projectService.projectIsInEditMode
        .takeWhile(() => this.alive)
        .subscribe(
            (project: Project) => {
              //this.project = null;    
              this.project = project
        })
    }
    
    ngOnDestroy(){
        //this.projectService.projectIsInEditMode.unsubscribe();
        //this.project = null;
        console.log('this.projectService.activeProject')
        console.log(this.projectService.activeProject)
        // this.projectService.updateProject(this.projectService.activeProject)
        //         .takeWhile(() => this.alive)
        //         .subscribe(result => {
        //             console.log('result');
        //             console.log(result);
        //             this.alive = false;

        //         } ) 
        
        this.alive = false;

    }
    
}