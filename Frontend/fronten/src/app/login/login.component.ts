import { Component, OnInit } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username
  public password
  public d
  public api : string[]
  constructor(private http : HttpClient,private route : Router,private service: LoginService) { }

  ngOnInit() {
  }

  submit() {
     
    var headers = new Headers();
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        
      })
    }
  
    let postData = {
            username : this.username,
            password : this.password
    }
    
    this.http.post("http://localhost:3000/users/login", postData, httpOptions)
      .subscribe(data=>{
              this.api = data as string[];
              console.log(this.api)
              localStorage.setItem('username',this.username)
              localStorage.setItem('token',this.api['token'])
              this.d = {
                username : this.username,
                token : this.api['token']
              }
              this.service.setData(this.d)
              this.route.navigate(['./afterlogin'])
              } ,
        (error) => console.log(error)
      )
    
    
    }
}
