import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FeedchartService } from './dashboard/feedchart.service'
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { RealTimeService } from './real-time.service';
import { Pages } from './pages.component';


@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages],
  providers: [RealTimeService,  FeedchartService]
})
export class PagesModule {
}
