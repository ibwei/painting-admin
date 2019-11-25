import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Modal } from 'ant-design-vue';
import coordTrasns from '@/utils/coordTrasns';
import { loadBmap, loadMapInfoBox, loadCanvasLayer } from '@/utils/index';
import './mapModal.less';

@Component({
  name: 'MapModal',
  components: {
    'a-modal': Modal,
  },
})
export default class MapModal extends Vue {
  @Prop() visible?: boolean;

  @Prop() deviceName?: string;

  @Prop() position?: any;

  @Watch('visible')
  protected valueWatch(newV: any, oldV: any) {
    if (newV === true && this.isFirst !== true) {
      const point = new this.BMap.Point(this.$props.position.x, this.$props.position.y);
      console.log(point);
      this.map.removeOverlay(this.marker);
      this.marker = new this.BMap.Marker(point, {
        offset: new this.BMap.Size(220, 150),
        title: this.$props.deviceName,
      });
      this.map.addOverlay(this.marker);
      // @ts-ignore
      this.marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      this.map.setCenter(point);
    }
  }

  map: any = null;

  BMap: any = null;

  // 坐标定位图片
  marker: any = null;

  // 是否首次加载
  isFirst: boolean = true;

  // 百度地图对象
  SMap: any = null;

  // 当前地图对象实例
  SMapZoom: number = 15;

  // 当前地图对象zoom
  geolocationControl: any = null;

  // 定位
  CanvasLayer: any = null;

  //地图方法类
  mapContorl: any = null;

  //坐标
  mapCenter: {
    lat: number;
    lng: number;
  } = {
    lat: 29.563694,
    lng: 106.560421,
  };

  // 地图方法类
  mounted() {
    if (this.isFirst) {
      this.$emit('close');
      loadBmap().then((BMap: any) => {
        this.BMap = BMap;
        this.map = new BMap.Map('modalmap'); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(106.55, 29.57), 14); // 初始化地图,设置中心点坐标和地图级别
        this.map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true);
        this.marker = new BMap.Marker(new BMap.Point(106.55, 29.57)); // 创建标注
        this.map.addOverlay(this.marker);
        // @ts-ignore
        this.isFirst = false;
      });
    }
  }

  handleOk() {
    this.$emit('close');
  }

  render() {
    return (
      <a-modal
        visible={this.$props.visible}
        onOkText="确定"
        centered
        onCancel={this.handleOk}
        footer={null}
      >
        <div className="modal-wrap">
          <div id="modalmap" className="modalmap"></div>
        </div>
      </a-modal>
    );
  }
}
