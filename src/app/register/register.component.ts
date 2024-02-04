import { Component } from '@angular/core';
import { Validators, FormBuilder , FormGroup} from '@angular/forms';

import { Router } from '@angular/router';
import { LogServiceService } from '../services/log-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  role:string = '';
  viewAdmin:boolean = false;
  viewTeacher:boolean = false;
  viewStudent:boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private service:LogServiceService) { }
  
  Registerform: FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    role:[null,[Validators.required]]
  });

  register:boolean=false;

  showRegisterModal(): void {
    this.register = true;
  }

  handleRegister(): void {
    console.log('Button ok clicked!');
    this.register = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.register = false;
  }

  onSubmit(){
    console.log(this.Registerform.value);
    this.service.login(this.Registerform.value).subscribe((data)=>{
      console.log(data.data._id);
      if(data.role === "admin"){
        this.router.navigate(['/admin/adminPage']);
        localStorage.setItem('role','admin');
      }
      else if(data.role === "teacher"){
        this.router.navigate(['/teacher/teacherPage']);
        localStorage.setItem('teacher_id', data.data._id);
        localStorage.setItem('role','teacher');
      }
      else if(data.role === "student"){
        this.router.navigate(['/student/studentPage']);
        localStorage.setItem('student_id', data.data._id);
        localStorage.setItem('role','student');
      }
    })
  }
  

}
