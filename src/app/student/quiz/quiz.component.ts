import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';

import { LogServiceService } from 'src/app/services/log-service.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  quizList:any[]=[];
  show:boolean = false;
  id:any;

  constructor(private service:LogServiceService,private fb:FormBuilder){}

  ngOnInit(): void {
    this.id = localStorage.getItem('student_id')??'';

    this.service.findStudent({_id:this.id}).subscribe((data)=>{
      console.log(data);
      this.service.getQuiz({branch:data.branch,year:data.year,section:data.section}).subscribe((resp)=>{
        console.log(resp);
        this.quizList = resp;
      })
    })
  }

  quizForm:FormGroup = this.fb.group({

  })

  numbers:number = 0;
  quiz:any;
  quizId:any;
  showQuiz(data:any){
    this.show = true;
    this.quiz = data;
    this.quizId = data._id;
    for (const question of this.quiz.questions) {
      this.quizForm.addControl(question.slno, new FormControl(''));
    }
  }

  handleCancel(){
    this.show = false;
  }

  correct:any[] = [];
  wrong:any[] = [];

  handleOk(){
    console.log(this.quizForm.value);
    let count = 0;
    for (const question of this.quiz.questions) {
      console.log(this.quizForm.controls[question.slno].value);
      if(this.quizForm.controls[question.slno].value === question.answer){
        this.correct.push(question.question)
      count++;
      }
      else{ this.wrong.push(question.question)}
    }
    this.service.uploadQuiz({student:this.id,quiz:this.quizId,score:count}).subscribe((data)=>{
      console.log(data);
    })
  }

}
