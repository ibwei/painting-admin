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
} from 'ant-design-vue';
import fourSelect from '@/components/Form/fourSelect';
import './index.less';

@Component({
  components: {
    'a-modal': Modal,
    'a-button': Button,
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
    'a-upload': Upload,
    'a-icon': Icon,
    fourSelect,
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
  typeArray: Array<string> = ['管道类型1', '管道类型2', '管道类型3', '管道类型4'];

  showAreaMap() {
    console.log('hahah')
    this.$emit('show')
  }

  render() {
    const selectType = this.typeArray.map((item, index) => (
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>
    ));
    const { getFieldDecorator } = this.Form;
    const area = this.areaArray.map((item, index) => {
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
          <a-form-item {...{ props: this.formItemLayout }} label="管道名称">
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [{ required: true, message: '请输入管道名称' }],
            })(<a-input placeholder="请输入管道名称"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="所属区域">
            {getFieldDecorator('belongToArea', {
              initialValue: this.data.belongToArea,
              rules: [{ required: true, message: '请选择所属区域' }],
            })(
              <a-select size="default" style="width: 200px">
                {area}
              </a-select>,
            )}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="管道类型">
            {getFieldDecorator('type', {
              initialValue: this.data.type,
              rules: [{ required: true, message: '请选择管道类型' }],
            })(
              <a-select size="default" style="width: 200px">
                {selectType}
              </a-select>,
            )}
          </a-form-item>
          <four-select openType={'list'} formItemLayout={this.formItemLayout} data={this.data}></four-select>

          <a-form-item {...{ props: this.formItemLayout }} label="区域范围">
            {getFieldDecorator('type', {
              initialValue: this.data.type,
              rules: [{ required: true, message: '请选择类型' }],
            })(<a-button onClick={this.showAreaMap}>选取区域范围</a-button>)}
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
