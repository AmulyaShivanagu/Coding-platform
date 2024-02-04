import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentPageComponent } from './student-page/student-page.component';
import { CodingComponent } from './coding/coding.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
    {path:'studentPage',component:StudentPageComponent},
    {path:'contest',component:CodingComponent},
    {path:'quiz',component:QuizComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StudentRoutingModule { }