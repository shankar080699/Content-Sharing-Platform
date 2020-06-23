import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-viewfeed',
  templateUrl: './viewfeed.component.html',
  styleUrls: ['./viewfeed.component.css']
})
export class ViewfeedComponent implements OnInit {
  files
  img ;
  username = localStorage.getItem("username")
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:3000/upload")
      .subscribe(data=>{
              let files = data as string[];
              console.log(files)
              var arr = []
              for(let f of files){
                const postData = {
                  "filename" : f['filename']
                } 
                this.http.post('http://localhost:3000/upload/view',postData).subscribe(
                  d => {
                     var dat = d as string[];
                     console.log(dat)
                     arr.push(dat);
                  }
                ) 
                }
                this.img = arr
                console.log(this.img)
              } ,
        (error) => console.log(error)
      )
  }

}
