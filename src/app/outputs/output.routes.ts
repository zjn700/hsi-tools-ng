import { Routes } from '@angular/router';

import { StandardOutputComponent } from './standard-output/standard-output.component';
import { SortedByRiskComponent } from './sorted-by-risk/sorted-by-risk.component';
import { FlattenedComponent } from './sorted-by-risk/flattened.component';

export const OUTPUT_ROUTES: Routes = [
    //{ path: "", redirectTo: 'review', pathMatch: "full" }
    { path: "", component: FlattenedComponent },
    { path: "numerical", component: StandardOutputComponent },
    { path: "sortedbyrisk", component: SortedByRiskComponent },
    { path: "flattened", component: FlattenedComponent }

]