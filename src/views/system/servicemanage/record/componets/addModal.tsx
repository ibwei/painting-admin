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
          title='新建临时任务'
        >
          <div Style={{ padding: '15px' }}>
            <a-form>
              <a-form-item props={{ ...this.formItemLayout }} label='角色名称'>
                {getFieldDecorator('name', {
                  initialValue: this.$props.data.name ? this.$props.data.name : undefined,
                  rules: [{ required: true, message: '请输入角色名称' }],
                })(<a-input placeholder='请输入角色名称' />)}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='角色类型'>
                {getFieldDecorator('type1', {
                  initialValue: this.$props.data.type1 ? this.$props.data.type1 : undefined,
                  rules: [{ required: true, message: '请选择角色类型' }],
                })(
                  <a-select placeholder='请选择角色类型'>
                    <a-select-option value='jack'>类型1</a-select-option>
                    <a-select-option value='lucy'>类型2</a-select-option>
                    <a-select-option value='lucy'>类型3</a-select-option>
                    <a-select-option value='lucy'>类型4</a-select-option>
                    <a-select-option value='lucy'>类型5</a-select-option>
                  </a-select>,
                )}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='组织机构'>
                {getFieldDecorator('type', {
                  initialValue: this.$props.data.type ? this.$props.data.type : undefined,
                  rules: [{ required: true, message: '请选择组织机构' }],
                })(
                  <a-tree-select
                    showSearch
                    value='value'
                    dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
                    placeholder='请选择组织机构'
                    allowClear
                    treeDefaultExpandAll
                  >
                    <a-tree-select-node value='parent 1' title='部门1' key='0-1'>
                      <a-tree-select-node value='parent 1-0' title='部门1-1' key='0-1-1'>
                        <a-tree-select-node
                          selectable='false'
                          value='leaf1'
                          title='部门1-1'
                          key='random'
                        />
                        <a-tree-select-node value='leaf2' title='部门1-2' key='random1' />
                      </a-tree-select-node>
                      <a-tree-select-node value='parent 1-1' title='组织2' key='random2'>
                        <a-tree-select-node
                          value='组织2-1'
                          title='组织2-1'
                          key='random3'
                        ></a-tree-select-node>
                      </a-tree-select-node>
                    </a-tree-select-node>
                  </a-tree-select>,
                )}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='所属权限'>
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择所属权限' }],
                })(<a-tree checkable treeData={this.treeData} />)}
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
})(ChangeModal);
