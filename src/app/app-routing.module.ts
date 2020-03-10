import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { CreateChatroomComponent } from './components/create-chatroom/create-chatroom.component';
import { ChatroomsListComponent } from './components/chatrooms-list/chatrooms-list.component';



const routes: Routes = [
  { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatroomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
