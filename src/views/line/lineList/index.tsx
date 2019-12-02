import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button, Modal } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import InfoModal from './infoModal';
import MapModal from '../components/mapModal';
import areaModal from '../../area/components/mapModal';
import './index.less';

@Component({
  name: 'lineList',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-popover': Popover,
    'a-button': Button,
    'map-modal': MapModal,
    'area-modal': areaModal,
  },
})
export default class LineList extends Vue {
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

  areaModalShow: boolean = false;

  showAreaModal() {
    this.areaModalShow = true;
  }

  hideAreaModal() {
    this.areaModalShow = false;
  }

  type: string = '';

  openType = 'edit';


  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '管道名称',
      type: 'input',
      placeholder: '请输入管道类型名称',
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
      title: '管道ID',
      dataIndex: 'id',
    },
    {
      title: '管道名称',
      dataIndex: 'name',
    },
    {
      title: '所属管道类型',
      dataIndex: 'type',
    },
    {
      title: '基本属性1',
      dataIndex: 'basicProperty1',
    },
    {
      title: '基本属性2',
      dataIndex: 'basicProperty2',
    },
    {
      title: '查看管道详情',
      dataIndex: 'detail',
      customRender: this.openLineDetail,
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

  title: string = '新增管道';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  positionRender(address: string, others: any) {
    return (
      <a-button type="default" onClick={this.showMapModal.bind(this, others)}>
        点击查看
      </a-button>
    );
  }

  recordRender(type: string, others: any) {
    return (
      <a-button type="default" onClick={this.info}>
        最新巡检记录
      </a-button>
    );
  }

  openLineDetail(type: string, others: any) {
    return (
      <a-button type="default" onClick={this.showMapModal}>
        查看地理位置
      </a-button>
    );
  }

  info() {
    const h = this.$createElement;
    Modal.info({
      title: '最新巡检记录',
      content: h('div', {}, [
        h('p', '2019年11月27日15:49:09 发现2个设施故障'),
        h('p', '2019年11月21日15:49:22 发现1个设备故障'),
        h('p', '2019年11月16日16:49:22 暂无异常'),
      ]),
      onOk() { },
    });
  }

  expandedRowRender(record: any) {
    return (
      <div>
        <div>
          管道自定义属性1：{record.ownProperty1}
        </div>
        <div>
          管道自定义属性2：{record.ownProperty2}
        </div>
      </div>
    );
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '修改管道';
        this.modelType = 'edit';
        break;
      case 'delete':
        window.api.lineTypeBaseInfoDelete({ id: row.id }).then((res: any) => {
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
    this.title = '新增管道类型';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  mapVisible: boolean = false;

  hideMapModal() {
    this.mapVisible = false;
  }

  position: any;

  facilitiesName: string = '';

  showMapModal(others: any) {
    this.position = others.position;
    this.mapVisible = true;
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
          url={'line/lineList'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={false}
          localName={'lineList'}
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
          on-show={this.showAreaModal}
          data={this.editData}
          on-close={this.closeModal}
          on-success={this.success}
        />
        {this.mapVisible ? (
          <map-modal
            visible={this.mapVisible}
            on-close={this.hideMapModal}
            position={{ x: 106.55, y: 34.66 }}
          ></map-modal>
        ) : (
            ''
          )}
        {this.areaModalShow ? (
          <area-modal
            visible={this.areaModalShow}
            on-close={this.hideAreaModal}
            openType={this.openType}
            type={this.type}
            position={{ x: 106.55, y: 34.66 }}
          ></area-modal>
        ) : (
            ''
          )}

      </div>
    );
  }
}
