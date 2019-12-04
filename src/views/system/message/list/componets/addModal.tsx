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
  List,
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
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
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

  handleConfirm() {
    this.detailVis = false;
  }

  handleModalCancel() {
    this.detailVis = false;
  }

  render() {
    const listData = [
      {
        title: this.$props.data.title,
        content:
          '测测测测测测测测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      },
    ];
    return (
      <div>
        <a-modal
          visible={this.$props.visible}
          onOk={this.$props.handleOk}
          onCancel={this.$props.handkeCancel}
          width={this.$props.width}
          title='通知详情'
        >
          <div Style={{ padding: '15px' }}>
            <a-list
              itemLayout='vertical'
              dataSource={listData}
              footer={
                <div>
                  <b>接收人:</b> {this.$props.data.createName}
                </div>
              }
              renderItem={(item: any) => (
                <a-list-item
                  key={item.title}
                  extra={
                    <img
                      width={272}
                      alt='logo'
                      src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                    />
                  }
                >
                  <a-list-item-meta title={<a href={item.href}>{item.title}</a>} />
                  {item.content}
                </a-list-item>
              )}
            />
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
