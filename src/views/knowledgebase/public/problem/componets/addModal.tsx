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
  Divider,
  Icon,
  Upload,
  Row,
  Col,
} from 'ant-design-vue';
import Editor from '../../../components/fwb';
import './index.less';

@Component({
  name: 'ChangeModal',
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
    'a-input-group': Input.Group,
    'a-input-search': Input.Search,
    'a-divider': Divider,
    'a-icon': Icon,
    'a-upload': Upload,
    'a-editor': Editor,
    'a-row': Row,
    'a-col': Col,
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

  @Prop() type?: string;

  @Prop() handleOk?: () => {};

  @Prop() handkeCancel?: () => {};

  @Prop() selectTable?: () => {};

  detailVis: boolean = false;

  dataSource: any = [];

  column: any = [];

  treeData: any = [
    {
      title: '权限1',
      key: '1',
      children: [
        {
          title: '权限1-1',
          key: '1-1',
          children: [
            { title: '权限1-1-1', key: '1-1-1' },
            { title: '权限1-1-2', key: '1-1-2' },
            { title: '权限1-1-3', key: '1-1-3' },
          ],
        },
        {
          title: '权限1-2',
          key: '1-2',
          children: [
            { title: '权限1-2-1', key: '1-2-1' },
            { title: '权限1-2-2', key: '1-2-2' },
            { title: '权限1-2-3', key: '1-2-3' },
          ],
        },
      ],
    },
  ];

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
          title={this.$props.type === 'add' ? '新增问答' : '查看问答'}
          okText={this.$props.type === 'add' ? '确定' : '修改'}
        >
          <div Style={{ padding: '15px' }}>
            <a-form>
              <a-form-item props={{ ...this.formItemLayout }} label='问题名称'>
                {getFieldDecorator('name', {
                  initialValue: this.$props.type !== 'add' ? '名称test' : undefined,
                  rules: [{ required: true, message: '请输入分类名称' }],
                })(<a-input placeholder='请输入分类名称' />)}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='问题类型'>
                {getFieldDecorator('name', {
                  initialValue: this.$props.type !== 'add' ? '类型test' : undefined,
                  rules: [{ required: true, message: '请输入分类名称' }],
                })(<a-input placeholder='请输入分类名称' />)}
              </a-form-item>
              <a-row>
                <a-col span={4} class='content'>
                  问题答案:
                </a-col>
                <a-col span={18}>
                  <a-editor title={this.$props.type !== 'add' ? 'true' : null} />
                </a-col>
              </a-row>
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
    type: String,
    data: Object,
    handleOk: Function,
    handkeCancel: Function,
    selectTable: Function,
  },
})(ChangeModal);
