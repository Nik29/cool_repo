import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Pages } from './pages/pages.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
//  { path: '**', redirectTo: 'pages/dashboard' },
//{ path: '**', redirectTo: 'login', pathMatch: 'full' },
  //  { path: '**', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'email', component: EmailComponent },
    { path: 'pages', component: Pages, canActivate: [AuthGuard] },
    { path :'pages/dashboard' , redirectTo : 'pages/dashboard', canActivate : [AuthGuard]}

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
