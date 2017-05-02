import {Component , OnInit} from '@angular/core';

import {TrafficChartService} from './trafficChart.service';
import {LoadDataService} from './loadData.service';
import * as Chart from 'chart.js';
import { AngularFire , FirebaseListObservable} from 'angularfire2';
import 'style-loader!./trafficChart.scss';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html'
})


// TODO: move chart.js to it's own component
export class TrafficChart implements OnInit{

  public doughnutData: Array<Object>;
  uid : any;
  public tot : any;
  trial:any;
  get_data :FirebaseListObservable<any[]>;
  temp_data : any;
  cf : number;
  constructor(public af: AngularFire ,private loadDataService:LoadDataService , private trafficChartService:TrafficChartService) {
    this.doughnutData = trafficChartService.getData();
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.uid = auth.uid;
      }
    });
    this.cf = this.loadDataService.flag;


  }
  ngOnChanges(){

  }
  ngDoCheck(){
    if (this.loadDataService.flag==1 && this.loadDataService.bigFlag==0 ){
      this.loadDataService.bigFlag = 1;
      this.myFunction();
    }

  }
  ngOnDestroy(){
    clearInterval(this.loadDataService.st);
  }

  ngOnInit()
  {
this.loadDataService.subscriber();
 }
   ngAfterViewInit(){

  }


  myFunction() {
    this.get_data = this.af.database.list('userdata/'+this.uid+'/realTimeData');
    let doughData = {"open":0,"assigned":0,"picked":0,"dropped":0,"cancelled":0};
    this.get_data.subscribe(
        val=>{
          this.tot = 0;
          val.forEach(item => {
          this.tot+=1;
          let l = item["state"];
          switch(l){
            case 0:
            doughData["open"]+=1;
            break;
            case 1:
            doughData["assigned"]+=1;
            break;
            case 2:
            doughData["picked"]+=1;
            break;
            case 3:
            doughData["dropped"]+=1;
            break;
            default:
            doughData["cancelled"]+=1;
            break;
          }

        }
        );
      console.log(doughData);
      let ct=0
      for(let key in doughData){
      this.doughnutData[ct]["value"]=doughData[key];
      this.doughnutData[ct]["percentage"]=Math.round(doughData[key]*10000/this.tot)/100;
      ct+=1;
    }
    console.log(this.doughnutData);
    this._loadDoughnutCharts();

  }

  );
  }

  private _loadDoughnutCharts() {
    let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
  }
}
