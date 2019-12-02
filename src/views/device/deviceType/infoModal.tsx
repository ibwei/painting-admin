/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import {
  Modal, Form, Input, Radio, DatePicker, InputNumber, Cascader, Select
} from 'ant-design-vue';
import './index.less';
import ImageForm from '../../../components/Form/imageForm';



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
    'image-form': ImageForm,
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
      xs: { span: 18 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 6 },
      sm: { span: 18 },
    },
  }

  propertyArray: Array<string> = ['供配电设备', '照明设备', '动力设备', '弱电设备', '空调与通风设备', '运输设备'];

  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api.deviceTypeBaseInfoUpdate({ id: this.data.id, ...values }).then((res: any) => {
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
          window.api.deviceTypeBaseInfoAdd(values).then((res: any) => {
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
  render() {
    const { getFieldDecorator } = this.Form;
    const selectType = this.propertyArray.map((item, index) =>
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>
    );
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
            label="类型名"
          >
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [
                { required: true, message: '请输入类型名称' },
              ],
            })(
              <a-input placeholder="请输入类型名称"></a-input>
            )}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="基础属性1">
            {getFieldDecorator('basicProperty1', {
              initialValue: this.data.basicProperty1,
              rules: [{ required: true, message: '请输入基础属性1' }],
            })(<a-input placeholder="请输入基础属性1"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="基础属性2">
            {getFieldDecorator('basicProperty2', {
              initialValue: this.data.basicProperty1,
              rules: [{ required: true, message: '请输入基础属性2' }],
            })(<a-input placeholder="请输入基础属性2"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="自定义属性1">
            {getFieldDecorator('basicProperty1', {
              initialValue: this.data.ownProperty1,
              rules: [{ required: true, message: '请输入自定义属性1' }],
            })(<a-input placeholder="请输入自定义属性1"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="自定义属性2">
            {getFieldDecorator('ownProperty2', {
              initialValue: this.data.basicProperty1,
              rules: [{ required: true, message: '请输入自定义属性2' }],
            })(<a-input placeholder="请输入自定义属性2"></a-input>)}
          </a-form-item>
          <image-form />
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
