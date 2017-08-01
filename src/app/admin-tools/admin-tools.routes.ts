import { Routes } from '@angular/router';

import { QnnEditorComponent } from './qnn-editor/qnn-editor.component';
import { DomainEditorComponent } from './domain-editor/domain-editor.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';

// import { FlattenedComponent } from './sorted-by-risk/flattened.component';

export const ADMIN_ROUTES: Routes = [
    //{ path: "", redirectTo: 'review', pathMatch: "full" }
    { path: "", component: QnnEditorComponent },
    { path: "qnnedit", component: QnnEditorComponent },
    { path: "domainedit", component: DomainEditorComponent },
    { path: "questionedit", component: QuestionEditorComponent }

]