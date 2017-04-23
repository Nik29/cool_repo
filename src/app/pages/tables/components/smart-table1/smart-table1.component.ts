import { Component , OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFire ,  FirebaseObjectObservable , FirebaseListObservable} from 'angularfire2';
import csv from 'csvtojson';
import 'style-loader!../smartTables/smartTables.scss';

@Component({
  selector: 'smart-table1',
  templateUrl: './smart-table1.component.html'
  //styleUrls: ['./smart-table1.component.css']
})
export class SmartTable1Component implements OnInit {
  query: string = '';
  uid : any;
  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
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
    columns: {
      a : {
        title: 'Booking ID',
        type: 'string'
      },
      b: {
        title: 'Guest Name',
        type: 'string'
      },
      c: {
        title: 'Phone Number',
        type: 'string'
      },
      d :{
        title: 'Booking Type',
        type: 'string'
      },
      k : {
        title: 'Pickup Date',
        type: 'string'
      },
      f: {
        title: 'Pickup Time',
        type: 'string'
      },
      g: {
        title: 'Pickup Location',
        type: 'string'
      },
      h:{
        title: 'Drop Location',
        type: 'string'
      },
      i:{
        title: 'Estimated Fare',
        type: 'string'
      },
      j:{
        title: 'Assigned to',
        type: 'string'
      },
      l:{
        title: 'Status',
        type: 'string'
      },
      m:{
        title: 'Rated',
        type: 'string'
      }

    }
  };

  source: LocalDataSource = new LocalDataSource();
get_data :FirebaseListObservable<any[]>;
rem : FirebaseObjectObservable<any>;
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.uid = auth.uid;
          this.get_data = this.af.database.list('userdata/'+this.uid+'/files/booking');
          this.rem = this.af.database.object('userdata/'+this.uid+'/files/booking');
      }
    });

  }

  ngOnInit(){

    this.get_data.subscribe(
        val=>{
          val.forEach(item => {

            let JSONObj = { a:item["Booking ID"], b:item["Guest name"], c:item["Phone number"] , d:item["Booking type"],k:item["Pickup date"],f:item["Pickup time"],
            g:item["Pickup location"],h:item["Drop location"],i:item["Estimated fare"],j:item["Assigned to"],l:item["Status"],m:item["Rated"] };
            this.source.append(JSONObj);
});

        }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  changeListener($event) : void {
    //  this.readThis($event.target);
      let usid = this.uid;
      let inputValue = $event.target;
      var file:File = inputValue.files[0];
      var myReader:FileReader = new FileReader();
      this.get_data.remove().then(_ => console.log('deleted!'));
      let databaseRef = firebase.database().ref();
      let userRef = databaseRef.child('userdata/'+usid+'/files/booking');

      if(file.type=="application/json"){
      myReader.readAsText(file);
      myReader.onload = function(e){
        // you can perform an action with readed data here
       let txxt = myReader.result;


      let a:any,b:any,c:any,d:any,k:any,f:any,g:any,h:any,i:any,j:any,l:any,m:any;



        let cont  = JSON.parse(txxt);
        jQuery.each(cont, function() {
          let jsonObj = this;
          a = jsonObj["Booking ID"];
          b = jsonObj["Guest Name"];
          c = jsonObj["Phone number"];
          d = jsonObj["Booking type"];
          k = jsonObj["Pickup Date"];
          f = jsonObj["Pickup time"];
          g = jsonObj["Pickup location"];
          h = jsonObj["Drop location"];
          i = jsonObj["Estimated fare"];
          j = jsonObj["Assigned to"];
          l = jsonObj["Status"]
          m = jsonObj["Rated"]
          let newPostRef =userRef.push();

          newPostRef.set({
            "Booking ID": a,
            "Guest Name": b,
            "Phone number" : c,
            "Booking type":d,
            "Pickup date":e,
            "Pickup time":f,
            "Pickup location":g,
            "Drop location":h,
            "Estimated fare":i,
            "Assigned to":j,
            "Status":l,
            "Rated":m
          });
        });

      }
      window.location.reload();
      window.alert("database updated using json file");

    }
    else if(file.type=="text/csv"){
      myReader.readAsText(file);
      myReader.onload = function(e){
        let txxt = myReader.result;
         let a:any,b:any,c:any,d:any,k:any,f:any,g:any,h:any,i:any,j:any,l:any,m:any;

         //const csv = require('csvtojson');
csv()
.fromString(txxt)
.on('json',(jsonObj)=>{ // this func will be called 3 times
  a = jsonObj["Booking ID"];
  b = jsonObj["Guest Name"];
  c = jsonObj["Phone number"];
  d = jsonObj["Booking type"];
  k = jsonObj["Pickup Date"];
  f = jsonObj["Pickup time"];
  g = jsonObj["Pickup location"];
  h = jsonObj["Drop location"];
  i = jsonObj["Estimated fare"];
  j = jsonObj["Assigned to"];
  l = jsonObj["Status"]
  m = jsonObj["Rated"]
  let newPostRef =userRef.push();

  newPostRef.set({
    "Booking ID": a,
    "Guest Name": b,
    "Phone number" : c,
    "Booking type":d,
    "Pickup Date":e,
    "Pickup time":f,
    "Pickup location":g,
    "Drop location":h,
    "Estimated fare":i,
    "Assigned to":j,
    "Status":l,
    "Rated":m

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
