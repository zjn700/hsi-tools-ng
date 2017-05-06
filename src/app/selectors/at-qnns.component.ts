import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../card/qnn/qnn.model';
import { SelectorService } from './selector.service';

@Component({
  selector: 'app-at-qnns',
  templateUrl: './at-qnns.component.html',
  styleUrls: ['./at-qnns.component.css']
})
export class AtQnnsComponent implements OnInit {
  category = '2';   // AT: Assesment Tool
  projectTitle: string;
  qnns: Questionnaire[] = [];

  constructor(private selectorService: SelectorService) { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
      this.selectorService.getQuestionnaires(this.category)
        .subscribe((qnns: Questionnaire[]) => {
          this.qnns = qnns;
        })    
  }
  
  goToQnn(qnn: Questionnaire) {
  }

}
