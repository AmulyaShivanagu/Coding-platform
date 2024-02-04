import { Component,OnInit } from '@angular/core';

import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { LogServiceService } from 'src/app/services/log-service.service';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit{

  contestData:any;
  status:any;
  result:any;

  constructor(private service:LogServiceService,private fb:FormBuilder){}

  codeForm:FormGroup = this.fb.group({
    code:[null, [Validators.required]],
    input:[null, [Validators.required]]
  })

  ngOnInit(): void {
    const id = localStorage.getItem('contestId')??'';
    this.service.getContest({_id:id}).subscribe((data)=>{
      console.log(data[0]);
      this.contestData = data[0];
    })
  }

  compile(){
    console.log(this.codeForm.value);
    this.service.compile(this.codeForm.value).subscribe((data)=>{
      console.log(data);
      this.status = data.status;
      let output = data.result;
      this.result = output.replace(/\\n/g, '\n');
      
    })
  }

  runtestCase(){
    console.log(this.contestData);
    const studentId = localStorage.getItem('student_id')??'';
    let obj = {
      student:studentId,
      contest:this.contestData._id,
      answer:this.codeForm.value.code,
      result:''
    }
    this.service.compile({code:this.codeForm.value.code,input:this.contestData.testCase1}).subscribe((data)=>{
      console.log(data);
      const modifiedString = data.result.replace(/\r\n/g, '\n');
      console.log(data.result);
      console.log(this.contestData.tc1ans)
      
      if(modifiedString == this.contestData.tc1ans){
        console.log('passed',data.result);
        obj.result = "correct answer"
      }
      else{
        obj.result = "wrong answer"
      }
      this.service.compile({code:this.codeForm.value.code,input:this.contestData.testCase2}).subscribe((resp)=>{
        const modified = resp.result.replace(/\r\n/g, '\n');
        if((modified == this.contestData.tc2ans)&&(obj.result != "wrong answer")){
          obj.result = "correct answer";
        }
        else{
          obj.result = "wrong answer";
        }
        console.log(obj);
        this.service.uploadResult(obj).subscribe((response)=>{
          console.log(response);
        })
      })
    })

    console.log(obj);
  }

}
