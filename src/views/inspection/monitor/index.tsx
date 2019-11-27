/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Button, Collapse, Modal, Table } from 'ant-design-vue';
import './index.less';
import { loadBmap } from '@/utils/index';

@Component({
  name: 'monitor',
  components: {
    'a-tag': Tag,
    'a-popover': Popover,
    'a-button': Button,
    'a-collapse': Collapse,
    'a-modal': Modal,
    'a-table': Table,
  },
})
export default class Monitor extends Vue {
  //百度地图对象
  BMap: any = null;
  //当前地图对象
  map: any = null;

  marker: any = null;
  created() {
    this.$nextTick(() => {
      loadBmap().then((BMap: any) => {
        this.BMap = BMap;
        this.map = new BMap.Map('monitor-map'); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(106.544, 29.578), 12); // 初始化地图,设置中心点坐标和地图级别
        this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true);

        let point = new BMap.Point(106.554, 29.576);
        let icon = new BMap.Icon(require('../../../assets/people.png'), new BMap.Size(48, 48));
        this.marker = new BMap.Marker(point, {
          icon,
        }); // 创建标注
        this.map.addOverlay(this.marker); // 将标注添加到地图中
      });
    });
  }

  render() {
    return (
      <div class="monitor-wrap">
        <div id="monitor-map"></div>
        <div class="statistics">
          <span class="people">当前巡检人数 : 65</span>
          <span class="current-warn">
            今日隐患数量 : <span style="color:red;">14</span>
          </span>
          <span class="all-warn">
            总隐患数量: <span style="color:red;">1666</span>
          </span>
        </div>
      </div>
    );
  }
}
