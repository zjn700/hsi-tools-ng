import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[hsiGlossary]',

})

export class GlossaryDirective {
  private completed=false    

  private testGlossary = [                         
                          {term: 'COTS/GOTS', definition: "Commercial Off-the-Shelf/Government Off-the-Shelf"},
                          {term: 'HMI/HCI', definition: "Human Machine Interface/Human-Computer Interaction; Human-Computer Interface"},
                          {term: 'IPTs/WGs', definition: "Integrated Product Teams/Working Groups"},
                          {term: 'LCSP/LCMP', definition: "Life Cycle Sustainment Plan/Life Cycle Management Plan"},
                          {term: 'NEPA/EO', definition: "National Environmental Policy Act of 1969/Executive Order"},
                          {term: 'SAF/AQ', definition: "Office of the Undersecretary of the Air Force for Acquisitions"},
                          {term: 'SVR/PRR', definition: "System Verification Review/Production Readiness Review"},
                          {term: 'SMEs', definition: "Subject Matter Experts"},
                          {term: 'SME', definition: "Subject Matter Expert"},
                          {term: 'AFSC', definition: "Air Force Specialty Code"}, 
                          {term: 'AFLCMC', definition: "Air Force Life Cycle Management Center"}, 
                          {term: 'AoA', definition: "Analysis of Alternatives"}, 
                          {term: 'ASR', definition: "Acquisition Strategy Report; Alternative Systems Review"},
                          {term: 'AS', definition: "Acquisition Strategy?"},
                          {term: 'BCSs', definition: "Baseline Comparison System"},
                          {term: 'BCS', definition: "Baseline Comparison System"},
                          {term: 'CARD', definition: "Cost Analysis Requirements Description"},
                          {term: 'CBA', definition: "Capabilities Based Assessment"},
                          {term: 'CBRNE', definition: "Chemical, Biological, Radiological, Nuclear, and Explosives"}, 
                          
                          {term: 'CCB', definition: "Configuration Control Board"}, 
                          {term: 'CCTD', definition:"Concept Characterization and Technical Description"}, 
                          {term: 'CDD', definition:"Capability Development Document"}, 
                          {term: 'CDRLs', definition:"Contract Data Requirements Lists"},
                          {term: 'CDRL', definition:"Contract Data Requirements List"},
                          {term: 'CDR', definition:"Critical Design Review"},
                          {term: 'CI', definition:"Configuration Item"},  
                          {term: 'CONOPS', definition: "Concept of Operations"},
                          
                          {term: 'COTS', definition: "Commercial Off-the-Shelf"},
                          {term: 'CPD', definition: "Capability Production Document"},
                          {term: 'CTE', definition: "Critical Technology Element"},
                          {term: 'DCR', definition: "Document Change Request"},
                          {term: 'DIDs', definition: "Data Item Description; Design Interface Documents"},
                          {term: 'DID', definition: "Data Item Description; Design Interface Document"},
                          {term: 'DOD', definition: "Department of Defense"},
                          {term: 'DoD', definition: "Department of Defense"},
                          {term: 'DOTMLPFP', definition: "Doctrine, Organization, Training, Materiel, Leadership and Education, Personnel, Facilities and Policy"},
                          {term: 'DP', definition: "Developmental Planning"},
                          {term: 'DT&E', definition: "Developmental Test and Evaluation"},
                          {term: 'DT', definition: "Developmental Tests/Testing"},
                          {term: 'ECPs', definition: "Engineering Change Proposals"},
                          {term: 'ECP', definition: "Engineering Change Proposal"},
                          {term: 'EEMP', definition: "Environmental Engineering Management Plan"},
                          {term: 'EICL', definition: "Environmental Issues/Criteria List"},
                          {term: 'EMD', definition: "Engineering and Manufacturing Development"},
                          {term: 'EOA', definition: "Early Operational Assessment"},
                          {term: 'EO', definition: "Executive Order"},
                          {term: 'ESOH', definition: "Environment, Safety, and Occupational Health"},
                          {term: 'ETEMP', definition: "Environmental Test and Evaluation Master Plan"},
                          {term: 'FCA', definition: "Functional Configuration Audit"},
                          {term: 'FOC', definition: "Full Operational Capability"},
                          {term: 'FRP', definition: "Full Rate Production"},
                          {term: 'GFI', definition: "Government Furnished Information"},
                          {term: 'GOTS', definition: "Government Off-the-Shelf"},
                          {term: 'HAZMAT', definition: "Hazardous Materials"},
                          {term: 'HCI', definition: "Human-Computer Interaction; Human-Computer Interface"},
                          {term: 'HEDAD-M', definition: "Human Engineering Design Approach Document - Maintainer"},
                          {term: 'HEDAD-O', definition: "Human Engineering Design Approach Document - Operator"},
                          {term: 'HFE', definition: "Human Factors Engineering"},
                          {term: 'HMI', definition: "Human Machine Interface"},
                          {term: 'HSIPs', definition: "Human Systems Integration Plans"},
                          {term: 'HSIPP', definition: "Human Systems Integration Performance Plan"},
                          {term: 'HSIP', definition: "Human Systems Integration Plan"},
                          {term: 'ICD', definition: "Initial Capabilities Document"},
                          {term: 'HSI', definition: "Human Systems Integration"},
                          {term: 'ICW', definition: "Interactive Courseware"},
                          {term: 'ILT', definition: "Instructor-Led Training"},
                          {term: 'IOC', definition: "Initial Operational Capability"},
                          {term: 'IOT&E', definition: "Initial Operational Test and Evaluation"},
                          {term: 'IPT', definition: "Integrated Product Team"},
                          {term: 'ISR', definition: "In-Service Review"},
                          {term: 'ITR', definition: "Independent Technical Review"},
                          {term: 'JCIDS', definition: "Joint Capabilities Integration and Development System"},
                          {term: 'JQR/PQS', definition: "Job Qualification Requirements/Personnel Qualification Standards"},
                          {term: 'JQR', definition: "Job Qualification Requirements"},
                          {term: 'KPPs', definition: "Key Performance Parameters"},
                          {term: 'KPP', definition: "Key Performance Parameter"},
                          {term: 'KSAs', definition: "Knowledge, Skills, and Abilities; Key System Attributes"},
                          {term: 'KSA', definition: "Key System Attribute; Knowledge, Skill, and Ability"},
                          {term: 'LCCE', definition: "Life Cycle Cost Estimate"},
                          {term: 'LCEP', definition: "Life Cycle Environmental Profile"},
                          {term: 'LCMP', definition: "Life Cycle Management Plan"},
                          {term: 'LCMS', definition: "Life Cycle Management System"},
                          {term: 'LCSP', definition: "Life Cycle Sustainment Plan"},
                          {term: 'LFT&E', definition: "Live Fire Test and Evaluation"},
                          {term: 'LRIP', definition: "Low-Rate Initial Production"},
                          {term: 'M&S', definition: "Modeling and Simulation"},
                          {term: 'MAJCOM', definition: "Major Command"},
                          {term: 'MER', definition: "Manpower Estimate Report"},
                          {term: 'MEs', definition: "Manpower Estimates"},
                          {term: 'ME', definition: "Manpower Estimate"},
                          {term: 'MIL-HDBK', definition: "Military Handbook"},
                          {term: 'MIL-STD', definition: "Military Standard"},
                          {term: 'MOEs', definition: "Measures of Effectiveness"},
                          {term: 'MOE', definition: "Measure of Effectiveness"},
                          {term: 'MOPs', definition: "Measures of Performance"},
                          {term: 'MOP', definition: "Measure of Performance"},
                          {term: 'MOSs', definition: "Measures of Suitability"},
                          {term: 'MOS', definition: "Measure of Suitability"},
                          {term: 'MSA', definition: "Materials Solution Analysis"},
                          {term: 'MTs', definition: "Manufacturing Technologies"},
                          {term: 'MT', definition: "Manufacturing Technology"},
                          {term: 'NEPA', definition: "National Environmental Policy Act of 1969"},
                          {term: 'NTSP', definition: "Navy Training System Plan"},
                          {term: 'OPSTEMPO', definition: "Operations Tempo"},
                          {term: 'ORCA', definition: "Occupational Requirements-based Casualty Assessment"},
                          {term: 'OS', definition: "Operations and Sustainment"},
                          {term: 'OTRR', definition: "Operational Test Readiness Review"},
                          {term: 'OT', definition: "Operational Tests"},
                          {term: 'PAL', definition: "Preliminary Activity List"},
                          {term: 'PCA', definition: "Physical Configuration Audit"},
                          {term: 'PD', definition: "Production and Deployment"},
                          {term: 'PDR', definition: "Preliminary Design Review"},
                          {term: 'PESHE', definition: "Programmatic Environmental Safety and Occupational Health Evaluation"},
                          {term: 'PHA', definition: "Preliminary Hazard Analysis"},
                          {term: 'PHL', definition: "Preliminary Hazard List"},
                          {term: 'POC', definition: "Point of Contact"},
                          {term: 'PPP', definition: "Program Protection Plan"},
                          {term: 'PQS', definition: "Personnel Qualification Standards"},
                          {term: 'PRR', definition: "Production Readiness Review"},
                          {term: 'PSPEC', definition: "Performance Specification"},
                          {term: 'PSS', definition: "Product Support Strategy"},
                          {term: 'RFIs', definition: "Requests for Information"},
                          {term: 'RFI', definition: "Request for Information"},
                          {term: 'RFPs', definition: "Requests for Proposals"},
                          {term: 'RFP', definition: "Request for Proposal"},
                          {term: 'S&T', definition: "Science and Technology"},
                          {term: 'SAR', definition: "Safety Assessment Report"},
                          {term: 'SEP', definition: "Systems Engineering Plan"},
                          {term: 'SE', definition: "Systems Engineering"},
                          {term: 'SFR', definition: "System Functional Review"},
                          {term: 'SHA', definition: "System Hazard Analysis"},
                          {term: 'SHRA', definition: "Safety Hazard Risk Analysis"},
                          {term: 'SOW', definition: "Statement of Work"},
                          {term: 'SPS', definition: "System Product Specification"},
                          {term: 'SRD', definition: "System Requirements Document"},
                          {term: 'SRR', definition: "System Requirements Review"},
                          {term: 'SSA', definition: "System Support Analysis; System Supportability Assessment; System Safety Assessment; Source Selection Authority"},
                          {term: 'SSHA', definition: "Subsystem Hazard Analysis"},
                          {term: 'SSMP', definition: "System Safety Management Plan"},
                          {term: 'STP', definition: "Software Test Plan"},
                          {term: 'SVR', definition: "System Verification Review"},
                          {term: 'T&E', definition: "Test and Evaluation"},
                          {term: 'TAD', definition: "Technology Area Descriptions"},
                          {term: 'TDRA', definition: "Top-Down Requirements Analysis"},
                          {term: 'TEMP', definition: "Test and Evaluation Master Plan"},
                          {term: 'TMRR', definition: "Technology Maturation and Risk Reduction"},
                          {term: 'TRA', definition: "Technology Readiness Assessment"},
                          {term: 'TRR', definition: "Test Readiness Review"},
                          {term: 'USA', definition: "United States Army"},
                          {term: 'USAF', definition: "United States Air Force"},
                          {term: 'USMC', definition: "United States Marine Corps"},
                          {term: 'USN', definition: "United States Navy"},
                          {term: 'WG', definition: "Working Group"}                 
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
    let t_innerHtml = elementList[0].innerHTML
    let re: RegExp;
    
    for (var searchIndex = 0; searchIndex < this.testGlossary.length; searchIndex++) {
      let searchTerm = this.testGlossary[searchIndex].term

      t_innerHtml = this.replaceHtmlEntity(t_innerHtml, '&amp;')
      
      re = new RegExp("\\b"+searchTerm+"\\b", "g");

      let t_replacementHtml = "<span class='glossary' title='" + this.testGlossary[searchIndex].definition +"'>" + searchTerm + "</span>"
      
      t_innerHtml = t_innerHtml.replace(re, t_replacementHtml)
      
      t_innerHtml = this.restoreHtmlEntity(t_innerHtml, '&amp;')

      elementList[0].innerHTML = t_innerHtml
      
    }
  }
  
  replaceHtmlEntity(innerHTML, entity) {
    let found = true;
    let replaceWith = ''
    
    switch(entity) {
      case '&amp;':
         replaceWith = '&';
          break; 
      default:
          found = false;     
      }
      
      if (found) {
          let re_searchFor = new RegExp(entity, "g");
          return innerHTML.replace(re_searchFor, replaceWith)
      }
      return innerHTML
  }
  
  
  restoreHtmlEntity(innerHTML, entity) {
    let found = true;
    let replaceWith = entity;
    let replacedEntity = '';    
      
    switch(entity) {
      case '&amp;':
         replacedEntity = '&';
          break; 
      default:
          found = false      
      }
      
      if (found) {
        let re_searchFor = new RegExp(replacedEntity, "g"); 
        return innerHTML.replace(re_searchFor, replaceWith)
      }
      return innerHTML
  }

}
