import { Routes, RouterModule }  from '@angular/router';
import { Tables } from './tables.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { UploaderComponent } from './uploader/uploader.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Tables,
    children: [
      { path: 'basictables', component: BasicTables },
      { path: 'smarttables', component: SmartTables },
      { path: 'uploader', component: UploaderComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
