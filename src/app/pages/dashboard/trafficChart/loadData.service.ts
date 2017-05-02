import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire ,  FirebaseListObservable} from 'angularfire2';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LoadDataService {
  uid : any;
  randomQuote:any;
  get_data :FirebaseListObservable<any[]>;
  temp_data:any;
  flag:any;
  holder :any;
  bigFlag : any;
  st : any;
  public baseUrl ='https://s-patna-01.appspot.com/book/?service=gob&gapn=aus-car-01';
  constructor(public af: AngularFire,private http : Http) {
    this.flag = 0;
    this.bigFlag = 0;
    this.holder = {};
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.uid = auth.uid;
        this.get_data = this.af.database.list('userdata/'+this.uid+'/realTimeData');

      }
    });

  }

/*  getAll(){
    var req = new XMLHttpRequest();
let tempFunc = this.parserData;
req.open('GET', this.baseUrl, true);
let usid = this.uid;

req.onreadystatechange = function() {
    if (req.readyState === 4) {
        tempFunc(req.responseText,usid);
    }
};
req.setRequestHeader('Accept', 'application/json');
req.send();
  }*/
/*subscriber(){
  this.getCurrentState()
  .subscribe(
    data=>{
    this.temp_data = JSON.stringify(data);
      this.parserData()},
    error=>alert(error),
    ()=>{console.log("finished");this.flag=1;}
  );

}*/
subscriber(){
  let t = this;
  this.st = setInterval(function(){t.goCheck(t)},10000);
}
goCheck(t){
  t.loadJSON(t.callback,t);
}

loadJSON(callback,t) {
    console.log("called");
    let flg = 0;
    let that = t;
    let usid = that.uid;
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/jsonp");
    xobj.open('GET', this.baseUrl, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == 200) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            if(xobj.responseText != that.holder ){
              that.holder = xobj.responseText;
              that.bigFlag = 0;
            callback(xobj.responseText,usid,that);
          }
        }
    };
    this.flag = flg;
    xobj.send(null);
 }

callback(txxt,usid,that){
  that.get_data.remove().then(_ => that.backcall(txxt,usid,that));
}

backcall(txxt,usid,that){
  let ct = 0;
  //let usid = this.uid;
  let databaseRef = firebase.database().ref();
  let userRef = databaseRef.child('userdata/'+usid+'/realTimeData');
  let cont  = JSON.parse(txxt);
  let logs = cont["data"];
  jQuery.each(logs, function() {
  let jsonObj = this;
  ct+=1;
  let newPostRef =userRef.push();
  if(!this.hasOwnProperty("pickuptime")){
    jsonObj["pickuptime"]="-";
  }
  if(!this.hasOwnProperty("drop")){
    jsonObj["drop"]={};
    jsonObj["drop"]["address"]="-";
    jsonObj["drop"]["lng"]="-";
    jsonObj["drop"]["lat"]="-"
    jsonObj["fare"]={};
    jsonObj["fare"]["min"]="-";
    jsonObj["fare"]["max"]="-";
  }

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
      pickuptime : jsonObj["pickuptime"]
    });
  });
  console.log(ct);
  that.flag = 1;
}

}
