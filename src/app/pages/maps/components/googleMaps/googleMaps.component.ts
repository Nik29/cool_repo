import {Component, ElementRef,OnInit} from '@angular/core';
import { RealTimeService } from '../../../real-time.service'
import * as GoogleMapsLoader from 'google-maps';

@Component({
  selector: 'google-maps',
  styleUrls: ['./googleMaps.scss'],
  templateUrl: './googleMaps.html',
})
export class GoogleMaps implements OnInit  {
  public feed:Array<Object>;
  myflag : any;
  baseUrl:any;
  ide : any;
  constructor(private _elementRef:ElementRef,private realTimeService:RealTimeService) {
      GoogleMapsLoader.KEY = 'AIzaSyAzXZYCOJgDf1goOGBmtS21SYNXymq40xk';
      this.myflag = 0;
      this.baseUrl = 'https://aus-cbd-data-01.appspot.com/book/?service=gbi&gapn=aus-jumpin-01&id=';
      GoogleMapsLoader.KEY = 'AIzaSyAzXZYCOJgDf1goOGBmtS21SYNXymq40xk';
      this.ide = 0;
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.google-maps');

    // TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {
      new google.maps.Map(el, {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    });
  }
  expandMessage (message){
    message.expanded = !message.expanded;
  }
  ngOnChanges(){
  }
  ngDoCheck(){
    if(this.realTimeService.bigFlag==1){
      this.realTimeService.bigFlag=0;
      this.feed = this.realTimeService.full_data;

    }
  }
  displayRoute(idd:number){
    if(idd!=this.ide){
      this.ide = idd;
      this.triger();
    }

  }

  triger() {
      let furl = this.baseUrl+this.ide;
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/jsonp");
      xobj.open('GET', furl, true);
      let that = this; // Replace 'my_data' with the path to your file
      xobj.onreadystatechange = function () {

            if (xobj.readyState == 4 && xobj.status == 200) {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              var cont = JSON.parse(xobj.responseText);

              var myCoordinates = [];
              for (var item in cont["path"]) {
                myCoordinates.push({lat: cont["path"][item].a, lng: cont["path"][item].o});
              }

              var source = {lat:cont["pickup"]["lat"],lng:cont["pickup"]["lng"]};
              var dest = {lat:cont["drop"]["lat"],lng:cont["drop"]["lng"]};
              that.initMap(myCoordinates,source,dest);


          }

      };

      xobj.send(null);


}

initMap(txxt,source,dest)
{
  let el = this._elementRef.nativeElement.querySelector('.google-maps');
  let that = this;

  // TODO: do not load this each time as we already have the library after first attempt
  GoogleMapsLoader.load((google) => {
     var map = new google.maps.Map(el, {
      center: new google.maps.LatLng(source.lat,source.lng),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var flightPlanCoordinates = txxt;
      var marker1 = new google.maps.Marker({
          position: source,
          map: map,
          label:'S',
          title: 'Source'
        });
        var marker2 = new google.maps.Marker({
            position: dest,
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
       });
}


}
