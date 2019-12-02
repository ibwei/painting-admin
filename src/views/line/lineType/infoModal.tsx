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
} from 'ant-design-vue';
import treeSelect from '../../../components/Form/treeSelect';

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
    'a-upload': Upload,
    'a-icon': Icon,
    'i-tree-select': treeSelect,
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
    }
  }

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

  propertyArray: Array<string> = [
    '供配电管道',
    '照明管道',
    '动力管道',
    '弱电管道',
    '空调与通风管道',
    '运输管道',
  ];

  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api.lineTypeBaseInfoUpdate({ id: this.data.id, ...values }).then((res: any) => {
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
          window.api.lineTypeBaseInfoAdd({ ...values }).then((res: any) => {
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
  render() {
    const selectType = this.typeArray.map((item, index) => (
      <a-select-option key={index} value={item}>
        {item}
      </a-select-option>
    ));

    const { getFieldDecorator } = this.Form;

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
          <a-form-item {...{ props: this.formItemLayout }} label="类型名称">
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [{ required: true, message: '请输入管道类型名称' }],
            })(<a-input placeholder="请输入管道类型名称"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="所属类型">
            {getFieldDecorator('type', {
              initialValue: this.data.belongType,
              rules: [{ required: true, message: '请选择类型' }],
            })(<i-tree-select></i-tree-select>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="基础属性1">
            {getFieldDecorator('basicProperty1', {
              initialValue: this.data.basicProperty1,
              rules: [{ required: true, message: '请输入基础属性1' }],
            })(<a-input placeholder="请输入基础属性1"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="基础属性2">
            {getFieldDecorator('basicProperty2', {
              initialValue: this.data.basicProperty1,
              rules: [{ required: true, message: '请输入基础属性2' }],
            })(<a-input placeholder="请输入基础属性2"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="自定义属性1">
            {getFieldDecorator('basicProperty1', {
              initialValue: this.data.ownProperty1,
              rules: [{ required: true, message: '请输入自定义属性1' }],
            })(<a-input placeholder="请输入自定义属性1"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="自定义属性2">
            {getFieldDecorator('ownProperty2', {
              initialValue: this.data.basicProperty1,
              rules: [{ required: true, message: '请输入自定义属性2' }],
            })(<a-input placeholder="请输入自定义属性2"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="类型图片">
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
