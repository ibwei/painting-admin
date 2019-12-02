import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from './components/addModal';

@Component({
  name: 'user',
  components: {
    'a-tag': Tag,
    'a-add-modal': AddModal,
  },
})
export default class User extends Vue {
  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  tableList: tableList[] = [
    {
      title: '用户编号',
      dataIndex: 'id1',
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      customRender: this.statusRender,
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      align: 'center',
    },
    {
      title: '用户角色',
      dataIndex: 'juese',
      align: 'center',
    },
    {
      title: '用户类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '机构名称',
      type: 'input',
      placeholder: '请输入机构名称',
    },
    {
      key: 'renwu',
      label: '所属组织',
      type: 'input',
      placeholder: '请输入所属组织',
    },
    {
      key: 'type',
      label: '组织类型',
      type: 'input',
      placeholder: '请输入组织类型',
    },
    {
      key: 'renwu',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: [
        { value: 0, label: '正常' },
        { value: 1, label: '冻结' },
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
      text: '修改',
      roles: true,
    },
    {
      key: 'delete',
      rowKey: 'id',
      color: 'red',
      text: '冻结',
      roles: true,
      msg: '确定冻结？',
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
    if (data === '冻结') {
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
          url={'/sys/user'}
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
          addBtn={true}
          opreatWidth='120px'
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
