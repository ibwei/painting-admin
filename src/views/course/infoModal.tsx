import {Vue, Component, Prop} from 'vue-property-decorator';
import moment from 'moment';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Button,
  Spin,
  Switch,
} from 'ant-design-vue';
// @ts-ignore
import UploadImage from '../../components/UploadImage';

@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-date-picker': DatePicker,
    'a-cascader': Cascader,
    'a-textarea': Input.TextArea,
    'a-spin': Spin,
    'a-switch': Switch,
    UploadImage,
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

  editorOption: any = {};

  formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 4},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 20},
    },
  };

  spinShow: boolean = false;

  url: string = '';

  created() {
    this.url = this.data.url;
  }

  statusChange(e: boolean) {
    this.data.status = e === true ? 1 : 0;
    console.log(this.data);
  }

  submit() {
    this.$props.Form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.type === 'edit') {
          window.api
            .courseUpdate({
              ...values,
              id: this.data.id,
              url: this.url,
              valid_time: this.data.valid_time,
            })
            .then((res: any) => {
              const {resultCode, resultMessage} = res.data;
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
            .courseAdd({
              ...values,
              url: this.url,
              valid_time: this.data.valid_time,
            })
            .then((res: any) => {
              const {resultCode, resultMessage} = res.data;
              if (!resultCode) {
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

  thumbnail: string = '';
  //图片上传完成
  uploaded(e: any) {
    this.url = e;
  }

  dateChange(e: any, dateString: string) {
    console.log(dateString);
    this.data.valid_time = dateString;
    console.log(this.data.valid_time);
  }

  render() {
    const {getFieldDecorator} = this.Form;

    const imageList =
      this.url &&
      this.url
        .split(',')
        .map((item, index) => (
          <img src={item} key={index} width='100px' height='auto' style={{marginRight: '10px'}} />
        ));
    return (
      <a-modal
        width={'650px'}
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          <a-form-item {...{props: this.formItemLayout}} label='课程标题'>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入标题'}],
              initialValue: this.data.name,
            })(
              <a-input placeholder='标题必须包含(课时),如--体验课(三小时),绘画基础课(20课时)'></a-input>,
            )}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='课程分类'>
            {getFieldDecorator('category', {
              initialValue: this.data.category,
              rules: [{required: true, message: '请输入分类'}],
            })(<a-input placeholder='请确保同一个分类的名字一致'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='课程标签'>
            {getFieldDecorator('tags', {
              initialValue: this.data.tags,
              rules: [{required: true, message: '请输入标签'}],
            })(<a-input placeholder='请输入标签,多个标签-分隔'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='课程学费'>
            {getFieldDecorator('tuition', {
              initialValue: this.data.tuition,
              rules: [{required: true, message: '请输入学费'}],
            })(<a-input placeholder='请输入学费'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='课程有效期'>
            <a-date-picker
              onChange={this.dateChange}
              format='YYYY-MM-DD'
              placeholder='请选择有效期'
              defaultValue={moment(
                this.data.valid_time ? this.data.valid_time : moment().format('YYYY-MM-DD'),
              )}
            ></a-date-picker>
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='课程教师'>
            {getFieldDecorator('teacher', {
              initialValue: this.data.teacher,
            })(<a-input placeholder='请输入教师'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='排序权重'>
            {getFieldDecorator('order', {
              initialValue: this.data.order,
            })(<a-input placeholder='请输入权重,值越大,排序越靠前'></a-input>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='课程描述'>
            {getFieldDecorator('desc', {
              initialValue: this.data.desc,
              rules: [{required: true, message: '请输入课程描述'}],
            })(<a-textarea rows={4} placeholder='请输入课程描述'></a-textarea>)}
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='课程缩略图'>
            <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-start'}}>
              {imageList}
              <upload-image pictureLength={1} on-uploaded={this.uploaded}></upload-image>
            </div>
          </a-form-item>
          <a-form-item {...{props: this.formItemLayout}} label='启用'>
            {getFieldDecorator('status', {
              initialValue: this.data.status,
            })(<a-switch checked={Boolean(this.data.status)} onClick={this.statusChange} />)}
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
