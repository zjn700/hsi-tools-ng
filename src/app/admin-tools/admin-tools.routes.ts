import { Routes } from '@angular/router';

import { DomainEditorComponent } from './domain-editor/domain-editor.component';
// import { SortedByRiskComponent } from './sorted-by-risk/sorted-by-risk.component';
// import { FlattenedComponent } from './sorted-by-risk/flattened.component';

export const ADMIN_ROUTES: Routes = [
    //{ path: "", redirectTo: 'review', pathMatch: "full" }
    { path: "", component: DomainEditorComponent },
    { path: "domainedit", component: DomainEditorComponent }
    // { path: "sortedbyrisk", component: SortedByRiskComponent },
    // { path: "flattened", component: FlattenedComponent }

]