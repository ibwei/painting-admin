/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';
import InfoModal from './infoModal';
import './index.less';
import MapModal from '../components/mapModal';

@Component({
  name: 'facilities',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
    'a-popover': Popover,
    'a-button': Button,
    'map-modal': MapModal,
  },
})
export default class Facilities extends Vue {
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
      placeholder: '请输入设施名称',
    },
    {
      key: 'address',
      label: 'address',
      type: 'cascader',
      placeholder: '请选择设施所在位置',
      options: city,
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
      title: '设施编号',
      dataIndex: 'id',
    },
    {
      title: '设施名称',
      dataIndex: 'name',
    },
    {
      title: '设施所属区域',
      dataIndex: 'belongToArea',
    },
    {
      title: '设施所属类型',
      dataIndex: 'type',
    },
    {
      title: '设施基础类型1',
      dataIndex: 'basicProperty1',
    },
    {
      title: '设施基础类型2',
      dataIndex: 'basicProperty2',
    },
    {
      title: '设施关联设备',
      dataIndex: 'relativeDevice',
      customRender: this.deviceRender,
      width: '300px',
    },
    {
      title: '设施图片',
      dataIndex: 'thumbnail',
      customRender: this.thumbnailRender,
    },
    {
      title: '设施地理位置',
      dataIndex: 'position',
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

  title: string = '新增设施类型';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  deviceRender(relativeDevice: Array<any>, others: any) {
    const colorArray: Array<string> = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];

    const list = relativeDevice.map(item => {
      const index = Math.floor(Math.random() * 7);
      return (
        <a-tag color={colorArray[index]} style={{ marginTop: '10px' }}>
          {item.name}
        </a-tag>
      );
    });
    return list;
  }

  thumbnailRender(url: string) {
    return <img src={url} alt="设施缩略图" />;
  }
  positionRender(position: string) {
    return <a-button onClick={this.showMapModal.bind(this, position)}>查看地理位置</a-button>;
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '修改设施信息';
        this.modelType = 'edit';
        break;
      case 'delete':
        window.api.facilitiesBaseInfoDelete({ id: row.id }).then((res: any) => {
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
    this.title = '新增设施';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  popoverVisible: boolean = false;
  position: any = null;

  showMapModal(position: any) {
    this.position = position;
    this.popoverVisible = true;
  }
  hideMapModal() {
    this.popoverVisible = false;
  }


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
          设施自定义属性1：{record.ownProperty1}
        </div>
        <div>
          设施自定义属性2：{record.ownProperty2}
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
          url={'/facilities/facilitiesList'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={false}
          localName={'facilitiesList'}
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
          on-showMap={this.showMapModal}
          on-close={this.closeModal}
          on-success={this.success}
        />
        {
          this.popoverVisible ? (
            <map-modal
              on-close={this.hideMapModal}
              position={this.position}
              visible={this.popoverVisible}
            ></map-modal>
          ) : (
              ''
            )
        }

      </div>
    );
  }
}
