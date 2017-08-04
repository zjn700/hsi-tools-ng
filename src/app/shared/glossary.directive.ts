import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[hsiGlossary]',

})

export class GlossaryDirective {
  private completed=false    
  private testGlossaryx = [
                          {term: 'AoA', definition: "Analysis of Alternatives"}, 
                          {term: 'AOA', definition: "Analysis of Alternatives"}, 
                          {term: 'CBA', definition: "Capabilities Based Assessment"}, 
                          {term: 'CCTD', definition:'Concept Characterization and Technical Description'},
                          {term: 'CONOPS', definition: "Concept of Operations"},
                          {term: 'AFLCMC', definition: "Air Force Life Cycle Management Center"}
                          ]
                          
                          
  private testGlossary = [                         
                          {term: 'AFLCMC', definition: "Air Force Life Cycle Management Center"}, 
                          {term: 'AoA', definition: "Analysis of Alternatives"}, 
                          {term: 'AS', definition: "Acquisition Strategy?"},
                          {term: 'ASR', definition: "Acquisition Strategy Report; Alternative Systems Review"},
                          {term: 'BCS', definition: "Baseline Comparison System"},
                          {term: 'CARD', definition: "Cost Analysis Requirements Description"},
                          {term: 'CBA', definition: "Capabilities Based Assessment"},
                          {term: 'CBRNE', definition: "Chemical, Biological, Radiological, Nuclear, and Explosives"}, 
                          {term: 'CCB', definition: "Configuration Control Board"}, 
                          {term: 'CCTD', definition:"Concept Characterization and Technical Description"}, 
                          {term: 'CDD', definition:"Capability Development Document"}, 
                          {term: 'CDR', definition:"Critical Design Review"}, 
                          {term: 'CDRL', definition:"Contract Deliverable"},
                          {term: 'CI', definition:"Configuration Item"},  
                          {term: 'CONOPS', definition: "Concept of Operations"},
                          {term: 'COTS', definition: "Commercial Off-the-Shelf"},
                          {term: 'CPD', definition: "Capability Production Document"},
                          {term: 'CTE', definition: "Critical Technology Element"},
                          {term: 'DCR', definition: "Document Change Request"},
                          {term: 'DID', definition: "Data Item Description; Design Interface Document"},
                          {term: 'DOD', definition: "Department of Defense"},
                          {term: 'DOTMLPFP', definition: "Doctrine, Organization, Training, Materiel, Leadership and Education, Personnel, Facilities and Policy "},
                          {term: 'DT', definition: "Developmental Tests"},
                          {term: 'DT&E', definition: "Developmental Test and Evaluation"},
                          {term: 'ECP', definition: "Engineering Change Proposal"},
                          {term: 'EEMP', definition: "Environmental Engineering Management Plan"},
                          {term: 'EICL', definition: "Environmental Issues/Criteria List"},
                          {term: 'EMD', definition: "Engineering and Manufacturing Development"},
                          {term: 'EO', definition: "Executive Order"},
                          {term: 'EOA', definition: "Early Operational Assessment"},
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
                          {term: 'HSI', definition: "Human Systems Integration"},
                          {term: 'HSIP', definition: "Human Systems Integration Plan"},
                          {term: 'HSIP', definition: "Human Systems Integration Plan"},
                          {term: 'HSIPP', definition: "Human Systems Integration Performance Plan"},
                          {term: 'ICD', definition: "Initial Capabilities Document"},
                          {term: 'ICW', definition: "Interactive Courseware"},
                          {term: 'ILT', definition: "Instructor-Led Training"},
                          {term: 'IOC', definition: "Initial Operational Capability"},
                          {term: 'IOT&E', definition: "Initial Operational Test and Evaluation"},
                          {term: 'IPT', definition: "Integrated Product Team"},
                          {term: 'ISR', definition: "In-Service Review"},
                          {term: 'ITR', definition: "Independent Technical Review"},
                          {term: 'JCIDS', definition: "Joint Capabilities Integration and Development System"},
                          {term: 'JQR', definition: "Job Qualification Requirements"},
                          {term: 'KPP', definition: "Key Performance Parameter"},
                          {term: 'KPPs', definition: "Key Performance Parameters"},
                          {term: 'KSAs', definition: "Knowledge, Skills, and Abilities; Key System Attribute"},
                          {term: 'LCCE', definition: "Life Cycle Cost Estimate"},
                          {term: 'LCEP', definition: "Life Cycle Environmental Profile"},
                          {term: 'LCMP', definition: "Life Cycle Management Plan"},
                          {term: 'LCSP', definition: "Life Cycle Sustainment Plan"},
                          {term: 'LFT&E', definition: "Live Fire Test and Evaluation"},
                          {term: 'LRIP', definition: "Low-Rate Initial Production"},
                          {term: 'M&S', definition: "Modeling and Simulation"},
                          {term: 'MAJCOM', definition: "Major Command"},
                          {term: 'ME', definition: "Manpower Estimate"},
                          {term: 'MER', definition: "Manpower Estimate Report"},
                          {term: 'MIL-STD', definition: "Military Standard"},
                          {term: 'MOE', definition: "Measure of Effectiveness"},
                          {term: 'MOP', definition: "Measure of Performance"},
                          {term: 'MOS', definition: "Measure of Suitability"},
                          {term: 'MSA', definition: "Materials Solution Analysis"},
                          {term: 'NEPA', definition: "National Environmental Policy Act of 1969"},
                          {term: 'NTSP', definition: "Navy Training System Plan"},
                          {term: 'OPSTEMPO', definition: "Operations Tempo"},
                          {term: 'ORCA', definition: "Occupational Requirements-based Casualty Assessment"},
                          {term: 'OS', definition: "Operations and Sustainment"},
                          {term: 'OT', definition: "Operational Tests"},
                          {term: 'OTRR', definition: "Operational Test Readiness Review"},
                          {term: 'PDA', definition: "Preliminary Activity List"},
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
                          {term: 'PPSPEC', definition: "Performance Specification"},
                          {term: 'PSS', definition: "Product Support Strategy"},
                          {term: 'RFI', definition: "Request for Information"},
                          {term: 'RFP', definition: "Request for Proposals"},
                          {term: 'SAF/AQ', definition: "Office of the Undersecretary of the Air Force for Acquisitions"},
                          {term: 'SAR', definition: "Safety Assessment Report"},
                          {term: 'SE', definition: "Systems Engineering"},
                          {term: 'SEP', definition: "Systems Engineering Plan"},
                          {term: 'SFR', definition: "System Functional Review"},
                          {term: 'SHA', definition: "System Hazard Analysis"},
                          {term: 'SHRA', definition: "System Risk Hazard Analysis"},
                          {term: 'SME', definition: "Subject Matter Expert"},
                          {term: 'SMEs', definition: "Subject Matter Experts"},
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
