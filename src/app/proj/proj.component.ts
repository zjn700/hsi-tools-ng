import { Component, OnInit } from '@angular/core';
import { ProjectService } from './proj.service';
import { Project } from "./proj.model";
import { TopMenuService } from '../shared/top-menu.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proj',
  templateUrl: './proj.component.html',
  styleUrls: ['./proj.component.css']

})
export class ProjectComponent implements OnInit {
    project: Project;
    
    constructor(private projectService: ProjectService, private topMenuService:TopMenuService) { }
    
    onSave(form: NgForm, titleInput){
        if (this.project) {
            // edit
            this.project.title = form.value.title;
            this.project.description = form.value.desc;

            this.projectService.updateProject(this.project)
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
        .subscribe(
            (project: Project) => {
              this.project = project
        })
    }
    
}