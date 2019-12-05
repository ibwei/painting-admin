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
  Upload,
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
    'a-upload': Upload,
  },
  props: {
    Form,
  },
})
class InfoModal extends Vue {

  map: any = null;

  BMap: any = null;

  data: any = {
    basicProperty1: '',
    basicProperty2: '',
    ownProperty1: '',
    ownProperty2: '',
  }

  position: { x: number, y: number } = {
    x: 106.5656,
    y: 36.5656565,
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

  areaArray: Array<string> = ['区域1', '区域2', '区域3', '区域4'];
  deviceArray: Array<any> = [];
  relativeResult: Array<any> = [];
  deviceArrayList: Array<any> = [
    '设备1',
    '设备2',
    '设备3',
    '设备4',
    '设备5',
    '设备6',
    '设备7',
    '设备8',
  ];
  propertyArray: Array<string> = [
    '供配电设备',
    '照明设备',
    '动力设备',
    '弱电设备',
    '空调与通风设备',
    '运输设备',
  ];

  submit() {

  }

  add() {
    this.$emit('add')
  }

  cancel() {
    this.$emit('close');
  }

  // 地图方法类
  relativeDeviceChange(e: any) {
    this.relativeResult = [];
    e.map((item: any) => {
      this.relativeResult.push({ name: item });
    });
    console.log(this.relativeResult);
  }

  previewVisible: boolean = true;
  previewImage: string = '';
  fileList: any = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://i0.sinaimg.cn/dy/c/sd/2012-04-01/U7815P1T1D24212000F21DT20120401172319.jpg',
    },
  ];

  hideThumbnail() {
    this.previewVisible = false;
  }

  handlePreview(file: any) {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  // @ts-ignore
  handleChange({ fileList }) {
    this.fileList = fileList;
  }
  typeArray: Array<string> = ['设施类型1', '设施类型2', '设施类型3', '设施类型4'];

  showMap() {
    this.$emit('showMap')
  }

  render() {
    const { getFieldDecorator } = this.Form;
    const area = this.areaArray.map((item, index) => {
      return (
        <a-select-option key={(index + 9).toString(36) + index} value={item}>
          {item}
        </a-select-option>
      );
    });

    const selectType = this.typeArray.map((item, index) => (
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>
    ));

    const device = this.deviceArrayList.map((item, index) => {
      return (
        <a-select-option key={(index + 9).toString(36) + index} value={item}>
          {item}
        </a-select-option>
      );
    });

    const plus = () => {
      return (
        <div>
          <a-icon type="picture" />
          <div class="ant-upload-text">上传图片</div>
        </div>
      );
    };



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
          <a-form-item {...{ props: this.formItemLayout }} label="设施名称">
            <a-input placeholder="请输入设施名称"></a-input>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="所属区域">
            <a-select size="default" style="width: 200px">
              {area}
            </a-select>,
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="设施类型">
            <a-tree-select></a-tree-select>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="关联设备">
            <a-select
              mode="multiple"
              size="default"
              defaultValue={this.deviceArray}
              onChange={this.relativeDeviceChange}
            >
              {device}
            </a-select>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="设施图片">
            <div>
              <a-upload
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                showUploadList={true}
                fileList={this.fileList}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
              >
                {plus}
                <a-modal visible={this.previewVisible} footer={null} onCancel={this.hideThumbnail}>
                  <img alt="example" style={{ width: '100%' }} src={this.previewImage} />
                </a-modal>
              </a-upload>
            </div>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="设施地理位置">
            <a-input placeholder="地理位置" value={'经度：' + this.position.x + ',纬度：' + this.position.y}></a-input>
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
    data: Object,
  },
})(InfoModal);
