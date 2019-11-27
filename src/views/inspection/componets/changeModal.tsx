import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Modal, Form, Select, Input, Button, Checkbox } from 'ant-design-vue';
@Component({
  name: 'ChangeModal',
  components: {
    'a-Form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button,
    'a-modal': Modal,
    'a-select': Select,
    'a-select-option': Select.Option,
  },
  props: {
    Form,
  },
})
class ChangeModal extends Vue {
  @Prop() visible!: boolean;

  @Prop() title?: string;

  @Prop() width?: string;

  @Prop() data?: any;

  @Prop() handleOk?: () => {};

  @Prop() handkeCancel?: () => {};

  @Prop() changeDetail?: () => {};

  @Prop() handleSeleceMap?: () => {};

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <a-modal
        visible={this.$props.visible}
        onOk={this.$props.handleOk}
        onCancel={this.$props.handkeCancel}
        width={this.$props.width}
      >
        <div Style={{ padding: '15px' }}>
          <a-Form>
            <a-form-item props={{ ...this.formItemLayout }} label="路线名称">
              {getFieldDecorator('name', {
                initialValue: this.$props.data.name ? this.$props.data.name : '',
                rules: [{ required: true, message: '请输入路线名称' }],
              })(<a-input placeholder="请输入路线名称"></a-input>)}
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label="巡检方式">
              {getFieldDecorator('xuanjianfangshi', {
                initialValue: this.$props.data.xuanjianfangshi
                  ? this.$props.data.xuanjianfangshi
                  : undefined,
                rules: [{ required: true, message: '请选择巡检方式' }],
              })(
                <a-select placeholder="请选择巡检方式">
                  <a-select-option value="车巡">车巡</a-select-option>
                  <a-select-option value="步巡">步巡</a-select-option>
                </a-select>,
              )}
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label="区域">
              {getFieldDecorator('area', {
                initialValue: this.$props.data.area ? this.$props.data.area : undefined,
                rules: [{ required: true, message: '请选择区域' }],
              })(
                <a-select placeholder="请选择区域">
                  <a-select-option value="jack">区域一</a-select-option>
                  <a-select-option value="lucy">区域二</a-select-option>
                  <a-select-option value="Yiminghe">区域三</a-select-option>
                  <a-select-option value="Yiminghe">区域四</a-select-option>
                  <a-select-option value="Yiminghe">区域五</a-select-option>
                  <a-select-option value="Yiminghe">区域六</a-select-option>
                </a-select>,
              )}
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label="设施">
              <a-button onClick={this.$props.changeDetail.bind(null, 'sheshi')}>选择设施</a-button>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label="设备">
              <a-button onClick={this.$props.changeDetail.bind(null, 'shebei')}>选择设备</a-button>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label="管道">
              <a-button onClick={this.$props.changeDetail.bind(null, 'guandao')}>选择管道</a-button>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label="签到点">
              <a-button onClick={this.$props.handleSeleceMap}>选择签到点</a-button>
            </a-form-item>
          </a-Form>
        </div>
      </a-modal>
    );
  }
}

export default Form.create({
  props: {
    visible: Boolean,
    title: String,
    width: String,
    data: Object,
    handleOk: Function,
    handkeCancel: Function,
    changeDetail: Function,
    handleSeleceMap: Function,
  },
})(ChangeModal);
