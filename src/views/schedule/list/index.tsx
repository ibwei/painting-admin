import {Component, Vue} from 'vue-property-decorator';
import {Table, Card, Tag, Select} from 'ant-design-vue';
import './index.less';

@Component({
  name: 'ScheduleList',
  components: {
    'a-table': Table,
    'a-card': Card,
    'a-tag': Tag,
    'a-select': Select,
    'a-select-option': Select.Option,
  },
})
export default class ScheduleList extends Vue {
  tableData: Array<any> = [];

  columns = [
    {
      title: '时段\\星期',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '星期天',
      dataIndex: '0',
      align: 'center',
      customRender: this.valueRender.bind(this, 0),
    },
    {
      title: '星期一',
      dataIndex: '1',
      align: 'center',
      customRender: this.valueRender.bind(this, 1),
    },
    {
      title: '星期二',
      dataIndex: '2',
      align: 'center',
      customRender: this.valueRender.bind(this, 2),
    },
    {
      title: '星期三',
      dataIndex: '3',
      align: 'center',
      customRender: this.valueRender.bind(this, 3),
    },
    {
      title: '星期四',
      dataIndex: '4',
      align: 'center',
      customRender: this.valueRender.bind(this, 4),
    },
    {
      title: '星期五',
      dataIndex: '5',
      align: 'center',
      customRender: this.valueRender.bind(this, 5),
    },
    {
      title: '星期六',
      dataIndex: '6',
      align: 'center',
      customRender: this.valueRender.bind(this, 6),
    },
  ];

  valueRender(day: number, value: any, state: any) {
    const status: any = ['放假', '上课', '需预约'];
    return (
      <a-select
        defaultValue={status[value]}
        style='width: 100px'
        class={`select-${value}`}
        onChange={this.handleChange.bind(this, day, state.name)}
      >
        <a-select-option value='0'>放假</a-select-option>
        <a-select-option value='1'>上课</a-select-option>
        <a-select-option value='2'>需预约</a-select-option>
      </a-select>
    );
  }
  handleChange(day: any, time: any, value: any) {
    enum status {
      '上午',
      '下午',
      '晚上',
    }
    window.api
      .scheduleUpdate({day, time: Number(status[time]), status: Number(value)})
      .then((res: any) => {
        const resultCode = res.data.resultCode;
        if (resultCode === 0) {
          this.$message.success('更新上课安排成功');
        } else {
          this.$message.error('更新上课安排失败');
        }
      });
  }
  handleArrayToObject(arr: Array<any>, index: number) {
    let item = {};
    switch (index) {
      case 0:
        item = {name: '上午'};
        break;
      case 1:
        item = {name: '下午'};
        break;
      case 2:
        item = {name: '晚上'};
        break;
      default:
        console.log('default');
    }
    for (const [key, value] of arr.entries()) {
      item = {...item, [key]: value.status};
    }
    console.log(this.tableData);
    this.tableData.push(item);
  }

  created() {
    window.api.scheduleList({}).then((res: any) => {
      const resultCode = res.data.resultCode;
      if (resultCode === 0) {
        const data = res.data.data;
        const am = data.filter((item: any) => item.time === 0);
        const pm = data.filter((item: any) => item.time === 1);
        const gn = data.filter((item: any) => item.time === 2);
        this.handleArrayToObject(am, 0);
        this.handleArrayToObject(pm, 1);
        this.handleArrayToObject(gn, 2);
        this.$message.success('获取当前课程安排成功');
      } else {
        this.$message.error('获取当前课程安排失败');
      }
    });
  }

  render() {
    return (
      <a-card class='schedule-list'>
        <a-table columns={this.columns} dataSource={this.tableData} bordered>
          <template slot='name' slot-scope='text'></template>
          <template slot='title'>当前每周上课安排</template>
          <template slot='footer' slot-scope='currentPageData'>
            如需更改，直接在上表中操作
          </template>
        </a-table>
      </a-card>
    );
  }
}
