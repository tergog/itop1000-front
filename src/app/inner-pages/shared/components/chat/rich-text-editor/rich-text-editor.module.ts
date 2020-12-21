import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillConfig, QuillModule } from 'ngx-quill';

import { RichTextEditorComponent } from './rich-text-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  declarations: [ RichTextEditorComponent ],
  exports: [ RichTextEditorComponent ],
})
export class RichTextEditorModule {
}