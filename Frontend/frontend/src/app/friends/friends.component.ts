import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  api
  constructor(private service : LoginService, private http : HttpClient) { }
  data 
  ngOnInit() {
    var temp = this.service.getData()
    this.service.setData(temp)
    this.data = localStorage.getItem('token')
    
    
    var headers = new Headers();
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'Bearer '+this.data
      })
    }
  
   
    this.http.get("http://localhost:3000/friend")
      .subscribe(data=>{
              this.api = data as string[];
              console.log(this.api)
              } ,
        (error) => console.log(error)
      )

  }
  submit(id){
    var headers = new Headers();
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      })
    }
    let postData = {
       _id : id
    }
   
    this.http.post("http://localhost:3000/friend/follow",postData)
      .subscribe(data=>{
              console.log(data);
              } ,
        (error) => console.log(error)
      )
  }
}
