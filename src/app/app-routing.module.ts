import { Routes, RouterModule } from '@angular/router';

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
import { SigninComponent } from './users/signin.component';
import { SignupComponent } from './users/signup.component';
import { LogoutComponent } from './users/logout.component';
//import { AUTH_ROUTES } from './users/auth.routes';


const APP_ROUTES: Routes = [
    //{ path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'tools', component: ToolsComponent },
    { path: 'crt-qnns', component: CrtQnnsComponent },
    { path: 'at-qnns', component: AtQnnsComponent },
    { path: 'questions', component: DomnComponent },
    { path: 'integrations', component: IntgrnComponent },

    //{ path: 'auth', component: AuthComponent, children: AUTH_ROUTES },
    //{ path: '**', redirectTo: '/auth/signin', pathMatch: 'full' }
    { path: '**', redirectTo: '/signin', pathMatch: 'full' }

    ]
export const routing = RouterModule.forRoot(APP_ROUTES)