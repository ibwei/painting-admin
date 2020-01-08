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
  Row,
  Col,
} from 'ant-design-vue';

import './infoModal.less';
// @ts-ignore
import UploadImage from '@/components/UploadImage';

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
    'a-row': Row,
    'a-col': Col,
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

  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        window.api
          .galleryPicturesUpdate({
            ...values,
            id: this.data.id,
            url: this.url,
          })
          .then((res: any) => {
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
    });
  }

  cancel() {
    this.$emit('close');
  }

  created() {
    this.url = this.data.url;
  }

  resultChange(e: any) {
    this.data.result = e.target.value;
  }

  spinShow: boolean = false;

  url: string = '';

  changeImage(key: string) {
    this.url = key;
  }

  render() {
    const {getFieldDecorator} = this.Form;

    const imageList =
      this.url &&
      this.url
        .split(',')
        .map((item, index) => (
          <img src={item} key={index} width='100px' height='auto' style={{marginRight: '10px'}} />
        ));
    return (
      <a-modal
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        {this.spinShow ? (
          <div class='spin'>
            <a-spin tip='正在发送邮件,请稍后...'></a-spin>
          </div>
        ) : (
          ''
        )}
        <a-form>
          <a-form-item {...{props: this.formItemLayout}} label='初始化位置'>
            {getFieldDecorator('desc', {
              rules: [{required: true, message: '请输入标题'}],
              initialValue: this.data.desc,
            })(<a-input placeholder='请输入标题'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='图片名称'>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入名称'}],
              initialValue: this.data.name,
            })(<a-input placeholder='请输入名称'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='图片名称'>
            <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-start'}}>
              {imageList}
              <upload-image pictureLength={1} on-uploaded={this.changeImage}></upload-image>
            </div>
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
