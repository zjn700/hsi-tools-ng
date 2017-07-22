import { Component, OnInit } from '@angular/core';

import { DomainService } from '../domn/domn.service';
import { CardService } from '../card/card.service';
import { AuthService } from '../users/auth.service';
import { DomainText } from './domainText.model';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  
  public domains;
  public domainText:DomainText[]=[];
  public projectTitle = localStorage.getItem('ptitle')
  public qnnTitle = localStorage.getItem('qnnTitle')
  public activeUser;

  constructor(private domainService: DomainService, 
              private cardService: CardService, 
              private authService: AuthService) { }

  ngOnInit() {
    this.domains = this.domainService.domains
    this.transformAnswers();
    this.activeUser=this.authService.getActiveUser();
  }
  
  convertRiskValue(val){
    return this.cardService.convertRiskValue(val)
  }

  transformAnswers(){
    let t_domains: DomainText[] = [];
    for (let domain of this.domains) {
      let t_Rationale: string[] = [];
      let t_riskValue: number[] = [];
      let t_mitigationPlan: string[] = [];
      let t_planTracking: string[] = [];
      let i = domain.sequence-1;
      t_domains.push(new DomainText(
        domain.sequence,
        t_Rationale,
        t_riskValue,
        t_mitigationPlan,
        t_planTracking))
        for (let answer of domain.answers) {
          
          if (answer.rationale) {
            var t_answerArray = answer.rationale.split(/\r?\n/)
            t_domains[i].rationale.push(t_answerArray)
          } else {
            t_domains[i].rationale.push('')
          }
          
          if (answer.riskValue) {
            t_domains[i].riskValue.push(this.convertRiskValue(answer.riskValue))
          } else {
            t_domains[i].riskValue.push(null)
          }
          
          if (answer.riskDetails[0].mitigationPlan) {
            var t_answerArray = answer.riskDetails[0].mitigationPlan.split(/\r?\n/)
            t_domains[i].mitigationPlan.push(t_answerArray)
          } else {
            t_domains[i].mitigationPlan.push('')
          }  
          
          if (answer.riskDetails[0].planTracking) {
            var t_answerArray = answer.riskDetails[0].planTracking.split(/\r?\n/)
            t_domains[i].planTracking.push(t_answerArray)
          } else {
            t_domains[i].planTracking.push('')
          }          
        
        }
    }
    console.log(t_domains)
    this.domainText = t_domains;
  }
}