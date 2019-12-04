import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Form, Button, Input, Select, Radio } from 'ant-design-vue';
import './index.less';
@Component({
  name: 'patrol',
  components: {
    'a-tag': Tag,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-card': Card,
    'a-button': Button,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-input-group': Input.Group,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
  },
  props: {
    Form,
  },
})
class Patrol extends Vue {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  data: any = {};

  handleSubmit() {}

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div class='bill'>
        <a-card style='width: 80%' title='发票信息' bordered={false}>
          <a-form>
            <a-form-item props={{ ...this.formItemLayout }} label='公司名称'>
              <a-input-group compact>
                {getFieldDecorator('num', {
                  initialValue: this.data.num ? this.data.num : undefined,
                  rules: [{ required: true, message: '请输入公司名称' }],
                })(<a-input placeholder='请输入公司名称'></a-input>)}
              </a-input-group>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='公司税号'>
              <a-input-group compact>
                {getFieldDecorator('shuihao', {
                  initialValue: this.data.header ? this.data.header : undefined,
                  rules: [{ required: true, message: '请输入公司税号' }],
                })(<a-input placeholder='请输入公司税号'></a-input>)}
              </a-input-group>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='公司地址'>
              <a-input-group compact>
                {getFieldDecorator('dizhi', {
                  initialValue: this.data.header ? this.data.header : undefined,
                  rules: [{ required: true, message: '请输入公司地址' }],
                })(<a-input placeholder='请输入公司地址'></a-input>)}
              </a-input-group>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='公司电话'>
              <a-input-group compact>
                {getFieldDecorator('phone', {
                  initialValue: this.data.header ? this.data.header : undefined,
                  rules: [{ required: true, message: '请输入公司电话' }],
                })(
                  <a-input
                    addonBefore={getFieldDecorator('prefix', {
                      initialValue: '86',
                    })(
                      <a-select style={{ width: 70 }}>
                        <a-select-option value='86'>+86</a-select-option>
                        <a-select-option value='87'>+87</a-select-option>
                      </a-select>,
                    )}
                    placeholder='请输入公司电话'
                  ></a-input>,
                )}
              </a-input-group>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='开户银行'>
              <a-input-group compact>
                {getFieldDecorator('yinh', {
                  initialValue: this.data.header ? this.data.header : undefined,
                  rules: [{ required: true, message: '请输入开户银行' }],
                })(<a-input placeholder='请输入开户银行'></a-input>)}
              </a-input-group>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='开户账号'>
              <a-input-group compact>
                {getFieldDecorator('zhanh', {
                  initialValue: this.data.header ? this.data.header : undefined,
                  rules: [{ required: true, message: '请输入开户账号' }],
                })(<a-input placeholder='请输入开户账号'></a-input>)}
              </a-input-group>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='发票类型'>
              <a-input-group compact>
                {getFieldDecorator('val', {
                  initialValue: 'a',
                  rules: [{ required: true, message: '请选择发票类型' }],
                })(
                  <a-radio-group buttonStyle='solid'>
                    <a-radio-button value='a'>增值税普通发票</a-radio-button>
                    <a-radio-button value='b'>增值税专用发票</a-radio-button>
                    <a-radio-button value='c'>税务机打服务发票</a-radio-button>
                  </a-radio-group>,
                )}
              </a-input-group>
            </a-form-item>
            <a-form-item
              wrapperCol={{ span: 18 }}
              style={{ textAlign: 'right', marginTop: '30px' }}
            >
              <a-button type='primary' html-type='submit'>
                提交
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
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
  },
})(Patrol);
