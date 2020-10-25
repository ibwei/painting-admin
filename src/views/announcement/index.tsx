/* eslint-disabled */
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Tag, Modal, Button, Table, Avatar, Rate} from 'ant-design-vue';
import {quillEditor} from 'vue-quill-editor';
// 富文本框样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './index.less';

@Component({
  name: 'comment',
  components: {
    'a-tag': Tag,
    'a-modal': Modal,
    'a-button': Button,
    'a-table': Table,
    'a-avatar': Avatar,
    'a-rate': Rate,
    quillEditor,
  },
})
export default class Comment extends Vue {
  editorOption: any = {};

  onEditorBlur = (e: any) => {};

  onEditorFocus = (e: any) => {};

  onEditorReady = (e: any) => {};

  //富文本编辑器的内容
  contentHTML: string = '';

  content: string = '';

  data: any = null;
  isEdit: boolean = false;

  changeMode() {
    this.isEdit = !this.isEdit;
    if (!this.isEdit) {
      window.location.reload();
    }
  }

  edit() {
    window.api
      .updateAnnouncement({id: this.data[0].id, content: this.contentHTML})
      .then((res: any) => {
        const resultCode = res.data.resultCode;
        if (resultCode === 0) {
          this.$message.success('更新成功');
          this.contentHTML = res.data.data[0].content;
          this.changeMode();
        } else {
          this.$message.error('更新失败');
        }
      });
  }

  created() {
    this.$nextTick(() => {
      window.api.getAnnouncement({}).then(res => {
        this.data = res.data.data;
        this.contentHTML = this.data[0].content;
        if (!this.isEdit) {
          const dom = document.getElementById('display') as HTMLElement;
          dom.innerHTML = this.contentHTML;
        }
      });
    });
  }

  render() {
    return (
      <div class='announcement'>
        <h1 class='title'>招生简介编辑</h1>
        {this.isEdit ? (
          <quill-editor
            v-model={this.contentHTML}
            ref='myQuillEditor'
            class='editor'
            options={this.editorOption}
            on-blur={this.onEditorBlur.bind(this)}
            on-focus={this.onEditorFocus.bind(this)}
            on-ready={this.onEditorReady.bind(this)}
          ></quill-editor>
        ) : (
          <div id='display'></div>
        )}
        <div class='button-group'>
          <a-button type='primary' onClick={this.changeMode}>
            {this.isEdit ? '取消' : '编辑'}
          </a-button>
          <a-button onClick={this.edit}>确定</a-button>
        </div>
      </div>
    );
  }
}
