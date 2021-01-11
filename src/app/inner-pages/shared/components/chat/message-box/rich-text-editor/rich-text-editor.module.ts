import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillConfig, QuillModule } from 'ngx-quill';

import { RichTextEditorComponent } from './rich-text-editor.component';
import { VerticalSpacing } from './modules/vertical-spacing.module';
import { AttachFiles } from './modules/attach-files.module';
import { CounterModule } from './modules/counter.module';
import { FileBlot } from './modules/attach-files.blot';

const quillConfig: QuillConfig = {
  placeholder: 'Message',
  theme: 'snow',
  customModules: [{
    implementation: VerticalSpacing,
    path: 'modules/verticalSpacing'
  }, {
    implementation: AttachFiles,
    path: 'modules/attachFiles'
  }, {
    implementation: CounterModule,
    path: 'modules/counterModule'
  }, {
    implementation: FileBlot,
    path: 'blots/file'
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
