import { Component, OnInit,  OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import "rxjs/add/operator/takeWhile";

import { Project } from "./proj.model";
import { ProjectService } from './proj.service';
import { CardService } from '../card/card.service';
//import { TopMenuService } from '../shared/top-menu.service';

@Component({
  selector: 'app-proj',
  templateUrl: './proj.component.html',
  styleUrls: ['./proj.component.css']

})
export class ProjectComponent implements OnInit, OnDestroy {
    project: Project;
    private alive: boolean = true;

    //constructor(private projectService: ProjectService, private topMenuService:TopMenuService) { }
    constructor(private projectService: ProjectService, private cardService:CardService) { }
    
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
                    data => console.log(data),
                    error => console.log(error)
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
        this.alive = false;

    }
    
}