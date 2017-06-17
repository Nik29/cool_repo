import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  metricsTableData:Array<any>;
  ref : any;
  subs : any;
  subs2 : any;
  flag : any;
  full_data : Array<Object>;
  serv_data : Array<Object>;
  servTableData:Array<any>;
  servLis : FirebaseListObservable<any[]>;
  get_data:FirebaseListObservable<any[]>;
  statusData : Array<number>;
  constructor(db: AngularFireDatabase) {
    this.ref =  firebase.database().ref('userControl');
    this.get_data = db.list('userControl');
    this.servLis = db.list('servers');
    this.statusData = [0,1,2];
   }

   ngOnInit(){
     this.subs =   this.get_data.subscribe(val=>{
         this.full_data = [];
           val.forEach(item => {
             if(item.status==1 || item.status==2){
               item["stat"] = true;
             }
             else{
               item["stat"] = false;
             }
             this.full_data.push(item);

           })
           this.metricsTableData = this.full_data;
   })
   this.subs2 = this.servLis.subscribe(val=>{
     this.serv_data=[];
     this.serv_data.push('-');
     val.forEach(item=>{
       this.serv_data.push(item.name);
     })

     this.servTableData = this.serv_data;

   })
   }
   ngOnDestroy(){
      this.subs.unsubscribe();
      this.subs2.unsubscribe();
   }
   onAliasClick(value,ki ){
     this.ref.child(ki).update({
        sgk : value
     })

   }
   addUser(){
     let name = prompt("Enter user name : ");
     name = name.trim();
     let newUser = prompt("Enter gmail id of user: ");
     newUser = newUser.trim();
     let  key = newUser.replace(/[^A-Z0-9]/ig, "_");

     let that = this;
     this.ref.child(key).once('value', function(snapshot) {
   if (snapshot.val() === null) {
       /* There is no user 'Fred'! */
       that.ref.child(key).set({
         name : name,
         email : newUser,
         sgk : '-',
         status : 0,
         key : key
       })
   } else {
       /* User 'Fred' exists.*/
       alert('User already exists!');
   }
});


   }

   onStatusClick(value,ki ){
     this.ref.child(ki).update({
       status : value
     })

   }
   /*onUpdate(){
     for(var i in this.full_data){
       let jsObj = JSON.parse(JSON.stringify(this.full_data[i]));
       this.ref.child(jsObj.ki).update({
         status : jsObj.status,
         gapn : jsObj.gapn
       })
     }
     window.alert("Updated Credentials!")

 }*/
 }
