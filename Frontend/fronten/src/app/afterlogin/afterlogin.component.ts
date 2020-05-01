import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afterlogin',
  templateUrl: './afterlogin.component.html',
  styleUrls: ['./afterlogin.component.css']
})
export class AfterloginComponent implements OnInit {
  data 
  api
  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
    this.api = localStorage.getItem('username')
    var temp = this.loginService.getData();
    this.loginService.setData(temp)
    this.data = temp;
    console.log(this.data)
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['./home'])
  }
}
