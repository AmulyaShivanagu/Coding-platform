import { Component,OnInit } from '@angular/core';

import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {LogServiceService} from 'src/app/services/log-service.service'
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{

  studentsList:any[]=[];
  addModal:boolean = false;

  constructor(private fb:FormBuilder,private service:LogServiceService){}

  ngOnInit(): void {
    this.service.getStudents().subscribe((data)=>{
      this.studentsList = data;
    })
  }

  studentForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    usn: [null, [Validators.required]],
    year: [null, [Validators.required]],
    section: [null, [Validators.required]],
    branch: [null, [Validators.required]]
  });

  showForm(){
    this.addModal = true;
  }

  addStudent(){
    console.log(this.studentForm.value);
    this.service.registerStudent(this.studentForm.value).subscribe((data)=>{
      console.log(data);
    })
  }

  handleCancel(){
    this.addModal = false;
  }

}
