import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire , FirebaseListObservable} from 'angularfire2';

@Injectable()
export class SmartTablesService{

  name : any;
  uid : any;
  file : any;
  smartTableData : any;
  databaseRef:any;
  userRef:any;

  constructor(private af: AngularFire){
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this.uid = auth.uid;
      }
    });
    let lists$ : FirebaseListObservable<any[]> = this.af.database.list('userdata/'+this.uid+'/files');
    lists$.subscribe(
      val=>{console.log(val);
      }


    );

  }




  metricsTableData = [
    {
      image: 'app/browsers/chrome.svg',
      browser: 'Google Chrome',
      visits: '10,392',
      isVisitsUp: true,
      purchases: '4,214',
      isPurchasesUp: true,
      percent: '45%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/firefox.svg',
      browser: 'Mozilla Firefox',
      visits: '7,873',
      isVisitsUp: true,
      purchases: '3,031',
      isPurchasesUp: false,
      percent: '28%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/ie.svg',
      browser: 'Internet Explorer',
      visits: '5,890',
      isVisitsUp: false,
      purchases: '2,102',
      isPurchasesUp: false,
      percent: '17%',
      isPercentUp: false
    },
    {
      image: 'app/browsers/safari.svg',
      browser: 'Safari',
      visits: '4,001',
      isVisitsUp: false,
      purchases: '1,001',
      isPurchasesUp: false,
      percent: '14%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/opera.svg',
      browser: 'Opera',
      visits: '1,833',
      isVisitsUp: true,
      purchases: '83',
      isPurchasesUp: true,
      percent: '5%',
      isPercentUp: false
    }
  ];

  /*getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.smartTableData);
      }, 2000);
    });
  }*/
  getData(){
    return this.af.database.list('userdata/'+this.uid+'/files');
  }


  /*upload(){
    var express=require('express');
    var multer=require('multer');
    var app=express();
    var upload=multer({dest: 'uploads/'});

    app.post('/pages/tables/smarttables',upload.single('excelupload'),function(req,res,next){
      upload(req,res,function(err){
        if(err){
          console.log('error');
        }
        else{
          console.log("file uploaded");
        }
      })
    })
}*/



}
