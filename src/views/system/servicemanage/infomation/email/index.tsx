import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal } from 'ant-design-vue';
import { quillEditor } from 'vue-quill-editor';

// 富文本框样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './index.less';

@Component({
  name: 'email',
  components: {
    'a-tag': Tag,
    'a-card': Card,
    'quill-editor': quillEditor,
  },
})
export default class Email extends Vue {
  content: string =
    '<p>邮箱服务（Mailbox service）是测试测试测试测试测试</p><p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。</p><p><br></p><h2><strong>测试文本</strong></h2><h3><strong>测试文本</strong></h3><p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。</p><ul><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li></ul><h3><strong>测试文本</strong></h3><p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p><ul><li>安全可靠：测试测试测试测试测试测试测试测试测试测试测试测试测试。</li><li>大容量高并发：测试测试测试测试测试测试测试测试测试测试测试测试测试。</li></ul><h3><strong>测试文本</strong></h3><p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p><ul><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li></ul><h3><strong>测试文本</strong></h3><p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p><ul><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li></ul><h3><strong>测试文本</strong></h3><p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。</p><p><br></p><h3><strong>测试文本</strong></h3><ul><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li><li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li></ul><h3><strong>测试文本</strong></h3><p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。</p>';

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
      <a-card title='邮箱服务管理' class='bjq'>
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
