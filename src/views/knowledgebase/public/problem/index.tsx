import { Component, Vue } from 'vue-property-decorator';
import {
  Row,
  Col,
  Icon,
  Tree,
  Input,
  Select,
  Button,
  Collapse,
  Table,
  Modal,
} from 'ant-design-vue';
import AddModal from './componets/addModal';
import './index.less';

@Component({
  name: 'publicknowLedge',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-icon': Icon,
    'a-tree': Tree,
    'a-tree-node': Tree.TreeNode,
    'a-input': Input,
    'a-input-group': Input.Group,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-search': Input.Search,
    'a-button': Button,
    'a-collapse': Collapse,
    'a-panel': Collapse.Panel,
    'a-add-modal': AddModal,
    'a-table': Table,
    'a-modal': Modal,
  },
})
export default class PublicKnowLedge extends Vue {
  visible: any = false;

  modalvisible: any = false;

  onSelect() {}

  onCheck() {}

  handleCancel() {
    this.visible = false;
  }

  closeModal() {
    this.modalvisible = false;
  }

  oprateRender() {
    return (
      <div>
        <a-button
          style={{ marginRight: '10px' }}
          type='primary'
          size='small'
          onClick={() => {
            this.visible = true;
          }}
        >
          查看答案
        </a-button>
        <a-button style={{ marginRight: '10px' }} type='danger' size='small'>
          删除
        </a-button>
      </div>
    );
  }

  render() {
    const columns = [
      { title: '问题名称', dataIndex: 'name', key: 'name', align: 'center' },
      { title: '问题类型', dataIndex: 'age', key: 'age', align: 'center' },
      { title: '创建时间', dataIndex: 'address', key: 'address', align: 'center' },
      { title: '创建人', dataIndex: 'people', key: 'people', align: 'center' },
      {
        title: '操作',
        key: 'oprate',
        dataIndex: 'oprate',
        customRender: this.oprateRender,
        align: 'center',
      },
    ];
    const data = [
      {
        key: 1,
        name: '问题1',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '张三',
      },
      {
        key: 2,
        name: '问题2',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '李四',
      },
      {
        key: 3,
        name: '问题3',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '王五',
      },
      {
        key: 4,
        name: '问题4',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '赵四',
      },
      {
        key: 5,
        name: '问题5',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '赵四',
      },
      {
        key: 6,
        name: '问题6',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '思聪',
      },
      {
        key: 7,
        name: '问题7',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '花藤',
      },
      {
        key: 8,
        name: '问题8',
        age: '类型2',
        address: '2019-12-05 13:24:30',
        people: '马晕',
      },
      {
        key: 9,
        name: '问题9',
        age: '类型2',
        address: '2019-06-05 13:24:30',
        people: '丁类',
      },
      {
        key: 10,
        name: '问题10',
        age: '类型2',
        address: '2019-11-05 13:24:30',
        people: '王事',
      },
      {
        key: 12,
        name: '问题11',
        age: '类型2',
        address: '2019-12-15 13:24:30',
        people: '王事',
      },
      {
        key: 133,
        name: '问题12',
        age: '类型2',
        address: '2019-12-012 13:24:30',
        people: '王事二',
      },
    ];
    return (
      <div class='knowledge'>
        <a-row class='knowledge-wrap'>
          <a-col span={4} class='left'>
            <div>
              <span class='left-title'>
                <a-icon type='unordered-list' /> 我的知识库
              </span>
            </div>
            <div>
              <a-tree
                defaultExpandedKeys={['0-0-0', '0-0-1']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={this.onSelect}
              >
                <a-tree-node title='总知识库' key='0-0'>
                  <a-tree-node title='类型1' key='0-0-0'>
                    <a-tree-node title='类型1-1' key='0-0-0-0' />
                    <a-tree-node title='类型1-2' key='0-0-0-1' />
                  </a-tree-node>
                  <a-tree-node title='类型2' key='0-0-1'>
                    <a-tree-node title='类型2-1' key='0-0-1-0' />
                    <a-tree-node title='类型2-2' key='0-0-1-1' />
                  </a-tree-node>
                </a-tree-node>
              </a-tree>
            </div>
          </a-col>
          <a-col span={20} class='right'>
            <a-row>
              <a-col class='head'>
                <a-row>
                  <a-col class='head-search' span={20}>
                    <a-input-group compact>
                      <a-select style={{ width: '10%' }} defaultValue='全类目'>
                        <a-select-option value='全类目'>全类目</a-select-option>
                        <a-select-option value='当前类目'>当前类目</a-select-option>
                      </a-select>
                      <a-search style={{ width: '50%' }} placeholder='请您输入问题' enterButton />
                    </a-input-group>
                  </a-col>
                  <a-col class='head-add' span={4}>
                    <a-button
                      type='primary'
                      onClick={() => {
                        this.modalvisible = true;
                      }}
                    >
                      添加问答
                    </a-button>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <a-row class='content'>
              <a-col span={24}>
                <a-table columns={columns} dataSource={data}></a-table>
              </a-col>
            </a-row>
          </a-col>
        </a-row>

        {this.visible && (
          <a-add-modal
            visible={this.visible}
            handleOk={this.handleCancel}
            handkeCancel={this.handleCancel}
            width='800px'
            type='update'
          ></a-add-modal>
        )}

        {this.modalvisible && (
          <a-add-modal
            visible={this.modalvisible}
            handleOk={this.closeModal}
            handkeCancel={this.closeModal}
            width='800px'
            type='add'
          ></a-add-modal>
        )}
      </div>
    );
  }
}
