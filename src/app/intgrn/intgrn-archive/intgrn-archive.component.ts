import { Component, OnInit, Input } from '@angular/core';
import { IntegrationService } from '../intgrn.service';


@Component({
  selector: 'app-intgrn-archive',
  templateUrl: './intgrn-archive.component.html',
  styleUrls: ['./intgrn-archive.component.css']
})
export class IntgrnArchiveComponent implements OnInit {
  @Input() integrations;
  @Input() showArchives;
  
  constructor(private integrationService: IntegrationService) { }

  ngOnInit() {
  }
  
  onRestore(evaluation){
    evaluation.archived = false;
    this.integrationService.archiveThisEvaluation(evaluation)

  }

}
