import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from '../../componets/addModal';
@Component({
  name: 'list',
  components: {
    'a-tag': Tag,
    'a-add-modal': AddModal,
  },
})
export default class List extends Vue {
  title: string = '新增巡检线路';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  detailVis: boolean = false;

  mapVis: boolean = false;

  position: any;

  dataSource: any = [];

  changeVis: boolean = false;

  tableList: tableList[] = [
    {
      title: '任务编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      align: 'center',
      customRender: this.typeRender,
    },
    {
      title: '巡检路线',
      dataIndex: 'luxian',
      width: '150px',
      align: 'center',
    },
    {
      title: '巡检区域',
      dataIndex: 'area',
      width: '150px',
      align: 'center',
    },
    {
      title: '巡检分组',
      dataIndex: 'group',
      width: '150px',
      align: 'center',
    },
    {
      title: '巡检人',
      dataIndex: 'people',
      align: 'center',
    },

    {
      title: '巡检状态',
      dataIndex: 'status',
      align: 'center',
      customRender: this.statusRender,
    },
    {
      title: '巡检时间',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'createName',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '任务编号',
      type: 'input',
      placeholder: '请输入任务编号',
    },
    {
      key: 'renwu',
      label: '任务类型',
      type: 'select',
      placeholder: '请输入任务类型',
      options: [
        { value: 0, label: '日常任务' },
        { value: 1, label: '临时任务' },
      ],
    },
  ];

  filterGrade: FilterFormList[] = [
    {
      key: 'name',
      label: '任务编号',
      type: 'input',
      placeholder: '请输入任务编号',
    },
    {
      key: 'renwu',
      label: '任务类型',
      type: 'select',
      placeholder: '请输入任务类型',
      options: [
        { value: 0, label: '日常任务' },
        { value: 1, label: '临时任务' },
      ],
    },
    {
      key: 'address',
      label: '巡检路线',
      type: 'input',
      placeholder: '请输入巡检路线',
    },
    {
      key: 'address',
      label: '巡检区域',
      type: 'input',
      placeholder: '请输入巡检区域',
    },
    {
      key: 'address',
      label: '巡检分组',
      type: 'input',
      placeholder: '请输入巡检分组',
    },
    {
      key: 'address',
      label: '巡检人',
      type: 'input',
      placeholder: '请输入巡检人',
    },
    {
      key: 'address',
      label: '巡检时间',
      type: 'input',
      placeholder: '请输入巡检时间',
    },
    {
      key: 'address',
      label: '任务类型',
      type: 'select',
      placeholder: '请选择巡检状态',
      options: [
        { value: 0, label: '未开始' },
        { value: 0, label: '进行中' },
        { value: 1, label: '已完成' },
      ],
    },
  ];

  filterParams: any = {};

  outParams: any = {};

  opreat: Opreat[] = [
    // {
    //   key: 'edit',
    //   rowKey: 'id',
    //   color: 'blue',
    //   text: '编辑',
    //   roles: true,
    // },
    // {
    //   key: 'delete',
    //   rowKey: 'id',
    //   color: 'red',
    //   text: '删除',
    //   roles: true,
    //   msg: '确定删除？',
    // },
  ];

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  };

  //功能弹出框
  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = { ...data, area: 'jack' };
        this.changeVis = true;
        this.title = '修改设施信息';
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

  add() {
    this.title = '添加巡检路线';
    this.modelType = 'add';
    this.changeVis = true;
    this.editData = {};
  }

  closeModal() {
    this.changeVis = false;
    this.editData = {};
  }

  success() {
    this.changeVis = false;
    const Table: any = this.$refs.baseInfoTable;
    this.editData = {};
    Table.reloadTable();
  }

  typeRender(data: string) {
    if (data === '临时任务') {
      return <a-tag color="blue">{data}</a-tag>;
    }
    return <a-tag color="green">{data}</a-tag>;
  }

  statusRender(data: string) {
    if (data === '未开始') {
      return <a-tag color="red">{data}</a-tag>;
    } else if (data === '进行中') {
      return <a-tag color="blue">{data}</a-tag>;
    } else {
      return <a-tag color="green">{data}</a-tag>;
    }
  }

  render() {
    return (
      <div>
        <filter-table
          ref="task"
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={this.filterGrade}
          scroll={{ x: 900 }}
          url={'/task/list'}
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
          showGrade={true}
        />

        {this.changeVis ? (
          <a-add-modal
            visible={this.changeVis}
            handleOk={this.success}
            handkeCancel={this.closeModal}
            title={this.modelType}
            width="800px"
            data={this.editData}
          ></a-add-modal>
        ) : (
          ''
        )}
      </div>
    );
  }
}
