import {Component, Vue} from 'vue-property-decorator';
import {Tag, Modal, Button, Table, Switch} from 'ant-design-vue';
import moment from 'moment';
import {tableList, FilterFormList, Opreat} from '@/interface';
import InfoModal from './infoModal';

@Component({
  name: 'course',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-modal': Modal,
    'a-button': Button,
    'a-table': Table,
    'a-switch': Switch,
  },
})
export default class Course extends Vue {
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
      key: 'title',
      label: 'title',
      type: 'input',
      placeholder: '请输入课程名称',
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
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
    },
    {
      title: '课程分类',
      align: 'center',
      dataIndex: 'category',
    },
    {
      title: '课程标签',
      align: 'center',
      dataIndex: 'tags',
      customRender: this.tagsRender,
    },
    {
      title: '学费',
      align: 'center',
      dataIndex: 'tuition',
    },
    {
      title: '有效期至',
      align: 'center',
      dataIndex: 'valid_time',
    },
    {
      title: '课程教师',
      align: 'center',
      dataIndex: 'teacher',
    },
    {
      title: '课程图片',
      dataIndex: 'url',
      align: 'center',
      customRender: this.imgRender,
    },
    {
      title: '课程描述',
      dataIndex: 'desc',
    },
    {
      title: '排序权重',
      dataIndex: 'order',
      align: 'center',
    },
    {
      title: '启用',
      dataIndex: 'status',
      align: 'center',
      customRender: this.switchRender,
    },

    {
      title: '添加时间',
      dataIndex: 'created_at',
    },
  ];

  opreat: Opreat[] = [
    {
      key: 'edit',
      rowKey: 'id',
      color: 'blue',
      text: '编辑',
      roles: true,
      popconfirm: false,
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

  title: string = '新增课程';

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

  thumbnailRender(url: string) {
    console.log(url);
    if (url) {
      return <img src={url} class='thumbnail-image'></img>;
    }
    return <a-tag color='red'>无</a-tag>;
  }

  device(device: number) {
    if (device === 0) {
      return <a-tag color={'green'}>手机</a-tag>;
    }
    return <a-tag color={'blue'}>PC</a-tag>;
  }

  handleCancel() {
    this.detailVis = false;
  }

  switchRender(status: number, row: any) {
    return <a-switch checked={Boolean(status)} onClick={this.statusClick.bind(null, row)} />;
  }

  tagsRender(tags: string) {
    const tagArray = tags.split('-');
    const color = ['green', 'blue', 'cyan', 'pink', 'purple', 'orange'];
    const dom = tagArray.map((item, index) => {
      const c = Math.floor(Math.random() * 6);
      return (
        <a-tag key={Math.random() + index} color={color[c]}>
          {item}
        </a-tag>
      );
    });
    return dom;
  }

  imgRender(tags: string) {
    const tagArray = tags.split(',');
    /* eslint-disable-next-line */
    const dom = tagArray.map((item, index) => {
      return (
        <img key={Math.random() + index} width='100px' src={item}>
          {item}
        </img>
      );
    });
    return dom;
  }

  /* 课程状态变更 */

  statusClick(rows: any) {
    window.api.courseUpdate({...rows, status: rows.status === 0 ? 1 : 0}).then((res: any) => {
      const {resultCode} = res.data;
      if (resultCode === 0) {
        this.$message.success('操作成功');
        this.success();
      } else {
        this.$message.error('操作失败');
      }
    });
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    this.type = row.type;
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '编辑课程';
        this.type = 'edit';
        break;
      case 'delete':
        window.api.courseDelete({id: row.id}).then((res: any) => {
          const {resultCode} = res.data;
          if (resultCode === 0) {
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
    this.title = '新增课程';
    this.type = 'add';
    this.visible = true;
    this.editData = {};
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
          url={'/course/list'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          localName={'article'}
          exportBtn={false}
          opreatWidth={'140px'}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          fetchType={'post'}
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
