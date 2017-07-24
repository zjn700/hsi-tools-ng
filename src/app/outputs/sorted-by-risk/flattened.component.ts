import { Component, OnInit } from '@angular/core';

import { OutputService } from '../output.service';
import { DomainService } from '../../domn/domn.service';

@Component({
  selector: 'app-flattened',
  templateUrl: './flattened.component.html',
  styleUrls: ['./flattened.component.css', './sorted-by-risk.component.css']
})
export class FlattenedComponent implements OnInit {
  
  public outputs;

  constructor(private outputService: OutputService, private domainService: DomainService) { }

  ngOnInit() {
    this.outputs =  this.outputService.flattenDomainsThenSortAnswersByRisk(this.domainService.domains)
    console.log('this.outputs')
    console.log(this.outputs)    
    
  }

}
