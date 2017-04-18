import { Component , OnInit} from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

import 'style-loader!./smartTables.scss';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
})
export class SmartTables implements OnInit{

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      "Row ID" : {
        title: 'ROW ID',
        type: 'number'
      },
      "Order ID": {
        title: 'Order ID',
        type: 'number'
      },
      "Order Date": {
        title: 'Order Date',
        type: 'string'
      },
      "Sales" :{
        title: 'Sales',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService) {

  }

  ngOnInit(){
    this.service.getData().subscribe(
        val=>{
          val.forEach(item => {
            console.log('Item:', item);
            let JSONObj = { "Row ID ":item["Row ID"], "Order ID":item["Order ID"], "Order Date":item["Order Date"] , "Sales":item["Sales"] };
            this.source.append(item);
            
});

        }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
