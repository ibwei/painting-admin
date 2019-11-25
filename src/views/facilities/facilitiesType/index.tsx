import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import InfoModal from './infoModal';
import MapModal from '../components/mapModal';
import './index.less';


@Component({
  name: 'BaseInfo',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-popover': Popover,
    'a-button': Button,
    'map-modal': MapModal,
  },
})
export default class BaseInfo extends Vue {
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
      placeholder: '请输入设施类型名',
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
      title: '设施ID',
      dataIndex: 'facilitiesId',
    },
    {
      title: '设施类型',
      dataIndex: 'name',
    },
    {
      title: '自定义属性1',
      dataIndex: 'property1',
    },
    {
      title: '自定义属性2',
      dataIndex: 'property2',
    },
    {
      title: '告警样式',
      dataIndex: 'warnImage',
      customRender: this.warnImageRender,
    },
    {
      title: '错误样式',
      dataIndex: 'wrongImage',
      customRender: this.wrongImageRender,
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

  title: string = '新增类型';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  positionRender(address: string, others: any) {
    return (
      <a-button type="default" onClick={this.showMapModal.bind(this, others)}>点击查看</a-button>
    )
  }

  wrongImageRender(url: string) {
    return (
      <img src={url} alt='告警图标' />
    )
  }

  warnImageRender(url: string) {
    return (
      <img src={url} alt='告警图标' />
    )
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '修改类型';
        this.modelType = 'edit';
        break;
      case 'delete':
        window.api.facilitiesTypeBaseInfoDelete({ id: row.id }).then((res: any) => {
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
    this.title = '添加类型';
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

  facilitiesName :string = '';

  showMapModal(others: any) {
    this.position = others.position;
    this.facilitiesName = others.name;
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
          url={'facilitiesType/facilitiesTypeList'}
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
        <map-modal on-close={this.hideMapModal} position={this.position} deviceName={this.facilitiesName} visible={this.popoverVisible}></map-modal>
      </div>
    );
  }
}