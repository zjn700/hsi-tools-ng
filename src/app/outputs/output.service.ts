import { Injectable, EventEmitter } from '@angular/core';

import { DomainService } from '../domn/domn.service';
import { CardService } from '../card/card.service';
import { AuthService } from '../users/auth.service';
import { DomainText } from './domainText.model';
import { Output } from './output.model';
import { OutputDomain } from './output-domain.model';
import { OutputTradeOff } from './output-trade-off.model';

@Injectable()
export class OutputService {
    public domains;
    public domainText:DomainText[]=[];
    public outputDomains: OutputDomain[]=[];
  
    constructor(private domainService: DomainService, 
              private cardService: CardService, 
              private authService: AuthService,
              // private router:Router, // may need if we implement click on item edit
              // private activatedRoute: ActivatedRoute
              ) { }    
    
    convertRiskValue(val){
        return this.cardService.convertRiskValue(val)
     }

    transFormTradeOffs(tradeOffs) {
      let t_outputTradeOffs: OutputTradeOff[] = [];
      
      for (let tradeOff of tradeOffs) {
          t_outputTradeOffs.push(new OutputTradeOff(  
            tradeOff,        
            this.transformText(tradeOff.risksIssuesConcerns),
            this.transformText(tradeOff.mitigationStrategy)
            )
          )
      }
      return t_outputTradeOffs
    }

    flattenDomainsThenSortAnswersByRisk(domains) {
       let t_outputs: Output[] = [];
       for (let domain of domains) {
          let t_domainTitle = domain.title;
          let t_domainSequence =domain.sequence;
          let index = 0;
          for (let answer of domain.answers) {
              t_outputs.push(new Output(
                  t_domainSequence,
                  t_domainTitle,
                  domain.questions[index].sequence,
                  domain.questions[index].content,
                  //answer.sequence,
                  answer.value,
                  answer.riskValue,
                  this.convertRiskValue(answer.riskValue),
                  this.transformText(answer.rationale),
                  answer.riskDetails[0].strategy,
                  answer.riskDetails[0].impact,
                  this.transformText(answer.riskDetails[0].mitigationPlan),
                  this.transformText(answer.riskDetails[0].planTracking),
                  answer.riskDetails[0].stakeholdersInformed,
                  answer.riskDetails[0].strategyDocumented
                )
              )
              index++;
          }
       }
       console.log('t_outputs') 
       console.log(t_outputs) 
      // this.sortByRiskValue(t_outputs)
       this.sortByRiskValueAndDomainNumber(t_outputs)
       return t_outputs
       
    }
    
    sortDomainsByRisk(domains) {
       let t_outputDomains: OutputDomain[] = []
       for (let domain of domains) {
          let t_outputs: Output[] = [];
          let t_domainTitle = domain.title;
          let t_domainSequence =domain.sequence;
          let index = 0;
          for (let answer of domain.answers) {
              console.log('domain.questions[index].sequence')
              console.log(domain.questions[index].sequence)
              t_outputs.push(new Output(
                  t_domainSequence,
                  t_domainTitle,
                  domain.questions[index].sequence,
                  domain.questions[index].content,
                  //answer.sequence,
                  answer.value,
                  answer.riskValue,
                  this.convertRiskValue(answer.riskValue),
                  this.transformText(answer.rationale),
                  answer.riskDetails[0].strategy,
                  answer.riskDetails[0].impact,
                  this.transformText(answer.riskDetails[0].mitigationPlan),
                  this.transformText(answer.riskDetails[0].planTracking),
                  answer.riskDetails[0].stakeholdersInformed,
                  answer.riskDetails[0].strategyDocumented
                )
              )
            index++;

          }
          this.sortByRiskValue(t_outputs)
          let t_outputDomain = new OutputDomain()
          t_outputDomain.outputs = t_outputs
          t_outputDomains.push(t_outputDomain)
          //index++;
       }
       console.log('t_outputDomains') 
       console.log(t_outputDomains) 
       return(t_outputDomains)
    }
   
    transformText(textAreaInput) {
      let emptyString = ''; 
      if (textAreaInput) {
        return textAreaInput.split(/\r?\n/)
      } else {
        return emptyString
      }
    }

    transformAnswers(domains){
        this.domains=domains
        
        console.log(domains)
       // this.flattenDomainsThenSortAnswersByRisk(domains);
       // this.sortDomainsByRisk(domains);
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
                
                t_domains[i].rationale.push(this.transformText(answer.rationale))

            //   if (answer.rationale) {
            //     var t_answerArray = answer.rationale.split(/\r?\n/)
            //     t_domains[i].rationale.push(t_answerArray)
            //   } else {
            //     t_domains[i].rationale.push('')
                
            //   }
              

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
        // for (let domain of this.domainText) {
        //     console.log(domain.riskValue)
        //     console.log(this.sortByRiskValue(domain.riskValue))
        // }
        return this.domainText;
    }    
    
    sortByRiskValue(domain) {  // reverse alpabetical order
        console.log('sorting...')
        return  domain.sort(function(a, b){
                if ( a.riskValue > b.riskValue) { return -1;}
                if ( a.riskValue < b.riskValue ) { return 1;}
                if ( a.questionSequence < b.questionSequence) { return -1;};
                if ( a.questionSequence > b.questionSequence ) { return 1;};
                return 0;
              })
    }
 
     sortByRiskValueAndDomainNumber(domain) {  // reverse alpabetical order
        console.log('sorting...')
        return  domain.sort(function(a, b){
                if ( a.riskValue > b.riskValue) { return -1;};
                if ( a.riskValue < b.riskValue ) { return 1;};
                if ( a.domainSequence < b.domainSequence) { return -1;};
                if ( a.domainSequence > b.domainSequence ) { return 1;};                
                if ( a.questionSequence < b.questionSequence) { return -1;};
                if ( a.questionSequence > b.questionSequence ) { return 1;};                
                return 0;
              })
    }   
}