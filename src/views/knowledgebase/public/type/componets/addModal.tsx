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
    'a-input-group': Input.Group,
    'a-input-search': Input.Search,
    'a-divider': Divider,
    'a-icon': Icon,
    'a-upload': Upload,
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
          title={this.$props.title === 'edit' ? '修改知识库分类' : '新增知识库分类'}
        >
          <div Style={{ padding: '15px' }}>
            <a-form>
              <a-form-item props={{ ...this.formItemLayout }} label='分类名称'>
                {getFieldDecorator('name', {
                  initialValue: this.$props.data.name ? this.$props.data.name : undefined,
                  rules: [{ required: true, message: '请输入分类名称' }],
                })(<a-input placeholder='请输入分类名称' />)}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='分类类型'>
                {getFieldDecorator('type1', {
                  initialValue: this.$props.data.type1 ? this.$props.data.type1 : undefined,
                  rules: [{ required: true, message: '请输入分类类型' }],
                })(<a-input placeholder='请输入分类类型' />)}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='分类标签'>
                {getFieldDecorator('tags', {
                  initialValue: this.$props.data.status ? ['jack', 'lucy', 'lucy2'] : undefined,
                  rules: [{ required: true, message: '请选择分类标签' }],
                })(
                  <a-select
                    mode='multiple'
                    placeholder='请选择分类标签'
                    dropdownRender={(menu: any) => (
                      <div>
                        {menu}
                        <a-divider style={{ margin: '4px 0' }} />
                        <div
                          slot='dropdownRender'
                          style={{ padding: ' 0 0 5px 5px', cursor: 'pointer' }}
                        >
                          <a-icon type='plus' />
                          添加新标签
                        </div>
                      </div>
                    )}
                  >
                    <a-select-option value='jack'>标签1</a-select-option>
                    <a-select-option value='lucy'>标签2</a-select-option>
                    <a-select-option value='lucy2'>标签3</a-select-option>
                    <a-select-option value='lucy3'>标签4</a-select-option>
                    <a-select-option value='lucy4'>标签5</a-select-option>
                  </a-select>,
                )}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='所属分类'>
                {getFieldDecorator('type', {
                  initialValue: this.$props.data.name ? [this.$props.data.name] : undefined,
                  rules: [{ required: true, message: '请选择所属分类' }],
                })(
                  <a-tree-select
                    showSearch
                    dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
                    placeholder='请选择所属分类'
                    allowClear
                    treeDefaultExpandAll
                  >
                    <a-tree-select-node value='总知识库' title='总知识库' key='总知识库'>
                      <a-tree-select-node value='分类1' title='分类1' key='分类1'>
                        <a-tree-select-node value='分类1-1' title='分类1-1' key='分类1-1' />
                      </a-tree-select-node>
                      <a-tree-select-node value='分类2' title='分类2' key='分类2'>
                        <a-tree-select-node
                          value='分类2-1'
                          title='分类2-1'
                          key='分类2-1'
                        ></a-tree-select-node>
                      </a-tree-select-node>
                    </a-tree-select-node>
                  </a-tree-select>,
                )}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='分类图标'>
                {getFieldDecorator('key', {
                  rules: [{ required: true, message: '请输入分类名称' }],
                })(
                  <a-upload
                    name='avatar'
                    listType='picture-card'
                    class='avatar-uploader'
                    showUploadList='false'
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    beforeUpload='beforeUpload'
                    change='handleChange'
                  >
                    <div>
                      <a-icon type='plus' />
                      <div class='ant-upload-text'>添加</div>
                    </div>
                  </a-upload>,
                )}
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='关联设施类型'>
                <a-button
                  onClick={() => {
                    this.$props.selectTable('sheshi');
                  }}
                >
                  关联设施编辑
                </a-button>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='关联设备类型'>
                <a-button
                  onClick={() => {
                    this.$props.selectTable('shebei');
                  }}
                >
                  关联设备编辑
                </a-button>
              </a-form-item>
              <a-form-item props={{ ...this.formItemLayout }} label='关联管道类型'>
                <a-button
                  onClick={() => {
                    this.$props.selectTable('guandao');
                  }}
                >
                  关联管道编辑
                </a-button>
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
    selectTable: Function,
  },
})(ChangeModal);
