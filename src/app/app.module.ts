import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app-routing.module';

import { AuthService } from './users/auth.service';
import { ProjectService } from './proj/proj.service';
import { SelectorService } from './selectors/selector.service';
import { DomainService } from './domn/domn.service';
import { CardService } from './card/card.service';
import { TopMenuService } from './shared/top-menu.service';
import { IntegrationService } from './intgrn/intgrn.service';
import { OutputService } from './outputs/output.service';
import { AdminToolsService } from './admin-tools/admin-tools.service';

import { QstnMenuDirective } from './card/qstn/qstn-menu.directive';
import { TopMenuDirective } from './top-menu.directive';
import { TopMenuMouseDirective } from './top-menu-mouse.directive';
import { OutputMouseDirective } from './outputs/output-menu-mouse.directive';
import { GlossaryDirective } from './shared/glossary.directive';

import { AppComponent } from './app.component';
import { DomnComponent } from './domn/domn.component';
import { ProjectComponent } from './proj/proj.component';
import { StateComponent } from './state/state.component';

import { CardComponent } from './card/card.component';
import { QnnComponent } from './card/qnn/qnn.component';
import { CardHolderComponent } from './card/card-holder.component';
import { FooterComponent } from './card/footer/footer.component';

import { AnsrComponent } from './card/ansr/ansr.component';
import { AnsrButtonsComponent } from './card/ansr/ansr-buttons/ansr-buttons.component';
import { AnsrRiskboxComponent } from './card/ansr/ansr-riskbox/ansr-riskbox.component';
import { AnsrRationaleComponent } from './card/ansr/ansr-rationale/ansr-rationale.component';
import { AnsrRiskDetailsComponent } from './card/ansr/ansr-risk-details/ansr-risk-details.component';

import { QstnNumberComponent } from './card/qstn/qstn-number/qstn-number.component';
import { QstnComponent } from './card/qstn/qstn.component';
import { QstnMenuComponent } from './card/qstn/qstn-menu.component';
import { QstnMenuItemComponent } from './card/qstn/qstn-menu-item.component';
import { QstnMenuFilterComponent } from './card/qstn/qstn-menu-filter/qstn-menu-filter.component';

import { AuthComponent } from './users/auth.component';
import { LogoutComponent } from './users/logout.component';
import { SigninComponent } from './users/signin.component';
import { SignupComponent } from './users/signup.component';
import { ProfileComponent } from './users/profile/profile.component';

import { ProjListComponent } from './proj/proj-list.component';
import { ProjDetailComponent } from './proj/proj-detail.component';
import { ProjectHolderComponent } from './proj/project-holder.component';

import { ToolsComponent } from './selectors/tools.component';
import { AtQnnsComponent } from './selectors/at-qnns.component';
import { CrtQnnsComponent } from './selectors/crt-qnns.component';

import { IntgrnComponent } from './intgrn/intgrn.component';
import { IntgrnCompletedComponent } from './intgrn/intgrn-completed/intgrn-completed.component';
import { IntgrnAssmitComponent } from './intgrn/intgrn-assmit/intgrn-assmit.component';

import { OutputComponent } from './outputs/output.component';
import { StandardOutputComponent } from './outputs/standard-output/standard-output.component';
import { SortedByRiskComponent } from './outputs/sorted-by-risk/sorted-by-risk.component';
import { FlattenedComponent } from './outputs/sorted-by-risk/flattened.component';
import { EditOutputComponent } from './outputs/edit-output/edit-output.component';
import { TradeOffsComponent } from './outputs/trade-offs/trade-offs.component';

import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { QnnEditorComponent } from './admin-tools/qnn-editor/qnn-editor.component';
import { DomainEditorComponent } from './admin-tools/domain-editor/domain-editor.component';
import { QuestionEditorComponent } from './admin-tools/question-editor/question-editor.component';
import { HelpComponent } from './help/help.component';
import { ProjArchiveComponent } from './proj/proj-archive.component';
import { IntgrnArchiveComponent } from './intgrn/intgrn-archive/intgrn-archive.component';

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
    AdminToolsComponent,
    QnnEditorComponent,
    DomainEditorComponent,
    QuestionEditorComponent,
    ProfileComponent,
    HelpComponent,
    ProjArchiveComponent,
    IntgrnArchiveComponent,
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
              OutputService,
              AdminToolsService],          
  bootstrap: [AppComponent]
})
export class AppModule { }
