import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ansr-riskbox',
  templateUrl: './ansr-riskbox.component.html',
  styleUrls: ['./ansr-riskbox.component.css']
})
export class AnsrRiskboxComponent implements OnInit {
  @Input() a_value:boolean = null;

  constructor() { }

  ngOnInit() {
  }

}
