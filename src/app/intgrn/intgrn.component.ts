import { Component, OnInit } from '@angular/core';
import { DomainService } from '../domn/domn.service';
import { ProjectService } from '../proj/proj.service';


@Component({
  selector: 'app-intgrn',
  templateUrl: './intgrn.component.html',
  styleUrls: ['./intgrn.component.css']
})
export class IntgrnComponent implements OnInit {
  private projectTitle:string;
  private qnnTitle:string
  private showHeuristics:boolean = true;
  
  constructor(private domnService: DomainService, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
    this.qnnTitle = localStorage.getItem('qnnTitle')
    // console.log(this.domnService.getServiceDomains())
    // console.log(this.projectService.getTestStr())
    // console.log(this.projectService.getDomains())

  }
  goToEvaluation(){
    this.showHeuristics=false;
  }
  
  onHideMe(){
    this.showHeuristics=true;
  }

}
