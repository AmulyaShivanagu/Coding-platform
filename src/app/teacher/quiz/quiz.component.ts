import { Component,OnInit } from '@angular/core';

import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms'
import { LogServiceService } from 'src/app/services/log-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  showModal:boolean = false;
  teacherId!:any;
  quizList:any[]=[];
  showForm:boolean =false;

  constructor(private fb:FormBuilder,private service:LogServiceService){}

  quizForm!:FormGroup;

  ngOnInit(): void {
    this.teacherId = localStorage.getItem('teacher_id')??'';
    this.quizForm = this.fb.group({
      name:[null, [Validators.required]],
      teacher:[this.teacherId],
      year:[null, [Validators.required]],
      branch:[null, [Validators.required]],
      section:[null, [Validators.required]]
    })

    this.service.getQuiz({teacher:this.teacherId}).subscribe((data)=>{
      console.log(data);
      this.quizList = data;
    })

  }

  questionForm:FormGroup = this.fb.group({
    question:[null, [Validators.required]],
    answer:[null, [Validators.required]]
  })

  createQuiz(){
    this.showModal = true;
  }

  addQuiz(){
    this.service.createQuiz(this.quizForm.value).subscribe((data)=>{
      console.log(data);
    })
  }

  open:boolean = false;
  result:any;
  
  resultList:any[] = [];
  openQuiz(data:any){
    this.open = true;
    this.result = data;
    console.log('open',data);
    
    let i=0;
    for(let d of this.result.results){
      
      this.service.findStudent({_id:d.student}).subscribe((data)=>{
        console.log(data.name,data.usn,this.result.results[i].score);
        this.resultList[i]=data;

        this.resultList[i].score = this.result.results[i].score;
        i++;
        console.log(this.resultList[0]);
      })
    }
  }

  sts:any;
  student:any;
  status(data:any){
    this.sts = data;
    
  }

  handleCancel(){
    this.showModal = false;
    this.showForm = false;
    this.open = false;
  }

  quizId:any;

  showFormModal(data:any){
    this.showForm = true;
    this.quizId = data;
  }

  addQuest(){
    this.service.addQuestion({quest:this.questionForm.value,id:this.quizId}).subscribe((data)=>{
      console.log(data);
    })
  }

}
