import {Vue, Component, Prop} from 'vue-property-decorator';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Button,
  Spin,
} from 'ant-design-vue';

import {quillEditor} from 'vue-quill-editor';
// @ts-ignore
import UploadImage from '@/components/UploadImage';

import './infoModal.less';

@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-date-picker': DatePicker,
    'a-cascader': Cascader,
    'a-textarea': Input.TextArea,
    'a-spin': Spin,
    UploadImage,
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

  editorOption: any = {};

  formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 4},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 20},
    },
  };

  created() {
    this.url = this.data.url;
  }

  spinShow: boolean = false;

  submit() {
    if (this.url === '') {
      this.$message.info('你还未选择任何图片!');
      return false;
    }

    if (this.data.result) {
      this.spinShow = true;
    }
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api
            .studentWorksUpdate({
              ...values,
              id: this.data.id,
              url: this.url,
              status: 1,
            })
            .then((res: any) => {
              this.spinShow = false;
              const {resultCode, resultMessage} = res.data;
              if (!resultCode) {
                this.$message.success(resultMessage);
                this.Form.resetFields();
                this.$emit('success');
              } else {
                this.$message.error(resultMessage);
              }
            });
        } else if (this.type === 'add') {
          window.api.studentWorksAdd({...values, url: this.url}).then((res: any) => {
            this.spinShow = false;
            const {resultCode, resultMessage} = res.data;
            if (!resultCode) {
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

  thumbnail: string = '';
  //图片上传完成
  url: string = '';
  uploaded(e: any) {
    this.url = e;
  }

  //富文本编辑器的内容
  contentHTML: string = '';

  onChange1(e: any) {
    this.data.status = e.target.value;
  }

  render() {
    const {getFieldDecorator} = this.Form;

    const options = [
      {label: '启用', value: 1},
      {label: '未启用', value: 0},
    ];
    return (
      <a-modal
        width={'650px'}
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          {this.type === 'edit' ? (
            <a-form-item {...{props: this.formItemLayout}} label='作品图片'>
              <img src={this.url} width='80%'></img>
            </a-form-item>
          ) : (
            ''
          )}
          <a-form-item
            {...{props: this.formItemLayout}}
            label={this.type === 'edit' ? '更换图片' : '上传图片'}
          >
            <div>
              <upload-image on-uploaded={this.uploaded}></upload-image>
            </div>
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='作品分类'>
            {getFieldDecorator('category', {
              initialValue: this.data.category,
            })(<a-input placeholder='请输入分类'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='学生姓名'>
            {getFieldDecorator('name', {
              initialValue: this.data.name,
            })(<a-input placeholder='请输入学生姓名'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='作品标签'>
            {getFieldDecorator('tags', {
              initialValue: this.data.tags,
            })(<a-input placeholder='多个标签以 - (横杠) 分开'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='排序权重'>
            {getFieldDecorator('order', {
              initialValue: this.data.order,
            })(<a-input placeholder='数值越大排序越靠前'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='作品描述'>
            {getFieldDecorator('desc', {
              initialValue: this.data.desc,
            })(<a-textarea rows={6} placeholder='请输入描述'></a-textarea>)}
          </a-form-item>
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
  },
})(InfoModal);
