import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {
  Modal,
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  Table,
  TreeSelect,
  Tree,
} from 'ant-design-vue';
import './index.less';

interface state {
  id?: number;
  name?: string;
  time?: number;
  fw?: string;
  num?: number;
  num2?: number;
}

@Component({
  name: 'open',
  components: {
    'a-Form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button,
    'a-modal': Modal,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker,
    'a-table': Table,
    'a-tree-select': TreeSelect,
    'a-tree-select-node': TreeSelect.TreeNode,
    'a-tree': Tree,
    'a-input-group': Input.Group,
  },
  props: {
    Form,
  },
})
class Open extends Vue {
  detailVis: boolean = false;

  dataSource: any = [];

  column: any = [];

  data: state = {};

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  handleChange(val: string) {
    this.data.fw = val;
  }
  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div Style={{ padding: '15px' }} class='openForm'>
        <h1>开通服务</h1>
        <a-Form class='form'>
          <a-form-item props={{ ...this.formItemLayout }} label='公司编号'>
            {getFieldDecorator('id', {
              initialValue: this.data.id ? this.data.id : undefined,
              rules: [{ required: true, message: '请输入公司编号' }],
            })(<a-input placeholder='请输入公司编号' />)}
          </a-form-item>
          <a-form-item props={{ ...this.formItemLayout }} label='公司名称'>
            {getFieldDecorator('name', {
              initialValue: this.data.name ? this.data.name : undefined,
              rules: [{ required: true, message: '请输入公司名称' }],
            })(<a-input placeholder='请输入公司名称' />)}
          </a-form-item>
          <a-form-item props={{ ...this.formItemLayout }} label='开通服务'>
            {getFieldDecorator('fw', {
              initialValue: this.data.fw ? this.data.fw : undefined,
              rules: [{ required: true, message: '请选择开通服务' }],
            })(
              <a-select placeholder='请选择开通服务' onChange={this.handleChange}>
                <a-select-option value='1'>短信服务</a-select-option>
                <a-select-option value='2'>微信公众号服务</a-select-option>
                <a-select-option value='3'>邮箱服务</a-select-option>
                <a-select-option value='4'>云巡检服务</a-select-option>
                <a-select-option value='5'>组态服务</a-select-option>
              </a-select>,
            )}
          </a-form-item>
          {this.data.fw !== '2' && this.data.fw !== '3' && (
            <a-form-item {...{ props: this.formItemLayout }} label='开通时间'>
              <a-input-group compact>
                {getFieldDecorator('num', {
                  initialValue: this.data.num ? this.data.num : undefined,
                  rules: [{ required: true, message: '请输入开通时间' }],
                })(
                  <a-input style='width:70%;textAlign:left' placeholder='请输入开通时间'></a-input>,
                )}
                {getFieldDecorator('num2', {
                  initialValue: this.data.num2 ? this.data.num2 : undefined,
                  rules: [{ required: true, message: '请选择周期单位' }],
                })(
                  this.data.fw !== '1' ? (
                    <a-select style='width:30%' placeholder='请选择周期单位'>
                      <a-select-option value='1'>天</a-select-option>
                      <a-select-option value='2'>周</a-select-option>
                      <a-select-option value='3'>月</a-select-option>
                      <a-select-option value='4'>季度</a-select-option>
                      <a-select-option value='5'>年</a-select-option>
                    </a-select>
                  ) : (
                    <a-select style='width:30%' placeholder='请选择周期单位'>
                      <a-select-option value='1'>条</a-select-option>
                    </a-select>
                  ),
                )}
              </a-input-group>
            </a-form-item>
          )}
          <a-form-item style={{ textAlign: 'center' }}>
            <a-button type='primary' htmlType='submit' class='btn'>
              提交
            </a-button>
            <a-button type='primary' htmlType='submit'>
              重置
            </a-button>
          </a-form-item>
        </a-Form>
      </div>
    );
  }
}

export default Form.create({
  props: {
    data: Object,
  },
})(Open);
