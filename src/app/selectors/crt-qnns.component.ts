import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Questionnaire } from '../card/qnn/qnn.model';
import { SelectorService } from './selector.service';
import { TopMenuService } from '../shared/top-menu.service';


@Component({
  selector: 'app-crt-qnns',
  templateUrl: './crt-qnns.component.html',
  styleUrls: ['./crt-qnns.component.css']
})
export class CrtQnnsComponent implements OnInit {
  category = '1';   // RT: Requirements Tool
  projectTitle: string;
  qnns: Questionnaire[] = [];

  constructor(private selectorService: SelectorService, private topMenuService: TopMenuService, private  router: Router) { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
    this.selectorService.getQuestionnaires(this.category)
      .subscribe((qnns: Questionnaire[]) => {
        this.qnns = qnns;
      })
  }
  
  goToQnn(qnn: Questionnaire) {
    localStorage.setItem('qnnId', qnn.id.valueOf());
    localStorage.setItem('qnnTitle', qnn.title.valueOf());
    localStorage.setItem('qnnAbbreviation', qnn.abbreviation.valueOf());
    this.router.navigate(['/questions']) 
  }
  
  onClick(button){
    console.log('crt button')
    console.log(button)
    this.topMenuService.updateTopMenu(button)
  }

}
