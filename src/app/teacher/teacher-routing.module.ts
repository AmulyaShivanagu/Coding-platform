import { NgModule, ɵɵpureFunction1 } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import { QuizComponent } from './quiz/quiz.component';
const routes: Routes = [
    {path:'teacherPage',component:TeacherPageComponent},
    {path:'createQuiz',component:QuizComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TeacherRoutingModule { }