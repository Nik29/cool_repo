import {Component , OnInit} from '@angular/core';
import {GlobalState} from '../../../global.state';
import { AngularFire} from 'angularfire2';
import { Router } from '@angular/router';
//import {FlashMessagesService} from 'angular2-flash-messages';
import {RealTimeService} from '../../../pages/real-time.service';
import 'style-loader!./baPageTop.scss';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop implements OnInit {
  name: any;
  photoUrl: any;
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState,public af: AngularFire,private router: Router,private rts : RealTimeService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }
  ngOnInit(){}

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  logout() {
    if(this.rts.subs){
    this.rts.subs.unsubscribe();
  }
     this.af.auth.logout();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }

}
