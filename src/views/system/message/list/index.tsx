import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal, Popconfirm } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from './componets/addModal';

@Component({
  name: 'list',
  components: {
    'a-tag': Tag,
    'a-popconfirm': Popconfirm,
    'a-add-modal': AddModal,
  },
})
export default class List extends Vue {
  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  tableList: tableList[] = [
    {
      title: '通知标题',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '接收人',
      dataIndex: 'createName',
      align: 'center',
    },
    {
      title: '通知方式',
      dataIndex: 'fs',
      align: 'center',
      customRender: this.statusRender,
    },
    {
      title: '通知类型',
      dataIndex: 'tztype',
      align: 'center',
      customRender: this.typeRender,
    },
    {
      title: '发送时间',
      dataIndex: 'time',
      align: 'center',
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '通知标题',
      type: 'input',
      placeholder: '请输入通知标题',
    },
    {
      key: 'renwu',
      label: '通知方式',
      type: 'select',
      placeholder: '请选择通知方式',
      options: [
        { value: 0, label: '站内' },
        { value: 1, label: '短信' },
        { value: 2, label: '公众号' },
        { value: 3, label: '邮箱' },
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
      text: '查看详情',
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
      case 'edit':
        this.editData = { ...data };
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

  statusRender(data: any[]) {
    return (
      <div>
        {data.length > 0 &&
          data.map((item, index) => (
            <a-tag color='blue' key={index}>
              {item}
            </a-tag>
          ))}
      </div>
    );
  }

  typeRender(data: string) {
    const colorObj: any = {
      异常巡检通知: 'red',
      临时通知: 'green',
    };
    return <a-tag color={colorObj[data]}>{data}</a-tag>;
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
          url={'/message'}
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
          ></a-add-modal>
        )}
      </div>
    );
  }
}
