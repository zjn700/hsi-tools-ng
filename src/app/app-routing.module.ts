import { Routes, RouterModule } from '@angular/router';
import { INTGRN_ROUTES } from './intgrn/intgrn.routes';
import { OUTPUT_ROUTES } from './outputs/output.routes';
import { ADMIN_ROUTES } from './admin-tools/admin-tools.routes';


//import { QnnsComponent } from './questionnaires/qnns.component';
//import { DomainsComponent } from './domains/domains.component';
//import { QuestionsComponent } from './questions/questions.component';
import { ToolsComponent } from './selectors/tools.component'
import { CrtQnnsComponent } from './selectors/crt-qnns.component'
import { AtQnnsComponent } from './selectors/at-qnns.component'
import { ProjectComponent } from './proj/proj.component';
import { DomnComponent } from './domn/domn.component';
import { CardHolderComponent } from './card/card-holder.component';
import { IntgrnComponent } from './intgrn/intgrn.component';
import { OutputComponent } from './outputs/output.component';
import { SigninComponent } from './users/signin.component';
import { SignupComponent } from './users/signup.component';
import { LogoutComponent } from './users/logout.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
//import { AUTH_ROUTES } from './users/auth.routes';


const APP_ROUTES: Routes = [
    //{ path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    // { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: '', component: LogoutComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'admin', component: AdminToolsComponent, children: ADMIN_ROUTES  },
    { path: 'project', component: ProjectComponent },
    { path: 'tools', component: ToolsComponent },
    { path: 'crt-qnns', component: CrtQnnsComponent },
    { path: 'at-qnns', component: AtQnnsComponent },
    { path: 'questions', component: DomnComponent },
    { path: 'integrations', component: IntgrnComponent, children: INTGRN_ROUTES },
    { path: 'review', component: OutputComponent, children: OUTPUT_ROUTES },
    //{ path: 'integrations', component: IntgrnComponent },
    //{ path: 'review', component: OutputComponent },

    //{ path: 'auth', component: AuthComponent, children: AUTH_ROUTES },
    //{ path: '**', redirectTo: '/auth/signin', pathMatch: 'full' }
    // { path: '**', redirectTo: '/signin', pathMatch: 'full' }
    { path: '**', component: LogoutComponent }

    ]
export const routing = RouterModule.forRoot(APP_ROUTES)