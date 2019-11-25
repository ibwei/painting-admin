/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { loadBmap } from '@/utils/index';
import {
  Modal, Form, Input, Radio, DatePicker, InputNumber, Cascader, Select
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


  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
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
          <a-form-item
            {...{ props: this.formItemLayout }}
            label="属性"
          >
            {getFieldDecorator('property', {
              initialValue: this.data.property,
              rules: [
                { required: true, message: '请输入属性' },
              ],
            })(
              <a-input placeholder="请输入属性"></a-input>
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
