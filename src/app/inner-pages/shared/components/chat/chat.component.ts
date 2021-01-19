import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import * as fromChats from 'app/core/chats/store/chat.reducer';
import { ChatService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import * as chatActions from 'app/core/chats/store/chats.actions';
import { EUserRole } from 'app/shared/enums';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ],
})
export class ChatComponent implements OnInit {
  public user$: Observable<UserInfo>;
  public chat$: Observable<fromChats.State>;

  constructor(
    private store: Store<fromCore.State>,
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select(fromCore.getUserInfo);
    this.chat$ = this.store.select(fromCore.getChats);

    this.user$.pipe(
      first(),
      switchMap((userInfo) => iif(
        () => !!this.route.snapshot.params.id,
        this.chatService.createNewConversation(userInfo.id, this.route.snapshot.params.id).pipe(
          catchError(() => of(this.store.dispatch(chatActions.getConversationsByUserId({
            id: userInfo.id,
            openWith: this.route.snapshot.params.id
          }))).pipe(
            tap(() => this.location.replaceState(
              userInfo.role === EUserRole.Client ? '/in/c/chat' : '/in/d/chat'
            ))
          )),
        ),
        of(this.store.dispatch(chatActions.getConversationsByUserId({
          id: userInfo.id,
          openWith: null
        })))
      ))
    ).subscribe();

    /*this.websocketService.receivedNewMessage().pipe(
      // tap(() => console.log('receivedNewMessage chat'))
      /!*switchMap((message) => iif(
        () => message.chat !== chat.conversations.active,
        of(undefined).pipe(tap(() => {
          console.log('Background notification recieved!');
          Push.create('Test Notification', { body: 'LOL!' }).then(() => {
            console.log('Push promise');
          });
        }))
      ))*!/
    ).subscribe();*/
  }
}
