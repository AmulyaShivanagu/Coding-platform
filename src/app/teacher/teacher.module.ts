import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { AntModule } from '../ant.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    TeacherPageComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    AntModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
