import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import moment from 'moment';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';
import InfoModal from './infoModal';

import './index.less';

@Component({
  name: 'BaseInfo',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
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

  title: string = '新增区域';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  genderRender(text: any) {
    return <a-tag color={text === '多边形' ? 'blue' : 'purple'}>{text}</a-tag>;
  }

  areaError(num: number) {
    return <a-tag color={num ? 'red' : 'grey'}>{num ? `${num}个异常设备` : '暂无异常设备'}</a-tag>;
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.title = '修改区域信息';
        this.modelType = 'edit';
        break;
      case 'delete':
        window.api.areaBaseInfoDelete({ id: row.id }).then((res: any) => {
          const { err_code } = res.data;
          console.log(res);
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

  closeModal() {
    this.visible = false;
    this.editData = {};
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
        <info-modal
          title={this.title}
          visible={this.visible}
          type={this.modelType}
          data={this.editData}
          on-close={this.closeModal}
          on-success={this.success}
        />
      </div>
    );
  }
}
