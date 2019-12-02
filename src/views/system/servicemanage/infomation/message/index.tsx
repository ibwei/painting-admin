import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal } from 'ant-design-vue';
import { quillEditor } from 'vue-quill-editor';

// 富文本框样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

@Component({
  name: 'message',
  components: {
    'a-tag': Tag,
    'a-card': Card,
    'quill-editor': quillEditor,
  },
})
export default class Message extends Vue {
  content: string = '11111';

  editorOption: any = {};

  onEditorBlur = (e: any) => {
    console.log(e);
  };

  onEditorFocus = (e: any) => {
    console.log(e);
  };

  onEditorReady = (e: any) => {
    console.log(e);
  };

  render() {
    return (
      <a-card title='短信服务管理'>
        <quill-editor
          v-model={this.content}
          ref='myQuillEditor'
          options={this.editorOption}
          on-blur={this.onEditorBlur.bind(this)}
          on-focus={this.onEditorFocus.bind(this)}
          on-ready={this.onEditorReady.bind(this)}
        ></quill-editor>
      </a-card>
    );
  }
}
