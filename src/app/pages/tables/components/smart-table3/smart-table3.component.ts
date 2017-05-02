import { Component , OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFire, FirebaseObjectObservable , FirebaseListObservable} from 'angularfire2';
import 'style-loader!../smartTables/smartTables.scss';


@Component({
  selector: 'app-smart-table3',
  templateUrl: './smart-table3.component.html'
  //styleUrls: ['./smart-table3.component.css']
})
export class SmartTable3Component implements OnInit {
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
        this.get_data = this.af.database.list('userdata/'+this.uid+'/files/owners');
        this.rem = this.af.database.object('userdata/'+this.uid+'/files/owners');
      }
    });

  }

  ngOnInit(){
    this.get_data = this.af.database.list('userdata/'+this.uid+'/files/owners');
    this.get_data.subscribe(
        val=>{
          val.forEach(item => {
            let JSONObj = { a:item["Phone no"], b:item["Email ID"], c:item["Company Name"] , d:item["Address"],
                  e:item["No of cars"],f:item["Owner ID"] };
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
      let userRef = databaseRef.child('userdata/'+usid+'/files/owners');
      let ext = file.name.substr(file.name.lastIndexOf('.')+1)
      console.log(ext);
      if(ext=="json"){
      myReader.readAsText(file);
      myReader.onload = function(z){
        // you can perform an action with readed data here
       let txxt = myReader.result;

        let a:any,b:any,c:any,d:any,e:any,f:any;
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


          let newPostRef =userRef.push();

          newPostRef.set({
            "Phone no":a,
            "Email ID":b,
            "Company Name":c,
            "Address":d,
            "No of cars":e,
            "Owner ID":f
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


         let a:any,b:any,c:any,d:any,e:any,f:any;
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

  let newPostRef =userRef.push();

  newPostRef.set({
  "Phone no":a,
  "Email ID":b,
  "Company Name":c,
  "Address":d,
  "No of cars":e,
  "Owner ID":f
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
