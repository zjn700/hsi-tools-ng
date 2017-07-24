import { Component, OnInit, HostListener } from '@angular/core';

import { AuthService } from '../users/auth.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  
  public projectTitle = localStorage.getItem('ptitle')
  public qnnTitle = localStorage.getItem('qnnTitle')
  public activeUser;
  public printing=false;

  constructor( private authService: AuthService ) { }
  
  @HostListener('mouseover') onMouseUp() {
    this.printing = false;
  }


  ngOnInit() {
    this.activeUser=this.authService.getActiveUser();
  }
  
  printPage() {
    this.printing=true;
    setTimeout(function(){ window.print(); }, 100);
    
  }
  
  showMenu(){
    this.printing=false;
  }
}