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
  //当前点
  point: any = null;

  overlay: any = null;

  infoWindow: any = null;

  created() {
    this.$nextTick(() => {
      loadBmap().then((BMap: any) => {
        this.BMap = BMap;
        this.map = new BMap.Map('monitor-map'); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(106.514, 29.558), 13); // 初始化地图,设置中心点坐标和地图级别
        this.map.disableDragging();
        this.map.disableScrollWheelZoom();
        this.map.disableDoubleClickZoom();
        this.map.disableContinuousZoom()


        this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
        this.map.setMapStyle({
          style: 'light'
        })
        // this.map.enableScrollWheelZoom(true);


        let point: Array<any> = [new BMap.Point(106.554, 29.576), new BMap.Point(106.51, 29.576), new BMap.Point(106.49, 29.536), new BMap.Point(106.39, 29.516), new BMap.Point(106.60, 29.506), new BMap.Point(106.49, 29.606), new BMap.Point(106.39, 29.606)];
        let marker: Array<any> = [];


        let icon = new BMap.Icon(
          require('../../../assets/fix-man.png'),
          new BMap.Size(64, 64),
        );

        point.forEach((item, index) => {
          marker[index] = new BMap.Marker(item, {
            icon,
          }); // 创建标注
          this.map.addOverlay(marker[index]);
          // @ts-ignore
          marker[index].setAnimation(BMAP_ANIMATION_DROP);
          marker[index].addEventListener('click', this.openInfo.bind(this, item))
        })

      });
    });
  }

  openInfo(point: any) {
    console.log('haha');
    const sContent = '<div class="infowindow"><div class="left">发送消息</div><div class="right">新增临时任务</div></div>';
    this.infoWindow = new this.BMap.InfoWindow(sContent);  // 创建信息窗口对象
    this.map.openInfoWindow(this.infoWindow, point);
  }




  render() {
    const count = Math.floor(Math.random() * 10 + 5);
    const dangerList = new Array(count).fill(1);
    const dangerPoint = dangerList.map((item, index) => {
      let x = Math.floor(Math.random() * 1000 + 30);
      let y = Math.floor(Math.random() * 600 + 100);
      return (
        <div class="container1" key={index} style={{ top: y + "px", left: x + "px" }}>
          <div class="wave">
            <div class="circle"></div>
            <div class="card"></div>
          </div>
        </div>
      )
    });

    return (
      <div class="monitor-wrap">
        <div id="monitor-map"></div>
        <div class="statistics">
          <span class="people">当前巡检人数 : 65</span>
          <span class="current-warn">
            今日隐患数量 : <span style="color:red;">{count}</span>
          </span>
          <span class="all-warn">
            总隐患数量: <span style="color:red;">1666</span>
          </span>
        </div>
        {dangerPoint}
      </div>
    );
  }
}
