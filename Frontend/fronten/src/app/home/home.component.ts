import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private router: Router) { }
  
  ngOnInit() {
    
  }
  register(){
    this.router.navigate(['./home/register']);
  }
  login(){
    this.router.navigate(['./home/login']);
  }
  home(){
    this.router.navigate(['./home'])
  }
}
