import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Modal, Button } from 'ant-design-vue';
import { loadBmap, loadMapCurveLine, loadDrawingManager } from '@/utils/index';
import './mapModal.less';

@Component({
  name: 'MapModal',
  components: {
    'a-modal': Modal,
    'a-button': Button,
  },
})
export default class MapModal extends Vue {
  @Prop() visible?: boolean;

  @Prop() position?: any;

  @Prop() type?: string;

  @Prop() openType?: string;

  map: any = null;

  BMap: any = null;

  // 坐标定位图片
  marker: any = null;

  //覆盖物数组
  overlayList: Array<any> = [];

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
        this.map.centerAndZoom(new BMap.Point(106.544, 29.578), 15); // 初始化地图,设置中心点坐标和地图级别
        this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true);
        if (this.$props.openType === 'read') {
          if (this.$props.type === '圆形') {
            // const oval = new this.BMap.Polygon(this.add_oval(new BMap.Point(106.55, 29.57), 0.1, 0.3), { strokeColor: '#409EFF', strokeWeight: 6, strokeOpacity: 0.5 });
            const oval = new this.BMap.Circle(new this.BMap.Point(106.54, 29.58), 1000, {
              strokeColor: '#409EFF',
              fillColor: '#409EFF',
              strokeStyle: 'solid',
              llOpacity: '0.3',
            });
            this.map.addOverlay(oval);
          } else if (this.$props.type === '多边形') {
            const line = new this.BMap.Polyline(
              [
                new this.BMap.Point(106.5566, 29.57),
                new this.BMap.Point(106.5566, 29.58),
                new this.BMap.Point(106.54, 29.58),
                new this.BMap.Point(106.54, 29.57),
                new this.BMap.Point(106.5566, 29.57),
              ],
              1000,
              {
                strokeColor: '#409EFF',
                fillColor: '#409EFF',
                strokeStyle: 'solid',
                llOpacity: '0.3',
                strokeWeight: 6,
              },
            );
            this.map.addOverlay(line);
          } else {
            const icon = new BMap.Icon(
              require('../../../assets/danger.png'),
              new BMap.Size(64, 64),
            );

            this.map.centerAndZoom(new BMap.Point(106.544, 29.578), 13);

            const marker: Array<any> = [];
            const point = [
              new this.BMap.Point(106.56, 29.54),
              new this.BMap.Point(106.55, 29.59),
              new this.BMap.Point(106.52, 29.57),
            ];
            point.forEach((item, index) => {
              marker[index] = new BMap.Marker(item, {
                icon,
              }); // 创建标注
              this.map.addOverlay(marker[index]);
              // @ts-ignore
              marker[index].setAnimation(BMAP_ANIMATION_DROP);
            });
          }
        } else {
          loadDrawingManager().then(() => {
            this.overlayList = [];
            const overlaycomplete = (e: any) => {
              this.overlayList.push(e.overlay);
            };
            const styleOptions = {
              strokeColor: 'red', //边线颜色。
              fillColor: 'red', //填充颜色。当参数为空时，圆形将没有填充效果。
              strokeWeight: 3,
              strokeOpacity: 0.8,
              fillOpacity: 0.6,
              strokeStyle: 'solid',
            };
            // @ts-ignore
            const drawingManager = new BMapLib.DrawingManager(this.map, {
              isOpen: false, //是否开启绘制模式
              enableDrawingTool: true, //是否显示工具栏
              drawingToolOptions: {
                // @ts-ignore
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
              },
              circleOptions: styleOptions,
              polylineOptions: styleOptions,
              polygonOptions: styleOptions,
              rectangleOptions: styleOptions,
            });
            drawingManager.addEventListener('overlaycomplete', overlaycomplete);
          });
        }
      });
    });
  }

  clearAll() {
    for (let i = 0; i < this.overlayList.length; i++) {
      this.map.removeOverlay(this.overlayList[i]);
    }
    this.overlayList = [];
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
        onOkText='确定'
        centered
        width={860}
        onCancel={this.handleOk}
        footer={null}
      >
        <div className='modal-wrap'>
          <div id='line' className='line'></div>
          {this.$props.openType === 'edit' ? (
            <div style='margin-top:20px;' className='bottom-button'>
              <a-button type='primary' onClick={this.clearAll}>
                清空重新选择
              </a-button>
              <a-button style='margin-left:20px;' type='primary'>
                确定选择
              </a-button>
            </div>
          ) : (
            ''
          )}
        </div>
      </a-modal>
    );
  }
}
