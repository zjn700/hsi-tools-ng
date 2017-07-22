import { Routes } from '@angular/router';

import { StandardOutputComponent } from './standard-output/standard-output.component';
import { SortedByRiskComponent } from './sorted-by-risk/sorted-by-risk.component';
//import { SignupComponent } from '../users/signup.component';
// import { SigninComponent } from './signin.component';
// import { LogoutComponent } from './logout.component';

export const OUTPUT_ROUTES: Routes = [
    //{ path: "", redirectTo: 'review', pathMatch: "full" }
    { path: "standard", component: StandardOutputComponent }
     ,
    { path: "sortedbyrisk", component: SortedByRiskComponent }
    //,
    // { path: "signin", component: SigninComponent},
    // { path: "logout", component: LogoutComponent}
]