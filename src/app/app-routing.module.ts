import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login',component:RegisterComponent},
  {
    path:'teacher',
    loadChildren:()=>import('./teacher/teacher.module').then(m => m.TeacherModule),
  },
  {
    path:'student',
    loadChildren:()=>import('./student/student.module').then(m => m.StudentModule),
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
