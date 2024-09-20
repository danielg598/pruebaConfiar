import { Routes } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';

export const routes: Routes = [
    {
        path:'tabla',
        component: TablaComponent
    },
    {
        path:'**',
        redirectTo: 'tabla'
    }
];
