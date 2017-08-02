import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";
import { AdminToolsService } from '../admin-tools.service'

@Component({
  selector: 'app-qnn-editor',
  templateUrl: './qnn-editor.component.html',
  styleUrls: ['./qnn-editor.component.css']
})
export class QnnEditorComponent implements OnInit, OnDestroy {
  private alive:boolean = true;
  public isInitialized = false;
  public qnns;
  
  constructor(private adminToolsService: AdminToolsService) { }
  
  ngOnDestroy(){
    this.alive = false
  }

  ngOnInit() {
    
    this.adminToolsService.getQnns()
      .takeWhile(() => this.alive)
      .subscribe((qnns)=>{
        console.log('here in qnn subscription')
        this.qnns = qnns;
        this.isInitialized = true;
      })      
  }
  
  selectThisQnn(qnn){
    console.log(qnn)
    //this.currentQnn = qnn;
    if (this.adminToolsService.domains) {
      this.adminToolsService.domains = [];
    }
    this.adminToolsService.setActiveQnn(qnn);
  }

  isThisTheCurrenQnn(qnn){
    return this.adminToolsService.currentQnn == qnn;
    
  }
}
