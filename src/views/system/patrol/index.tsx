import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Form, Button, Input, Select } from 'ant-design-vue';
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
      <div class='portal'>
        <a-card style='width: 80%' title='巡检自动签到距离设定' bordered={false}>
          <a-form>
            <a-form-item props={{ ...this.formItemLayout }} label='距离设置'>
              <a-input-group compact>
                {getFieldDecorator('num', {
                  initialValue: this.data.num ? this.data.num : undefined,
                  rules: [{ required: true, message: '请输入距离' }],
                })(<a-input style='width:70%;textAlign:left' placeholder='请输入距离'></a-input>)}
                {getFieldDecorator('num2', {
                  initialValue: this.data.num2 ? this.data.num2 : undefined,
                  rules: [{ required: true, message: '请选择距离单位' }],
                })(
                  <a-select style='width:30%' placeholder='请选择距离单位'>
                    <a-select-option value='1'>米</a-select-option>
                    <a-select-option value='2'>千米</a-select-option>
                    <a-select-option value='3'>公里</a-select-option>
                  </a-select>,
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
          <p>
            * 在这里设置完巡检的自动签到距离后，所有人的签到距离都是这个数值，设定之后请勿随意更改！
          </p>
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
