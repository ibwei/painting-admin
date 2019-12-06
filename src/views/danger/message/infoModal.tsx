/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Select,
  Upload,
  Icon,
  Button,
  Tag,
  Card,
} from 'ant-design-vue';

import { quillEditor } from 'vue-quill-editor';


import './index.less';

// 富文本框样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-button': Button,
    'a-select-option': Select.Option,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-date-picker': DatePicker,
    'a-cascader': Cascader,
    'a-upload': Upload,
    'a-icon': Icon,
    'a-tag': Tag,
    'a-card': Card,
    'quill-editor': quillEditor,
  },
  props: {
    Form,
  },
})
class InfoModal extends Vue {
  @Prop() title!: string;

  @Prop() visible!: boolean;

  @Prop() type!: string;

  @Prop() data!: any;

  @Prop() openType!: string;

  content: string = '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>';

  contentHTML: string = '<div><div>水表已经修复<div><img<div><img src="http://img0.imgtn.bdimg.com/it/u=2600953318,1041728492&fm=26&gp=0.jpg" width="200px" height="200px" alt=""/>';


  editorOption: any = {};


  created() {
    if (this.openType === 'read') {
      this.$nextTick(() => {
        let editor: any = document.getElementById('handleResult');
        editor.innerHTML = this.contentHTML;
      })
    }
  }

  onEditorBlur = (e: any) => {

  };

  onEditorFocus = (e: any) => {

  };

  onEditorReady = (e: any) => {

  };


  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };


  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api
            .facilitiesBaseInfoUpdate({
              id: this.data.id,
              ...values,
            })
            .then((res: any) => {
              const {
                result: { resultCode, resultMessage },
              } = res.data;
              if (!resultCode) {
                this.$message.success(resultMessage);
                this.Form.resetFields();
                this.$emit('success');
              } else {
                this.$message.error(resultMessage);
              }
            });
        } else if (this.type === 'add') {
          window.api
            .facilitiesBaseInfoAdd({ ...values })
            .then((res: any) => {
              const {
                err_code,
                result: { resultMessage },
              } = res.data;
              if (!err_code) {
                this.$message.success(resultMessage);
                this.Form.resetFields();
                this.$emit('success');
              } else {
                this.$message.error(resultMessage);
              }
            });
        }
      }
    });
  }

  cancel() {
    this.$emit('close');
  }

  previewVisible: boolean = true;
  previewImage: string = '';
  fileList: any = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://i0.sinaimg.cn/dy/c/sd/2012-04-01/U7815P1T1D24212000F21DT20120401172319.jpg',
    },
  ];

  hideThumbnail() {
    this.previewVisible = false;
  }

  handlePreview(file: any) {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  // @ts-ignore
  handleChange({ fileList }) {
    this.fileList = fileList;
  }

  render() {
    const { getFieldDecorator } = this.Form;


    const plus = () => {
      return (
        <div>
          <a-icon type="picture" />
          <div class="ant-upload-text">上传图片</div>
        </div>
      );
    };

    console.log(this.data);
    return (
      <a-modal
        width={"720px"}
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >

        <a-form>
          {this.openType === 'edit' ? (<div>
            <a-form-item {...{ props: this.formItemLayout }} label="隐患名称">
              <div>{this.data.name}</div>
            </a-form-item>
            <a-form-item {...{ props: this.formItemLayout }} label="隐患详情">
              <div>{this.data.detail}</div>
            </a-form-item>
            <a-form-item {...{ props: this.formItemLayout }} label="隐患图片">
              <div>
                <img src="http://img0.imgtn.bdimg.com/it/u=1808649893,1561867321&fm=26&gp=0.jpg" width="200px" height="200px" alt="" />
              </div>
            </a-form-item>
            <a-form-item {...{ props: this.formItemLayout }} label="处理详情">
              <div>
                <quill-editor
                  v-model={this.content}
                  ref='myQuillEditor'
                  options={this.editorOption}
                  on-blur={this.onEditorBlur.bind(this)}
                  on-focus={this.onEditorFocus.bind(this)}
                  on-ready={this.onEditorReady.bind(this)}
                ></quill-editor>
              </div>
            </a-form-item>

          </div>) : (
              <div>
                <a-form-item {...{ props: this.formItemLayout }} label="隐患名称">
                  <div>{this.data.name}</div>
                </a-form-item>
                <a-form-item {...{ props: this.formItemLayout }} label="隐患详情">
                  <div>{this.data.detail}</div>
                </a-form-item>
                <a-form-item {...{ props: this.formItemLayout }} label="隐患图片">
                  <div>
                    <img src="http://img0.imgtn.bdimg.com/it/u=1808649893,1561867321&fm=26&gp=0.jpg" width="200px" height="200px" alt="" />
                  </div>
                </a-form-item>
                <a-form-item {...{ props: this.formItemLayout }} label="处理详情">
                  <div id="handleResult"></div>
                </a-form-item>
                <a-form-item {...{ props: this.formItemLayout }} label="审核状态">
                  {(this.data.status === 2 && this.data.checkStatus === 1) ? (<a-tag color={'green'}>已通过</a-tag>) : ''}
                  {(this.data.status === 2 && this.data.checkStatus === 0)
                    ? (<div><a-tag color={'red'}>未通过审核</a-tag><br />原因：{this.data.rejectReason}</div>) : ''}
                  {this.data.status === 1 ? (<a-tag color={'gray'}>审核中</a-tag>) : ''}
                </a-form-item>
              </div>
            )}
        </a-form>
      </a-modal>
    );
  }
}

export default Form.create({
  props: {
    title: String,
    visible: Boolean,
    type: String,
    data: Object,
    openType: String,
  },
})(InfoModal);
