import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { StudentListComponent } from './student-list/student-list.component';
const routes: Routes = [
    {path:'adminPage',component:AdminPageComponent},
    {path:'studentList',component:StudentListComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }