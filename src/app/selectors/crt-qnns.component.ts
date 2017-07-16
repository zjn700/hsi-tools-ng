import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Questionnaire } from '../card/qnn/qnn.model';
import { SelectorService } from './selector.service';
import { TopMenuService } from '../shared/top-menu.service';
import { ProjectService } from '../proj/proj.service'
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'app-crt-qnns',
  templateUrl: './crt-qnns.component.html',
  styleUrls: ['./crt-qnns.component.css']
})
export class CrtQnnsComponent implements OnInit, OnDestroy {
  category = '1';   // RT: Requirements Tool
  projectTitle: string;
  public qnns: Questionnaire[] = [];
  private alive:boolean = true;
  private isInitialized = false;

  constructor(private selectorService: SelectorService, 
              private topMenuService: TopMenuService, 
              private projectService: ProjectService,
              private  router: Router) { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
    this.selectorService.getQuestionnaires(this.category)
      .takeWhile(() => this.alive)
      .subscribe((qnns: Questionnaire[]) => {
        this.qnns = qnns;
        this.isInitialized=true;
      })
  }
  ngOnDestroy(){
    this.alive = false;
  }
  goToQnn(qnn: Questionnaire) {
    
    // here is where state should be initially set
    localStorage.setItem('qnnId', qnn.id.valueOf());
    localStorage.setItem('qnnTitle', qnn.title.valueOf());
    localStorage.setItem('qnnAbbreviation', qnn.abbreviation.valueOf());
    localStorage.setItem('resume', 'false')
    this.router.navigate(['/questions']) 
  }
  
  
  resumeQnn(qnn: Questionnaire) {
    var t_url = null;
    
    // here is where state should be initially set
    localStorage.setItem('qnnId', qnn.id.valueOf());
    localStorage.setItem('qnnTitle', qnn.title.valueOf());
    localStorage.setItem('qnnAbbreviation', qnn.abbreviation.valueOf());
    
    t_url = this.projectService.setStateByQnnId(qnn.id.valueOf());

    if (t_url) {
      localStorage.setItem('resume', 'true')
      this.router.navigate([t_url]) ;
      this.topMenuService.updateTopMenu(t_url)

    } else {
      localStorage.setItem('resume', 'false')
      this.router.navigate(['/questions']) 
      this.topMenuService.updateTopMenu('/questions');
      
    }
  }  
  
  onClick(button){
    console.log('crt button')
    console.log(button)
    //this.topMenuService.updateTopMenu(button)
  }

}
