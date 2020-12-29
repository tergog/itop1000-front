const MAX_SIZE = 5e6; // 5 MB

const ALLOW_TYPES = [
  'text/plain', // .txt
  'application/x-7z-compressed', // .7z
  'application/x-rar-compressed', // .rar
  'application/zip', // .zip, .zipx
  'application/x-gtar', // .tar.gz, .tgz, .tar.Z, .tar.bz2, .tbz2, .tar.lz, .tlz. .tar.xz, .txz
  'application/pdf' // .pdf
].join(', ');

export interface IAttachFilesConfig {
  button: string;
  errorEmmiter: any;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface IQuillModel {
  getSelection(focus: boolean): { index: number, length: number };
  setSelection(index: number): void;
  insertEmbed(index: number, embed: string, value: any): any;
  getContents(): any;
  getLength(): number;
  hasFocus(): boolean;
  focus(): void;
  blur(): void;
}

class AttachFiles {
  private quill: IQuillModel;
  private options: IAttachFilesConfig;
  private $button: HTMLButtonElement;
  private $inputFile: HTMLInputElement;

  constructor(quill: IQuillModel, options: IAttachFilesConfig) {
    this.quill = quill;
    this.options = options;
    this.$button = document.querySelector(this.options.button);

    this.$inputFile = document.createElement('input');
    this.$inputFile.setAttribute('type', 'file');
    this.$inputFile.setAttribute('accept', ALLOW_TYPES);
    this.$inputFile.onchange = (e: HTMLInputEvent) => this.inputFileHandler(e);

    this.$button.onclick = () => this.$inputFile.click();
  }

  inputFileHandler(event: HTMLInputEvent): void {
    const files = event.target.files;
    if (this.validateAttaching(files)) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.quill.insertEmbed(this.quill.getSelection(true).index, 'file', {
          template: `Attached file: ${files[0].name} - ${this.formatFileSize(files[0].size)}`,
          data: readerEvent.target.result
        });
        this.quill.setSelection(this.quill.getLength() + 1);
      };
      reader.readAsDataURL(files[0]);
    }
  }

  validateAttaching(files: FileList): boolean {
    const that = this;
    const validators = [{
      validator: (f: FileList) => f === null,
      message: 'Files not found!'
    }, {
      validator: (f: FileList) => f.length != 1 || that.isFileAlreadyAttached(),
      message: 'Only one file allowed attaching!'
    }, {
      validator: (f: FileList) => !ALLOW_TYPES.includes(f[0].type),
      message: 'Allowed only archives, .txt and .pdf!'
    }, {
      validator: (f: FileList) => f[0].size <= 0 || f[0].size > MAX_SIZE,
      message: 'File size must be greater than 0mb and less than 5mb!'
    }];

    for (let v of validators) {
      if (v.validator(files)) {
        this.options.errorEmmiter.emit({
          type: 'error',
          message: v.message
        });

        // Blur and focus to update for notification message
        this.quill.blur();
        this.quill.focus();
        return false;
      }
    }

    return true;
  }

  isFileAlreadyAttached(): boolean {
    const contents = this.quill.getContents().ops;
    if (contents.length > 0) {
      for (let item of contents) {
        if (typeof item.insert.file !== 'undefined') {
          return true;
        }
      }
    }
    return false;
  }

  formatFileSize(size: number): string {
    if (size === 0) { return '0 B'; }

    const SUFFIX = [ 'B', 'KB', 'MB', 'GB', 'TB' ];
    let i = Math.floor(Math.log(size) / Math.log(1000));
    return `${size / Math.pow(1000, i)} ${SUFFIX[i]}`;
  }
}

export { AttachFiles };
