import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import './detail.less';
import MyMap from '../component/map';
@Component({
  name: 'detail',
  components: {
    'a-tag': Tag,
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-map': MyMap,
    'a-modal': Modal,
  },
})
export default class Detail extends Vue {
  title: string = '新增巡检线路';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  tableList: tableList[] = [
    {
      title: '设备编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '设备名称',
      dataIndex: 'shebeiname',
      align: 'center',
    },
    {
      title: '设备类型',
      dataIndex: 'shebeitype',
      width: '150px',
      align: 'center',
    },
    {
      title: '设备状态',
      dataIndex: 'shebeistatus',
      width: '150px',
      align: 'center',
      customRender: this.typeRender,
    },
    {
      title: '巡检区域',
      dataIndex: 'shebeiquyu',
      width: '150px',
      align: 'center',
    },
    {
      title: '巡检分组',
      dataIndex: 'shebeifenzu',
      width: '150px',
      align: 'center',
    },
    {
      title: '巡检人',
      dataIndex: 'shebeipeople',
      align: 'center',
    },
    {
      title: '巡检时间',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '上报人',
      dataIndex: 'shebeipeople2',
      align: 'center',
    },
    {
      title: '上报时间',
      dataIndex: 'createTime',
      align: 'center',
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '设备编号',
      type: 'input',
      placeholder: '请输入设备编号',
    },
    {
      key: 'renwu',
      label: '设备名称',
      type: 'input',
      placeholder: '请输入设备名称',
    },
    {
      key: 'renwu',
      label: '设备类型',
      type: 'input',
      placeholder: '请输入设备类型',
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
      text: '查看上报',
      roles: true,
    },
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
        this.visible = true;
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
      return <a-tag color="blue">{data}</a-tag>;
    }
    return <a-tag color="green">{data}</a-tag>;
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
      <div class="taskDetail">
        <a-card title="巡检任务详情">
          <a-row class="taskUserInfo">
            <a-col span="8">
              <p>
                巡检人: <span>张思聪</span>
              </p>
              <p>
                巡检分组:<span>分组一</span>
              </p>
            </a-col>
            <a-col span="8">
              <p>
                巡检区域: <span>区域一</span>
              </p>
              <p>
                巡检状态:
                <span>
                  <a-tag color="blue">巡检中</a-tag>
                </span>
              </p>
            </a-col>
            <a-col span="8">
              <p>
                巡检路线: <span>路线一</span>
              </p>
              <p>
                任务类型: <span>日常任务</span>
              </p>
            </a-col>
          </a-row>
          <a-card title="巡检上报信息" style={{ marginTop: '25px' }}>
            今天巡检的所有区域设备正常，暂无特殊事件，Over！
          </a-card>
          <a-card title="巡检人轨迹" style={{ marginTop: '25px' }} class="map-card">
            <a-map></a-map>
          </a-card>
          <a-card title="设备上报信息" style={{ marginTop: '25px' }}>
            <filter-table
              ref="task"
              tableList={this.tableList}
              filterList={this.filterList}
              filterGrade={this.filterGrade}
              scroll={{ x: 900 }}
              url={'/task/list'}
              filterParams={this.filterParams}
              outParams={this.outParams}
              exportBtn={false}
              dataType={'json'}
              rowKey={'id'}
              opreat={this.opreat}
              fetchType={'post'}
              backParams={this.BackParams}
              on-menuClick={this.tableClick}
            />
          </a-card>
        </a-card>
        <a-modal
          visible={this.visible}
          onOk={this.success}
          onCancel={this.closeModal}
          // width="800px"
          title="设备上报信息"
        >
          <div class="upInfo">
            <div class="display">
              <span class="title">设备名称:</span>
              <span>设备一</span>
            </div>
            <div class="display">
              <span class="title">设备类型:</span>
              <span>类型一</span>
            </div>
            <div class="display">
              <span class="title">设备状态:</span>{' '}
              <span>
                <a-tag color="green">正常</a-tag>
              </span>
            </div>
            <div class="display">
              <span class="title">上报人:</span>
              <span>张思聪</span>
            </div>
            <div class="display">
              <span class="title">上报内容:</span>
              <span>这个设备运转正常一切都很正常</span>
            </div>
            <div class="display">
              <span class="title">上报时间:</span>
              <span>2019-11-28 14:25:30</span>
            </div>
          </div>
        </a-modal>
      </div>
    );
  }
}
