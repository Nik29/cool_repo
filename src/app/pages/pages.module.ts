import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FeedchartService } from './dashboard/feedchart.service'
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { RealTimeService } from './real-time.service';
import { Pages } from './pages.component';
import { CalendarService } from './dashboard/calendar/calendar.service';
import {UserActivateGuard} from './userActivate.service';
import { ServersComponent } from './servers/servers.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages, ServersComponent],
  providers: [RealTimeService,  FeedchartService , CalendarService , UserActivateGuard]
})
export class PagesModule {
}
