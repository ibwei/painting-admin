import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal, Button, Table } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import AddModal from './componets/addModal';

@Component({
  name: 'insititution',
  components: {
    'a-tag': Tag,
    'a-add-modal': AddModal,
    'a-button': Button,
    'a-modal': Modal,
    'a-table': Table,
  },
})
export default class Insititution extends Vue {
  visible: boolean = false;

  infoVisible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  position: any;

  dataSource: any = [];

  tableList: tableList[] = [
    {
      title: '分类名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '分类类型',
      dataIndex: 'type1',
      align: 'center',
    },
    {
      title: '分类标签',
      dataIndex: 'status',
      align: 'center',
      customRender: this.statusRender,
    },
    {
      title: '分类图标',
      dataIndex: 'key',
      align: 'center',
      customRender: this.imgRender,
    },
    {
      title: '关联设施类型',
      dataIndex: 'sheshi',
      align: 'center',
      customRender: this.btnTableRender,
    },
    {
      title: '关联设备类型',
      dataIndex: 'shebei',
      customRender: this.btnTableRender,
      align: 'center',
    },
    {
      title: '关联管道类型',
      dataIndex: 'gd',
      customRender: this.btnTableRender,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
    },
  ];

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: '分类名称',
      type: 'input',
      placeholder: '请输入分类名称',
    },
    {
      key: 'type',
      label: '分类类型',
      type: 'input',
      placeholder: '请输入分类类型',
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
      text: '修改',
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

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  };

  add() {
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  //功能弹出框
  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    switch (key) {
      case 'edit':
        this.editData = { ...data, area: 'jack' };
        this.visible = true;
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

  closeInfoModal() {
    this.infoVisible = false;
  }

  success() {
    this.visible = false;
    this.editData = {};
  }

  selectTable(props: any) {
    window.api.inspectRoad({ page: 1, size: 100 }).then(({ data }) => {
      const tmp: any = [];
      const random = Math.floor(Math.random() * 10) + 1;
      const random2 = Math.floor(Math.random() * 10) + 1;
      data.entity.data[0][props].map((item: any, index: number) =>
        tmp.push({ name: item, type: `类型${index + random}`, area: `区域${index + random2}` }),
      );
      this.dataSource = tmp;
      this.infoVisible = true;
    });
  }

  btnTableRender(data: any) {
    return <a-button onClick={() => this.selectTable(data)}>点击查看</a-button>;
  }

  typeRender(data: string) {
    if (data === '临时任务') {
      return <a-tag color='blue'>{data}</a-tag>;
    }
    return <a-tag color='green'>{data}</a-tag>;
  }

  imgRender() {
    const Random1 = Math.floor(Math.random() * 255);
    const Random2 = Math.floor(Math.random() * 255);
    const Random3 = Math.floor(Math.random() * 255);
    return (
      <div
        style={{
          width: '80px',
          height: '40px',
          backgroundColor: `rgb(${Random1},${Random2},${Random3})`,
          margin: '0 auto',
          color: 'white',
          lineHeight: '40px',
        }}
      >
        图标
      </div>
    );
  }

  statusRender(data: any[]) {
    return (
      <div>
        {data.length > 0 &&
          data.map((item, index) => (
            <a-tag color='blue' key={index}>
              {item}
            </a-tag>
          ))}
      </div>
    );
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
          url={'/problem'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          exportBtn={false}
          dataType={'json'}
          rowKey={'key'}
          opreat={this.opreat}
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
          addBtn={true}
        />
        {this.visible && (
          <a-add-modal
            visible={this.visible}
            handleOk={this.success}
            handkeCancel={this.closeModal}
            title={this.modelType}
            width='800px'
            data={this.editData}
            selectTable={this.selectTable}
          ></a-add-modal>
        )}

        {this.infoVisible && (
          <a-modal
            visible={this.infoVisible}
            onCancel={this.closeInfoModal}
            onOk={this.closeInfoModal}
            title='关联类型'
            width='800px'
            okText='修改'
          >
            <a-table
              columns={[
                { title: '名称', dataIndex: 'name', width: '40%' },
                { title: '类型', dataIndex: 'type', width: '40%' },
                { title: '区域', dataIndex: 'area', width: '40%' },
              ]}
              dataSource={this.dataSource}
              rowKey='name'
              rowSelection={{
                selectedRowKeys: [
                  '设施289',
                  '设施992',
                  '设施704',
                  '设施575',
                  '设备735',
                  '设备561',
                  '管道74',
                  '管道994',
                  '管道784',
                ],
                onChange: () => {},
              }}
            ></a-table>
          </a-modal>
        )}
      </div>
    );
  }
}
