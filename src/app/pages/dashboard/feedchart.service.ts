import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FeedchartService {
  flag : any;
  get_data : Array<Object>;
  myHash : Array<Object>;
  baseUrl : string;
  ct1 : number;
  ct2 : number;
  uid : string;
  constructor() {
    this.myHash = [];
    this.get_data = [];
    this.flag = 0;
    this.baseUrl = 'https://uhire-data-01';
    this.ct1 = 0;
    this.ct2 = 0;
 }

 retrieve(newData: Array<Object>){

   for(var item in this.myHash){
     if(!newData.hasOwnProperty(item)){
       delete this.myHash[item];
       delete this.get_data[item];
     }
   }
   let that = this;

   for(var item in newData){
     if(!this.myHash.hasOwnProperty(item) && newData[item]["drop"]!='-'){
       this.fetchpath(newData[item]["id"],that);
       this.ct1+=1;

     }
     this.flag = 1;
   }

 }

 fetchpath(idd:string,that){

   let furl = this.baseUrl+idd;
   var xobj = new XMLHttpRequest();
   xobj.overrideMimeType("application/jsonp");
   xobj.open('GET', furl, true);
  let jsonObj = {};
   xobj.onreadystatechange = function () {

         if (xobj.readyState == 4 ) {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          if(xobj.status == 200){
           var cont = JSON.parse(xobj.responseText);

           var myCoordinates = [];
           if(cont.hasOwnProperty("drop") && cont["distance"]!=0 ){
           for (var item in cont["path"]) {

             myCoordinates.push({lat: cont["path"][item].a, lng: cont["path"][item].o});
           }

           var source = {lat:cont["pickup"]["lat"],lng:cont["pickup"]["lng"]};
           var dest = {lat:cont["drop"]["lat"],lng:cont["drop"]["lng"]};
           jsonObj["source"] = source;
           jsonObj["dest"] = dest;
           jsonObj["path"] = JSON.parse(JSON.stringify(myCoordinates));
           that.get_data.push(jsonObj);
       }
     }
       that.ct2+=1
     }

 };
 xobj.send(null);
 }



}
