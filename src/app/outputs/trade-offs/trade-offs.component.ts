import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../../intgrn/intgrn.service'
import { OutputService } from '../output.service'

@Component({
  selector: 'app-trade-offs',
  templateUrl: './trade-offs.component.html',
  styleUrls: ['./trade-offs.component.css']
})
export class TradeOffsComponent implements OnInit {
  public tradeOffs;

  constructor(private integrationService: IntegrationService, private outputService: OutputService) { }

  ngOnInit() {
    //this.tradeOffs = this.integrationService.getIntegrations();
    //if (this.tradeOffs.length==0) {
      this.integrationService.getIntegrationsFromDb()
        .subscribe((integrations)=> {
            if (integrations.length==0){
              // console.log('show error message')
            } else {
              var t_tradeoffs =integrations;
              this.tradeOffs = this.outputService.transFormTradeOffs(integrations)
              // console.log('t_tradeoffs')
              // console.log(t_tradeoffs)
              // console.log('this.tradeOffs')
              // console.log(this.tradeOffs)
            }
          })
    //}
   // // console.log('this.tradeOffs')
   // // console.log(this.tradeOffs)  
  }


}
