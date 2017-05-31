import {Component, ElementRef,OnInit} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import { FeedchartService } from '../feedchart.service';

@Component({
  selector: 'app-riderider-map',
  templateUrl: './riderider-map.component.html',
  styleUrls: ['./riderider-map.component.scss']
})
export class RideriderMapComponent implements OnInit {

   baseUrl:any;
   ide : any;
   viewFlag:number;
  constructor(private _elementRef:ElementRef,private feedChartService : FeedchartService) {
    this.baseUrl = 'https://aus-cbd-data-01.appspot.com/book/?service=gbi&gapn=aus-jumpin-01&id=';
      GoogleMapsLoader.KEY = 'AIzaSyAzXZYCOJgDf1goOGBmtS21SYNXymq40xk';
      this.ide = 0;
      this.viewFlag = 0;
  }
  ngOnInit() {
  }
  ngOnChanges(){

  }
  ngDoCheck(){
    if(this.feedChartService.ct1==this.feedChartService.ct2 && this.feedChartService.flag==1 && this.viewFlag==1){
      this.feedChartService.flag = 0;
      console.log("maptime");
      this.initMap();

    }
  }

  ngAfterViewInit() {
    this.viewFlag = 1;
    let el = this._elementRef.nativeElement.querySelector('.google-maps');

    // : do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {
      new google.maps.Map(el, {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    });

  }


initMap()
{

  let that = this;
  let cx = 0;
  let cy = 0;
  let work = this.feedChartService.get_data;
  let ct = 0;

  for(var item in work){
    console.log(work[item]);
    cx+=work[item]["source"];
    cy+=work[item]["dest"];
    ct+=1;

  }
  if(ct>0){
  cx/=ct;
  cy/=ct;
  let el = this._elementRef.nativeElement.querySelector('.google-maps');

  // TODO: do not load this each time as we already have the library after first attempt
  GoogleMapsLoader.load((google) => {
     var map = new google.maps.Map(el, {
      center: new google.maps.LatLng(44.5403, -78.5463),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      for(var item in work){
      var flightPlanCoordinates = work[item]["path"];
      var marker1 = new google.maps.Marker({

          position: work[item]["source"],
          map: map,
          label:'S',
          title: 'Source'
        });
        var marker2 = new google.maps.Marker({
            position: work[item]["dest"],
            map: map,
            label:'D',
            title: 'Destination'
          });
     var flightPath = new google.maps.Polyline({
       path: flightPlanCoordinates,
       geodesic: true,
       strokeColor: '#FF0000',
       strokeOpacity: 1.0,
       strokeWeight: 2
     });

     flightPath.setMap(map);
   }
       });


}
}

}
