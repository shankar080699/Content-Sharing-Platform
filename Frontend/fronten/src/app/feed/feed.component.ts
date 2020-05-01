import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef  } from '@angular/core';
import {FormControl,FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = []; 
  constructor(private http : HttpClient, private formBuilder : FormBuilder) { }
  uploadForm : FormGroup

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile : ['']
    })  
  }
  onFileSelect(event){
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('imageFile',this.uploadForm.get('profile').value);
    
    var token = localStorage.getItem('token')
    console.log(token)
    
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'Bearer '+token
      })
    }
    this.http.post<any>('http://localhost:3000/upload',formData,httpOptions).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }
}
