
import { Component} from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire} from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
})

export class UploaderComponent{
  storageRef : any;
  name: any;
  sendData : any;
  sheet : any;
  uid : any;


constructor(public af: AngularFire,private router: Router){
  this.storageRef = firebase.storage().ref();
  this.af.auth.subscribe(auth => {
    if(auth) {
      this.name = auth;
      this.uid = auth.uid;

    }
  });


}

changeListener($event) : void {
  //  this.readThis($event.target);
    let usid = this.uid;
    let inputValue = $event.target;
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    let rt = this.router;
    myReader.readAsText(file);
    myReader.onload = function(e){
      // you can perform an action with readed data here
     let txxt = myReader.result;
      console.log(myReader.result);

      let a:any,b:any,c:any,d:any;
      let ct = 0;
      let databaseRef = firebase.database().ref();
      let userRef = databaseRef.child('userdata/'+usid+'/files');

      let cont  = JSON.parse(txxt);
      jQuery.each(cont, function() {
        console.log(this);
        a = this["Row ID"];
        b= this["Order ID"];
        c = this["Order Date"];
        d = this["Sales"];
        let newPostRef =userRef.push();

        newPostRef.set({
          "Row ID": a,
          "Order ID": b,
          "Order Date" : c,
          "Sales":d
        });
        ct+=1;
      console.log(ct)
      });
      rt.navigateByUrl('/pages/tables/smarttables');
    }

  console.log("go");

  }
}

      //









// Upload file and metadata to the object 'images/mountains.jpg'

//let uploadTask = this.storageRef.child('userdata/' + this.name.auth.displayName+'/'+this.file.name).put(this.file, metadata);

// Listen for state changes, errors, and completion of the upload.
/*uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;



    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  console.log('upload complete');
  var downloadURL = uploadTask.snapshot.downloadURL;
});*/



//r.onload = function(e:any) {
