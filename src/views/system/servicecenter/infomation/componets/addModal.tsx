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
    'a-Form': Form,
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
          okText='阅读完成'
          cancelText='关闭'
          width={this.$props.width}
        >
          <div Style={{ padding: '15px' }}>
            <p>测试服务（testservice）是测试测试测试测试测试</p>
            <p>
              测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
              测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测
              试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
            </p>
            <p>
              <br />
            </p>
            <h2>
              <strong>测试文本</strong>
            </h2>
            <h3>
              <strong>测试文本</strong>
            </h3>
            <p>
              测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
            </p>
            <ul>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
            </ul>
            <h3>
              <strong>测试文本</strong>
            </h3>
            <p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p>
            <ul>
              <li>安全可靠：测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              <li>大容量高并发：测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
            </ul>
            <h3>
              <strong>测试文本</strong>
            </h3>
            <p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p>
            <ul>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
            </ul>
            <h3>
              <strong>测试文本</strong>
            </h3>
            <p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p>
            <ul>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
            </ul>
            <h3>
              <strong>测试文本</strong>
            </h3>
            <p>
              测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
            </p>
            <p>
              <br />
            </p>
            <h3>
              <strong>测试文本</strong>
            </h3>
            <ul>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
            </ul>
            <h3>
              <strong>测试文本</strong>
            </h3>
            <p>
              测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
            </p>
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
})(ChangeModal);
