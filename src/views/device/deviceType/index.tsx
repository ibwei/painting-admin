import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import InfoModal from './infoModal';

import './index.less';

@Component({
  name: 'deviceType',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-popover': Popover,
    'a-button': Button,
  },
})
export default class DeviceType extends Vue {
  filterParams: any = {
    name: '',
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
      label: '类型名称',
      type: 'input',
      placeholder: '请输入设备类型名称',
    },
    {
      key: 'createtime',
      label: 'Createtime',
      type: 'datetimerange',
      placeholder: ['开始时间', '截止时间'],
      value: ['startTime', 'endTime'],
    },
  ];

  tableList: tableList[] = [
    {
      title: '类别ID',
      dataIndex: 'id',
    },
    {
      title: '设备类型名称',
      dataIndex: 'name',
    },
    {
      title: '类型图标',
      dataIndex: 'image',
      customRender: this.imageRender,
    },
    {
      title: '基础属性1',
      dataIndex: 'basicProperty1',
    },
    {
      title: '基础属性2',
      dataIndex: 'basicProperty2',
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

  title: string = '新增设备类型';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  typeRender(type: string) {
    const colorArray: Array<string> = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];
    const index = Math.floor(Math.random() * 7);
    return <a-tag color={colorArray[index]}>{type}</a-tag>;
  }

  imageRender(type: string) {
    return <img src={type} alt='设备类型图片' />;
  }


  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '修改设备类型';
        this.modelType = 'edit';
        break;
      case 'delete':
        window.api.deviceTypeBaseInfoDelete({ id: row.id }).then((res: any) => {
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
    this.title = '添加设备类型';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  position: any;

  success() {
    this.visible = false;
    const Table: any = this.$refs.baseInfoTable;
    this.editData = {};
    Table.reloadTable();
  }


  expandedRowRender(record: any) {
    return (
      <div>
        <div>
          {record.ownProperty1}
        </div>
        <div>
          {record.ownProperty2}
        </div>
      </div>
    );
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
          url={'deviceType/deviceTypeList'}
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
          expandedRowRender={this.expandedRowRender}
        />
        <info-modal
          title={this.title}
          visible={this.visible}
          type={this.modelType}
          data={this.editData}
          on-close={this.closeModal}
          on-success={this.success}
        />
      </div>
    );
  }
}
