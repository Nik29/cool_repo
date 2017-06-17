import { Routes, RouterModule }  from '@angular/router';

import { Maps } from './maps.component';

import { GoogleMaps } from './components/googleMaps/googleMaps.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Maps,
    children: [

     { path: 'googlemaps', component: GoogleMaps },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
