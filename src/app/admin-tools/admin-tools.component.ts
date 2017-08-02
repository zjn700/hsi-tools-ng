import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import "rxjs/add/operator/takeWhile";


import { AdminToolsService } from './admin-tools.service';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit, OnDestroy {
  
  public activeButton = 1;
  public alive:boolean = true;

  constructor(private adminToolsService: AdminToolsService) { }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {}  
  
  
  setButtonActive(index){
      this.activeButton = index;
  }
  
  qnnIsSelected(){
    return this.adminToolsService.currentQnn != null;
  }

}