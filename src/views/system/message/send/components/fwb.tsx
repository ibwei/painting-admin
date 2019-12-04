import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { quillEditor } from 'vue-quill-editor';

// 富文本框样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './index.less';

@Component({
  name: 'message',
  components: {
    'a-tag': Tag,
    'quill-editor': quillEditor,
  },
})
export default class Message extends Vue {
  content: string = '';

  editorOption: any = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['image'],
      ],
    },
    placeholder: '请输入通知内容',
  };

  onEditorBlur = (e: any) => {};

  onEditorFocus = (e: any) => {};

  onEditorReady = (e: any) => {};

  render() {
    return (
      <div class='bjqq'>
        <quill-editor
          v-model={this.content}
          ref='myQuillEditor'
          options={this.editorOption}
          on-blur={this.onEditorBlur.bind(this)}
          on-focus={this.onEditorFocus.bind(this)}
          on-ready={this.onEditorReady.bind(this)}
          placeholder
        ></quill-editor>
      </div>
    );
  }
}
