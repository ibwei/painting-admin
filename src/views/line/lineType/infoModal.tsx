/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import {
  Modal, Form, Input, Radio, DatePicker, InputNumber, Cascader, Select, Upload, Icon
} from 'ant-design-vue';

import './index.less';



@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-date-picker': DatePicker,
    'a-cascader': Cascader,
    'a-upload': Upload,
    'a-icon': Icon,
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

  @Watch('visible')

  protected valueWatch(newV: any, oldV: any) {
    if (newV === true) {

    }
  }


  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  }


  propertyArray: Array<string> = ['供配电设施', '照明设施', '动力设施', '弱电设施', '空调与通风设施', '运输设施'];


  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api.lineTypeBaseInfoUpdate({ id: this.data.id, ...values }).then((res: any) => {
            const { result: { resultCode, resultMessage } } = res.data;
            if (!resultCode) {
              this.$message.success(resultMessage);
              this.Form.resetFields();
              this.$emit('success');
            } else {
              this.$message.error(resultMessage);
            }
          });
        } else if (this.type === 'add') {
          window.api.lineTypeBaseInfoAdd({ ...values }).then((res: any) => {
            const { err_code, result: { resultMessage } } = res.data;
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
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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
    }

    return (
      <a-modal
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          <a-form-item
            {...{ props: this.formItemLayout }}
            label="设施类型名称"
          >
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [
                { required: true, message: '请输入设施类型名称' },
              ],
            })(
              <a-input placeholder="请输入设施类型名称"></a-input>
            )}
          </a-form-item>


          <a-form-item
            {...{ props: this.formItemLayout }}
            label="自定义属性1"
          >
            {getFieldDecorator('property1', {
              initialValue: this.data.property1,
              rules: [
                { required: false, message: '请输入属性1' },
              ],
            })(
              <a-input placeholder="请输入属性1"></a-input>
            )}
          </a-form-item>
          <a-form-item
            {...{ props: this.formItemLayout }}
            label="自定义属性2"
          >
            {getFieldDecorator('property2', {
              initialValue: this.data.property2,
              rules: [
                { required: false, message: '请输入属性2' },
              ],
            })(
              <a-input placeholder="请输入属性2"></a-input>
            )}
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
