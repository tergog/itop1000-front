import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { QuillConfig, QuillModule } from 'ngx-quill';

import { RichTextEditorComponent } from './rich-text-editor.component';

const quillConfig: QuillConfig = {
  placeholder: 'Message',
  theme: 'snow',
  modules: {
    toolbar: {
      container: '.chat__text-editor__toolbar'
    },
    "emoji-toolbar": true
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot(quillConfig)
  ],
  declarations: [ RichTextEditorComponent ],
  exports: [ RichTextEditorComponent ],
})
export class RichTextEditorModule {
}