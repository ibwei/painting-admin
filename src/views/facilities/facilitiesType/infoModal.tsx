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

import './index.less';
import treeSelect from '../../../components/Form/treeSelect';

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
    'a-tree-select': treeSelect,
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
    '供配电设施',
    '照明设施',
    '动力设施',
    '弱电设施',
    '空调与通风设施',
    '运输设施',
  ];

  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api
            .facilitiesTypeBaseInfoUpdate({ id: this.data.id, ...values })
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
          window.api.facilitiesTypeBaseInfoAdd({ ...values }).then((res: any) => {
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
      url:
        'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=3b5ef52cb07eca8012053ee1a918f0e0/ac4bd11373f08202d3e0c2304bfbfbedab641b4a.jpg',
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
          <a-form-item {...{ props: this.formItemLayout }} label="设施类型名称">
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [{ required: true, message: '请输入设施类型名称' }],
            })(<a-input placeholder="请输入设施类型名"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="所属设施类型">
            {getFieldDecorator('type', {
              initialValue: this.data.name,
              rules: [{ required: true, message: '请选择设施所属类型名称' }],
            })(<a-tree-select></a-tree-select>)}
          </a-form-item>

          <a-form-item {...{ props: this.formItemLayout }} label="自定义属性1">
            {getFieldDecorator('property1', {
              initialValue: this.data.property1,
              rules: [{ required: false, message: '请输入属性1' }],
            })(<a-input placeholder="请输入属性1"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="自定义属性2">
            {getFieldDecorator('property2', {
              initialValue: this.data.property2,
              rules: [{ required: false, message: '请输入属性2' }],
            })(<a-input placeholder="请输入属性2"></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label="设施类型图标">
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
