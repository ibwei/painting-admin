import {Component, Vue} from 'vue-property-decorator';
import {Tag, Modal, Button, Table} from 'ant-design-vue';
import moment from 'moment';
import {tableList, FilterFormList, Opreat} from '@/interface';
import InfoModal from './infoModal';

@Component({
  name: 'galleryPictures',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-modal': Modal,
    'a-button': Button,
    'a-table': Table,
  },
})
export default class GalleryPictures extends Vue {
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
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: '请输入图片名称',
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
      title: '序号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '图片名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '初始化位置',
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: '图片',
      dataIndex: 'url',
      customRender: this.imageRender,
    },
    {
      title: '上传时间',
      dataIndex: 'created_at',
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
    },
  ];

  opreat: Opreat[] = [
    {
      key: 'edit',
      rowKey: 'id',
      color: 'green',
      text: '替换',
      roles: true,
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

  nameRender(name: string, row: any) {
    return <a-tag color='green'>{name}</a-tag>;
  }

  handleCancel() {
    this.detailVis = false;
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    this.type = row.type;
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '替换图片';
        this.type = 'edit';
        break;
      default:
        break;
    }
  }

  add() {
    this.title = '新增图片';
    this.type = 'add';
    this.visible = true;
    this.editData = {};
  }

  imageRender(url: string) {
    return (
      <img
        width='200px'
        style={{cursor: 'pointer'}}
        onClick={this.imageClick.bind(this, url)}
        src={url}
      ></img>
    );
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  imageClick(url: string) {
    window.open(url, 'blank');
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
          url={'/galleryPictures/list'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={false}
          localName={'galleryPictures'}
          defaultPageSize={12}
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
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
