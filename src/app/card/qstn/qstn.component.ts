import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { CardService } from '../../card/card.service';


@Component({
  selector: 'app-qstn',
  templateUrl: './qstn.component.html',
  styleUrls: ['./qstn.component.css']
})
export class QstnComponent implements OnInit, OnDestroy {

  @Input() q_content:string;
  @Input() q_number:string;
  public glossaryOn=false;
  public glossaryHtml;
  private alive=true;

  constructor(private cardService: CardService) { }
  
  @HostListener('mouseover') onMouseOver() {
    console.log('mouseover')
    this.glossaryOn = true;
    //setTimeout(()=>this.glossaryOn = false, 2000)
  }

  @HostListener('mouseout') onMouseOut() {
    console.log('mouseout')
    // this.glossaryOn = false;
    //setTimeout(()=>this.glossaryOn = false, 10000)
  }

  ngOnDestroy() {
    this.alive = false;
  }
  
  ngOnInit() {
    
    this.cardService.updatedQuestionNumber
      .takeWhile(() => this.alive)
      .subscribe((index: number) => {
        this.glossaryOn = false;
    })
    
  }
  
  onClick(e) {
    //this.copyTwo()
    this.copyOne()
    
  }
  
  copyTwo() {
    var textToCopy = document.getElementsByClassName("question")[0];
    
    //var textToCopy = document.getElementsByTagName("p")[0] //document.querySelector(e);
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
