import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intgrn',
  templateUrl: './intgrn.component.html',
  styleUrls: ['./intgrn.component.css']
})
export class IntgrnComponent implements OnInit {
  projectTitle:string;
  
  constructor() { }

  ngOnInit() {
    this.projectTitle = localStorage.getItem('ptitle');

  }

}
