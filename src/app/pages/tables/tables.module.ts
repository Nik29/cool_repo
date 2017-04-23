import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing }       from './tables.routing';
import { Tables } from './tables.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { BasicTablesService } from './components/basicTables/basicTables.service';
import { ResponsiveTable } from './components/basicTables/components/responsiveTable';
import { StripedTable } from './components/basicTables/components/stripedTable';
import { BorderedTable } from './components/basicTables/components/borderedTable';
import { HoverTable } from './components/basicTables/components/hoverTable';
import { CondensedTable } from './components/basicTables/components/condensedTable';
import { ContextualTable } from './components/basicTables/components/contextualTable';
//import { SmartTables } from './components/smartTables/smartTables.component';
//import { SmartTablesService } from './components/smartTables/smartTables.service';
//import { UploaderComponent } from './uploader/uploader.component'
import { NgUploaderModule } from 'ngx-uploader';
import { SmartTable2Component } from './components/smart-table2/smart-table2.component';
import { SmartTable1Component } from './components/smart-table1/smart-table1.component';
import { SmartTable3Component } from './components/smart-table3/smart-table3.component';
import { SmartTable4Component } from './components/smart-table4/smart-table4.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    NgUploaderModule
  ],
  declarations: [
    Tables,
    BasicTables,
    HoverTable,
    BorderedTable,
    CondensedTable,
    StripedTable,
    ContextualTable,
    ResponsiveTable,
    //SmartTables,
    SmartTable2Component,
    SmartTable1Component,
    SmartTable3Component,
    SmartTable4Component,
    //UploaderComponent,
  ],
  providers: [
    BasicTablesService,
  //  SmartTablesService,
  ]
})
export class TablesModule {
}
