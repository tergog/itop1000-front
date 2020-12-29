import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { RichTextEditorModule } from './rich-text-editor/rich-text-editor.module';

import { ChatComponent } from './chat.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { SidebarRoomsComponent } from './sidebar-rooms/sidebar-rooms.component';
import { MessageBoxComponent } from './message-box/message-box.component';

const routes: Routes = [
  { path: '', component: ChatComponent },
];

@NgModule({
  declarations: [
    ChatComponent,
    ChatHeaderComponent,
    SidebarRoomsComponent,
    MessageBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PagesSharedModule,
    FormsModule,
    RichTextEditorModule
  ]
})
export class ChatModule {
}
