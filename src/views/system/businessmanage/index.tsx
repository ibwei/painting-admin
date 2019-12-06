import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal, Popconfirm, Button } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from './componets/addModal';
import './index.less';

@Component({
  name: 'businessmanage',
  components: {
    'a-tag': Tag,
    'a-add-modal': AddModal,
    'a-popconfirm': Popconfirm,
    'a-button': Button,
    'a-modal': Modal,
    'a-row': Row,
    'a-col': Col,
  },
})
export default class Businessmanage extends Vue {
  visible: boolean = false;

  infoVisible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  tableList: tableList[] = [
    {
      title: '公司编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '公司名称',
      dataIndex: 'gongsi',
      align: 'center',
    },
    {
      title: '公司类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '公司信息',
      dataIndex: 'shebeiquyu',
      align: 'center',
      customRender: this.btnGSRender,
    },
    {
      title: '状态',
      dataIndex: 'shebeistatus',
      align: 'center',
      customRender: this.statusRender,
    },
  ];

  btnGSRender() {
    return (
      <a-button
        onClick={() => {
          this.infoVisible = true;
        }}
      >
        查看详情
      </a-button>
    );
  }

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '公司名称',
      type: 'input',
      placeholder: '请输入公司名称',
    },
    {
      key: 'renwu',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: [
        { value: 0, label: '正常' },
        { value: 1, label: '异常' },
      ],
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
      text: '启用',
      roles: true,
      popconfirm: true,
      msg: '确定启用申请？',
    },
    {
      key: 'delete',
      rowKey: 'id',
      color: 'red',
      text: '冻结',
      roles: true,
      msg: '确定冻结申请？',
    },
  ];

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  };

  add() {
    // this.modelType = 'add';
    // this.visible = true;
    // this.editData = {};
    console.log('add');
  }

  //功能弹出框
  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    // switch (key) {
    //   case 'edit':
    //   // this.editData = { ...data, area: 'jack' };
    //   // this.visible = true;
    //   // this.modelType = 'edit';
    //   // break;
    //   case 'delete':
    //     // window.api.facilitiesBaseInfoDelete({ id: row.id }).then((res: any) => {
    //     //   const { err_code } = res.data;
    //     //   if (err_code === 0) {
    //     //     this.$message.success('删除成功');
    //     //     this.success();
    //     //   } else {
    //     //     this.$message.error('删除失败');
    //     //   }
    //     // });
    //     break;
    //   default:
    //     break;
    // }
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  closeInfoModal() {
    this.infoVisible = false;
  }

  success() {
    this.visible = false;
    this.editData = {};
  }

  typeRender(data: string) {
    if (data === '临时任务') {
      return <a-tag color='blue'>{data}</a-tag>;
    }
    return <a-tag color='green'>{data}</a-tag>;
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
      <div>
        <filter-table
          ref='task'
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={this.filterGrade}
          scroll={{ x: 900 }}
          url={'/features'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          exportBtn={true}
          dataType={'json'}
          rowKey={'key'}
          opreat={this.opreat}
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
          addBtn={true}
          addTitle='客户数据导入'
        />
        {this.visible && (
          <a-add-modal
            visible={this.visible}
            handleOk={this.success}
            handkeCancel={this.closeModal}
            title={this.modelType}
            width='800px'
            data={this.editData}
          ></a-add-modal>
        )}
        {this.infoVisible && (
          <a-modal
            visible={this.infoVisible}
            onCancel={this.closeInfoModal}
            title='公司信息'
            footer={null}
          >
            <div>
              <table class='gsinfo'>
                <tr>
                  <td class='name'>公司名称:</td>
                  <td>test</td>
                </tr>
                <tr>
                  <td class='name'>公司类型:</td>
                  <td>有限责任公司(台港澳法人独资)</td>
                </tr>
                <tr>
                  <td class='name'>经营行业:</td>
                  <td>软件和信息技术服务业</td>
                </tr>
                <tr>
                  <td class='name'>经营状态:</td>
                  <td>存续</td>
                </tr>
                <tr>
                  <td class='name'>注册地址:</td>
                  <td>深圳市南山区高新区科技中一路腾讯大厦35层</td>
                </tr>
              </table>
            </div>
          </a-modal>
        )}
      </div>
    );
  }
}
