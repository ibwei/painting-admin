import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button, Modal } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import InfoModal from './infoModal';

import './index.less';

@Component({
  name: 'message',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-popover': Popover,
    'a-button': Button,
  },
})
export default class Message extends Vue {
  filterParams: any = {
    name: '',
    address: [],
    createtime: [],
    startTime: '',
    endTime: '',
  };

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  };

  outParams: any = {};

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: '请输入隐患名',
    },
    {
      key: 'createtime',
      label: 'Createtime',
      type: 'datetimerange',
      placeholder: ['开始时间', '结束时间'],
      value: ['startTime', 'endTime'],
    },
  ];

  tableList: tableList[] = [
    {
      title: '隐患名',
      dataIndex: 'name',
    },
    {
      title: '隐患详情',
      dataIndex: 'detail',
      width: '300px',
    },
    {
      title: '隐患图片',
      dataIndex: 'image',
      customRender: this.imageRender,
    },
    {
      title: '处理结果',
      dataIndex: 'status',
      customRender: this.typeRender,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];

  opreat: Opreat[] = [
    {
      key: 'edit',
      rowKey: 'id',
      color: 'blue',
      text: '编辑',
      roles: true,
    },
    {
      key: 'delete',
      rowKey: 'id',
      color: 'red',
      text: '删除',
      roles: true,
      msg: '确定删除？',
    },
  ];

  title: string = '新增设备';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  imageRender(url: string) {
    return <img src={url}></img>;
  }

  typeRender(type: number, others: any) {
    const colorArray: Array<string> = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];
    let render: any = null;
    if (type === 0) {
      render = (
        <a-tag color="blue" onClick={this.showSuccesResult.bind(this, others)}>
          去处理
        </a-tag>
      );
    } else if (type === 1) {
      render = <a-tag color="green">查看处理结果</a-tag>;
    } else {
      render = <a-tag color="red">处理失败原因</a-tag>;
    }
    return render;
  }

  showSuccesResult(data: any) {
    const h = this.$createElement;
    Modal.info({
      title: 'This is a notification message',
      content: h('div', {}, [
        h('p', 'some messages...some messages...'),
        h('p', 'some messages...some messages...'),
      ]),
      onOk() { },
    });
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '修改设备信息';
        this.modelType = 'edit';
        break;
      case 'delete':
        window.api.deviceBaseInfoDelete({ id: row.id }).then((res: any) => {
          const { err_code } = res.data;
          if (err_code === 0) {
            this.$message.success('删除成功');
            this.success();
          } else {
            this.$message.error('删除失败');
          }
        });
        break;
      default:
        break;
    }
  }

  add() {
    this.title = '添加设备';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  popoverVisible: boolean = false;

  hideMapModal() {
    this.popoverVisible = false;
  }

  position: any;

  deviceName: string = '设备';

  showMapModal(others: any) {
    this.position = others.position;
    this.deviceName = others.name;
    this.popoverVisible = true;
  }

  success() {
    this.visible = false;
    const Table: any = this.$refs.baseInfoTable;
    this.editData = {};
    Table.reloadTable();
  }

  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          ref="baseInfoTable"
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{ x: 900 }}
          url={'/dangerMessage/list'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
        />
        {this.visible ? (
          <info-modal
            title={this.title}
            position={this.position}
            visible={this.visible}
            deviceName={this.deviceName}
            type={this.modelType}
            data={this.editData}
            on-close={this.closeModal}
            on-success={this.success}
          />
        ) : (
            ''
          )}
      </div>
    );
  }
}
