import {Component , OnInit} from '@angular/core';
import {TrafficChartService} from './trafficChart.service';
import { RealTimeService } from '../../real-time.service';
import * as Chart from 'chart.js';
import 'style-loader!./trafficChart.scss';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html'
})


// TODO: move chart.js to it's own component
export class TrafficChart implements OnInit{

  public doughnutData: Array<Object>;
  uid : any;
  tot : any;
  trial:any;
  get_data :Array<Object>;
  temp_data : any;
  myFlag :number;


  constructor(private realTimeService:RealTimeService , private trafficChartService:TrafficChartService) {
    this.doughnutData = trafficChartService.getData();
    this.myFlag = 0;

  }
  ngOnChanges(){

  }
  ngDoCheck(){
    if (this.realTimeService.flag==1 && this.myFlag==1){
      this.realTimeService.flag = 0;
      this.myFunction();
    }

  }

  ngOnInit()
  {

 }
   ngAfterViewInit(){

     this.myFlag = 1;


  }


  myFunction() {

    let doughData = {"open":0,"assigned":0,"picked":0,"dropped":0,"cancelled":0};
    this.get_data = this.realTimeService.full_data;

          this.tot = 0;

          this.get_data.forEach(item => {
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

      let ct=0
      for(let key in doughData){
      this.doughnutData[ct]["value"]=doughData[key];
      this.doughnutData[ct]["percentage"]=Math.round(doughData[key]*10000/this.tot)/100;
      ct+=1;
    }

    this._loadDoughnutCharts();

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
