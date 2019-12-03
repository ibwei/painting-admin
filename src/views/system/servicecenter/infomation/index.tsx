import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal, Popconfirm } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from './componets/addModal';

@Component({
  name: 'servicecenter',
  components: {
    'a-tag': Tag,
    'a-add-modal': AddModal,
    'a-popconfirm': Popconfirm,
  },
})
export default class Servicecenter extends Vue {
  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  tableList: tableList[] = [
    {
      title: '服务名称',
      dataIndex: 'fwname',
      align: 'center',
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '服务名称',
      type: 'input',
      placeholder: '请输入服务名称',
    },
  ];

  filterGrade: FilterFormList[] = [];

  filterParams: any = {};

  outParams: any = {};

  opreat: Opreat[] = [
    {
      key: 'kaitong',
      rowKey: 'id',
      color: 'f5222d',
      text: '申请开通',
      roles: true,
    },
    {
      key: 'shiyong',
      rowKey: 'id',
      color: '13C2C2',
      text: '申请试用',
      roles: true,
    },
    {
      key: 'jieshao',
      rowKey: 'id',
      color: 'blue',
      text: '查看介绍',
      roles: true,
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
    switch (key) {
      case 'jieshao':
        this.editData = { ...data, area: 'jack' };
        this.visible = true;
        this.modelType = 'edit';
        break;
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
          url={'/messagelList'}
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
          opreatWidth='200px'
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
