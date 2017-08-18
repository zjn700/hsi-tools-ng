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
  public activeButton = 1;
  

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
    //this.printing=true;
    window.scrollTo(0, 0);
    setTimeout(()=>{
      this.printing=true
      setTimeout(()=>{window.print();}, 200)
    }, 300)

    // document.body.style.webkitTransform =         // Chrome, Opera, Safari
    // //document.body.style.msTransform =           // IE 9
    // document.body.style.transform = 'scale(.95)';
    
    // setTimeout(function(){ this.printing=true; window.print(); }, 500);
    
  }
  
  setButtonActive(index) {
    this.activeButton = index;
  }
  
  showMenu(){
    this.printing=false;
  }
}