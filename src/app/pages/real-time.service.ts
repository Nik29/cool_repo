import { Injectable , OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire ,  FirebaseListObservable} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { FeedchartService } from './dashboard/feedchart.service';

@Injectable()
export class RealTimeService implements OnInit{
  uid : any;
  get_data :FirebaseListObservable<any[]>;
  flag:number;
  baseUrl :any;
  holder :string;
  bigFlag : number;
  hashMap : any;
  full_data : Array<Object>;
  ref: any;
  st:any;
  subs : any;
  constructor(public af: AngularFire,db: AngularFireDatabase , private feedChartService : FeedchartService) {
    this.flag = 0;
    this.bigFlag = 0;
    this.holder = '';
    this.hashMap = {};
    this.baseUrl = 'https://aus-cbd-data-01.appspot.com/book/?service=gob&gapn=aus-jumpin-01';
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.uid = auth.uid;
        //this.get_data = this.af.database.list('userdata/'+this.uid+'/realTimeData');
        this.ref =  firebase.database().ref('userdata/'+this.uid+'/realTimeData');
        this.get_data = db.list('userdata/'+this.uid+'/realTimeData');
      }
    });
   }
   ngOnInit(){

   }
   ngOnDestroy(){
     this.subs.unsubscribe();
   }
   hasher(){
     let that = this;
     that.ref.once("value")
        .then(function(snapshot) {
          var a = snapshot.exists();

          if(a== true){
            let jsonObj = {};
              that.get_data.forEach(item=>{
                that.hashMap[item["id"]]=JSON.parse(JSON.stringify(item));
              });
          }
          that.subscriber();
        });
      that.subs =   that.get_data.subscribe(val=>{
          that.full_data = [];
            val.forEach(item => {
              that.hashMap[item["id"]]=JSON.parse(JSON.stringify(item))
              that.full_data.push(item);
            })
            that.feedChartService.retrieve(that.full_data);
            that.flag = 1;
            that.bigFlag = 1;
  })
}

   subscriber(){
     let t = this;
     this.st = setInterval(function(){t.goCheck(t)},10000);
   }
   goCheck(t){
     t.loadJSON(t.callback,t);
   }
   loadJSON(callback,t) {


       let that = t;
       let usid = that.uid;
       var xobj = new XMLHttpRequest();
           xobj.overrideMimeType("application/jsonp");
       xobj.open('GET', this.baseUrl, true); // Replace 'my_data' with the path to your file
       xobj.onreadystatechange = function () {
             if (xobj.readyState == 4 && xobj.status == 200) {
               // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
               if(xobj.responseText != that.holder ){
               callback(xobj.responseText,usid,that);
             }
           }
       };
       xobj.send(null);
    }

   callback(txxt,usid,that){
     //that.get_data.remove().then(_ => that.backcall(txxt,usid,that));
     that.backcall(txxt,usid,that);
   }

   backcall(txxt,usid,that){
     let ct = 0;
     let cont  = JSON.parse(txxt);
     let logs = cont["data"];

     let newHash = {};

     jQuery.each(logs, function() {
     let jsonObj = this;

     if(!jsonObj.hasOwnProperty("drop")){
       jsonObj["drop"]={};
       jsonObj["drop"]["address"]="-";
       jsonObj["drop"]["lng"]="-";
       jsonObj["drop"]["lat"]="-"
       jsonObj["fare"]={};
       jsonObj["fare"]["min"]="-";
       jsonObj["fare"]["max"]="-";
       jsonObj["distance"]="-";
     }

     if(!jsonObj.hasOwnProperty("pickuptime")){
       jsonObj["pickuptime"]="-";
     }
     newHash[jsonObj["id"]] = JSON.parse(JSON.stringify(jsonObj));

     if(that.hashMap.hasOwnProperty(jsonObj["id"])){
       jsonObj["key"]=that.hashMap[jsonObj["id"]]["key"];
       newHash[jsonObj["id"]]["key"]=that.hashMap[jsonObj["id"]]["key"];
       if(!jsonObj==that.hashMap[jsonObj["id"]]){
         that.hashMap[jsonObj["id"]]=JSON.parse(JSON.stringify(jsonObj));
         that.ref.child(jsonObj["key"]).update({
             id : jsonObj["id"],
             distance : jsonObj["distance"],
             pickup :{ address : jsonObj["pickup"]["address"],lng : jsonObj["pickup"]["lng"],lat : jsonObj["pickup"]["lat"]},
             drop : { address : jsonObj["drop"]["address"],lng : jsonObj["drop"]["lng"],lat : jsonObj["drop"]["lat"]},
             name : jsonObj["name"],
             state : jsonObj["state"],
             fare : {min : jsonObj["fare"]["min"],max: jsonObj["fare"]["max"]},
             mobile : jsonObj["mobile"],
             mode : jsonObj["mode"],
             pickuptime : jsonObj["pickuptime"]
           });
       }
     }

     else if(!that.hashMap.hasOwnProperty(jsonObj["id"])){
     that.hashMap[jsonObj["id"]]=JSON.parse(JSON.stringify(jsonObj));
     let newPostRef =that.ref.push();
     let ki = newPostRef.key;
     newPostRef.set({
         id : jsonObj["id"],
         distance : jsonObj["distance"],
         pickup :{ address : jsonObj["pickup"]["address"],lng : jsonObj["pickup"]["lng"],lat : jsonObj["pickup"]["lat"]},
         drop : { address : jsonObj["drop"]["address"],lng : jsonObj["drop"]["lng"],lat : jsonObj["drop"]["lat"]},
         name : jsonObj["name"],
         state : jsonObj["state"],
         fare : {min : jsonObj["fare"]["min"],max: jsonObj["fare"]["max"]},
         mobile : jsonObj["mobile"],
         mode : jsonObj["mode"],
         pickuptime : jsonObj["pickuptime"],
         key : ki
       });
       that.hashMap[jsonObj["id"]]["key"]=newPostRef.key;
       newHash[jsonObj["id"]]["key"]=newPostRef.key;
     }
     });

     if(that.hashMap.hasOwnProperty(undefined)){
       delete that.hashMap["undefined"];
     }
     for(var item in that.hashMap){
       if(!newHash.hasOwnProperty(item)){

         that.ref.child(that.hashMap[item]["key"]).remove();
       }
     }
     that.hashMap = JSON.parse(JSON.stringify(newHash));
     that.holder = txxt;
   }
}
