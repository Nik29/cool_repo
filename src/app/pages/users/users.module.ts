import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
//import * as admin from "firebase-admin";
import { UsersComponent } from './users.component';
import { routing } from './users.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    UsersComponent
  ],

})
export class UsersModule {

}
