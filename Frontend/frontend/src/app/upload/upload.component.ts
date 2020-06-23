import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef  } from '@angular/core';
import {FormControl,FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  api
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
    console.log("Image submit")
    const formData = new FormData();
    formData.append('imageFile',this.uploadForm.get('profile').value);
    this.http.post<any>('http://localhost:3000/upload',formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
       )
  }
  view(){
      const postData = {
        "filename" : "ccad70d2c3b841286f8da3a707ac71a0"
      } 
      this.http.post('http://localhost:3000/upload/view',postData).subscribe(
        data => {
          this.api = data as string[]
          console.log(this.api.imgurl)
        }
      ) 
  }

}
