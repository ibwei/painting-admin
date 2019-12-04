import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal, Popconfirm } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from './componets/addModal';

@Component({
  name: 'record',
  components: {
    'a-tag': Tag,
    'a-add-modal': AddModal,
    'a-popconfirm': Popconfirm,
  },
})
export default class Record extends Vue {
  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  tableList: tableList[] = [
    {
      title: '公司编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '公司名称',
      dataIndex: 'gongsi',
      align: 'center',
    },
    {
      title: '开通服务',
      dataIndex: 'fw',
      align: 'center',
    },
    {
      title: '服务到期时间',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'shebeistatus',
      align: 'center',
      customRender: this.statusRender,
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '公司名称',
      type: 'input',
      placeholder: '请输入公司名称',
    },
    {
      key: 'renwu',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: [
        { value: 0, label: '正常' },
        { value: 1, label: '异常' },
      ],
    },
  ];

  filterGrade: FilterFormList[] = [];

  filterParams: any = {};

  outParams: any = {};

  opreat: Opreat[] = [
    {
      key: 'edit',
      rowKey: 'id',
      color: 'blue',
      text: '通知续费',
      roles: true,
      popconfirm: true,
      msg: '确定通知续费？',
    },
    {
      key: 'delete',
      rowKey: 'id',
      color: 'red',
      text: '暂停服务',
      roles: true,
      msg: '确定暂停服务？',
    },
  ];

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  };

  add() {
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  //功能弹出框
  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    // switch (key) {
    //   case 'edit':
    //   // this.editData = { ...data, area: 'jack' };
    //   // this.visible = true;
    //   // this.modelType = 'edit';
    //   // break;

    //   case 'delete':
    //     // window.api.facilitiesBaseInfoDelete({ id: row.id }).then((res: any) => {
    //     //   const { err_code } = res.data;
    //     //   if (err_code === 0) {
    //     //     this.$message.success('删除成功');
    //     //     this.success();
    //     //   } else {
    //     //     this.$message.error('删除失败');
    //     //   }
    //     // });
    //     break;
    //   default:
    //     break;
    // }
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  success() {
    this.visible = false;
    this.editData = {};
  }

  typeRender(data: string) {
    if (data === '临时任务') {
      return <a-tag color='blue'>{data}</a-tag>;
    }
    return <a-tag color='green'>{data}</a-tag>;
  }

  statusRender(data: string) {
    let color: string = 'green';
    if (data === '异常') {
      color = 'red';
    } else {
      color = 'green';
    }
    return <a-tag color={color}>{data}</a-tag>;
  }

  render() {
    return (
      <div>
        <filter-table
          ref='task'
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={this.filterGrade}
          scroll={{ x: 900 }}
          url={'/features'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          exportBtn={false}
          dataType={'json'}
          rowKey={'key'}
          opreat={this.opreat}
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
          opreatWidth='140px'
          addBtn={false}
        />
        {this.visible && (
          <a-add-modal
            visible={this.visible}
            handleOk={this.success}
            handkeCancel={this.closeModal}
            title={this.modelType}
            width='800px'
            data={this.editData}
          ></a-add-modal>
        )}
      </div>
    );
  }
}
