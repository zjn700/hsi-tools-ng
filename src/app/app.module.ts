import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DomnComponent } from './domn/domn.component';
import { QstnComponent } from './card/qstn/qstn.component';
import { QnnComponent } from './card/qnn/qnn.component';
import { AnsrComponent } from './card/ansr/ansr.component';
import { ProjectComponent } from './proj/proj.component';
import { StateComponent } from './state/state.component';
import { OutputComponent } from './outputs/output.component';
import { CardComponent } from './card/card.component';
import { IntgrnComponent } from './intgrn/intgrn.component';
import { AnsrButtonsComponent } from './card/ansr/ansr-buttons/ansr-buttons.component';
import { AnsrRiskboxComponent } from './card/ansr/ansr-riskbox/ansr-riskbox.component';
import { AnsrRationaleComponent } from './card/ansr/ansr-rationale/ansr-rationale.component';
import { FooterComponent } from './card/footer/footer.component';
import { QstnNumberComponent } from './card/qstn/qstn-number/qstn-number.component';
import { IntgrnAssmitComponent } from './intgrn/intgrn-assmit/intgrn-assmit.component';
import { AuthComponent } from './users/auth.component';
import { LogoutComponent } from './users/logout.component';
import { SigninComponent } from './users/signin.component';
import { SignupComponent } from './users/signup.component';

import { AuthService } from './users/auth.service';
import { ProjectService } from './proj/proj.service';
import { SelectorService } from './selectors/selector.service';
import { DomainService } from './domn/domn.service';
//import { QstnService } from './card/qstn/qstn.service';
import { CardService } from './card/card.service';
import { TopMenuService } from './shared/top-menu.service';
import { IntegrationService } from './intgrn/intgrn.service';
import { OutputService } from './outputs/output.service';

import { routing } from './app-routing.module';
import { CardHolderComponent } from './card/card-holder.component';
import { ProjListComponent } from './proj/proj-list.component';
import { ProjDetailComponent } from './proj/proj-detail.component';
import { ProjectHolderComponent } from './proj/project-holder.component';
import { ToolsComponent } from './selectors/tools.component';
import { AtQnnsComponent } from './selectors/at-qnns.component';
import { CrtQnnsComponent } from './selectors/crt-qnns.component';
import { QstnMenuComponent } from './card/qstn/qstn-menu.component';
import { QstnMenuItemComponent } from './card/qstn/qstn-menu-item.component';

import { QstnMenuDirective } from './card/qstn/qstn-menu.directive';
import { TopMenuDirective } from './top-menu.directive';
import { TopMenuMouseDirective } from './top-menu-mouse.directive';
import { OutputMouseDirective } from './outputs/output-menu-mouse.directive';
import { GlossaryDirective } from './shared/glossary.directive';


import { QstnMenuFilterComponent } from './card/qstn/qstn-menu-filter/qstn-menu-filter.component';
import { IntgrnCompletedComponent } from './intgrn/intgrn-completed/intgrn-completed.component';
import { AnsrRiskDetailsComponent } from './card/ansr/ansr-risk-details/ansr-risk-details.component';
import { StandardOutputComponent } from './outputs/standard-output/standard-output.component';
import { SortedByRiskComponent } from './outputs/sorted-by-risk/sorted-by-risk.component';
import { FlattenedComponent } from './outputs/sorted-by-risk/flattened.component';
import { EditOutputComponent } from './outputs/edit-output/edit-output.component';
import { TradeOffsComponent } from './outputs/trade-offs/trade-offs.component';

@NgModule({
  declarations: [
    AppComponent,
    DomnComponent,
    QstnComponent,
    QnnComponent,
    AnsrComponent,
    ProjectComponent,
    StateComponent,
    OutputComponent,
    CardComponent,
    IntgrnComponent,
    AnsrButtonsComponent,
    AnsrRiskboxComponent,
    AnsrRationaleComponent,
    FooterComponent,
    QstnNumberComponent,
    IntgrnAssmitComponent,
    AuthComponent,
    LogoutComponent,
    SigninComponent,
    SignupComponent,
    CardHolderComponent,
    ProjListComponent,
    ProjDetailComponent,
    ProjectHolderComponent,
    ToolsComponent,
    AtQnnsComponent,
    CrtQnnsComponent,
    QstnMenuComponent,
    QstnMenuItemComponent,
    QstnMenuDirective,
    TopMenuDirective,
    TopMenuMouseDirective,
    GlossaryDirective,
    QstnMenuFilterComponent,
    IntgrnCompletedComponent,
    AnsrRiskDetailsComponent,
    OutputMouseDirective,
    StandardOutputComponent,
    SortedByRiskComponent,
    FlattenedComponent,
    EditOutputComponent,
    TradeOffsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [AuthService, 
              ProjectService, 
              SelectorService, 
              DomainService, 
              CardService, 
              TopMenuService, 
              IntegrationService,
              OutputService],          
  bootstrap: [AppComponent]
})
export class AppModule { }
