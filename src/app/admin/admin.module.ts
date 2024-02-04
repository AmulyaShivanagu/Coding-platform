import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AntModule } from '../ant.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AntModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
