import {Component,  OnInit} from '@angular/core';
import {  Router} from '@angular/router';
import { RealTimeService } from '../real-time.service';
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'

})
export class Dashboard implements OnInit{

  constructor(private router: Router,private realTimeService : RealTimeService) {

  }
  ngOnInit(){
    this.realTimeService.hasher();
  }
  ngOnDestroy(){
    clearInterval(this.realTimeService.st);
  }

  goAway(){
     this.router.navigateByUrl('pages/maps/googlemaps');
  }

}
