var uploadexcel=function(){
  var file=document.getElementById('file').files;
  console.log(file.name);
  var xls2json=require('xls2json');

  xls2json.convertFile(file,'output/sample.json',function(err,data){
    if(err) console.log("error while converting excel to json");
    else console.log("converted successfully");
  })
};
downloadexcel(){
  let storageRef = firebase.storage().ref();
  let selectedFile = document.getElementById('file').files
    let path = `/${this.folder}/${selectedFile.name}`;
    let eref = storageRef.child(path);
    eref.put(selectedFile).then((snapshot) => {
      this.excels.name=selectedFile.name;
      this.excels.path = path;
      var file = selectedFile;

// Create the file metadata
var metadata = {
contentType: 'xls'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('userdata/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
switch (error.name) {
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
var downloadURL = uploadTask.snapshot.downloadURL;
});

    })
  };



  @Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.css']
  })
