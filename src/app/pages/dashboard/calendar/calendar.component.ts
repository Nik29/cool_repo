import {Component , OnInit} from '@angular/core';

import {CalendarService} from './calendar.service';
import 'style-loader!./calendar.scss';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.html'
})
export class Calendar implements OnInit{

  public calendarConfiguration:any;
  private _calendar:Object;
  private temp_cal_data:any;

  constructor(private _calendarService:CalendarService) {
    this.calendarConfiguration = this._calendarService.mydata;
    //this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
    this.temp_cal_data={
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

  public onCalendarReady(calendar):void {
    this._calendar = calendar;

  }
  ngOnInit(){
    if(this._calendarService.myflag == 1){
      this._calendarService.myflag = 0;
      //this.calendarConfiguration = this._calendarService.mydata;
      for(var i in this._calendarService.mydata["events"]){
        (<any>jQuery(this._calendar)).fullCalendar('updateEvent',this._calendarService.mydata["events"][i], true);

      }



    }
  }
  ngOnChanges(){

  }
  ngDoCheck(){
    if(this._calendarService.myflag == 1){
      this._calendarService.myflag = 0;
      //this.calendarConfiguration = this._calendarService.mydata;
      for(var i in this.temp_cal_data){
        (<any>jQuery(this._calendar)).fullCalendar('removeEvents',this.temp_cal_data["id"]);
      }
      for(var i in this._calendarService.mydata["events"]){
        (<any>jQuery(this._calendar)).fullCalendar('renderEvent',this._calendarService.mydata["events"][i], true);

      }
      this.temp_cal_data = JSON.parse(JSON.stringify(this._calendarService.mydata["events"]));



    }

  }


/*  private _onSelect(start, end):void {

    if (this._calendar != null) {
      let title = prompt('Event Title:');
      let eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        (<any>jQuery(this._calendar)).fullCalendar('renderEvent', eventData, true);
      }
      (<any>jQuery(this._calendar)).fullCalendar('unselect');
    }
  }*/
}
