import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Modal } from 'ant-design-vue';
import { loadBmap, loadMapCurveLine } from '@/utils/index';
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
    loadBmap().then((BMap: any) => {
      loadMapCurveLine().then(() => {
        this.BMap = BMap;
        this.map = new BMap.Map('line'); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(106.55, 29.57), 16); // 初始化地图,设置中心点坐标和地图级别
        this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true);
        // const oval = new this.BMap.Polygon(this.add_oval(new BMap.Point(106.55, 29.57), 0.1, 0.3), { strokeColor: '#409EFF', strokeWeight: 6, strokeOpacity: 0.5 });
        const oval = new this.BMap.Circle(new this.BMap.Point(106.55, 29.57), 1000, {
          strokeColor: '#409EFF',
          fillColor: '#409EFF',
          strokeStyle: 'solid',
          llOpacity: '0.3',
        });

        let point = new BMap.Point(106.556, 29.576);
        let marker = new BMap.Marker(point); // 创建标注
        this.map.addOverlay(marker); // 将标注添加到地图中
        // @ts-ignore
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        this.map.addOverlay(marker);
        point = new BMap.Point(106.553, 29.5701);
        marker = new BMap.Marker(point); // 创建标注
        this.map.addOverlay(marker); // 将标注添加到地图中
        // @ts-ignore
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        point = new BMap.Point(106.549993, 29.569999);
        marker = new BMap.Marker(point); // 创建标注
        this.map.addOverlay(marker); // 将标注添加到地图中
        // @ts-ignore
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        point = new BMap.Point(106.54666, 29.570001);
        marker = new BMap.Marker(point); // 创建标注
        this.map.addOverlay(marker); // 将标注添加到地图中
        this.map.addOverlay(marker);
        // @ts-ignore
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        this.map.addOverlay(oval);
      });
    });
  }

  add_oval(centre: any, x: number, y: number) {
    const assemble = [];
    let angle;
    let dot;
    const tangent = x / y;
    for (let i = 0; i < 10; i++) {
      angle = ((2 * Math.PI) / 36) * i;
      dot = new this.BMap.Point(
        centre.lng + Math.sin(angle) * y * tangent,
        centre.lat + Math.cos(angle) * y,
      );
      assemble.push(dot);
    }
    return assemble;
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
        width={860}
        onCancel={this.handleOk}
        footer={null}
      >
        <div className="modal-wrap">
          <div id="line" className="line"></div>
        </div>
      </a-modal>
    );
  }
}
