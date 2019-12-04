/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { loadBmap } from '@/utils/index';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Select,
  Button,
} from 'ant-design-vue';

import './addDevice.less';
import treeSelect from '@/components/Form/treeSelect';
import fourSelect from '@/components/Form/fourSelect';

@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-date-picker': DatePicker,
    'a-cascader': Cascader,
    'a-tree-select': treeSelect,
    'four-select': fourSelect,
    'a-button': Button,
  },
  props: {
    Form,
  },
})
class InfoModal extends Vue {




  @Prop() position: any;


  map: any = null;

  BMap: any = null;

  data: any = {
    basicProperty1: '',
    basicProperty2: '',
    ownProperty1: '',
    ownProperty2: '',
  }


  // 坐标定位图片
  marker: any = null;

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  // 地图方法类
  created() {
    this.$nextTick(() => {
      loadBmap().then((BMap: any) => {
        this.BMap = BMap;
        this.map = new BMap.Map('editmap'); // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(106.486404, 29.611018), 12); // 初始化地图,设置中心点坐标和地图级别
        this.map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true);
        this.marker = new BMap.Marker(new BMap.Point(this.data.position.x, this.data.position.y), {
          offset: new this.BMap.Size(10, 10),
        }); // 创建标注
        this.map.addOverlay(this.marker);
        this.map.addEventListener('click', this.mapClick);
      });
    });
  }

  //点击地图触发
  mapClick(e: any) {
    let point = new this.BMap.Point(e.point.lng, e.point.lat);
    this.map.removeOverlay(this.marker);
    this.marker = new this.BMap.Marker(point, { offset: new this.BMap.Size(10, 10) });
    this.map.addOverlay(this.marker);
    this.map.setCenter(point);
    this.data.position = { x: e.point.lng, y: e.point.lat };
  }

  typeArray: Array<string> = ['类型1', '类型2', '类型3', '类型4'];
  areaArray: Array<string> = ['区域1', '区域2', '区域3', '区域4'];
  facilitiesArray: Array<string> = ['设施1', '设施2', '设施3', '设施4'];

  submit() {

  }

  add() {
    this.$emit('add')
  }

  cancel() {
    this.$emit('close');
  }
  render() {
    const { getFieldDecorator } = this.Form;
    const selectType = this.typeArray.map((item, index) => (
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>
    ));
    const area = this.typeArray.map((item, index) => (
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>
    ));
    const facilities = this.typeArray.map((item, index) => (
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>
    ));
    return (
      <div
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          <a-form-item {...{ props: this.formItemLayout }} label="设备名称">
            <a-input placeholder="请输入设备名"></a-input>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="设备类型">
            <a-tree-select></a-tree-select>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="所属区域">
            <a-select size="default" style="width: 200px">
              {area}
            </a-select>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="所属设施">
            <a-select size="default" style="width: 200px">
              {facilities}
            </a-select>
          </a-form-item>
          <four-select openType={'list'} formItemLayout={this.formItemLayout} data={this.data}></four-select>
          <div class="button-group">
            <a-button type="primary" onClick={this.add}>确认</a-button>
            <a-button onClick={this.cancel}>取消</a-button>
          </div>
        </a-form>

      </div>
    );
  }
}

export default Form.create({
  props: {
    position: Object,
    data: Object,
  },
})(InfoModal);
