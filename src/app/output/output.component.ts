import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

import { SelectorService } from '../selectors/selector.service'
import { DomainService } from '../domn/domn.service';
import { CardService } from '../card/card.service';
import { DomainText } from './domainText.model';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  
  public domains;
  public output= []
  public revisedText=['nothingburger','', "blah"];
  public domainText:DomainText[]=[];
  private compareContent=null;
  public projectTitle = localStorage.getItem('ptitle')
  public qnnTitle = localStorage.getItem('qnnTitle')

  constructor(private selectorService: SelectorService, private domainService: DomainService, private cardService: CardService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log(this.selectorService.qnns)
    console.log(this.domainService.domains)
    this.domains = this.domainService.domains
    //this.addLineBreaksToTextareas()
    this.transformAnswers();
    
    //this.buildOutput();
    //console.log(this.output)
  }
  
  convertRiskValue(val){
    console.log("convertRiskValue")
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
  

  addLineBreaksToTextareas(){
    let t_domains: DomainText[] = [];
    for (let domain of this.domains) {
      let t_Rationale: string[] = [];
      let i = domain.sequence-1;
      t_domains.push(new DomainText(
        domain.sequence,
        t_Rationale))
        for (let answer of domain.answers) {
          if (answer.rationale) {
            var t_answerArray = answer.rationale.split(/\r?\n/)
            t_domains[i].rationale.push(t_answerArray)
          } else {
            t_domains[i].rationale.push('')
          }
        }
    }
    console.log(t_domains)
    this.domainText = t_domains;
  }
  
  addLineBreaks(content){
    if (content) {
      if (content != this.compareContent) {
        console.log('here in addLineBreaks')
        // console.log(content.split(/\r?\n/))
        // console.log(content.split(/\n/))
        // console.log(content.split(/\r/))
        // console.log(this.domSanitizer.bypassSecurityTrustHtml(content))
        // //return this.sanitized.bypassSecurityTrustHtml(value);
        // console.log(content)
        // console.log(content.replace(/\r?\n/g, '&#013'))
        // console.log(content.replace(/\r?\n/g, '<br>'))
        // var t_content = content.replace(/\r?\n/g, '<br>')
        // //this.revisedText = content.replace(/\r?\n/g, '<br>')
        this.compareContent = content;
        this.revisedText=[];
        this.revisedText = content.split(/\r?\n/)
        console.log(this.revisedText)
      }
      //return this.domSanitizer.bypassSecurityTrustHtml(t_content) //content.replace(/\r?\n/g, '<br>');
    }
    // https://stackoverflow.com/questions/863779/javascript-how-to-add-line-breaks-to-an-html-textarea
    // https://stackoverflow.com/questions/31548311/angular-2-html-binding
    
    // {{addLineBreaks(domain.answers[i]?.rationale)}}
  }
}


            // [ngClass]="{'gry' : riskValue==null,
            //                   'grn' : domain.answers[i]?.riskValue<20 && domain.answers[i]?.riskValue!=null,
            //                   'red' : domain.answers[i]?.riskValue>30,
            //                   'ylo' : domain.answers[i]?.riskValue>20 && domain.answers[i]?.riskValue<30}">
            //   {{convertRiskValue(domain.answers[i]?.riskValue)}}
            // </div>