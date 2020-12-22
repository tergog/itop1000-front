import 'quill'

const MIN_SPACING = 0;
const MAX_SPACING = 10; // When you are changing this value don't remember change in styles too.
const DEFAULT_STEP = 1;

export interface IVerticalSpacingConfig {
  root: string;
  btnInc: string;
  btnDec: string;
  input: string;
  spacing: number;
}

class VerticalSpacing {
  private options: IVerticalSpacingConfig;
  private $root: HTMLElement;
  private $input: HTMLInputElement;
  private $btnInc: HTMLButtonElement;
  private $btnDec: HTMLButtonElement;

  constructor(_: any, options: IVerticalSpacingConfig) {
    this.options = options;
    this.$root = document.querySelector(this.options.root);
    this.$input = document.querySelector(this.options.input);
    this.$btnInc = document.querySelector(this.options.btnInc);
    this.$btnDec = document.querySelector(this.options.btnDec);

    this.$btnInc.onclick = () => this.changeSpacingBy(DEFAULT_STEP);
    this.$btnDec.onclick = () => this.changeSpacingBy(-DEFAULT_STEP);
    
    this.$input.onblur = () => {
      this.setSpacing(
        this.$input.value ?
          parseInt(this.$input.value, 10) :
          this.options.spacing
      );
    };

    this.init();
  }

  setSpacing(value: number): void {
    if (value < MIN_SPACING) { this.options.spacing = MIN_SPACING; }
    else if (value > MAX_SPACING) { this.options.spacing = MAX_SPACING; }
    else { this.options.spacing = value; };
  
    this.updateEditor();
  }

  changeSpacingBy(by: number): void {
    this.setSpacing(this.options.spacing + by);
  }

  init(): void {
    this.$input.value = `${this.options.spacing} px`;
    this.$root.className += ` inner-spacing-${this.options.spacing}`;
  }

  updateEditor(init: boolean = false): void {
    this.$input.value = `${this.options.spacing} px`;

    this.$root.className = this.$root.className.replace(
      /(?:^|\s)(inner-spacing-)\d+(?!\S)/g,
      ` $1${this.options.spacing}`
    );
  }
}

export { VerticalSpacing };