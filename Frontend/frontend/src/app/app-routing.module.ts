import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { FriendsComponent } from './friends/friends.component';
import { FeedComponent } from './feed/feed.component';
import { FollowComponent } from './follow/follow.component';

const routes: Routes = [


{path:'main-nav',component: MainNavComponent},
{path:'home',component: HomeComponent,
 children:[
  {path:'register',component: RegisterComponent},
  {path:'login',component: LoginComponent},
 ]
},  
{path:'afterlogin',component: AfterloginComponent,
 children:[
   {path:'friends',component : FriendsComponent},
   {path:'feed',component : FeedComponent},
   {path:'follow',component : FollowComponent}
 ]
},
{path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
