import { Component , OnInit } from '@angular/core';
import { Routes } from '@angular/router';


import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'pages',
  templateUrl: './pages.html',
  //animations: [moveIn(), fallIn(), moveInLeft()],
  //host: {'[@moveIn]': ''}

})
export class Pages implements OnInit{
  name: any;
  state: string = '';

  constructor(public af: AngularFire,private router: Router,private _menuService: BaMenuService ) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  logout() {
     this.af.auth.logout();
     
     this.router.navigateByUrl('../login');
   }
   ngOnDestroy(){

   }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

  }
}
