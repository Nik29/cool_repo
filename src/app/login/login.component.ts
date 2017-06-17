import { Component, OnInit , HostBinding} from '@angular/core';
import { AngularFire, AuthProviders ,AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn , fallIn} from '../router.animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn() , fallIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  ref : any;
  user:any;

    constructor(public af: AngularFire,private router: Router) {

      this.ref = firebase.database().ref("userControl");

  }



  loginGoogle() {
    let that = this;
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
          that.af.auth.subscribe(auth => {
          if(auth) {
            let  key = auth.auth.email.replace(/[^A-Z0-9]/ig, "_");
            that.user = firebase.database().ref('userControl/'+key);
            that.user.once("value")
            .then(function(snapshot) {
               if(snapshot.exists()){
                 if(snapshot.val().status==0){
                that.af.auth.logout();

                alert('Your account has been disabled!');

              }
              else{
                that.router.navigate(['/pages/dashboard']);
              }
            }
            else{
              let ur = auth;
              let  key = ur.auth.email.replace(/[^A-Z0-9]/ig, "_");
              let newPostRef =that.ref.child(key);
              newPostRef.set({
                  name : ur.auth.displayName,
                  email : ur.auth.email,
                  sgk : '-',
                  status : 0,
                  key : key

                });
                  that.af.auth.logout();
                  alert('Your account has not been activated yet!' );

                }


      });

          }
        });

      }).catch(
        (err) => {
        this.error = err;
      })
    }

  ngOnInit() {
  }

}
