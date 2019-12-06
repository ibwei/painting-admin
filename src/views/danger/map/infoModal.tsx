/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Select,
  Upload,
  Icon,
  Button,
  Tag,
} from 'ant-design-vue';

import './index.less';
import './infoModal.less';
@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-button': Button,
    'a-select-option': Select.Option,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-date-picker': DatePicker,
    'a-cascader': Cascader,
    'a-upload': Upload,
    'a-icon': Icon,
    'a-tag': Tag,
  },
  props: {
    Form,
  },
})
class InfoModal extends Vue {
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

  submit() {

  }

  handle() {
    this.$router.push({ path: '/danger/message' })
  }


  previewImage: string = '';
  fileList: any = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://i0.sinaimg.cn/dy/c/sd/2012-04-01/U7815P1T1D24212000F21DT20120401172319.jpg',
    },
  ];



  // @ts-ignore
  handleChange({ fileList }) {
    this.fileList = fileList;
  }

  render() {
    const plus = () => {
      return (
        <div>
          <a-icon type="picture" />
          <div class="ant-upload-text">上传图片</div>
        </div>
      );
    };

    return (
      <a-form>
        <a-form-item {...{ props: this.formItemLayout }} label="隐患名称">
          <div>水表故障</div>
        </a-form-item>
        <a-form-item {...{ props: this.formItemLayout }} label="隐患详情">
          <div>水表不能正常运转</div>

        </a-form-item>
        <a-form-item {...{ props: this.formItemLayout }} label="隐患图片">
          <div>
            <img src="http://img0.imgtn.bdimg.com/it/u=1808649893,1561867321&fm=26&gp=0.jpg" width="200px" height="200px" alt="" />
          </div>
        </a-form-item>
        <a-form-item {...{ props: this.formItemLayout }} label="上报日期">
          <div>2019-12-11 08:12:11</div>
        </a-form-item>
        <div class="button-group">
          <a-button onClick={this.handle}>去处理</a-button>
        </div>
      </a-form>
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
