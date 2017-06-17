import { Component , OnInit } from '@angular/core';
import { Routes } from '@angular/router';


import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'pages',
  templateUrl: './pages.html',
  //animations: [moveIn(), fallIn(), moveInLeft()],
  //host: {'[@moveIn]': ''}

})
export class Pages implements OnInit{
  name: any;
  state: string = '';

  constructor(public af: AngularFire,private router: Router,private _menuService: BaMenuService) {


  }

  logout() {
     this.af.auth.logout();

     this.router.navigateByUrl('../login');
   }
   ngOnDestroy(){

   }


  ngOnInit() {
    let that = this;
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    this.af.auth.subscribe(auth => {
      if(auth) {
        if (auth) {
          //console.log(user.auth.email);
          let uid = auth.auth.email.replace(/[^A-Z0-9]/ig, "_");
          let gref = firebase.database().ref('userControl/'+uid);
          gref.once("value")
           .then(function(snapshot){
             let alias = snapshot.val().status;
            
              if(alias==2){
                let pm = JSON.parse(JSON.stringify(PAGES_MENU));
                pm[0]["children"][3]["data"]["menu"]["hidden"] = false;
                pm[0]["children"][4]["data"]["menu"]["hidden"] = false;
                that._menuService.updateMenuByRoutes(<Routes>pm);
              }
              else{
                let pm = JSON.parse(JSON.stringify(PAGES_MENU));
                pm[0]["children"][3]["data"]["menu"]["hidden"] = true;
                pm[0]["children"][4]["data"]["menu"]["hidden"] = true;
                that._menuService.updateMenuByRoutes(<Routes>pm);
              }
           })

        }
      }
    });

  }
}
