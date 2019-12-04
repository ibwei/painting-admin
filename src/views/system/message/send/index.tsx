import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Form, Button, Input, Select, Radio, Row, Col } from 'ant-design-vue';
import Editor from './components/fwb';

import './index.less';
@Component({
  name: 'send',
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
    'a-textarea': Input.TextArea,
    'a-editor': Editor,
    'a-row': Row,
    'a-col': Col,
  },
  props: {
    Form,
  },
})
class Send extends Vue {
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
        <a-card style='width: 80%' title='编辑通知内容' bordered={false}>
          <a-form>
            <a-form-item props={{ ...this.formItemLayout }} label='通知标题'>
              {getFieldDecorator('num', {
                rules: [{ required: true, message: '请输入通知标题' }],
              })(<a-input placeholder='请输入通知标题'></a-input>)}
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='接收人'>
              <a-input-group compact>
                {getFieldDecorator('shuihao', {
                  rules: [{ required: true, message: '请输入接收人' }],
                })(<a-input placeholder='请输入接收人'></a-input>)}
              </a-input-group>
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='通知方式'>
              {getFieldDecorator('val', {
                rules: [{ required: true, message: '请选择通知方式' }],
              })(
                <a-select placeholder='请选择通知方式'>
                  <a-select-option value='a'>站内</a-select-option>
                  <a-select-option value='b'>短信</a-select-option>
                  <a-select-option value='c'>公众号</a-select-option>
                  <a-select-option value='d'>邮箱</a-select-option>
                </a-select>,
              )}
            </a-form-item>
            <a-form-item props={{ ...this.formItemLayout }} label='通知类别'>
              {getFieldDecorator('val1', {
                rules: [{ required: true, message: '请选择通知类别' }],
              })(
                <a-select placeholder='请选择通知类别'>
                  <a-select-option value='a'>临时通知</a-select-option>
                  <a-select-option value='b'>异常巡检通知</a-select-option>
                </a-select>,
              )}
            </a-form-item>
            <a-row>
              <a-col span={4} class='content'>
                通知内容:
              </a-col>
              <a-col span={14}>
                <a-editor />
              </a-col>
            </a-row>
            <a-form-item
              wrapperCol={{ span: 22 }}
              style={{ textAlign: 'center', marginTop: '30px' }}
            >
              <a-button type='primary' html-type='submit' style={{ marginRight: '30px' }}>
                提交
              </a-button>
              <a-button>重置</a-button>
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
})(Send);
