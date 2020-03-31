import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable  } from 'rxjs';
import { ChatService } from '../../services/chat.service'
import { User } from 'src/app/shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.css']
})
export class MessageFeedComponent implements OnInit, OnChanges {

  feed: Observable<any[]>;
  user: User;
  chatroomId: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.chatroomId = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.feed = this.chatService.getMessages(this.chatroomId).valueChanges();
    //this.feed = this.chatService.getMessages(this.chatroomId).snapshotChanges().pipe(map(actions => actions.map(a => a.payload.doc.data())))
  }

  ngOnChanges() {
    this.feed = this.chatService.getMessages(this.chatroomId).valueChanges();
    //this.feed = this.chatService.getMessages(this.chatroomId).snapshotChanges().pipe(map(actions => actions.map(a => a.payload.doc.data())))
  }

}
