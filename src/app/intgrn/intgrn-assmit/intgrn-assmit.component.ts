import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intgrn-assmit',
  templateUrl: './intgrn-assmit.component.html',
  styleUrls: ['./intgrn-assmit.component.css']
})
export class IntgrnAssmitComponent implements OnInit {
  @Input() showHeuristics:boolean
  @Input() projectTitle:string;
  @Input() qnnTitle:string;
  @Output() hideMe:EventEmitter<boolean> = new EventEmitter<boolean>();
  private showCompleted=false;

  constructor() { }

  ngOnInit() {
  }
  
  onClickPrev(){
    this.hideMe.emit(true)
  }
  
  onClickNext(){
    this.showCompleted = true;
  }
  
  onHideMe() {
    this.showCompleted=false;
  }
}
