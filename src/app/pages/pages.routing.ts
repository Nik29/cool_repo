import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../auth.service';
import { ServersComponent } from './servers/servers.component';
import { RealTimeService } from './real-time.service';
import { UserActivateGuard } from './userActivate.service';
// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
      { path: 'users',loadChildren: './users/users.module#UsersModule',canActivate:[UserActivateGuard]},
      {path: 'servers', component : ServersComponent, canActivate:[UserActivateGuard]},
      {path: '404', redirectTo:'/dashboard'},
      {path: '**', redirectTo: '/dashoard'}
    ],
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
