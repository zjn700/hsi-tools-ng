import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qstn-number',
  templateUrl: './qstn-number.component.html',
  styleUrls: ['./qstn-number.component.css']
})
export class QstnNumberComponent implements OnInit {
  @Input() q_number:string;
  
  @Output() passToParent:EventEmitter<string> = new EventEmitter<string>();

  
  constructor() { }

  ngOnInit() { }
  
  onClick(){
    console.log('number click')
    this.passToParent.emit('');  //('Jello Zac')
  }

}
