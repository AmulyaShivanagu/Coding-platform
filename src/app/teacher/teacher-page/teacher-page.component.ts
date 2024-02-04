import { Component,OnInit } from '@angular/core';

import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { LogServiceService } from 'src/app/services/log-service.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit{

contestList:any[] = [];
showContestModal:boolean = false;
contestType:string = "";
teacher!:any;
open:boolean = false;
codingForm!:FormGroup;
contestId:any;
contestName:string = "";
contestData:any;
resultList:any[] = [];
show:string = "";

constructor(private fb:FormBuilder,private service:LogServiceService){}

ngOnInit(): void {
  this.teacher = localStorage.getItem("teacher_id")??'';
  console.log(this.teacher);

  this.service.getContest({teacher:this.teacher}).subscribe((data)=>{
    this.contestList = data;
    console.log(this.contestList);
  })
  

  this.codingForm = this.fb.group({
    teacher:[this.teacher],
    name:[null, [Validators.required]],
    question: [null, [Validators.required]],
    input: [null, [Validators.required]],
    output: [null, [Validators.required]],
    testCase1: [null, [Validators.required]],
    tc1ans:[null, [Validators.required]],
    tc2ans:[null, [Validators.required]],
    section:[null, [Validators.required]],
    branch:[null, [Validators.required]],
    year:[null, [Validators.required]],
    testCase2: [null, [Validators.required]]
  });
}

quizForm:FormGroup = this.fb.group({
  question:[null, [Validators.required]],
  answer:[null, [Validators.required]]
})

openContest(id:any,name:string,results:any[],obj:any){
  this.open = true;
  this.contestId = id;
  this.contestName = name;
  this.resultList = results;
  this.contestData = obj;
  for(let d in results){
    this.service.findStudent({_id:results[d].student}).subscribe((data)=>{
      console.log(data);
      this.resultList[d].student = data.name;
      this.resultList[d].usn = data.usn;
      this.resultList[d].branch = data.branch;
      this.resultList[d].year = data.year;
      console.log(this.resultList);
    })
  }
}

createContest(){
  this.showContestModal = true;
}

typeOfContest(data:string){
  console.log(data);
  this.contestType = data;
}

addContest(){
  
  console.log(this.codingForm.value);
  console.log(this.teacher)
  this.service.createContest(this.codingForm.value).subscribe((data)=>{
    console.log(data);
    this.service.assignStudents({
      branch:this.codingForm.value.branch,
      year:this.codingForm.value.year,
      section:this.codingForm.value.section,
      contest:data._id
    }).subscribe((data)=>{
      console.log(data);
    })
  })
}

handleCancel(){
  this.showContestModal = false;
  this.open = false;
}

cancel(){
  this.display = false;
}

showDetails(data:string){
  this.show = data;
}

display:boolean = false;
resultObj:any;
showResult(data:any){
  this.display = true;
  console.log(data);
  this.resultObj = data;
  
}

}
