import { Component, OnInit } from '@angular/core';
import { OutputService } from '../output.service';
import { DomainService } from '../../domn/domn.service';

@Component({
  selector: 'app-sorted-by-risk',
  templateUrl: './sorted-by-risk.component.html',
  styleUrls: ['./sorted-by-risk.component.css']
})
export class SortedByRiskComponent implements OnInit {
  public domains;
  public totalDomains=0;

  constructor(private outputService: OutputService, private domainService: DomainService) { }

  ngOnInit() {
    this.domains =  this.outputService.sortDomainsByRisk(this.domainService.domains)
    console.log('this.domains')
    console.log(this.domains)
    
  }
  
  thereAreRisks(domainOutputs){
    if (!this.totalDomains < domainOutputs.length) {
      this.totalDomains += 1;
      console.log(domainOutputs)
      for (var i=0;i<domainOutputs.length;i++) {
        // console.log('domainOutputs[i]')
        // console.log(domainOutputs[i])
        if (domainOutputs[i].answerValue==false && domainOutputs[i].riskValue > 20) {
          return true;
        }
      }
      return false;
    }
  }

}
