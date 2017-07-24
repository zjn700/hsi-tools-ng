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

  constructor(private outputService: OutputService, private domainService: DomainService) { }

  ngOnInit() {
    this.domains =  this.outputService.sortDomainsByRisk(this.domainService.domains)
    console.log('this.domains')
    console.log(this.domains)
    
  }

}
