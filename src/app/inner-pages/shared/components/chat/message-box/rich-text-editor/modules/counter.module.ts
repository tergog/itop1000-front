export interface ICounterModuleConfig {
  maxLength: number;
  container: string;
}

export interface IQuillInstance {
  on(name: string, handler: Function);
  getLength(): number;
  deleteText(index: number, length: number): any;
}

class CounterModule {
  private options: ICounterModuleConfig;
  private $container: HTMLElement;

  constructor(quill: IQuillInstance, options: ICounterModuleConfig) {
    this.options = options;
    this.$container = document.querySelector(options.container);

    quill.on('editor-change', () => {
      if (quill.getLength() >= options.maxLength) {
        quill.deleteText(options.maxLength, quill.getLength());
      }
      this.updateCounter(quill.getLength());
    });

    this.updateCounter(quill.getLength());
  }

  updateCounter(value: number): void {
    this.$container.innerText = `${value - 1}/${this.options.maxLength}`;
  }
}

export { CounterModule };
