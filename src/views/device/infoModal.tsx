import { Vue, Component, Prop } from 'vue-property-decorator';
import { Modal, Form, Input, Radio, DatePicker, InputNumber, Cascader } from 'ant-design-vue';

@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
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
          window.api.areaBaseInfoUpdate({ id: this.data.id, ...values }).then((res: any) => {
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
          window.api.areaBaseInfoAdd(values).then((res: any) => {
            console.log(res);
            const {
              err_code,
              result: { resultMessage },
            } = res.data;
            console.log(err_code);
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
          <a-form-item {...{ props: this.formItemLayout }} label="区域名称">
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [{ required: true, message: '请输入区域名' }],
            })(<a-input placeholder="请输入区域名"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="创建人">
            {getFieldDecorator('createName', {
              initialValue: this.data.createName,
              rules: [{ required: true, message: '请输入创建人名称' }],
            })(<a-input placeholder="请输入创建人名称"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="类型">
            {getFieldDecorator('type', {
              initialValue: this.data.type,
              rules: [{ required: true, message: '请选择类型' }],
            })(<a-input placeholder="请选择类型"></a-input>)}
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
