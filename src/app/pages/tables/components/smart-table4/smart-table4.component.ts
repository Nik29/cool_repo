import { Component , OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFire, FirebaseObjectObservable , FirebaseListObservable} from 'angularfire2';
//import csv from 'csvtojson';
import 'style-loader!../smartTables/smartTables.scss';

@Component({
  selector: 'app-smart-table4',
  templateUrl: './smart-table4.component.html'
  //styleUrls: ['./smart-table4.component.css']
})
export class SmartTable4Component implements OnInit {
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
        title: 'Phone No.',
        type: 'string'
      },
      b: {
        title: 'Email ID',
        type: 'string'
      },
      c: {
        title: 'Company Name',
        type: 'string'
      },
      d :{
        title: 'Address',
        type: 'string'
      },
      e : {
        title: 'No. of cars',
        type: 'string'
      },
      f: {
        title: 'Owner ID',
        type: 'string'
      },
      g: {
        title: 'Age',
        type: 'string'
      },
      h: {
        title: 'Sex',
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
        this.get_data = this.af.database.list('userdata/'+this.uid+'/files/drivers');
        this.rem = this.af.database.object('userdata/'+this.uid+'/files/drivers');


      }
    });

  }

  ngOnInit(){

    this.get_data.subscribe(
        val=>{
          val.forEach(item => {

            let JSONObj = { a:item["Phone no"], b:item["Email ID"], c:item["Company Name"] , d:item["Address"],
                  e:item["No of cars"],f:item["Owner ID"],g:item["Age"],h:item["Sex"]};
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
      let userRef = databaseRef.child('userdata/'+usid+'/files/drivers');
      let ext = file.name.substr(file.name.lastIndexOf('.')+1)
      console.log(ext);
      if(ext=="json"){
      myReader.readAsText(file);
      myReader.onload = function(z){
        // you can perform an action with readed data here
       let txxt = myReader.result;


        let a:any,b:any,c:any,d:any,e:any,f:any,g:any,h:any;
        let ct = 0;


        let cont  = JSON.parse(txxt);

        jQuery.each(cont, function() {

          let jsonObj = this;
          a = jsonObj["Phone no"];
          b = jsonObj["Email ID"];
          c = jsonObj["Company Name"];
          d = jsonObj["Address"];
          e = jsonObj["No of cars"];
          f = jsonObj["Owner ID"];
          g = jsonObj["Age"];
          h = jsonObj["Sex"];
          let newPostRef =userRef.push();

          newPostRef.set({
            "Phone no":a,
            "Email ID":b,
            "Company Name":c,
            "Address":d,
            "No of cars":e,
            "Owner ID":f,
            "Age":g,
            "Sex":h
          });
        });

      }
      window.location.reload();
      window.alert("database updated using json file");

    }
      else if(ext=="csv"){
      myReader.readAsText(file);
      myReader.onload = function(z){
        let txxt = myReader.result;


         let a:any,b:any,c:any,d:any,e:any,f:any,g:any,h:any;
         let ct = 0;

         const csv=require('csvtojson')
csv()
.fromString(txxt)
.on('json',(jsonObj)=>{ // this func will be called 3 times
  a = jsonObj["Phone no"];
  b = jsonObj["Email ID"];
  c = jsonObj["Company Name"];
  d = jsonObj["Address"];
  e = jsonObj["No of cars"];
  f = jsonObj["Owner ID"];
  g = jsonObj["Age"];
  h = jsonObj["Sex"];

  let newPostRef =userRef.push();

  newPostRef.set({
    "Phone no":a,
    "Email ID":b,
    "Company Name":c,
    "Address":d,
    "No of cars":e,
    "Owner ID":f,
    "Age":g,
    "Sex":h
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

  onTemplateDownload(event){
    var storageRef = firebase.storage().ref();

    // Create a reference to the file we want to download
var starsRef = storageRef.child('templates/driver.csv');

// Get the download URL
starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
    console.log(blob);
    window['saveAs'](blob, 'driver.csv');
  };
  xhr.open('GET', url);
  xhr.send();

  // Or inserted into an <img> element
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.message) {
    case 'storage/object_not_found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});
  }
}
