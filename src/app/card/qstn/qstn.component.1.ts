import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-qstn',
  templateUrl: './qstn.component.html',
  styleUrls: ['./qstn.component.css']
})
export class QstnComponent implements OnInit {

  @Input() q_content:string;
  @Input() q_number:string;
  public glossaryOn=false;
  public glossaryHtml;

  constructor() { }
  
  @HostListener('mouseover') onMouseOver() {
    console.log('mouseover')
    this.glossaryOn = true;
    setTimeout(()=>this.glossaryOn = false, 2000)
  }

  @HostListener('mouseout') onMouseOut() {
    console.log('mouseout')
    // this.glossaryOn = false;
    //setTimeout(()=>this.glossaryOn = false, 10000)
  }

  ngOnInit() {
    // console.log('this.q_content')
    // console.log(this.q_content)
      // let elementList = document.getElementsByClassName("question"); 
      // this.glossaryHtml = elementList[0].innerHTML
      // console.log('glossaryHtml')
      // console.log(this.glossaryHtml)
      
      // console.log(this.q_content)
      // this.glossaryHtml = this.q_content

    
  }
  
  onClick(e) {
    //this.glossaryOn = false
    // this.glossaryOn=!this.glossaryOn
    // if (this.glossaryOn) {
    //   setTimeout(()=>this.glossaryOn=false, 4000)
    // }
    
    //var copy_text = document.getElementsByClassName("question")[0];
    
    var textToCopy = document.getElementsByTagName("p")[0] //document.querySelector(e);
    var textBox = <HTMLInputElement>document.querySelector(".clipboard");
    textBox.setAttribute('value', textToCopy.innerHTML);
  
    textBox.select();
    document.execCommand('copy')
    
  }
  
  copyOne(){
    var copy_text = document.getElementsByTagName("p")[0];
    console.log('copy_text')
    console.log(copy_text)
    var range = document.createRange();
    range.selectNode(copy_text);
    window.getSelection().addRange(range);
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  }
  

}
