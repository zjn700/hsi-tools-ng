import { Component, OnInit, HostListener, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import "rxjs/add/operator/takeWhile";

import { Project } from "./proj.model";
import { ProjectService } from './proj.service';
import { CardService } from '../card/card.service';
import { AuthService } from '../users/auth.service';
import { TopMenuService } from '../shared/top-menu.service'

@Component({
  selector: 'app-proj',
  templateUrl: './proj.component.html',
  styleUrls: ['./proj.component.css']

})
export class ProjectComponent implements OnInit, OnDestroy {
    project: Project;
    // private myForm: FormGroup
    private alive: boolean = true;
    private inEditMode:boolean = false;
    private showForm:boolean = false;
    private isError:boolean =false;
    private errorMessage:string;

  @HostListener('click', ['$event']) 
  onClick(event:Event) {
    console.log(this.authService.isTokenExpired())
  }
  
  @HostListener('window:keyup', ['$event'])     
  keyEvent(event: KeyboardEvent) {
    console.log(this.authService.isTokenExpired())    
  }    
    
    constructor(private projectService: ProjectService, 
                private cardService:CardService, 
                private authService: AuthService,
                private topMenuService: TopMenuService,
                private router: Router) { }
                
                
    ngOnInit(){
        console.log('proj init')  
        // this.myForm = new FormGroup({
        //     title: new FormControl(null, Validators.required),
        //     description: new FormControl(null)
        // }) 
      
        this.projectService.projectIsInEditMode
            .takeWhile(() => this.alive)
            .subscribe(
                (project: Project) => {
                    this.project = project
                    this.inEditMode = true;
                    this.showForm = true;
                    this.focusOnTitleInput()
        })
    }
    
    ngOnDestroy() {
        this.alive = false;
    }            
    
    focusOnTitleInput(){
        let t_textArea = <HTMLElement>document.getElementsByClassName("p_title")[0];
          if (t_textArea) {
            setTimeout(()=>{
                t_textArea.focus();;
            }, 500);
          }
    }
    
    onSave(form: NgForm, titleInput){
        if (!form.value.title){
            this.isError=true
            this.errorMessage ="You must enter a title."
        } else {
            if (this.project) {
                // edit
                this.project.title = form.value.title;
                this.project.description = form.value.desc;
                var t_date = new Date()
                console.log('t_date')
                console.log(t_date)
                console.log(t_date.toISOString())
                this.project.state.dateModified = new Date(t_date.toISOString());
    
                this.projectService.updateProject(this.project)
                    .takeWhile(() => this.alive)
                    .subscribe(result => {
                        //console.log('result-after update');
                        //console.log(result);
                        //this.projectService.sortProjectList();
                    } ) 
                this.project = null;
                form.resetForm();
                this.inEditMode = false;
                this.showForm = false
    
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
                        project => {
                            console.log(project); 
                            localStorage.setItem('pid', project.id);
                            localStorage.setItem('ptitle', project.title.valueOf());
                            this.showForm = false;
                            this.projectService.setActiveProject(project)
                            this.router.navigate(['/tools']);
                            this.topMenuService.updateTopMenu('/tools')
                        },
                        error => console.log(error),
                );            
            }
            this.project = null;
            this.isError = false;
            form.resetForm();
            titleInput.focus()
        }
    }
    
    onClear(form: NgForm, titleInput){
        this.project = null;
        form.resetForm();
        //titleInput.focus()
        this.inEditMode = false;
        this.showForm = false;
        this.isError=false;


    }
    
    onAddProject(event){
        
        if (event.ctrlKey) {
            console.log('ctrlKey')
        }
        console.log(event)
        this.project = null;
        this.showForm=!this.showForm
        this.inEditMode = false;
        this.isError=false;
        window.scrollTo(0, 0);
        if (this.showForm) {
            this.focusOnTitleInput()
        }
        //window.print()
    }
    
    onDblclick(){
        console.log(event)
        console.log('onDblclick')
    }
}