import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire ,  FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  metricsTableData:Array<any>;
  routeTableData:Array<any>;
  userRef : any;
  uid : any;
  get_data :FirebaseListObservable<any[]>;
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if(auth) {

          this.uid = auth.auth.email.replace(/[^A-Z0-9]/ig, "_");
          this.userRef = firebase.database().ref('userdata/'+this.uid+'/files/routes');
          this.get_data = this.af.database.list('userdata/'+this.uid+'/files/routes');
      }
    });

   }

  ngOnInit() {
    this.userRef.once("value")
      .then(function(snapshot) {
        var a = snapshot.exists();
        if(a){
      snapshot.val().forEach(item => {

        let JSONObj = JSON.parse(JSON.stringify(item))
        this.routeTableData.append(JSONObj);
    });
  }
      });


  }

  changeListener($event) : void {
    //  this.readThis($event.target);

      let inputValue = $event.target;
      var file:File = inputValue.files[0];
      var myReader:FileReader = new FileReader();

      let that = this;
      this.get_data.remove().then(_ => console.log('deleted!'));
      //let databaseRef = firebase.database().ref();
      //let userRef = databaseRef.child('userdata/'+usid+'/files/booking');
      console.log(file.type);

      let ext = file.name.substr(file.name.lastIndexOf('.')+1)
      
      if(ext=="json"){
      myReader.readAsText(file);
      myReader.onload = function(e){
        // you can perform an action with readed data here
       let txxt = myReader.result;






        let cont  = JSON.parse(txxt);
        jQuery.each(cont, function() {
          let jsonObj = this;
          //a = jsonObj["Booking ID"];


          let newPostRef =that.userRef.push();

          newPostRef.set({
            "driver_id": jsonObj["driver_id"],
            "route_type": jsonObj["route_type"],
            "start_time" : jsonObj["start_time"],
            "stop_time":jsonObj["stop_time"],
            "route_info":jsonObj["route_info"],


          });
        });

      }
      window.location.reload();
      window.alert("database updated using json file");

    }

    else if(ext=="csv"){
      myReader.readAsText(file);
      myReader.onload = function(e){
        let txxt = myReader.result;
        let a:any,b:any,c:any,d:any,k:any,f:any,g:any,h:any;
         const csv = require('csvtojson');
csv()
.fromString(txxt)
.on('json',(jsonObj)=>{ // this func will be called 3 times

  let newPostRef =that.userRef.push();

  newPostRef.set({
    "driver_id": jsonObj["driver_id"],
    "route_type": jsonObj["route_type"],
    "start_time" : jsonObj["start_time"],
    "stop_time":jsonObj["stop_time"],
    "route_info":jsonObj["route_info"],


  });
})
.on('done',()=>{
    //parsing finished
    window.location.reload();
    window.alert("database updated using csv file");

})
}
}
else{
  window.alert("Upload csv or json file.");
}

  }
}
