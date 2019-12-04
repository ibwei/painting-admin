import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal, Popconfirm } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from './componets/addModal';

@Component({
  name: 'order',
  components: {
    'a-tag': Tag,
    'a-add-modal': AddModal,
    'a-popconfirm': Popconfirm,
  },
})
export default class Order extends Vue {
  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  special: boolean = true;

  tableList: tableList[] = [
    {
      title: '订单编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '公司名称',
      dataIndex: 'gongsi2',
      align: 'center',
    },
    {
      title: '开通服务',
      dataIndex: 'fw',
      align: 'center',
    },
    {
      title: '开通时间/条数',
      dataIndex: 'num',
      align: 'center',
    },
    {
      title: '金额',
      dataIndex: 'money',
      align: 'center',
    },
    {
      title: '是否开票',
      dataIndex: 'kaipiao',
      align: 'center',
      customRender: this.typeRender,
    },
    {
      title: '开通时间',
      dataIndex: 'time',
      align: 'center',
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '终端名称',
      type: 'input',
      placeholder: '请输入终端名称',
    },
    {
      key: 'renwu',
      label: '终端类型',
      type: 'select',
      placeholder: '请选择终端类型',
      options: [
        { value: 0, label: '类型1' },
        { value: 1, label: '类型2' },
        { value: 1, label: '类型3' },
        { value: 1, label: '类型4' },
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
      color: (val: any) => {
        if (val.kaipiao === '是') {
          return 'green';
        }
        return 'blue';
      },
      text: (val: any) => {
        if (val.kaipiao === '是') {
          return '查看发票';
        }
        return '申请发票';
      },
      roles: true,
    },
    // {
    //   key: 'delete',
    //   rowKey: 'id',
    //   color: 'red',
    //   text: '删除',
    //   roles: true,
    //   msg: '确定删除?',
    // },
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
    switch (key) {
      case 'edit':
        if (row.kaipiao === '是') {
          this.editData = { ...data };
          this.visible = true;
          this.modelType = 'edit';
          this.special = false;
          break;
        } else {
          this.editData = { ...data };
          this.visible = true;
          this.modelType = 'edit';
          this.special = true;
          break;
        }
      case 'delete':
        // window.api.facilitiesBaseInfoDelete({ id: row.id }).then((res: any) => {
        //   const { err_code } = res.data;
        //   if (err_code === 0) {
        //     this.$message.success('删除成功');
        //     this.success();
        //   } else {
        //     this.$message.error('删除失败');
        //   }
        // });
        break;
      default:
        break;
    }
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
    if (data === '否') {
      return <a-tag color='red'>{data}</a-tag>;
    }
    return <a-tag color='green'>{data}</a-tag>;
  }

  statusRender(data: string) {
    let color: string = 'green';
    if (data === '税务机打服务发票') {
      color = 'red';
    } else if (data === '增值税专用发票') {
      color = 'blue';
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
          url={'/bill'}
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
            special={this.special}
          ></a-add-modal>
        )}
      </div>
    );
  }
}
