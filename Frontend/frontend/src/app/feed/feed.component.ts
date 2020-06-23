import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  files;
  img;
  constructor(private http : HttpClient) { }
  ngOnInit() {
    this.http.get("http://localhost:3000/upload/followers_view")
      .subscribe(data=>{
              let files = data as string[];
              console.log(files)
              var arr = []
              for(let d of files){
                  for(let f of d['files']){
                    // console.log(d['user'])
                    // console.log(f['filename'])
                    const postData = {
                      "user" : d['user'],
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
                }
                this.img = arr
                console.log(this.img)
              } ,
        (error) => console.log(error)
      )
  }
 
}
