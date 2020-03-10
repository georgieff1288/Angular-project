import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule  } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { MessageFeedComponent } from './components/message-feed/message-feed.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateChatroomComponent } from './components/create-chatroom/create-chatroom.component';
import { ChatroomsListComponent } from './components/chatrooms-list/chatrooms-list.component';
import { environment } from 'src/environments/environment';

import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    MessageFeedComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    UserItemComponent,
    UserProfileComponent,
    CreateChatroomComponent,
    ChatroomsListComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
