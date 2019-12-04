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
    'a-date-picker': DatePicker,
    'a-table': Table,
    'a-tree-select': TreeSelect,
    'a-tree-select-node': TreeSelect.TreeNode,
    'a-tree': Tree,
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
          title={this.$props.title === 'edit' ? '修改终端' : '新增终端'}
        >
          <div Style={{ padding: '15px' }}>
            <a-form>
              <a-form-item props={{ ...this.formItemLayout }} label='终端名称'>
                {getFieldDecorator('name', {
                  initialValue: this.$props.data.name ? this.$props.data.name : undefined,
                  rules: [{ required: true, message: '请输入终端名称' }],
                })(<a-input placeholder='请输入终端名称' />)}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='终端类型'>
                {getFieldDecorator('type', {
                  initialValue: this.$props.data.type ? this.$props.data.type : undefined,
                  rules: [{ required: true, message: '请选择终端类型' }],
                })(
                  <a-select placeholder='请选择终端类型'>
                    <a-select-option value='1'>类型1</a-select-option>
                    <a-select-option value='2'>类型2</a-select-option>
                    <a-select-option value='3'>类型3</a-select-option>
                    <a-select-option value='4'>类型4</a-select-option>
                    <a-select-option value='5'>类型5</a-select-option>
                  </a-select>,
                )}
              </a-form-item>
            </a-form>
          </div>
        </a-modal>

        {this.detailVis ? (
          <a-modal
            visible={this.detailVis}
            onOk={this.handleConfirm}
            onCancel={this.handleModalCancel}
            width='800px'
          >
            <div Style={{ padding: '15px' }}>
              <a-table
                columns={this.column}
                dataSource={this.dataSource}
                rowKey='name'
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
})(TerminalManage);
