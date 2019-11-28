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
import MapModal from './components/mapModal';

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
    'map-modal': MapModal,
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

  @Prop() changeDetail?: any;

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

  showMap(type: string) {
    this.$emit('showEditMap', type);
  }

  render() {
    const { getFieldDecorator } = this.Form;
    console.log(this.type);
    console.log(this);
    const formItem = () => (
      <div style={{ display: this.type === 'edit' ? 'block' : 'none' }}>
        <a-form-item {...{ props: this.formItemLayout }} label="关联管道">
          <a-button onClick={this.$props.changeDetail.bind(this, 'guandao')}>选择管道</a-button>
        </a-form-item>
        <a-form-item {...{ props: this.formItemLayout }} label="关联设施">
          <a-button onClick={this.$props.changeDetail.bind(this, 'sheshi')}>选择设施</a-button>
        </a-form-item>
        <a-form-item {...{ props: this.formItemLayout }} label="关联设备">
          <a-button onClick={this.$props.changeDetail.bind(this, 'shebei')}>选择设备</a-button>
        </a-form-item>
      </div>
    );
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
          <a-form-item {...{ props: this.formItemLayout }} label="区域范围">
            {getFieldDecorator('type', {
              initialValue: this.data.type,
              rules: [{ required: true, message: '请选择类型' }],
            })(<a-button onClick={this.showMap.bind(null, 'edit')}>选取区域范围</a-button>)}
          </a-form-item>
          {formItem()}
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
    changeDetail: Function,
  },
})(InfoModal);
