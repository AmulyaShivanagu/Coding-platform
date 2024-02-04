import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  role:string = '';
  
  ngOnInit(): void {
    // localStorage.clear();
    this.role = localStorage.getItem('role')??'';
    console.log(this.role)
  }
}
