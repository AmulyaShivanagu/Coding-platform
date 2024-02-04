import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { LogServiceService } from 'src/app/services/log-service.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit{
  contestList:any[] = [];
  
  constructor(private fb:FormBuilder,private service:LogServiceService,private router:Router){}

  ngOnInit(): void {
    const id = localStorage.getItem('student_id')??'';

    this.service.findStudent({_id:id}).subscribe((data)=>{
      console.log(data);
      this.service.getContest({branch:data.branch,year:data.year,section:data.section}).subscribe((data)=>{
        console.log(data);
        this.contestList = data;
      })
    })
  }

  openContest(data:any){
    localStorage.setItem('contestId',data);
    this.router.navigate(['/student/contest']);
  }

}
