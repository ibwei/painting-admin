import { Component, Vue, Prop } from 'vue-property-decorator';
import { Modal, Form, Icon, Input, Button, Checkbox } from 'ant-design-vue';
@Component({
  name: 'ChangeModal',
  components: {
    'a-Form': Form,
    'a-Input': Input,
    'a-Button': Button,
    'a-modal': Modal,
  },
})
export default class ChangeModal extends Vue {
  @Prop() visible?: boolean;

  render() {
    return (
      <a-modal visible={this.$props.visible}>
        <a-Form>
          <a-form-item>
            <a-Input v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
          </a-form-item>
        </a-Form>
      </a-modal>
    );
  }
}
