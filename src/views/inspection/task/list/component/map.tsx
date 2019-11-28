import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { loadBmap, loadMapInfoBox, loadCanvasLayer } from '@/utils/index';
import './map.less';

@Component({
  name: 'myMap',
})
export default class myMap extends Vue {
  $map: any;

  map: any;

  // 地图方法类
  mounted() {
    loadBmap().then((BMap: any) => {
      this.$map = new BMap.Map('myMap');
      this.$map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
      this.$map.enableScrollWheelZoom();

      const sy = new BMap.Symbol(6, {
        scale: 0.6, //图标缩放大小
        strokeColor: '#fff', //设置矢量图标的线填充颜色
        strokeWeight: '2', //设置线宽
      });
      const icons = new BMap.IconSequence(sy, '10', '30');
      // 创建polyline对象
      const pois = [
        new BMap.Point(116.350658, 39.938285),
        new BMap.Point(116.386446, 39.939281),
        new BMap.Point(116.389034, 39.913828),
        new BMap.Point(116.442501, 39.914603),
      ];
      const polyline = new BMap.Polyline(pois, {
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: '8', //折线的宽度，以像素为单位
        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
        strokeColor: 'red', //折线颜色
      });
      //   const polyline = new BMap.Polyline(
      //     [
      //       new BMap.Point(116.399, 39.91),
      //       new BMap.Point(116.405, 39.92),
      //       new BMap.Point(116.423493, 39.907445),
      //     ],
      //     { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5 },
      //   );
      this.$map.addOverlay(polyline);
    });
  }

  render() {
    return <div id="myMap" class="myMap"></div>;
  }
}
