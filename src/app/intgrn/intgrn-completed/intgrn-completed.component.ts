import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intgrn-completed',
  templateUrl: './intgrn-completed.component.html',
  styleUrls: ['./intgrn-completed.component.css']
})
export class IntgrnCompletedComponent implements OnInit {
  
  @Input() projectTitle:string;
  @Input() qnnTitle:string;
  @Output() hideMe:EventEmitter<boolean> = new EventEmitter<boolean>();  

  constructor() { }

  ngOnInit() {
  }

  hideCompleted(){
    this.hideMe.emit(true)
  }
}
