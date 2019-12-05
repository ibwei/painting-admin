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
  @Prop() title!: string;

  @Prop() visible!: boolean;

  @Prop() type!: string;

  @Prop() data!: any;

  @Watch('visible')
  protected valueWatch(newV: any, oldV: any) {
    if (newV === true) {
      this.deviceArray = this.data.relativeDevice.map((item: any) => {
        return item.name;
      });
    }
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  areaArray: Array<string> = ['隐患1', '隐患2', '隐患3', '隐患4'];
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
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api
            .facilitiesBaseInfoUpdate({
              id: this.data.id,
              relativeDevice: this.relativeResult,
              ...values,
            })
            .then((res: any) => {
              const {
                result: { resultCode, resultMessage },
              } = res.data;
              if (!resultCode) {
                this.$message.success(resultMessage);
                this.Form.resetFields();
                this.$emit('success');
              } else {
                this.$message.error(resultMessage);
              }
            });
        } else if (this.type === 'add') {
          window.api
            .facilitiesBaseInfoAdd({ relativeDevice: this.relativeResult, ...values })
            .then((res: any) => {
              const {
                err_code,
                result: { resultMessage },
              } = res.data;
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

  render() {
    const { getFieldDecorator } = this.Form;
    const area = this.areaArray.map((item, index) => {
      return (
        <a-select-option key={(index + 9).toString(36) + index} value={item}>
          {item}
        </a-select-option>
      );
    });

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

    return (
      <a-modal
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          <a-form-item {...{ props: this.formItemLayout }} label="隐患名称">
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [{ required: true, message: '请输入隐患名称' }],
            })(<a-input placeholder="请输入隐患名称"></a-input>)}
          </a-form-item>
          {this.data.status !== 0 ? (<div>
            <a-form-item {...{ props: this.formItemLayout }} label="隐患详情">
              {getFieldDecorator('detail', {
                initialValue: this.data.detail,
                rules: [{ required: true, message: '请填写隐患详情' }],
              })(<a-input placeholder="请填写隐患详情" type="textarea"></a-input>)}
            </a-form-item>
            <a-form-item {...{ props: this.formItemLayout }} label="隐患图片">
              <div>
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
              </div>
            </a-form-item>
          </div>) : ''}
          <a-form-item {...{ props: this.formItemLayout }} label="处理详情">
            {getFieldDecorator('detail', {
              initialValue: this.data.detail,
              rules: [{ required: true, message: '请填写处理隐患详情' }],
            })(<a-input placeholder="请填写处理隐患详情" type="textarea"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="处理图片">
            <div>
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
            </div>
          </a-form-item>

          <a-form-item {...{ props: this.formItemLayout }} label="状态">
            {getFieldDecorator('status', {
              initialValue: this.data.status,
            })(
              this.data.status !== 0 ? (
                <div>
                  <a-button onClick={this.submit} type="primary" style={{ marginRight: '20px' }}>
                    已经处理
                  </a-button>
                </div>
              ) : ''
            )}
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
