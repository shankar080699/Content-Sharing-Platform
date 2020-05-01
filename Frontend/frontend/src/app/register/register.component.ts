import { Component, OnInit } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public username
  public password
  constructor(private http : HttpClient) { }

  ngOnInit() {
  }
  submit(){
    
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
    console.log(this.username)
    this.http.post("http://localhost:3000/users/signup", postData, httpOptions)
      .subscribe(data=>{
               (response) => console.log(response)
      } ,
        (error) => console.log(error)
      )
      
    
  }
}
