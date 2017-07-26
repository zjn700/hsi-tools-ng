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
    if (this.printing){
        // document.body.style.webkitTransform =         // Chrome, Opera, Safari
        // //document.body.style.msTransform =           // IE 9
        // document.body.style.transform = 'scale(1)';  
        
        this.printing = false;
    }
  }


  ngOnInit() {
    this.activeUser=this.authService.getActiveUser();
  }
  
  printPage() {
    this.printing=true;
    // document.body.style.webkitTransform =         // Chrome, Opera, Safari
    // //document.body.style.msTransform =           // IE 9
    // document.body.style.transform = 'scale(.95)';
    setTimeout(function(){ window.print(); }, 100);
    
  }
  
  showMenu(){
    this.printing=false;
  }
}