/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button, Collapse, Modal, Table } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import MapModal from '../componets/mapModal';
import ChangeModal from '../componets/changeModal';
import './index.less';

const { Panel } = Collapse;

@Component({
  name: 'road',
  components: {
    'a-tag': Tag,
    'a-popover': Popover,
    'a-button': Button,
    'a-collapse': Collapse,
    'a-collapse-panel': Panel,
    'a-modal': Modal,
    'a-table': Table,
    'a-mapModal': MapModal,
    'a-changeModal': ChangeModal,
  },
})
export default class Road extends Vue {
  filterProps: any = {};
  filterParams: any = {
    name: '',
    address: '',
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
      label: '路线编号',
      type: 'input',
      placeholder: '请选择路线编号',
    },
    {
      key: 'address',
      label: '路线名称',
      type: 'cascader',
      placeholder: '请选择路线名称',
    },
  ];

  tableList: tableList[] = [
    {
      title: '路线编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '路线名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '设施数量',
      dataIndex: 'sheshi',
      customRender: this.collapseRender,
      width: '150px',
      align: 'center',
    },
    {
      title: '设备',
      dataIndex: 'shebei',
      customRender: this.collapseRender,
      width: '150px',
      align: 'center',
    },
    {
      title: '管道',
      dataIndex: 'guandao',
      customRender: this.collapseRender,
      width: '150px',
      align: 'center',
    },
    {
      title: '推荐路线',
      dataIndex: 'luxian',
      customRender: this.buttonRender,
      align: 'center',
    },
    {
      title: '签到点',
      dataIndex: 'pointer',
      customRender: this.buttonRender,
      align: 'center',
    },
    {
      title: '巡检方式',
      dataIndex: 'xuanjianfangshi',
      customRender: this.deviceRender,
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

  title: string = '新增巡检线路';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  detailVis: boolean = false;
  mapVis: boolean = false;
  position: any;
  dataSource: any = [];

  changeVis: boolean = false;

  //查看详情的弹出框
  collapseRender(data: string[]) {
    return (
      <div class="device">
        <div class="first">{data.length}</div>
        <div class="second" onClick={this.handleSelectDetail.bind(null, data)}>
          详情
        </div>
      </div>
    );
  }

  buttonRender(obj: any) {
    return <a-button onClick={this.handleSeleceMap.bind(this, obj)}>点击查看</a-button>;
  }

  handleSelectDetail(data: string[], e: any) {
    e.preventDefault();

    const tmp: any = [];
    const random = Math.floor(Math.random() * 10) + 1;
    const random2 = Math.floor(Math.random() * 10) + 1;
    data.map((item: any, index: number) =>
      tmp.push({ name: item, type: `类型${index + random}`, area: `区域${index + random2}` }),
    );
    this.dataSource = tmp;

    this.detailVis = true;
  }

  handleSeleceMap(data: any) {
    this.mapVis = true;
    this.position = data;
  }

  handleOk() {
    this.handleCancel();
  }
  handleCancel() {
    this.detailVis = false;
  }

  deviceRender(content: Array<any>) {
    return <a-tag color="blue">{content}</a-tag>;
  }

  //功能弹出框
  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = data;
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

  render() {
    return (
      <div class="inspectRoad">
        <filter-table
          ref="road"
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{ x: 900 }}
          url={'/inspectRoad'}
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

        {this.detailVis ? (
          <a-modal
            visible={this.detailVis}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="800px"
          >
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
          </a-modal>
        ) : (
          ''
        )}

        {this.mapVis ? (
          <a-mapModal
            cancel={() => {
              this.mapVis = false;
            }}
            position={this.position}
            deviceName="签到点"
            visible={this.mapVis}
          ></a-mapModal>
        ) : (
          ''
        )}

        {this.changeVis ? (
          <a-changeModal
            visible={this.changeVis}
            onOk={this.success}
            onCancel={this.closeModal}
            title={this.title}
          ></a-changeModal>
        ) : (
          ''
        )}
      </div>
    );
  }
}
