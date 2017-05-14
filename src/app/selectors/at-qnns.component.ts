import { Component, OnInit, OnDestroy } from '@angular/core';
import { Questionnaire } from '../card/qnn/qnn.model';
import { SelectorService } from './selector.service';
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'app-at-qnns',
  templateUrl: './at-qnns.component.html',
  styleUrls: ['./at-qnns.component.css']
})
export class AtQnnsComponent implements OnInit, OnDestroy {
  category = '2';   // AT: Assesment Tool
  projectTitle: string;
  qnns: Questionnaire[] = [];
  private alive:boolean = true;

  constructor(private selectorService: SelectorService) { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');
      this.selectorService.getQuestionnaires(this.category)
        .takeWhile(() => this.alive)
        .subscribe((qnns: Questionnaire[]) => {
          this.qnns = qnns;
        })    
  }
  ngOnDestroy(){
    this.alive = false;
  }
  goToQnn(qnn: Questionnaire) {
  }

}
