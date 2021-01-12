import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NEVER, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromCore from 'app/core/reducers';
import * as fromChats from 'app/core/chats/store/chat.reducer';
import { ChatService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import { UserRole } from 'app/shared/enums';

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
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.chat$ = this.store.select(fromCore.getChats);
    this.user$ = this.store.select(fromCore.getUserInfo);

    this.user$.subscribe((userInfo) => {
      if (this.route.snapshot.params.id) {
        this.chatService.createNewConversation(userInfo.id, this.route.snapshot.params.id).pipe(
          catchError(() => {
            this.router.navigate([ userInfo.role === UserRole.Client ? 'in/c/chat' : 'in/d/chat' ]);
            return NEVER;
          })
        ).subscribe();
      }
    });
  }
}
