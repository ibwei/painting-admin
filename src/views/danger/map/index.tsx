/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator';
import {
  Tag,
  Popover,
  Tree,
  Button,
  Collapse,
  Modal,
  Icon,
  Table,
  Drawer,
  Switch,
} from 'ant-design-vue';
import './index.less';
import { loadBmap } from '@/utils/index';
// @ts-ignore

function DangerOverlay(center: any, length: any) {
  // @ts-ignore
  this._center = center;
  // @ts-ignore
  this._length = length;
}

@Component({
  name: 'dangerMap',
  components: {
    'a-tag': Tag,
    'a-popover': Popover,
    'a-button': Button,
    'a-collapse': Collapse,
    'a-collapse-panel': Collapse.Panel,
    'a-modal': Modal,
    'a-table': Table,
    'a-drawer': Drawer,
    'a-tree': Tree,
    'a-icon': Icon,
    'a-switch': Switch,
  },
})

export default class DangerMap extends Vue {
  //百度地图对象
  BMap: any = null;
  //当前地图对象
  map: any = null;
  //当前点
  point: any = null;

  overlay: any = null;

  infoWindow: any = null;

  title: string = '';

  drawerVisible: boolean = false;

  addType: string = '';

  currentIconUrl: string = '';

  currentPoint: any;

  marker: any;

  currentIcon: any;

  data: any = null;

  mounted() {
    this.$nextTick(() => {
      loadBmap().then((BMap: any) => {
        this.BMap = BMap;
        this.map = new BMap.Map('dangermap'); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(106.514, 29.558), 13); // 初始化地图,设置中心点坐标和地图级别
        this.map.enableDragging();
        this.map.enableScrollWheelZoom();
        this.map.enableDoubleClickZoom();
        this.map.enableContinuousZoom();
        this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的

        let point: Array<any> = [new BMap.Point(106.554, 29.576), new BMap.Point(106.51, 29.576), new BMap.Point(106.49, 29.536), new BMap.Point(106.39, 29.516), new BMap.Point(106.60, 29.506), new BMap.Point(106.49, 29.606), new BMap.Point(106.39, 29.606)];

        let point1: Array<any> = [new BMap.Point(106.55, 29.586), new BMap.Point(106.51, 29.576), new BMap.Point(106.39, 29.526), new BMap.Point(106.19, 29.516), new BMap.Point(106.66, 29.536), new BMap.Point(106.40, 29.596), new BMap.Point(106.39, 29.606)];

        let marker: Array<any> = [];






        /* 添加隐患标注 */
        const count = Math.floor(Math.random() * 10 + 5);
        const dangerList = new Array(count).fill(1);
        let dangerPoint: Array<string> = [];
        dangerList.map((item, index) => {
          let x = Math.floor(Math.random() * 1000 + 30);
          let y = Math.floor(Math.random() * 600 + 100);
          dangerPoint[index] =
            `<div class="container1" key=${index} style={{ top: ${y} + "px", left: ${x} + "px" }}>
                          <div class="wave">
                            <div class="circle"></div>
                            <div class="card"></div>
                          </div>
                        </div>`
        });
        DangerOverlay.prototype = new this.BMap.Overlay();
        DangerOverlay.prototype.initialize = function(map: any) {
          this._map = map;
          const div = document.createElement("div");
          div.style.position = "absolute";
          div.style.zIndex = "99999999";
          div.innerHTML = dangerPoint[0];
          map.getPanes().labelPane.appendChild(div);
          this._div = div;
          return div;
        }

        DangerOverlay.prototype.draw = function() {
          // 根据地理坐标转换为像素坐标，并设置给容器 
          const position = this._map.pointToOverlayPixel(this._center);
          this._div.style.left = position.x - this._length / 2 + "px";
          this._div.style.top = position.y - this._length / 2 + "px";
        }

        let myDangerList: Array<any> = [];
        point1.forEach((item, index) => {
          // @ts-ignore
          myDangerList[index] = new DangerOverlay(item, 100);
          this.map.addOverlay(myDangerList[index]);
        })
      });
    });
  }
  onClose() {
    this.drawerVisible = false;
  }


  openInfo(point: any) {
    const sContent = '<div class="infowindow"><div class="left">发送消息</div><div class="right">新增临时任务</div></div>';
    this.infoWindow = new this.BMap.InfoWindow(sContent);  // 创建信息窗口对象
    this.map.openInfoWindow(this.infoWindow, point);
  }

  selected: boolean = false;

  lineChecked: boolean = false;

  facilitiesChecked: boolean = false;

  deviceChecked: boolean = false;

  changeMouse(url: any, type: any) {
    this.currentIconUrl = url;
    this.addType = type;
    this.map.addEventListener('click', this.addAndOpenDrawer);
    this.map.setDefaultCursor(`url(${url}),auto`);
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  //新建标点并且打开新增抽屉栏
  addAndOpenDrawer(e: any) {
    this.currentPoint = e.point;
    this.currentIcon = new this.BMap.Icon(this.currentIconUrl, new this.BMap.Size(32, 32));

    this.marker = new this.BMap.Marker(this.currentPoint, {
      icon: this.currentIcon,
    });

    this.map.addOverlay(this.marker);
    // @ts-ignore
    this.marker.setAnimation(BMAP_ANIMATION_DROP);

    //弹出菜单后清楚事件
    document.body.style.cursor = '';
    this.map.setDefaultCursor('');
    this.map.removeEventListener('click', this.addAndOpenDrawer);
  }

  render() {
    return (
      <div class='danger-map'>
        <div id='dangermap'></div>
        <div class='map-icon'>hahah</div>
      </div>
    );
  }
}