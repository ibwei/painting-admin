import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import moment from 'moment';
import { tableList, FilterFormList, Opreat } from '@/interface';

import InfoModal from './infoModal';

import './index.less';

@Component({
  name: 'inspectionPlanList',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
  },
})
export default class inspectionPlanList extends Vue {
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
      label: '巡检计划名称',
      type: 'input',
      placeholder: '请输入巡检计划名称',
    },
    {
      key: 'road',
      label: '巡检路线',
      type: 'input',
      placeholder: '请输入巡检路线',
    },
    {
      key: 'person',
      label: '巡检人',
      type: 'input',
      placeholder: '请输入巡检人',
    },
  ];

  tableList: tableList[] = [
    {
      title: '计划名称',
      dataIndex: 'name',
    },
    {
      title: '巡检区域',
      dataIndex: 'area',
    },
    {
      title: '巡检路线',
      dataIndex: 'road',
    },
    {
      title: '巡检人',
      dataIndex: 'person',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '周期频率',
      dataIndex: 'cycleNum',
      customRender: this.cycleReander,
    },
    {
      title: '创建人',
      dataIndex: 'createName',
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

  cycleReander(txt: any, data: any) {
    return txt + data.cycleUnit;
  }

  // 新增、编辑参数
  infoProps: {
    props: {
      title: string;
      visible: boolean;
      type: 'add' | 'edit';
      data: any;
    };
  } = {
    props: {
      title: '新增巡检计划',
      visible: false,
      type: 'add',
      data: {},
    },
  };

  genderRender(text: any) {
    return <a-tag color={text ? 'blue' : 'purple'}>{text ? 'Male' : 'Female'}</a-tag>;
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    data.startTime = moment(data.startTime, 'YYYY-MM-DD HH:mm:ss');
    switch (key) {
      case 'edit':
        this.infoProps = {
          props: {
            title: '编辑巡检计划',
            visible: true,
            type: 'edit',
            data,
          },
        };
        break;
      default:
        break;
    }
  }

  add() {
    this.infoProps = {
      props: {
        title: '新增巡检计划',
        visible: true,
        type: 'add',
        data: {},
      },
    };
  }

  closeModal() {
    this.infoProps = {
      props: {
        title: '新增巡检计划',
        visible: false,
        type: 'add',
        data: {},
      },
    };
  }

  success() {
    this.closeModal();
    const Table: any = this.$refs.baseInfoTable;
    Table.reloadTable();
  }

  render() {
    return (
      <div class='baseInfo-wrap'>
        <filter-table
          ref='baseInfoTable'
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{ x: 900 }}
          url={'/inspectPlan/list'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={true}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          localName='inspectionPlanList'
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
        />
        <info-modal {...this.infoProps} on-close={this.closeModal} on-success={this.success} />
      </div>
    );
  }
}
