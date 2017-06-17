import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  metricsTableData:Array<any>;
  ref : any;
  subs : any;
  flag : any;
  full_data : Array<Object>;
  get_data:FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.ref =  firebase.database().ref('servers');
    this.get_data = db.list('servers');

   }

   ngOnInit(){
     this.subs =   this.get_data.subscribe(val=>{
         this.full_data = [];
           val.forEach(item => {
             this.full_data.push(item);
           })
           this.metricsTableData = this.full_data;
   })
   let that = this;
  window.onbeforeunload = function(event)
  {
      if(that.subs){
        that.subs.unsubscribe();
      }
  };
   }

   ngOnDestroy()
   {
           this.subs.unsubscribe();
   }
   onServerClick(event,ki ){
     this.ref.child(ki).update({
        server : event.target.outerText.trim()
     })

   }
   onGapnClick(event,ki ){
     this.ref.child(ki).update({
        gapn : event.target.outerText.trim()
     })

   }
   addServer(){
     let item = {name:'',server:'',gapn:''};
     let nme = prompt("Enter alias name : ");
     nme = nme.trim();
     let newpost = this.ref.child(nme);
     newpost.set({
       name : nme,
       server : '',
       gapn : ''
     });
     item["name"] = nme;
     
   }
 }
