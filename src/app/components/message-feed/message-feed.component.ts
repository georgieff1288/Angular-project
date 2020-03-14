import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable  } from 'rxjs';
import { ChatMessage } from '../../shared/models/chat-message.model'
import { ChatService } from '../../services/chat.service'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.css']
})
export class MessageFeedComponent implements OnInit, OnChanges {

  feed: Observable<any[]>;

  constructor(private chat: ChatService, private db: AngularFirestore) { }

  ngOnInit() {
    this.feed = this.chat.getMessages().valueChanges();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages().valueChanges();
  }

}
