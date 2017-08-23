import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { AdminToolsService } from '../admin-tools.service';
import { Domain } from '../../domn/domn.model';

@Component({
  selector: 'app-domain-editor',
  templateUrl: './domain-editor.component.html',
  styleUrls: ['./domain-editor.component.css']
})
export class DomainEditorComponent implements OnInit, OnDestroy {
  
  public alive:boolean  = true;
  public isInitialized:boolean = false;
  public addNewMessage:boolean = false;
  public qnn;
  public domain;
  public domains: Domain[] = [];
  public domainNames = ['General',
                        'Manpower',
                        'Personnel',
                        'Training',
                        'Human Factors',
                        'Environment',
                        'Safety',
                        'Occupational Health',
                        'Survivability',
                        'Habitability'
                        ]
  
  constructor(private adminToolsService: AdminToolsService) { }
  
  ngOnDestroy(){
    this.alive = false;
  }

  ngOnInit() {
    
    this.adminToolsService.getDomains()
      .takeWhile(() => this.alive)
      .subscribe((domains)=>{
        // console.log('here in domain subscription')
        // console.log('domains')
        // console.log(domains)
        this.domains = domains;
        if (domains.length == 0){
          this.addNewMessage = true;
        }
        this.isInitialized = true;
      })
  }
  
  setActiveDomain(domain){
    // console.log(domain)
    // if (this.adminToolsService.domains) {     // add questions array latter
    //   this.adminToolsService.domains = [];
    // }
    this.adminToolsService.setActiveDomain(domain);
  }
  
  getActiveQnn(){
    return this.adminToolsService.getActiveQnn()
  }

  isThisTheCurrenDomain(domain){
    return this.adminToolsService.currentDomain == domain;
    
  }
  
  
  addDomain() {
    let index=1
    for (let title of this.domainNames) {
      setTimeout(this.addOneDomain(title, index), 10000)
      
      index++
    }
  }
  
  addOneDomain(title, index) {
    let t_domain = new Domain(
          this.adminToolsService.currentQnn._id,
          title,
          index
          )
          // console.log('t_domain')
          // console.log(t_domain)
          this.adminToolsService.addDomain(t_domain)
            .subscribe((domain)=>{
              // console.log(domain)
              this.domains = this.adminToolsService.getDomainList();
              this.addNewMessage = false;
            })
  }

    
}