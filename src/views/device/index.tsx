import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';
import InfoModal from './infoModal';
import MapModal from './components/mapModal'


import './index.less';

@Component({
  name: 'BaseInfo',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'map-modal': MapModal,
    'a-popover': Popover,
    'a-button': Button,
  },
})
export default class BaseInfo extends Vue {
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
      placeholder: 'Seach Name',
    },
    {
      key: 'address',
      label: 'address',
      type: 'cascader',
      placeholder: 'Seach address',
      options: city,
    },
    {
      key: 'createtime',
      label: 'Createtime',
      type: 'datetimerange',
      placeholder: ['start date', 'end date'],
      value: ['startTime', 'endTime'],
    },
  ];

  tableList: tableList[] = [
    {
      title: '设备编号',
      dataIndex: 'deviceId',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '所属区域',
      dataIndex: 'belongToArea',
    },
    {
      title: '所属设施',
      dataIndex: 'belongToFacilities',
    },
    {
      title: '类型',
      dataIndex: 'type',
      customRender: this.typeRender,
    },
    {
      title: '所在地理地址',
      dataIndex: 'address',
      customRender: this.positionRender,
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

  title: string = '新增区域';

  visible: boolean = true;

  modelType: string = 'add';

  editData: object = {};

  positionRender(address: string, others: any) {
    return (
      <a-button type="default" onClick={this.showMapModal.bind(this, others)}>点击查看</a-button>
    )
  }

  typeRender(type: string) {
    const colorArray: Array<string> = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];
    const index = Math.floor(Math.random() * 7);
    return (
      <a-tag color={colorArray[index]}>{type}</a-tag>
    )
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

  popoverVisible: boolean = true;

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
          url={'/device/deviceList'}
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
        <info-modal
          title={this.title}
          visible={this.visible}
          type={this.modelType}
          data={this.editData}
          on-close={this.closeModal}
          on-success={this.success}
        />
        <map-modal on-close={this.hideMapModal} position={this.position} deviceName={this.deviceName} visible={this.popoverVisible}></map-modal>
      </div>
    );
  }
}
