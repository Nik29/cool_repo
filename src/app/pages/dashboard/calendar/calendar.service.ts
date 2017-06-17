import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';

@Injectable()
export class CalendarService {
  myflag : number;
  mydata : any;

  constructor(private _baConfig:BaThemeConfigProvider) {
    this.myflag = 0;
    this.mydata={
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: new Date(),
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events:[]
    };


  }

  getData(jsonData:any) {

    let dashboardColors = this._baConfig.get().colors.dashboard;
    let proData = {};
    for(var i in jsonData){
      var id:any;
      let data = jsonData[i];

      if(data["mode"]==0){
        id = data["id"];
      }
      else if(jsonData[i]["mode"]==1){
        id = data["pickuptime"];
      }

      let today:any,dd:any,mm:any,yyyy:any;
       today = new Date(id);
       dd = today.getDate();
       mm = today.getMonth()+1; //January is 0!
       yyyy = today.getFullYear();

      if(dd<10) {
        dd='0'+String(dd);
      }

      if(mm<10) {
          mm='0'+mm
        }

      today = yyyy+'-'+mm+'-'+dd;

      id = today;
      let uid = yyyy+mm+dd

      if(!proData.hasOwnProperty(id)){

        proData[id]={};
      }
        if(proData[id].hasOwnProperty(data["state"])){
          proData[id][data["state"]]+=1
        }
        else{

          let tmp = data["state"];
          proData[id][data["state"]]={};
          proData[id][data["state"]]=1;

        }

      }
      
      this.mydata.events = [];
      for(let i in proData){

        for(let j in proData[i]){

          let jsonObj={};
          switch(j){
            case '0':
            jsonObj["title"]="OPEN";
            jsonObj["color"] =  dashboardColors.silverTree;
            jsonObj["id"]=i+'_0';
            break;
            case '1':
            jsonObj["title"]="ASSIGNED";
            jsonObj["color"] =  dashboardColors.blueStone;
            jsonObj["id"]=i+'_1';
            break;
            case '2':
            jsonObj["title"]="PICKED";
            jsonObj["color"] =  dashboardColors.surfieGreen;
            jsonObj["id"]=i+'_2';
            break;
            case '3':
            jsonObj["title"]="DROPPED";
            jsonObj["color"] =  dashboardColors.gossip;
            jsonObj["id"]=i+'_3';
            break;
            default:
            jsonObj["title"]="CANCELLED";
            jsonObj["color"] =  dashboardColors.silverTree;
            jsonObj["id"]=i+'_4';
            break;
          }
          jsonObj["title"]+=" : "+proData[i][j];

          jsonObj["start"] = i;

        this.mydata.events.push(jsonObj);
      }
}
this.myflag = 1;


    }
    /*return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-03-08',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'All Day Event',
          start: '2016-03-07',
          color: dashboardColors.silverTree
        },
        {
          title: 'Long Event',
          start: '2016-03-07',
          end: '2016-03-10',
          color: dashboardColors.blueStone
        },
        {
          title: 'Dinner',
          start: '2016-03-14T20:00:00',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Birthday Party',
          start: '2016-04-01T07:00:00',
          color: dashboardColors.gossip
        }
      ]
    };*/

}
