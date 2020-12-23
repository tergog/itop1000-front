import Quill from 'quill';

const SOURCE_ATTRIBUTE = 'data-source';

export interface IFileBlotCreationData {
  template: string;
  data: string;
};

let BlockEmbed = Quill.import('blots/block/embed');
class FileBlot extends BlockEmbed {
  static blotName = 'file';
  static className = 'ql-file-embedded';
  static tagName = 'DIV';

  static create(value: IFileBlotCreationData) {
    const node = super.create();
    node.innerHTML = value.template;
    node.setAttribute(SOURCE_ATTRIBUTE, value.data);
    return node;
  }

  static value(node: HTMLDivElement) {
    return node.getAttribute(SOURCE_ATTRIBUTE);
  }
}

export { FileBlot };