import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPageComponent } from './student-page/student-page.component';
import { StudentRoutingModule } from './student-routing.module';
import { AntModule } from '../ant.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CodingComponent } from './coding/coding.component';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  declarations: [
    StudentPageComponent,
    CodingComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AntModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
