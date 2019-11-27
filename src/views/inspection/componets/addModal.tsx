import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Modal, Form, Select, Input, Button, DatePicker, Table } from 'ant-design-vue';
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
    'a-date-picker': DatePicker,
    'a-table': Table,
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
          title="新建临时任务"
        >
          <div Style={{ padding: '15px' }}>
            <a-Form>
              <a-form-item props={{ ...this.formItemLayout }} label="巡检人员">
                <a-button onClick={this.handleDisplay.bind(null, 'people')}>选择巡检人员</a-button>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label="巡检路线">
                <a-button onClick={this.handleDisplay.bind(null, 'xianlu')}>选择巡检路线</a-button>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label="巡检时间">
                {getFieldDecorator('time', {
                  rules: [{ required: true, message: '请选择巡检时间' }],
                })(<a-date-picker />)}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label="短信">
                {getFieldDecorator('duanxin', {
                  initialValue: this.$props.data.duanxin ? this.$props.data.duanxin : undefined,
                  rules: [{ required: true, message: '请选择是否短信通知' }],
                })(
                  <a-select placeholder="请选择是否短信通知">
                    <a-select-option value="jack">是</a-select-option>
                    <a-select-option value="lucy">否</a-select-option>
                  </a-select>,
                )}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label="邮件">
                {getFieldDecorator('youjian', {
                  initialValue: this.$props.data.youjian ? this.$props.data.youjian : undefined,
                  rules: [{ required: true, message: '请选择是否邮件通知' }],
                })(
                  <a-select placeholder="请选择是否邮件通知">
                    <a-select-option value="jack">是</a-select-option>
                    <a-select-option value="lucy">否</a-select-option>
                  </a-select>,
                )}
              </a-form-item>
            </a-Form>
          </div>
        </a-modal>

        {this.detailVis ? (
          <a-modal
            visible={this.detailVis}
            onOk={this.handleConfirm}
            onCancel={this.handleModalCancel}
            width="800px"
          >
            <div Style={{ padding: '15px' }}>
              <a-table
                columns={this.column}
                dataSource={this.dataSource}
                rowKey="name"
                rowSelection={{
                  selectedRowKeys: [1, 2, 3],
                  onChange: () => {},
                }}
              ></a-table>
            </div>
          </a-modal>
        ) : (
          ''
        )}
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
})(ChangeModal);
