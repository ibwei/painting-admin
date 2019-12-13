import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Button,
} from 'ant-design-vue';

import { getCurrentDate } from '../../utils/index';

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
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  submit() {
    console.log('haha');
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          if (this.data.status === 1) {
            this.cancel();
            return false;
          }
          window.api.feedbackUpdate({ id: this.data.id, status: 1, updated_at: getCurrentDate(), ...values }).then((res: any) => {
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
          window.api.feedbackAdd(values).then((res: any) => {
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

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <a-modal
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          {this.data.status === 0 ? (<a-form-item {...{ props: this.formItemLayout }} label="处理结果">
            {getFieldDecorator('result', {
              initialValue: this.data.result,
              rules: [{ required: true, message: '请输入处理结果' }],
            })(<a-textarea placeholder='请输入处理结果,如:已经联系反馈用户。' rows={5}></a-textarea>)}
          </a-form-item>) : (
              <div><a-form-item {...{ props: this.formItemLayout }} label="处理结果">
                <div>{this.data.result}</div>
              </a-form-item>
                <a-form-item {...{ props: this.formItemLayout }} label="处理时间">
                  <div>{this.data.updated_at}</div>
                </a-form-item>
              </div>)
          }
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
