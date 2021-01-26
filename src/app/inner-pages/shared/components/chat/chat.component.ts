import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import * as fromChats from 'app/core/chats/store/chat.reducer';
import * as chatActions from 'app/core/chats/store/chats.actions';
import { ChatService } from 'app/shared/services';
import { ConversationModel, UserInfo } from 'app/shared/models';
import { EUserRole } from 'app/shared/enums';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ],
})
export class ChatComponent implements OnInit, OnDestroy {
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
      switchMap((user) => this.chatService.getConversationsByUserId(user.id).pipe(
        tap((convs) => this.store.dispatch(chatActions.updateConversationsListSuccess(convs))),
        switchMap((convs) => iif(
          () => !!this.route.snapshot.params.id,
          of(convs).pipe(
            // mergeMap((convs) => convs),
            map((convs: ConversationModel[]) => {
              return convs.filter((conv) => {
                return conv.participants.filter((part) => part.user.id === this.route.snapshot.params.id).length;
              })[0];
            }),
            // filter((conv) => !!conv.participants.filter((part) => part.user.id === this.route.snapshot.params.id).length),
            switchMap((conv: ConversationModel) => iif(
              () => !!conv,
              of(conv).pipe(tap((conv) => this.store.dispatch(chatActions.setActiveConversation({ convId: conv.id })))),
              this.chatService.createNewConversation(user.id, this.route.snapshot.params.id).pipe(
                tap((conv) => this.store.dispatch(chatActions.createNewConversation({ conv, open: true })))
              )
            )),
            tap(() => this.location.replaceState(user.role === EUserRole.Client ? '/in/c/chat' : '/in/d/chat'))
          )
        ))
      )),
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

  ngOnDestroy(): void {
  }
}
