import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal, Form, Select } from 'ant-design-vue';

@Component({
  name: 'patrol',
  components: {
    'a-tag': Tag,
    'a-form': Form,
    'a-card': Card,
    'a-form-item': Form.Item,
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
      sm: { span: 18 },
    },
  };

  handleSubmit() {}

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <a-card style='width: 80%'>
        <a-form form='form' submit={this.handleSubmit}>
          <a-form-item props={{ ...this.formItemLayout }} label='角色名称'>
            {getFieldDecorator('name', {
              initialValue: this.$props.data.name ? this.$props.data.name : undefined,
              rules: [{ required: true, message: '请输入角色名称' }],
            })(<a-input placeholder='请输入角色名称' />)}
          </a-form-item>
          <a-form-item wrapper-col={{ span: 12, offset: 5 }}>
            <a-button type='primary' html-type='submit'>
              Submit
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
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
