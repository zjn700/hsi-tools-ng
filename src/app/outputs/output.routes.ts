import { Routes } from '@angular/router';

import { StandardOutputComponent } from './standard-output/standard-output.component';
import { SortedByRiskComponent } from './sorted-by-risk/sorted-by-risk.component';

export const OUTPUT_ROUTES: Routes = [
    //{ path: "", redirectTo: 'review', pathMatch: "full" }
    { path: "", component: StandardOutputComponent },
    { path: "numerical", component: StandardOutputComponent },
    { path: "sortedbyrisk", component: SortedByRiskComponent }
]