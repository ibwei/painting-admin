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

  @Prop() cancel?: () => {};

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

  polyLines: any;

  edit: boolean = false;

  handleClick() {
    if (!this.edit) {
      this.polyLines.enableEditing();
    } else {
      this.polyLines.disableEditing();
    }
    this.edit = !this.edit;
  }

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
      if (this.$props.position.length === 4) {
        loadBmap().then((BMap: any) => {
          this.BMap = BMap;
          this.map = new BMap.Map('modalmap'); // 创建Map实例
          this.map.centerAndZoom(
            new BMap.Point(this.$props.position[0].x, this.$props.position[0].y),
            17,
          );
          this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
          this.map.enableScrollWheelZoom();
          this.polyLines = new BMap.Polyline(
            [
              new BMap.Point(this.$props.position[1].x, this.$props.position[1].y),
              new BMap.Point(this.$props.position[2].x, this.$props.position[2].y),
              new BMap.Point(this.$props.position[3].x, this.$props.position[3].y),
            ],
            {
              enableEditing: false, //是否启用线编辑，默认为false
              enableClicking: true, //是否响应点击事件，默认为true
              strokeWeight: '8', //折线的宽度，以像素为单位
              strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
              strokeColor: 'red', //折线颜色
            },
          );
          this.map.addOverlay(this.polyLines);
        });
      } else {
        loadBmap().then((BMap: any) => {
          console.log(this.$props.position);
          this.BMap = BMap;
          this.map = new BMap.Map('modalmap'); // 创建Map实例
          this.map.centerAndZoom(
            new BMap.Point(this.$props.position[0].x, this.$props.position[0].y),
            16,
          ); // 初始化地图,设置中心点坐标和地图级别
          this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
          this.map.enableScrollWheelZoom(true);
          const pointer1 = new BMap.Marker(
            new BMap.Point(this.$props.position[4].x, this.$props.position[4].y),
          ); // 创建标注
          const pointer2 = new BMap.Marker(
            new BMap.Point(this.$props.position[1].x, this.$props.position[1].y),
          );
          const pointer3 = new BMap.Marker(
            new BMap.Point(this.$props.position[2].x, this.$props.position[2].y),
          );
          const pointer4 = new BMap.Marker(
            new BMap.Point(this.$props.position[3].x, this.$props.position[3].y),
          );
          this.map.addOverlay(pointer1);
          this.map.addOverlay(pointer2);
          this.map.addOverlay(pointer3);
          this.map.addOverlay(pointer4);
        });
      }
    }
  }

  handleOk() {
    this.$emit('close');
  }

  render() {
    return (
      <a-modal
        visible={this.$props.visible}
        onOkText='确定'
        centered
        onCancel={this.$props.cancel}
        width='800px'
      >
        <div class='modal-wrap'>
          <div id='modalmap' class='modalmap'></div>
          <div class='bj' onClick={this.handleClick}>
            {this.edit ? '关闭编辑' : '开启编辑'}
          </div>
        </div>
      </a-modal>
    );
  }
}
