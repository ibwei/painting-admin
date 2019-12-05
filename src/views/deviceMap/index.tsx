/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator';
import { Tag, Popover, Tree, Button, Collapse, Modal, Icon, Table, Drawer, Switch } from 'ant-design-vue';
import './index.less';
import { loadBmap } from '@/utils/index';
// @ts-ignore
import vCollapse from './components/vCollapse.vue';
import addDevice from './components/addDevice';
import addFacilities from './components/addFacilities';
import addLine from './components/addLine';
import Device from '../device/deviceList/index';


function DangerOverlay(center: any, length: any) {
  // @ts-ignore
  this._center = center;
  // @ts-ignore
  this._length = length;
}

@Component({
  name: 'monitor',
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
    addDevice,
    vCollapse,
    addFacilities,
    addLine,
  },
})
export default class DeviceMap extends Vue {
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

  created() {
    this.$nextTick(() => {
      loadBmap().then((BMap: any) => {
        this.BMap = BMap;
        this.map = new BMap.Map('monitor-map'); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(106.514, 29.558), 13); // 初始化地图,设置中心点坐标和地图级别
        this.map.enableDragging();
        this.map.enableScrollWheelZoom();
        this.map.enableDoubleClickZoom();
        this.map.enableContinuousZoom();
        this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
      });
    });
  }
  onClose() {
    this.drawerVisible = false;
  }

  openArea(prefix: string) {
    this.title = prefix + "区域";
    this.drawerVisible = true;
  }
  openLine(prefix: string) {
    this.title = prefix + "管道";
    this.drawerVisible = true;
  }
  openFicilities(prefix: string) {
    this.title = prefix + "设施";
    this.drawerVisible = true;
  }
  openDevice(prefix: string) {
    this.title = prefix + "设备";
    this.drawerVisible = true;
  }

  selected: boolean = false;

  lineChecked: boolean = false;

  facilitiesChecked: boolean = false;

  deviceChecked: boolean = false;

  onSwitchChange(type: string) {
    if (type === '管道') {
      this.lineChecked = !this.lineChecked;
    } else if (type === '设施') {
      this.facilitiesChecked = !this.facilitiesChecked;
    } else {
      this.deviceChecked = !this.deviceChecked;
    }
  }

  changeMouse(url: any, type: any) {
    this.currentIconUrl = url;
    this.addType = type;
    this.map.addEventListener('click', this.addAndOpenDrawer);
    this.map.setDefaultCursor(`url(${url}),auto`)
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  //新建标点并且打开新增抽屉栏
  addAndOpenDrawer(e: any) {
    this.currentPoint = e.point;
    this.currentIcon = new this.BMap.Icon(
      this.currentIconUrl,
      new this.BMap.Size(32, 32),
    );

    this.marker = new this.BMap.Marker(this.currentPoint, {
      icon: this.currentIcon,
    });

    this.map.addOverlay(this.marker);
    // @ts-ignore
    this.marker.setAnimation(BMAP_ANIMATION_DROP);

    //弹出菜单后清楚事件
    this.openDevice(this.addType);
    document.body.style.cursor = '';
    this.map.setDefaultCursor('')
    this.map.removeEventListener('click', this.addAndOpenDrawer);

  }

  render() {
    return (
      <div class="monitor-wrap">
        <div id="monitor-map"></div>
        <div class="statistics">
          <v-collapse on-changeMouse={this.changeMouse}></v-collapse>
        </div>
        <a-drawer
          width="450px"
          title={"新增" + this.addType}
          placement="right"
          closable={false}
          on-close={this.onClose}
          visible={this.drawerVisible}
        >
          {this.addType === "设备" ? (
            <add-device data={this.data} on-add={this.closeDrawer} on-close={this.closeDrawer} />) : ''
          }
          {
            this.addType === "设施" ? (
              <add-facilities data={this.data} on-add={this.closeDrawer} on-close={this.closeDrawer} />) : ''
          }
          {
            this.addType === "管道" ? (
              <add-line data={this.data} on-add={this.closeDrawer} on-close={this.closeDrawer} />) : ''
          }
        </a-drawer>
      </div>
    );
  }
}
