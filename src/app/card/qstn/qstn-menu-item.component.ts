import { Component, OnInit, Input } from '@angular/core';
import { Question } from './qstn.model';

@Component({
  selector: 'app-qstn-menu-item',
  templateUrl: './qstn-menu-item.component.html',
  styleUrls: ['./qstn-menu-item.component.css']
})
export class QstnMenuItemComponent implements OnInit {
   @Input() q_content:string;
   @Input() questions:Question[];


  constructor() { }

  ngOnInit() {
  }

}
