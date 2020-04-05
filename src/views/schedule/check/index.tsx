/* eslint-disabled */
import { Component, Vue } from 'vue-property-decorator';
import { Tag, Modal, Button, Table, Avatar, Rate } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';

@Component({
  name: 'ScheduleCheck',
  components: {
    'a-tag': Tag,
    'a-modal': Modal,
    'a-button': Button,
    'a-table': Table,
    'a-avatar': Avatar,
    'a-rate': Rate,
  },
})
export default class ScheduleCheck extends Vue {
  filterParams: any = {
    name: '',
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
        { value: 0, label: '启用' },
        { value: 1, label: '禁用' },
      ],
    },
  ];

  warnListModalShow: boolean = false;

  tableList: tableList[] = [
    {
      title: '预约学生',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '预约时间',
      dataIndex: 'day',
      align: 'center',
      width: 300,
      customRender: this.nameRender,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '邮箱',
      align: 'center',
      width: '300px',
      dataIndex: 'email',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'created_at',
    },
  ];

  opreat: Opreat[] = [
    {
      key: 'pass',
      rowKey: 'id',
      color: 'green',
      text(value: any) {
        if (value.status === 0) {
          return '确认预约';
        }
        return '';
      },
      roles: true,
    },
    {
      key: 'reject',
      rowKey: 'id',
      color(value: any) {
        if (value.status === 0) {
          return 'green';
        } else if (value.status === 1) {
          return 'red';
        }
        return 'gray';
      },
      text(value: any) {
        if (value.status === 0) {
          return '取消预约';
        } else if (value.status === 1) {
          return '已确认预约';
        }
        return '已取消预约';
      },
      disabled(value: any) {
        if (value.status !== 0) {
          return true;
        }
        return false;
      },
      roles: true,
    },
    {
      key: 'delete',
      rowKey: 'id',
      color: 'black',
      text: '删除',
      roles: true,
      popconfirm: true,
      msg: '是否删除该条文章评论',
    },
  ];

  title: string = '新增图片';

  visible: boolean = false;

  type: string = 'add';

  editData: object = {};

  nameRender(name: any, row: any) {
    enum week { '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' }
    enum day { '上午', '下午', '晚上' }
    return (
      <div>
        <span style="margin-right:10px;"></span>
        <a-tag>{week[name]}{day[row.time]}</a-tag>
      </div>
    );
  }

  ImgRender(url: string) {
    return <a-avatar shape='square' size={96} src={url} />;
  }

  starRender(star: number) {
    return <a-rate defaultValue={star} allowHalf disabled />;
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

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    this.type = row.type;
    switch (key) {
      case 'delete':
        window.api.articleCommentDelete({ id: data.id }).then((res: any) => {
          const resultCode = res.data.resultCode;
          if (resultCode === 0) {
            this.$message.success('删除成功');
            this.success();
          } else {
            this.$message.error('删除失败');
          }
        });
        break;
      case 'pass':
        window.api.bookScheduleUpdate({ id: data.id, status: 1, email: row.email }).then((res: any) => {
          const resultCode = res.data.resultCode;
          if (resultCode === 0) {
            this.$message.success(res.data.resultMessage);
            this.success();
          } else {
            this.$message.error('处理失败');
          }
        });
        break;
      case 'reject':
        window.api.bookScheduleUpdate({ id: data.id, status: 2, email: row.email }).then((res: any) => {
          const resultCode = res.data.resultCode;
          if (resultCode === 0) {
            this.$message.success(res.data.resultMessage);
            this.success();
          } else {
            this.$message.error('处理失败');
          }
        });
        break;
      default:
        console.log('默认处理');
    }
  }

  add() {
    this.title = '添加轮播图';
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
          scroll={{ x: 900 }}
          url={'/bookschedule/list'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          localName={'articleCommentList'}
          exportBtn={false}
          opreatWidth={'180px'}
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
