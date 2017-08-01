import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { AdminToolsService } from '../admin-tools.service'

@Component({
  selector: 'app-qnn-editor',
  templateUrl: './qnn-editor.component.html',
  styleUrls: ['./qnn-editor.component.css']
})
export class QnnEditorComponent implements OnInit, OnDestroy {
  
  public qnns;
  private qnnListIsLoaded = false;
  public currentQnn=null;
  private alive:boolean = true;

  constructor(private adminToolsService: AdminToolsService) { }

  ngOnDestroy(){
    this.alive = false;
  }
  
  ngOnInit() {
    
    this.adminToolsService.qnnListIsReady
      .takeWhile(() => this.alive)
      .subscribe(()=>{
        this.qnns = this.adminToolsService.getQnnList();
        this.qnnListIsLoaded = true;
        console.log(this.qnns)        
      })
      
      if (this.adminToolsService.qnnListIsLoaded) {
        this.qnns = this.adminToolsService.getQnnList()
        console.log(this.qnns)
      }
      
      if (this.adminToolsService.currentQnn != null) {
        this.currentQnn = this.adminToolsService.currentQnn
      }
  }
  
  selectThisQnn(qnn){
    console.log(qnn)
    this.currentQnn=qnn;
    this.adminToolsService.setActiveQnn(qnn);
  }
  
  isThisTheCurrenQnn(qnn){
    return this.adminToolsService.currentQnn == qnn;
  }

}
