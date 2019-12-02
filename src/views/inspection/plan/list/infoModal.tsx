import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Select,
} from 'ant-design-vue';
import moment from 'moment';
import city from '@/utils/city';

@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-input-group': Input.Group,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-select': Select,
    'a-select-optGroup': Select.OptGroup,
    'a-select-option': Select.Option,
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

  private areaList: { id: number; name: string }[] = [
    {
      id: 1,
      name: '巡检区域1',
    },
    {
      id: 2,
      name: '巡检区域2',
    },
    {
      id: 3,
      name: '巡检区域3',
    },
    {
      id: 4,
      name: '巡检区域4',
    },
  ];

  private roadList: { id: number; name: string }[] = [
    {
      id: 1,
      name: '巡检路线1',
    },
    {
      id: 2,
      name: '巡检路线2',
    },
    {
      id: 3,
      name: '巡检路线3',
    },
    {
      id: 4,
      name: '巡检路线4',
    },
  ];

  private unitList: { id: number; name: string }[] = [
    {
      id: 1,
      name: '天',
    },
    {
      id: 2,
      name: '周',
    },
    {
      id: 3,
      name: '月',
    },
    {
      id: 4,
      name: '季度',
    },
    {
      id: 5,
      name: '年',
    },
  ];

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

  submit() {
    this.Form.validateFields([], {}, (err: any, values: any) => {
      if (!err) {
        if (this.type === 'add') {
          window.api.baseInfoAdd(values).then((res: any) => {
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
        } else {
          window.api.baseInfoUpdate(values).then((res: any) => {
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
        }
      }
    });
  }

  cancel() {
    this.$emit('close');
  }

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <a-modal
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          <a-form-item {...{ props: this.formItemLayout }} label='计划名称'>
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [{ required: true, message: '请输入巡检计划名称' }],
            })(<a-input placeholder='请输入巡检计划名称'></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label='巡检区域'>
            {getFieldDecorator('area', {
              initialValue: this.data.area,
              rules: [{ required: true, message: '请选择所属巡检区域' }],
            })(
              <a-select placeholder='请选择所属巡检区域'>
                {this.areaList.map((item: { id: number; name: string }, i: number) => (
                  <a-select-option key={(i + 9).toString(36) + i} value={item.id}>
                    {item.name}
                  </a-select-option>
                ))}
              </a-select>,
            )}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label='巡检路线'>
            {getFieldDecorator('road', {
              initialValue: this.data.road,
              rules: [{ required: true, message: '请选择巡检路线' }],
            })(
              <a-select placeholder='请选择巡检路线'>
                {this.roadList.map((item: { id: number; name: string }, i: number) => (
                  <a-select-option key={(i + 9).toString(36) + i} value={item.id}>
                    {item.name}
                  </a-select-option>
                ))}
              </a-select>,
            )}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label='巡检人'>
            {getFieldDecorator('person', {
              initialValue: this.data.person,
              rules: [{ required: true, message: '请选择巡检人' }],
            })(<a-input placeholder='输入搜索巡检人'></a-input>)}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label='开始时间'>
            {getFieldDecorator('startTime', {
              initialValue: this.data.startTime,
              rules: [{ required: true, message: '请选择巡检开始时间' }],
            })(
              <a-date-picker
                format='YYYY-MM-DD HH:mm:ss'
                style='width: 100%'
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />,
            )}
          </a-form-item>
          <a-form-item {...{ props: this.formItemLayout }} label='巡检周期'>
            <a-input-group compact>
              {getFieldDecorator('cycleNum', {
                initialValue: this.data.cycleNum,
                rules: [{ required: true, message: '请输入周期频率' }],
              })(<a-input style='width:40%' defaultValue='请输入周期频率'></a-input>)}
              {getFieldDecorator('cycleUnit', {
                initialValue: this.data.cycleUnit,
                rules: [{ required: true, message: '请选择周期单位' }],
              })(
                <a-select style='width: 150px' placeholder='请选择周期单位'>
                  {this.unitList.map((item: { id: number; name: string }, i: number) => (
                    <a-select-option key={(i + 9).toString(36) + i} value={item.id}>
                      {item.name}
                    </a-select-option>
                  ))}
                </a-select>,
              )}
            </a-input-group>
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
