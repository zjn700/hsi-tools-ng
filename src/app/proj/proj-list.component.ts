import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from "./proj.model";
import { ProjectService } from './proj.service';
import { Router } from '@angular/router';
import "rxjs/add/operator/takeWhile";

@Component({
    selector: 'app-proj-list',
    templateUrl: './proj-list.component.html',
    styleUrls: ['./proj-list.component.css']
})
export class ProjListComponent implements OnInit {
    projects: Project[] = [];
    private alive:boolean = true;
    private isInitialized:boolean = false;
    public activeProjectTotal=0;
    public showArchives=false;
    public showMessage = false;
    public message = "You have not entered a project. Please click the green plus button below to create one:"
    
      constructor(private projectService: ProjectService, private router: Router) {}
      
      ngOnDestroy(){
        this.alive = false;
      }      
      
      ngOnInit(){
        
        this.projects = this.projectService.sortProjectList();

        this.projectService.getProjects()
          .takeWhile(() => this.alive)
          .subscribe(
            (projects: Project[]) => {
              this.countActiveProjects(projects);
              if (projects.length > 0 ) {
                this.projects = projects; 
                this.isInitialized = true;
                this.showMessage = false;
              } else {
                this.isInitialized = true;
                this.showMessage = true;

                
              }
            }
          );
          
        this.projectService.projectIsUpdated
          .takeWhile(() => this.alive)
          .subscribe(
            (isUpdated: boolean) => {
              if (isUpdated) {
                console.log('list proj updated')
                console.log(this.projects)
                this.projects = this.projectService.sortProjectList();
                console.log(this.projects)

                this.countActiveProjects(this.projects)
                console.log(this.activeProjectTotal)

               }
          });
          
      }
      
      toggleArchivedProjects(){
        console.log('this.showArchives' )
        console.log(this.showArchives )
        this.showArchives = !this.showArchives;
        console.log(this.showArchives )

      }
      
      countActiveProjects(projects){
        this.activeProjectTotal = 0;
        for (var i = 0; i < projects.length; i++) {
          if (!projects[i].archived) {
            this.activeProjectTotal += 1;
          }
        }
        console.log('this.activeProjectTotal')
        console.log(this.activeProjectTotal)
      }
      


}