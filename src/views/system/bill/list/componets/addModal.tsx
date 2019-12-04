import { Component, Vue, Prop } from 'vue-property-decorator';
import { Modal, Form, Select, Input, Button, Tag, Radio } from 'ant-design-vue';

@Component({
  name: 'terminalManage',
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button,
    'a-modal': Modal,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-tag': Tag,
    'a-input-group': Input.Group,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
  },
  props: {
    Form,
  },
})
class TerminalManage extends Vue {
  @Prop() visible!: boolean;

  @Prop() title?: string;

  @Prop() width?: string;

  @Prop() data?: any;

  @Prop() handleOk?: () => {};

  @Prop() handkeCancel?: () => {};

  detailVis: boolean = false;

  dataSource: any = [];

  column: any = [];

  handleSelectDetail(data: string[], e?: any) {
    const tmp: any = [];
    const random = Math.floor(Math.random() * 10) + 1;
    const random2 = Math.floor(Math.random() * 10) + 1;
    this.dataSource = tmp;
    data.map((item: any, index: number) =>
      tmp.push({ name: item, type: `类型${index + random}`, area: `区域${index + random2}` }),
    );
    this.detailVis = true;
  }

  handleConfirm() {
    this.detailVis = false;
  }

  handleModalCancel() {
    this.detailVis = false;
  }

  handleDisplay(name: string) {
    if (name === 'xianlu') {
      this.column = [
        { title: '名称', dataIndex: 'name', width: '40%' },
        { title: '区域', dataIndex: 'area', width: '40%' },
      ];
    } else {
      this.column = [{ title: '姓名', dataIndex: 'name', width: '40%' }];
    }
    window.api.inspectRoad({ page: 1, size: 100 }).then(({ data }) => {
      this.handleSelectDetail(data.entity.data[0][name]);
    });
  }

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
      <div>
        <a-modal
          visible={this.$props.visible}
          onOk={this.$props.handleOk}
          onCancel={this.$props.handkeCancel}
          width={this.$props.width}
          title={'发票信息'}
          footer={null}
        >
          <div Style={{ padding: '15px' }}>
            <a-form>
              <a-form-item props={{ ...this.formItemLayout }} label='公司名称'>
                <span>{this.data.gongsi ? this.data.gongsi : undefined}</span>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='公司税号'>
                <span>10086</span>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='公司地址'>
                <span>10086</span>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='公司电话'>
                <span>023-</span>
                <span>10086</span>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='开户银行'>
                <span>中国建设银行</span>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='开户账号'>
                <span>10000</span>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='发票类型'>
                <span>{this.data.type ? this.data.type : undefined}</span>
              </a-form-item>
            </a-form>
          </div>
        </a-modal>
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
})(TerminalManage);
