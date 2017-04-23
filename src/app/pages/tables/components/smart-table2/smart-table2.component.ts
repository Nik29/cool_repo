import { Component , OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFire, FirebaseObjectObservable , FirebaseListObservable} from 'angularfire2';
import csv from 'csvtojson';
import 'style-loader!../smartTables/smartTables.scss';

@Component({
  selector: 'app-smart-table2',
  templateUrl: './smart-table2.component.html'
//  styleUrls: ['./smart-table2.component.css']
})
export class SmartTable2Component implements OnInit {

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
        title: 'Vehicle Plate No.',
        type: 'string'
      },
      b: {
        title: 'Vehicle Type',
        type: 'string'
      },
      c: {
        title: 'Make',
        type: 'string'
      },
      d :{
        title: 'Model',
        type: 'string'
      },
      e : {
        title: 'Year',
        type: 'string'
      },
      f: {
        title: 'Color',
        type: 'string'
      },
      g: {
        title: 'Passenger Capacity',
        type: 'string'
      },
      h:{
        title: 'Owner ID',
        type: 'string'
      },
      i:{
        title: 'Verification Rating',
        type: 'string'
      },
      j:{
        title: 'Reg. exp date',
        type: 'string'
      },
      k:{
        title: 'Average Rate',
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
        this.get_data = this.af.database.list('userdata/'+this.uid+'/files/vehicles');
        this.rem = this.af.database.object('userdata/'+this.uid+'/files/vehicles');
      }
    });

  }

  ngOnInit(){

    this.get_data.subscribe(
        val=>{
          val.forEach(item => {

            let JSONObj = { a:item["Vehicle plate no"], b:item["Vehicle type"], c:item["Make"] , d:item["Model"],
                  e:item["Year"],f:item["Color"],g:item["Passenger capacity"],h:item["Owner ID"],i:item["Verification rating"],j:item["Reg exp date"],k:item["Average rate"] };
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
      let userRef = databaseRef.child('userdata/'+usid+'/files/vehicles');

      if(file.type=="application/json"){
      myReader.readAsText(file);
      myReader.onload = function(z){
        // you can perform an action with readed data here
       let txxt = myReader.result;


        let a:any,b:any,c:any,d:any,e:any,f:any,g:any,h:any,i:any,j:any,k:any;


        let cont  = JSON.parse(txxt);

        jQuery.each(cont, function() {

          let jsonObj = this;
          a = jsonObj["Vehicle Plate no"];
          b = jsonObj["Vehicle Type"];
          c = jsonObj["Make"] ;
          d = jsonObj["Model"];
          e = jsonObj["Year"];
          f = jsonObj["Color"];
          g = jsonObj["Passenger Capacity"];
          h = jsonObj["Owner ID"];
          i = jsonObj["Verification rating"];
          j = jsonObj["Reg exp date"];
          k = jsonObj["Average Rate"];

          let newPostRef =userRef.push();

          newPostRef.set({
            "Vehicle plate no":a,
            "Vehicle type":b,
            "Make":c,
            "Model":d,
            "Year":e,
            "Color":f,
            "Passenger capacity":g,
            "Owner ID":h,
            "Verification rating":i,
            "Reg exp date":j,
            "Average rate":k
          });
        });

      }
        window.location.reload();
        window.alert("database updated using json file");
    }
    else if(file.type=="text/csv"){
      myReader.readAsText(file);
      myReader.onload = function(z){
        let txxt = myReader.result;
        let a:any,b:any,c:any,d:any,e:any,f:any,g:any,h:any,i:any,j:any,k:any;
        //const csv=require('csvtojson');
csv()
.fromString(txxt)
.on('json',(jsonObj)=>{ // this func will be called 3 times
  a = jsonObj["Vehicle Plate no"];
  b = jsonObj["Vehicle Type"];
  c = jsonObj["Make"] ;
  d = jsonObj["Model"];
  e = jsonObj["Year"];
  f = jsonObj["Color"];
  g = jsonObj["Passenger Capacity"];
  h = jsonObj["Owner ID"];
  i = jsonObj["Verification rating"];
  j = jsonObj["Reg exp date"];
  k = jsonObj["Average Rate"];

  let newPostRef =userRef.push();

  newPostRef.set({
  "Vehicle plate no":a,
  "Vehicle type":b,
  "Make":c,
  "Model":d,
  "Year":e,
  "Color":f,
  "Passenger capacity":g,
  "Owner ID":h,
  "Verification rating":i,
  "Reg exp date":j,
  "Average rate":k
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
