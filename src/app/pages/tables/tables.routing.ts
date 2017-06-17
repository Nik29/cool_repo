import { Routes, RouterModule }  from '@angular/router';
import { Tables } from './tables.component';
//import { BasicTables } from './components/basicTables/basicTables.component';
import { SmartTable1Component } from './components/smart-table1/smart-table1.component';
import { SmartTable2Component } from './components/smart-table2/smart-table2.component';
import { SmartTable3Component } from './components/smart-table3/smart-table3.component';
import { SmartTable4Component } from './components/smart-table4/smart-table4.component';
import { RoutesComponent } from './components/routes/routes.component';
//import { SmartTables } from  './components/smartTables/smartTables.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Tables,
    children: [
      { path: 'booking', component: SmartTable1Component },
      { path: 'vehicles', component: SmartTable2Component },
      { path: 'owners', component: SmartTable3Component },
      { path: 'drivers', component: SmartTable4Component },
    //  { path: 'routes',component:RoutesComponent}
      //{ path: 'uploader', component: UploaderComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
