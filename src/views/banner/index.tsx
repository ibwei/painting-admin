/* eslint-disabled */
import {Component, Vue} from 'vue-property-decorator';
import {Tag, Modal, Button, Table, Avatar} from 'ant-design-vue';
import moment from 'moment';
import {tableList, FilterFormList, Opreat} from '@/interface';
import city from '@/utils/city';
import InfoModal from './infoModal';

@Component({
  name: 'bannerCourselBoard',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-modal': Modal,
    'a-button': Button,
    'a-table': Table,
    'a-avatar': Avatar,
  },
})
export default class messageBoard extends Vue {
  filterParams: any = {
    name: '',
    address: [],
    createtime: [],
    startTime: '',
    endTime: '',
  };

  BackParams: any = {
    code: 'data.resultCode',
    codeOK: 0,
    message: 'data.resultMessage',
    data: 'data.data',
    total: 'data.total',
  };

  outParams: any = {};

  filterList: FilterFormList[] = [
    {
      key: 'desc',
      label: 'desc',
      type: 'input',
      placeholder: '请输入图片描述',
    },
    {
      key: 'status',
      label: 'status',
      type: 'cascader',
      placeholder: '请选择图片状态',
      options: [
        {value: 0, label: '启用'},
        {value: 1, label: '禁用'},
      ],
    },
  ];

  warnListModalShow: boolean = false;

  tableList: tableList[] = [
    {
      title: '序号',
      dataIndex: 'id',
      customRender: this.nameRender,
    },
    {
      title: '图片预览',
      dataIndex: 'url',
      customRender: this.ImgRender,
    },
    {
      title: '图片描述',
      dataIndex: 'desc',
    },
    {
      title: '跳转链接',
      dataIndex: 'routerUrl',
    },
    {
      title: '图片显示先后顺序',
      dataIndex: 'order',
    },
    {
      title: '图片状态',
      dataIndex: 'status',
      customRender: this.statusRender,
    },
  ];

  opreat: Opreat[] = [
    {
      key: 'updateStatus',
      rowKey: 'id',
      color(value: any) {
        if (value.status == 0) {
          return 'red';
        }
        return 'blue';
      },
      text(value: any) {
        if (value.status == 1) {
          return '启用';
        }
        return '禁用';
      },
      roles: true,
      popconfirm: true,
      msg(value: any) {
        return value.status == 1 ? '是否启用该轮播图片' : '是否禁用该轮播图片';
      },
    },
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
      color: 'black',
      text: '删除',
      roles: true,
      popconfirm: true,
      msg: '是否删除该轮播图片',
    },
  ];

  changeVis: boolean = false;

  detailVis: boolean = false;

  title: string = '新增图片';

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

  nameRender(name: string, row: any) {
    return <a-tag color='green'>{name}</a-tag>;
  }

  statusRender(status: number) {
    return status === 0 ? '启用' : '禁用';
  }
  ImgRender(url: string) {
    return <a-avatar shape='square' size={96} src={url} />;
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

  mapVisible: boolean = false;

  showMap(others: any) {
    if (typeof others === 'object') {
      this.type = others.type;
      this.openType = 'read';
    } else if (others === '异常') {
      this.type = '异常';
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
      case 'updateStatus':
        window.api.bannerBaseInfoUpdateStatus({id: data.id}).then((res: any) => {
          const resultCode = res.data.resultCode;
          if (resultCode === 0) {
            this.$message.success('修改成功');
            this.success();
          } else {
            this.$message.error('修改失败');
          }
        });
        break;
      case 'delete':
        window.api.bannerBaseInfoDelete({id: data.id}).then((res: any) => {
          const resultCode = res.data.resultCode;
          if (resultCode === 0) {
            this.$message.success('删除成功');
            this.success();
          } else {
            this.$message.error('删除失败');
          }
        });
        break;
      case 'edit':
        this.title = '编辑轮播图';
        this.type = 'edit';
        this.visible = true;
        this.editData = row;

        break;
      default:
        break;
    }
  }

  add() {
    this.title = '添加轮播图';
    this.type = 'add';
    this.visible = true;
    this.editData = {};
  }

  // 关闭地理位置故障列表modal
  hideWarnDeviceList() {
    this.warnListModalShow = false;
  }

  showWarnDeviceList(num: number) {
    if (num > 0) {
      this.showMap('异常');
    } else {
      this.$message.info('无设备故障');
    }
  }

  //编辑框传回来的edit
  showEditMap(type: string) {
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
      <div class='baseInfo-wrap'>
        <filter-table
          ref='baseInfoTable'
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{x: 900}}
          url={'/coursel/courselList'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          opreatWidth='120px'
          fetchType={'get'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
        />

        {this.visible ? (
          <info-modal
            on-close={this.closeModal}
            on-success={this.success}
            data={this.editData}
            type={this.type}
            title={this.title}
            visible={this.visible}
          ></info-modal>
        ) : (
          ''
        )}
      </div>
    );
  }
}
