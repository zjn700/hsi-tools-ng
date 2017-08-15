import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
    @Input() showForm;
    projects: Project[] = [];
    private alive:boolean = true;
    private isInitialized:boolean = false;
    public activeProjectTotal=0;
    public archiveProjectTotal=0;
    public showArchives=false;
    public showMessage = false;
    public message = "You have not entered a project. Click the green plus button below to create one."
    public archivesMessage = "You have no active projects. Click the green plus button below to create one. Or click the 'Show archives' link to restore an archived project"
    
      constructor(private projectService: ProjectService, private router: Router) {}
      
      ngOnDestroy(){
        this.alive = false;
      }      
      
      ngOnInit(){
        
        this.projects = this.projectService.sortProjectList();
        console.log('this.projects')
        console.log(this.projects)

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
        this.archiveProjectTotal = 0;
        for (var i = 0; i < projects.length; i++) {
          if (!projects[i].archived) {
            this.activeProjectTotal += 1;
          } else {
            this.archiveProjectTotal += 1;
          }
        }
        console.log('this.activeProjectTotal')
        console.log(this.activeProjectTotal)
        
        if (this.archiveProjectTotal==0) {
          this.showArchives=false;
        }
      }
      


}