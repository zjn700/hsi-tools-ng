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
    
      constructor(private projectService: ProjectService, private router: Router) {}
      
      ngOnInit(){
        this.projectService.getProjects()
          .takeWhile(() => this.alive)
          .subscribe(
            (projects: Project[]) => {
              this.projects = projects; 
              this.isInitialized = true;
            }
          );
          
        this.projectService.projectIsUpdated
          .takeWhile(() => this.alive)
          .subscribe(
            (isUpdated: boolean) => {
              if (isUpdated) {
                this.projects = this.projectService.sortProjectList();
               }
          });
          
      }
      
      ngOnDestroy(){
        this.alive = false;
      }

}