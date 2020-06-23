import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { FriendsComponent } from './friends/friends.component';
import { FeedComponent } from './feed/feed.component';
import { FollowComponent } from './follow/follow.component';
import { ViewfeedComponent } from './viewfeed/viewfeed.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service'
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
   {path:'follow',component : FollowComponent},
   {path:'viewfeed',component : ViewfeedComponent},
   {path:'upload',component:UploadComponent}
],
canActivate : [AuthGuard]
},
{path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
