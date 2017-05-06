import { Component, OnInit } from '@angular/core';
import { Project } from "./proj.model";
import { ProjectService } from './proj.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-proj-list',
    templateUrl: './proj-list.component.html',
    styleUrls: ['./proj-list.component.css']
})
export class ProjListComponent implements OnInit {
    projects: Project[] = [];
    
      constructor(private projectService: ProjectService, private router: Router) {}
      
      ngOnInit(){
        this.projectService.getProjects()
          .subscribe(
            (projects: Project[]) => {
              this.projects = projects; 
            }
          );
          
        this.projectService.projectIsUpdated
          .subscribe(
            (isUpdated: boolean) => {
              if (isUpdated) {
                this.projects = this.projectService.sortProjectList();
               }
          });
          
      }

}