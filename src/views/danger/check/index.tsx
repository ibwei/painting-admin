import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button, Modal, Input } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';

@Component({
  name: 'dangerCheck',
  components: {
    'a-tag': Tag,
    'a-popover': Popover,
    'a-button': Button,
    'a-input': Input,
    'a-modal': Modal,
    'a-textarea': Input.TextArea,
  },
})
export default class DangerCheck extends Vue {
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

  reasonModalShow: boolean = false;

  rejectReason: string = '';

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
      title: '隐患内容',
      dataIndex: 'detail',
      width: '300px',
    },
    {
      title: '隐患图片',
      dataIndex: 'image',
      customRender: this.imageRender,
    },
    {
      title: '处理详情',
      dataIndex: 'handleDetail',
      customRender: this.handleRender,
      width: '300px',
    },
    {
      title: '上报时间',
      dataIndex: 'createTime',
    },
  ];

  opreat: Opreat[] = [
    {
      key: 'success',
      rowKey: 'id',
      color(val: any) {
        if (val.status === 0) {
          return 'blue';
        }
        if (val.status === 1) {
          return 'green';
        }
        return 'red';
      },
      text(val: any) {
        if (val.status === 0) {
          return '通过';
        }
        if (val.status === 1) {
          return '已通过';
        }
        return '已拒绝';
      },
      popconfirm: false,
      roles: true,
    },
    {
      key: 'reject',
      rowKey: 'id',
      color(val: any) {
        return 'blue';
      },
      text(val: any) {
        if (val.status === 0) {
          return '拒绝';
        }
        return '';
      },
      roles: true,
    },

  ];

  title: string = '新增隐患';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  imageRender(url: string) {
    return <img src={url}></img>;
  }

  changeRejectReason(e: any) {
  }

  handleRender(url: string, other: any) {
    return (
      <div>
        <img src={other.image} alt={'处理图片'}></img >
        <img src={other.image} alt={'处理图片'}></img >
        <div>{other.handleDetail}</div>
      </div>
    )
  }

  currentId: number = 0;

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'success':
        if (row.status === 0) {
          window.api.dangerCheckMessageBaseInfoUpdate({ id: row.id, status: 1 }).then((res: any) => {
            const { err_code } = res.data;
            if (err_code === 0) {
              this.$message.success('审核成功');
              this.success();
            } else {
              this.$message.error('审核失败');
            }
          });
        }
        if (row.status === 1) {
          this.$message.info('审核已经通过')
          return false;
        }
        if (row.status === 2) {
          this.$message.info('审核已经拒绝')
          return false;
        }
        break;
      case 'reject':
        this.reasonModalShow = true;
        this.currentId = row.id;
        break;
      default:
        console.log('hah');
    }
  }

  update() {
    window.api.dangerCheckMessageBaseInfoUpdate({ id: this.currentId, status: 2 }).then((res: any) => {
      const { err_code } = res.data;
      if (err_code === 0) {
        this.$message.success('已驳回');
        this.success();
      } else {
        this.$message.error('处理失败');
      }
    });
    this.cancel();
  }

  cancel() {
    this.reasonModalShow = false;
  }

  add() {
    this.title = '添加隐患';
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

  deviceName: string = '隐患';

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
          url={'/dangerCheckMessage/list'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={false}
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
        />
        <a-modal title="请输入拒绝原因" visible={this.reasonModalShow} onOk={this.update} okText="确认" cancelText="取消" onCancel={this.cancel}>
          <a-textarea placeholder="请输入拒绝原因" onChange={this.changeRejectReason} rows={4} />
        </a-modal>
      </div>
    );
  }
}
