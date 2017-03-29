import { Routes, RouterModule }  from '@angular/router';

import { mylogin } from './mylogin.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: mylogin
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
