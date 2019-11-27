/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { loadBmap } from '@/utils/index';
import {
  Modal, Form, Input, Radio, DatePicker, InputNumber, Cascader, Select
} from 'ant-design-vue';

import './index.less';



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
  },
  props: {
    Form,
  },
})
class InfoModal extends Vue {
  @Prop() title!: string;

  @Prop() visible!: boolean;

  @Prop() type!: string;

  @Prop() data!: any;

  @Prop() position: any;

  @Prop() deviceName: any;

  @Watch('visible')

  protected valueWatch(newV: any, oldV: any) {
    if (newV === true) {
      const point = new this.BMap.Point(this.data.position.x, this.data.position.y);
      this.map.removeOverlay(this.marker);
      this.marker = new this.BMap.Marker(point, { offset: new this.BMap.Size(200, 100) });
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


  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  }

  // 地图方法类
  created() {
    this.$nextTick(() => {
      loadBmap().then((BMap: any) => {
        this.BMap = BMap;
        this.map = new BMap.Map('editmap');    // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(this.data.position.x, this.data.position.y), 12);  // 初始化地图,设置中心点坐标和地图级别
        this.map.setCurrentCity('北京');          // 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true);
        this.marker = new BMap.Marker(new BMap.Point(this.data.position.x, this.data.position.y), { offset: new this.BMap.Size(10, 10) });  // 创建标注     
        this.map.addOverlay(this.marker);
        this.map.addEventListener('click', this.mapClick);
        // @ts-ignore
        this.marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      });
    })
  }

  //点击地图触发
  mapClick(e: any) {
    let point = new this.BMap.Point(e.point.lng, e.point.lat);
    this.map.removeOverlay(this.marker);
    this.marker = new this.BMap.Marker(point, { offset: new this.BMap.Size(10, 10) });
    this.map.addOverlay(this.marker);
    // @ts-ignore
    this.marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    this.map.setCenter(point);
    this.data.position = { x: e.point.lng, y: e.point.lat };
  }

  typeArray: Array<string> = ['类型1', '类型2', '类型3', '类型4'];
  areaArray: Array<string> = ['区域1', '区域2', '区域3', '区域4'];
  facilitiesArray: Array<string> = ['设施1', '设施2', '设施3', '设施4'];

  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api.deviceBaseInfoUpdate({ id: this.data.id, position: this.data.position, ...values }).then((res: any) => {
            const { result: { resultCode, resultMessage } } = res.data;
            if (!resultCode) {
              this.$message.success(resultMessage);
              this.Form.resetFields();
              this.$emit('success');
            } else {
              this.$message.error(resultMessage);
            }
          });
        } else if (this.type === 'add') {
          window.api.deviceBaseInfoAdd(values).then((res: any) => {
            const { err_code, result: { resultMessage } } = res.data;
            if (!err_code) {
              this.$message.success(resultMessage);
              this.Form.resetFields();
              this.$emit('success');
            } else {
              this.$message.error(resultMessage);
            }
          });
        }
      }
    });
  }

  cancel() {
    this.$emit('close');
  }
  render() {
    const { getFieldDecorator } = this.Form;
    const selectType = this.typeArray.map((item, index) =>
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>);
    const area = this.typeArray.map((item, index) =>
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>);
    const facilities = this.typeArray.map((item, index) =>
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>);

    return (
      <a-modal
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          <a-form-item
            {...{ props: this.formItemLayout }}
            label="设备名称"
          >
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [
                { required: true, message: '请输入设备名' },
              ],
            })(<a-input placeholder="请输入设备名"></a-input>)}
          </a-form-item>
          <a-form-item
            {...{ props: this.formItemLayout }}
            label="类型"
          >
            {getFieldDecorator('type', {
              initialValue: this.data.type,
              rules: [
                { required: true, message: '请选择类型' },
              ],
            })(
              <a-select size="default" style="width: 200px">
                {selectType}
              </a-select>
            )}
          </a-form-item>
          <a-form-item
            {...{ props: this.formItemLayout }}
            label="所属区域"
          >
            {getFieldDecorator('belongToArea', {
              initialValue: this.data.belongToArea,
              rules: [
                { required: true, message: '请选择所属区域' },
              ],
            })(
              <a-select size="default" style="width: 200px">
                {area}
              </a-select>
            )}
          </a-form-item>
          <a-form-item
            {...{ props: this.formItemLayout }}
            label="所属设施"
          >
            {getFieldDecorator('belongToFacilities', {
              initialValue: this.data.belongToFacilities,
              rules: [
                { required: true, message: '请选择所属设施' },
              ],
            })(
              <a-select size="default" style="width: 200px">
                {facilities}
              </a-select>
            )}
          </a-form-item>
          <a-form-item label="地理位置"
            {...{ props: this.formItemLayout }} >
            <div id='editmap' className='map'></div>
          </a-form-item>
        </a-form>
      </a-modal>
    );
  }
}

export default Form.create({
  props: {
    title: String,
    visible: Boolean,
    type: String,
    data: Object,
  },
})(InfoModal);
