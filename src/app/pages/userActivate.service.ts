import { Injectable} from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFire} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UserActivateGuard implements CanActivate {

  flg : number;
  constructor(public af : AngularFire) {
    this.flg=0;

  }

  canActivate(): Observable<boolean>  {
    let that = this;
    return this.af.auth.map(user => {

              if (user) {
                //console.log(user.auth.email);
                let uid = user.auth.email.replace(/[^A-Z0-9]/ig, "_");
                let gref = firebase.database().ref('userControl/'+uid);
                gref.once("value")
                 .then(function(snapshot){
                   let alias = snapshot.val().status;

                   that.flg=alias;
                 })
                 if(that.flg==2){
                   return true;
                 }
                 else{
                   return false;
                 }
              }
              else{
                return false;

              }

          }).take(1);
  }
}
