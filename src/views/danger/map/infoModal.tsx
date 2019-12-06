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

  cancel() {
    this.$emit('close');
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
      <div class="infomodal">
        <a-form>
          <a-form-item {...{ props: this.formItemLayout }} label="隐患名称">
            <a-input placeholder="请输入隐患名称" value={"水表故障"}></a-input>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="隐患详情">
            <a-input placeholder="请填写隐患详情" value={"水表指针不能正常运转"} type="textarea"></a-input>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="隐患图片">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              showUploadList={true}
              fileList={this.fileList}
              action="http://img5.imgtn.bdimg.com/it/u=1178834295,1192804106&fm=11&gp=0.jpg"
              onChange={this.handleChange}
            >
              {plus}
              <a-modal visible={this.previewVisible} footer={null} onCancel={this.hideThumbnail}>
                <img alt="example" style={{ width: '100%' }} src={this.previewImage} />
              </a-modal>
            </a-upload>
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="上报日期">
            <a-input placeholder="" type="input" value={"2019-12-11 08:12:11"}></a-input>
          </a-form-item>
          <div class="button-group">
            <a-button onClick={this.cancel}>关闭</a-button>
          </div>




        </a-form>
      </div>
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
