import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatroomsListComponent } from './components/chatrooms-list/chatrooms-list.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCharoomComponent } from './components/create-charoom/create-charoom.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



const routes: Routes = [    
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chatrooms', component: ChatroomsListComponent },    
    { path: 'createchatroom', component: CreateCharoomComponent },
    { path: 'chatrooms', component: ChatroomsListComponent },
    { path: 'settings', component: UserProfileComponent },
    { path: 'chat', component: ChatroomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
