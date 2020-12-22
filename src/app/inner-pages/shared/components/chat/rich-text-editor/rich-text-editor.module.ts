import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { QuillConfig, QuillModule } from 'ngx-quill';

import { RichTextEditorComponent } from './rich-text-editor.component';
import { VerticalSpacing } from './modules';

const quillConfig: QuillConfig = {
  placeholder: 'Message',
  theme: 'snow',
  modules: {
    toolbar: {
      container: '.chat__text-editor__toolbar'
    },
    verticalSpacing: {
      root: '.chat__text-editor',
      btnInc: '.ql-spacing__inc',
      btnDec: '.ql-spacing__dec',
      input: '#ql-spacing',
      spacing: 1
    },
    "emoji-toolbar": true
  },
  customModules: [{
    implementation: VerticalSpacing,
    path: 'modules/verticalSpacing'
  }]
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