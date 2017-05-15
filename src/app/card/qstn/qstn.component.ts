import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qstn',
  templateUrl: './qstn.component.html',
  styleUrls: ['./qstn.component.css']
})
export class QstnComponent implements OnInit {

  @Input() q_content:string;
  @Input() q_number:string;

  constructor() { }

  ngOnInit() {
    console.log('this.q_content')
    console.log(this.q_content)
  }

}
