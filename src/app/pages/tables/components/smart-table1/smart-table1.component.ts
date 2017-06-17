import { Component,NgModule,OnInit,NgZone} from '@angular/core';
import * as firebase from 'firebase';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFire ,   FirebaseListObservable} from 'angularfire2';
import { FormsModule , NgForm }   from '@angular/forms';
import {MapsAPILoader} from 'angular2-google-maps/core';
import {BrowserModule} from '@angular/platform-browser';
//import csv from 'csvtojson';
import 'style-loader!../smartTables/smartTables.scss';

@Component({
  selector: 'smart-table1',
  templateUrl: './smart-table1.component.html',
  styleUrls: ['./smart-table1.component.css'],

})
export class SmartTable1Component implements OnInit {
  query: string = '';
  uid : any;
 google : any;
  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    actions:{
      add : false,
      edit  :false,
      delete : true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    noDataMessage : 'No Bookings Yet!',
    columns: {
      b: {
        title: 'Guest Name',
        type: 'text',

      },
      a : {
        title: 'Email ID',
        type: 'text',

      },
      c: {
        title: 'Phone Number',
        type: 'text',

      },
      k : {
        title: 'Pickup Date',
        type: 'text',

      },
      f: {
        title: 'Pickup Time',
        type: 'text',

      },
      g: {
        title: 'Pickup Location',
        type: 'text',

      },
      h:{
        title: 'Drop Location',
        type: 'text',

      }

      /*i:{
        title: 'Estimated Fare',
        type: 'string'
      },
      j:{
        type: 'string'
      },
      title: 'Assigned to',
      l:{
        title: 'Status',
        type: 'string'
      },
      m:{
        title: 'Rated',
        type: 'string'
      }*/

    }
  };
userRef : any;
  source: LocalDataSource = new LocalDataSource();
get_data :FirebaseListObservable<any[]>;
name : any;
email : any;
pno : any;
pdate : any;
ploc : any;
dloc : any;
ptime : any;
el : any;
ppll : any;
ddll : any;
r : any;
  constructor(public af: AngularFire,private _loader: MapsAPILoader,private _zone: NgZone) {
    this.name="";
    this.email="";
    this.pno="";
    this.pdate="";
    this.ploc="";
    this.dloc="";
    this.ptime="";
    this.ppll={};
    this.ddll={};
    this.af.auth.subscribe(auth => {
      if(auth) {

          this.uid = auth.auth.email.replace(/[^A-Z0-9]/ig, "_");
          this.userRef = firebase.database().ref('userdata/'+this.uid+'/files/booking');
          this.get_data = this.af.database.list('userdata/'+this.uid+'/files/booking');

      }
    });

  }

  ngOnInit(){
    let that = this;
    this.autocomplete();
    this.r = this.get_data.subscribe(
        val=>{
          delete that.source;
          that.source = new LocalDataSource();
          val.forEach(item => {

            let JSONObj = { a:item["Email ID"], b:item["Guest Name"], c:item["Phone number"] ,k:item["Pickup date"],f:item["Pickup time"],
            g:item["Pickup location"]["address"],h:item["Drop location"]["address"],i:item["key"]};
            this.source.append(JSONObj);
});

        }
    );




/*this.userRef.once("value")
  .then(function(snapshot) {

  for(let ite in snapshot.val()){

     var item = snapshot.child(ite).val(); // "last"
    let JSONObj = { a:item["Email ID"], b:item["Guest Name"], c:item["Phone number"] ,k:item["Pickup date"],f:item["Pickup time"],
    g:item["Pickup location"]["address"],h:item["Drop location"]["address"],i:item["key"]};
    that.source.prepend(JSONObj);
}
  });*/

  }

ngOnDestroy(){
  this.r.unsubscribe();
}

ngAfterViewInit(){
this.pdate = new Date().toISOString().split("T")[0];
}
autocomplete() {
  let that = this;
    this._loader.load().then(() => {

        var autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById("input1"), {});
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          console.log("not ,me");
            this._zone.run(() => {
              var place = autocomplete.getPlace();
              that.ploc = place['formatted_address'];
              var location = place['geometry']['location'];
              var lat =  location.lat();
              var lng = location.lng();
              that.ppll={"address":that.ploc,"lng":lng,"lat":lat};
            });
        });
        var autocomplete2 = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById("input2"), {});
        google.maps.event.addListener(autocomplete2, 'place_changed', () => {
          console.log("not ,me");
            this._zone.run(() => {
              var place = autocomplete.getPlace();
              that.dloc = place['formatted_address'];
              var location = place['geometry']['location'];
              var lat =  location.lat();
              var lng = location.lng();
              that.ddll={"address":that.dloc,"lng":lng,"lat":lat};

            });
        });
    });
  }


  myFunction() {
     var x = document.getElementById('myDIV');
     var y = document.getElementById('bnh');
     if (x.style.display === 'none') {
         x.style.display = 'block';
         y.innerHTML='Hide';
     } else {
         x.style.display = 'none';
         y.innerHTML='Book Now';

     }
   }
  reset(){
    let that = this;
    if (window.confirm('Are you sure you want to delete all the past bookings?')) {
    this.get_data.remove().then(function(_){
      delete that.source;
      that.source = new LocalDataSource();

      alert('Deleted Successfully!');

    })
    .catch(function(error) {
      console.log('Failed: ' + error);
        alert("Please try again in some time!");
    });;
  }
  }
  onDeleteConfirm(event): void {
  if (window.confirm('Are you sure you want to delete?')) {
      this.userRef.child(event.data.i).remove(function(error) {
    if(error){     event.confirm.reject();
    alert("Could not delete booking! Try again in sometime")}
    else{
      event.confirm.resolve();
    }
  });
  //  event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}


  createNew():void{

      let that = this;


     if (window.confirm('Are you sure you want to book?')) {
      let newPostRef =this.userRef.push();

      newPostRef.set({
        "Email ID": that.email,
        "Guest Name": that.name,
        "Phone number" : that.pno,
        "Pickup date": that.pdate,
        "Pickup time": that.ptime,
        "Pickup location":that.ppll,
        "Drop location":that.ddll,
        "key":newPostRef.key

      }).then(function(ref) {
        /*let JSONObj = { a:that.email, b:that.name, c:that.pno ,k:that.pdate,f:that.ptime,
        g:that.ploc,h:that.dloc,i:newPostRef.key};
        that.source.append(JSONObj);*/
        that.name="";
        that.email="";
        that.pno="";
        that.ploc="";
        that.dloc="";
        that.ptime="";
        this.ppll={};
        this.ddll={};
        alert("Booking successfull!");
    }).catch(function(error) {
      console.log('Failed: ' + error);
        alert("Booking failed!Please try again.")
    });
  }

  var y = document.getElementById('bnh');
  y.innerHTML='Book Now';
  var x = document.getElementById('myDIV');
  x.style.display='none';

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


      let ext = file.name.substr(file.name.lastIndexOf('.')+1)

      if(ext=="json"){
      myReader.readAsText(file);
      myReader.onload = function(e){
        // you can perform an action with readed data here
       let txxt = myReader.result;


      let a:any,b:any,c:any,k:any,f:any,g:any,h:any



        let cont  = JSON.parse(txxt);
        jQuery.each(cont, function() {
          let jsonObj = this;
          //a = jsonObj["Booking ID"];
          a = jsonObj["Email ID"]
          b = jsonObj["Guest Name"];
          c = jsonObj["Phone number"];

          k = jsonObj["Pickup Date"];
          f = jsonObj["Pickup time"];
          g = jsonObj["Pickup location"];
          h = jsonObj["Drop location"];


          let newPostRef =that.userRef.push();

          newPostRef.set({
            "Email ID": a,
            "Guest Name": b,
            "Phone number" : c,
            "Pickup date":k,
            "Pickup time":f,
            "Pickup location":g,
            "Drop location":h,
            "key":newPostRef.key

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
  a = jsonObj["Email ID"];
  b = jsonObj["Guest Name"];
  c = jsonObj["Phone number"];
  k = jsonObj["Pickup Date"];
  f = jsonObj["Pickup time"];
  g = jsonObj["Pickup location"];
  h = jsonObj["Drop location"];

  let newPostRef =that.userRef.push();

  newPostRef.set({
    "Booking ID": a,
    "Guest Name": b,
    "Phone number" : c,
    "Pickup Date":k,
    "Pickup time":f,
    "Pickup location":g,
    "Drop location":h,
    "key":newPostRef.key

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
