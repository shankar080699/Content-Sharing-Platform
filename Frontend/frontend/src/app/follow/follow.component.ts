import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  api
  
  constructor(private http : HttpClient) { }

  ngOnInit() {
     var headers = new Headers();
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      })
    }
  
   
    this.http.get("http://localhost:3000/friend/follow")
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
       user : id
    }
   
    this.http.post("http://localhost:3000/friend", postData)
      .subscribe(data=>{
              console.log(data);
              } ,
        (error) => console.log(error)
      )
  }
}
