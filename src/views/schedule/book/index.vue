<template>
  <a-card style="width: 98%; margin: 20px auto;" title="本周课程预约日历">
    <a-calendar :validRange="range" :defaultValue="moment(new Date())">
      <ul class="events" slot="dateCellRender" slot-scope="value">
        <template v-if="getListData(value).length">
          <li v-for="item of getListData(value)" :key="item.created_at">
            <a-badge
              :status="new Date().getDay() == item.day ? 'processing' : 'success'"
              :text="getI(item)"
            />
          </li>
        </template>
        <template v-else>
          <div>
            <a-badge status="default" text="暂无预约"></a-badge>
          </div>
        </template>
      </ul>
      <template slot="monthCellRender" slot-scope="value">
        <div v-if="getMonthData(value)" class="notes-month">
          <section>{{ getMonthData(value) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>
  </a-card>
</template>
<script>
import {Calendar, Card, Badge} from 'ant-design-vue';
import moment from 'moment';
export default {
  components: {
    'a-calendar': Calendar,
    'a-card': Card,
    'a-badge': Badge,
  },
  data() {
    return {
      weekData: [],
      range: [],
      startWeek: 0,
      week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      time: ['上午', '下午', '晚上'],
    };
  },
  created() {
    const days = moment().startOf('week').fromNow();

    const day = new Date().getTime() - 3600000 * 24 * (parseInt(days, 10) - 1);
    this.startWeek = new Date(day).getDate();
    const start = new Date();
    this.range = [moment(start).subtract(7, 'days'), moment(start).add(7, 'days')];
    window.api.bookScheduleList({type: 'week'}).then(res => {
      const resultCode = res.data.resultCode;
      const rowList = res.data.data;
      const one = rowList.filter(item => item.day === 1);
      const two = rowList.filter(item => item.day === 2);
      const three = rowList.filter(item => item.day === 3);
      const four = rowList.filter(item => item.day === 4);
      const five = rowList.filter(item => item.day === 5);
      const six = rowList.filter(item => item.day === 6);
      const seven = rowList.filter(item => item.day === 0);
      this.weekData.push(...[one, two, three, four, five, six, seven]);
      if (resultCode === 0) {
        this.$message.success('获取预约日历数据成功');
      } else {
        this.$message.error('获取预约日历数据失败');
      }
    });
  },
  methods: {
    moment,
    getI(item) {
      return `${item.name}:${this.week[item.day]}${this.time[item.time]}`;
    },
    getFirstDayOfWeek(date) {
      const weekday = date.getDay() || 7; // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
      date.setDate(date.getDate() - weekday + 1); // 往前算（weekday-1）天，年份、月份会自动变化
      return this.timeFormat(date);
    },
    timeFormat(date) {
      if (!date || typeof date === 'string') {
        this.error('参数异常，请检查...');
      }
      const y = date.getFullYear(); //年
      const m = date.getMonth() + 1; //月
      const d = date.getDate(); //日
      const h = date.getHours();
      const i = date.getMinutes();
      const s = date.getSeconds();
      return `${y}-${m}-${d} ${h}-${i}-${s}`;
    },

    getListData(value) {
      let listData;
      const now = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
      const dayCount = now.getDate();
      switch (value.date()) {
        case this.startWeek % dayCount:
        case 0:
          listData = this.weekData[0];
          break;
        case (this.startWeek + 1) % dayCount:
        case this.startWeek + 1:
          listData = this.weekData[1];
          break;
        case (this.startWeek + 2) % dayCount:
        case this.startWeek + 2:
          listData = this.weekData[2];
          break;
        case (this.startWeek + 3) % dayCount:
        case this.startWeek + 3:
          listData = this.weekData[3];
          break;
        case (this.startWeek + 4) % dayCount:
        case this.startWeek + 4:
          listData = this.weekData[4];
          break;
        case (this.startWeek + 5) % dayCount:
        case this.startWeek + 5:
          listData = this.weekData[5];
          break;
        case (this.startWeek + 6) % dayCount:
        case this.startWeek + 6:
          listData = this.weekData[6];
          break;
        default:
          listData = {};
      }
      const boundray = 3600000 * 24 * 8;
      // console.log(new Date().getTime());
      // console.log(value.valueOf());
      if (Math.abs(new Date().getTime() - value.valueOf()) > boundray) {
        listData = [];
      }

      return listData || [];
    },
  },
};
</script>
<style scoped lang="less">
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
