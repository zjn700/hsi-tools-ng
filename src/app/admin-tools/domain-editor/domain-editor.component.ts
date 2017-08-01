import { Component, OnInit } from '@angular/core';
import { AdminToolsService } from '../admin-tools.service'

@Component({
  selector: 'app-domain-editor',
  templateUrl: './domain-editor.component.html',
  styleUrls: ['./domain-editor.component.css']
})
export class DomainEditorComponent implements OnInit {
  
  public qnn;
  public domains;

  constructor(private adminToolsService: AdminToolsService) { }

  ngOnInit() {
    this.domains = this.adminToolsService.getDomainList()
    //this.qnn = this.adminToolsService.getActiveQnn
    console.log('this.domains')
    console.log(this.domains)
  }
  
  qnnMatches(qnn){
    console.log(qnn)
    console.log(this.adminToolsService.currentQnn._id)
    return qnn == this.adminToolsService.currentQnn._id
  }
  
  getActiveQnn(){
    return this.adminToolsService.getActiveQnn()
  }

}
