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
        console.log('here in domain subscription')
        console.log('domains')
        console.log(domains)
        this.domains = domains;
        if (domains.length == 0){
          this.addNewMessage = true;
        }
        this.isInitialized = true;
      })
  }
  
  // qnnMatches(domain){
  //   // console.log(domain.qnn)
  //   // console.log(this.adminToolsService.currentQnn._id)
  //   this.qnn = domain.qnn;
  //   this.domain = domain;
  //   // console.log('this.domain')
  //   // console.log(this.domain)
  //   return domain.qnn == this.adminToolsService.currentQnn._id
  // }
  
  getActiveQnn(){
    return this.adminToolsService.getActiveQnn()
  }
  
  // this.adminToolsService.currentQnn._id
  // areThereDomainsForThisQnn(domains) {
  //   return this.adminToolsService.domains.length > 0;
  // }
  
  
  addDomain() {
    console.log('qnn')
    console.log(this.qnn)
    //this.adminToolsService.clearDomainList();
    let index=1
    for (let title of this.domainNames) {
      setTimeout(this.addOneDomain(title, index), 10000)
      
      index++
    }
      // let t_domain = new Domain(
      //   this.adminToolsService.currentQnn._id,
      //   title,
      //   index
      //   )
      //   index++
      //   console.log('t_domain')
      //   console.log(t_domain)
      //   this.adminToolsService.addDomain(t_domain)
      //     .subscribe((domain)=>{
      //       console.log(domain)
      //       this.domains = this.adminToolsService.getDomainList();
      //       this.addNewMessage = false;
      //     })

    // }
  }
  
  addOneDomain(title, index) {
    let t_domain = new Domain(
          this.adminToolsService.currentQnn._id,
          title,
          index
          )
          // index++
          console.log('t_domain')
          console.log(t_domain)
          this.adminToolsService.addDomain(t_domain)
            .subscribe((domain)=>{
              console.log(domain)
              this.domains = this.adminToolsService.getDomainList();
              this.addNewMessage = false;
            })
  }

    
}