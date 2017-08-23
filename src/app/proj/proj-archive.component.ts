import { Component, OnInit, Input } from '@angular/core';

import { ProjectService } from './proj.service';
import { Project } from "./proj.model";

@Component({
  selector: 'app-proj-archive',
  templateUrl: './proj-archive.component.html',
  styleUrls: ['./proj-archive.component.css']
})
export class ProjArchiveComponent implements OnInit {

  @Input() project: Project;
  @Input() showArchives;
    
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    // console.log('this.project')
    // console.log(this.project)
  }

  onRestoreProject(){
    this.project.archived = false;
    this.project.state.dateModified = new Date();
    this.projectService.archiveProject(this.project)
        .subscribe(
            result => console.log(result))
  }
  
}
