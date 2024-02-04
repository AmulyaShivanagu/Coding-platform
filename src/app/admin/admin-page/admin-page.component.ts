import { Component,OnInit } from '@angular/core';

import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {LogServiceService} from 'src/app/services/log-service.service'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

  teachersList:any[]=[];
  addModal:boolean = false;

  constructor(private fb:FormBuilder,private service:LogServiceService){}

  ngOnInit(): void {
    this.service.getTeachers().subscribe((data)=>{
      this.teachersList = data;
    })
  }

  teacherForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    position: [null, [Validators.required]],
    email: [null, [Validators.required]]
  });

  showForm(){
    this.addModal = true;
  }

  addTeacher(){
    console.log(this.teacherForm.value);
    this.service.register(this.teacherForm.value).subscribe((data)=>{
      console.log(data);
    })
  }

  handleCancel(){
    this.addModal = false;
  }

}
