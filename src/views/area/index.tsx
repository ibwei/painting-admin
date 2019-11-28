import { Component, Vue } from 'vue-property-decorator';
import { Tag, Modal, Button, Table } from 'ant-design-vue';
import moment from 'moment';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';
import InfoModal from './infoModal';
import MapModal from './components/mapModal';
import ChangeModal from '../inspection/componets/changeModal';
import './index.less';

@Component({
  name: 'area',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-modal': Modal,
    'map-modal': MapModal,
    'a-button': Button,
    'a-changeModal': ChangeModal,
    'a-table': Table,
  },
})
export default class Area extends Vue {
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

  warnListModalShow: boolean = false;

  tableList: tableList[] = [
    {
      title: '区域名称',
      dataIndex: 'name',
    },
    {
      title: '创建人',
      dataIndex: 'createName',
    },
    {
      title: '区域类型',
      dataIndex: 'type',
      customRender: this.genderRender,
    },
    {
      title: '区域设备数量',
      dataIndex: 'deviceNum',
    },
    {
      title: '区域管道数量',
      dataIndex: 'guandaoNum',
    },
    {
      title: '区域设施数量',
      dataIndex: 'shesiNum',
    },
    {
      title: '地理位置',
      dataIndex: 'id',
      customRender: this.positionRender,
    },
    {
      title: '地理位置信息异常',
      dataIndex: 'errorNum',
      customRender: this.areaError,
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

  changeVis: boolean = false;

  detailVis: boolean = false;

  title: string = '新增区域';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  dataSource: Array<any> = [];

  //打开地图的入口 [查看|编辑]
  openType: string = '';

  //地图需要展示的图形 [多边形,圆形,自定义等]
  type: string = '';

  handleOk() {
    this.detailVis = true;
  }

  handleCancel() {
    this.detailVis = false;
  }

  handleSelectDetail(data: string[], e?: any) {
    const tmp: any = [];
    const random = Math.floor(Math.random() * 10) + 1;
    const random2 = Math.floor(Math.random() * 10) + 1;
    data.forEach((item: any, index: number) => {
      tmp.push({
        name: item,
        type: `类型${index + random}`,
        area: `区域${index + random2}`,
      });
    });
    this.dataSource = tmp;
    this.detailVis = true;
  }

  genderRender(text: any) {
    return <a-tag color={text === '多边形' ? 'blue' : 'purple'}>{text}</a-tag>;
  }

  positionRender(id: number, others: any) {
    return <a-button onClick={this.showMap.bind(this, others)}>查看地理位置</a-button>;
  }

  areaError(num: number) {
    return (
      <a-tag onClick={this.showWarnDeviceList.bind(this, num)} color={num ? 'red' : 'grey'}>
        {num ? `${num}个异常设备` : '暂无异常设备'}
      </a-tag>
    );
  }

  mapVisible: boolean = false;

  showMap(others: any) {
    if (typeof others === 'object') {
      this.type = others.type;
      this.openType = 'read';
    } else {
      this.type = others;
      this.openType = 'edit';
    }
    this.mapVisible = true;
  }

  hideMapModal() {
    this.mapVisible = false;
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    this.type = row.type;
    switch (key) {
      case 'edit':
        this.openType = 'edit';
        this.editData = data;
        this.visible = true;
        this.title = '修改区域信息';
        this.modelType = 'edit';
        break;
      case 'delete':
        window.api.areaBaseInfoDelete({ id: row.id }).then((res: any) => {
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
    this.title = '添加区域';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  // 关闭地理位置故障列表modal
  hideWarnDeviceList() {
    this.warnListModalShow = false;
  }

  showWarnDeviceList(num: number) {
    if (num > 0) {
      this.warnListModalShow = true;
    } else {
      this.$message.info('无设备故障');
    }
  }

  //编辑框传回来的edit
  showEditMap(type: string) {
    console.log('haha');
    this.showMap(type);
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  success() {
    this.visible = false;
    const Table2: any = this.$refs.baseInfoTable;
    this.editData = {};
    Table2.reloadTable();
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
          url={'/area/areaList'}
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
        <a-modal
          title="故障设备列表"
          visible={this.warnListModalShow}
          onCancel={this.hideWarnDeviceList}
          onOk={this.hideWarnDeviceList}
        >
          <p>故障设备1 目前位置在 106.5,23.2</p>
          <p>故障设备1 目前位置在 106.5,23.2</p>
          <p>故障设备1 目前位置在 106.5,23.2</p>
        </a-modal>
        {this.visible ? (
          <info-modal
            title={this.title}
            visible={this.visible}
            type={this.modelType}
            data={this.editData}
            on-close={this.closeModal}
            on-success={this.success}
            on-showEditMap={this.showEditMap}
            changeDetail={(props: string) => {
              console.log('get');
              const self = this;
              window.api.inspectRoad({ page: 1, size: 100 }).then(({ data }) => {
                self.handleSelectDetail(data.entity.data[0][props]);
              });
            }}
          />
        ) : (
          ''
        )}
        {this.mapVisible ? (
          <map-modal
            visible={this.mapVisible}
            on-close={this.hideMapModal}
            openType={this.openType}
            type={this.type}
            position={{ x: 106.55, y: 34.66 }}
          ></map-modal>
        ) : (
          ''
        )}
        {this.detailVis ? (
          <a-modal
            visible={this.detailVis}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="800px"
          >
            <div Style={{ padding: '15px' }}>
              <a-table
                columns={[
                  { title: '名称', dataIndex: 'name', width: '40%' },
                  { title: '类型', dataIndex: 'type', width: '40%' },
                  { title: '区域', dataIndex: 'area', width: '40%' },
                ]}
                dataSource={this.dataSource}
                rowKey="name"
                rowSelection={{
                  selectedRowKeys: [1, 2, 3],
                  onChange: () => {},
                }}
              ></a-table>
            </div>
          </a-modal>
        ) : (
          ''
        )}
      </div>
    );
  }
}
