import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[hsiGlossary]',

})

export class GlossaryDirective {
  private completed=false    
  private testGlossary = [
                          {term: 'AoA', definition: "Analysis of Alternatives"}, 
                          {term: 'AOA', definition: "Analysis of Alternatives"}, 
                          {term: 'CBA', definition: "Capabilities Based Assessment"}, 
                          {term: 'CCTD', definition:'Concept Characterization and Technical Description'},
                          {term: 'CONOPS', definition: "Concept of Operations"},
                          {term: 'AFLCMC', definition: "Air Force Life Cycle Management Center"}
                          ]
  
  constructor() { }

  @HostListener('mouseover') onMouseOver() {
      if (!this.completed) {
        
        let elementList = document.getElementsByClassName("question"); 
        this.replaceElementsInnerHtml(elementList);
        
        this.completed=true;
      }
  }

  replaceElementsInnerHtml(elementList) {
    let  t_innerHtml = elementList[0].innerHTML
    for (var searchIndex = 0; searchIndex < this.testGlossary.length; searchIndex++) {
      let searchTerm = this.testGlossary[searchIndex].term
      let re = new RegExp("\\b"+searchTerm+"\\b", "g"); 
      let t_replacementHtml = "<span class='glossary' title='" + this.testGlossary[searchIndex].definition +"'>" + searchTerm + "</span>"
      t_innerHtml = t_innerHtml.replace(re, t_replacementHtml)
      elementList[0].innerHTML = t_innerHtml
    }
  }
  
}
