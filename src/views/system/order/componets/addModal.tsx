import { Component, Vue, Prop } from 'vue-property-decorator';
import { Modal, Form, Select, Input, Button, Tag, Radio } from 'ant-design-vue';

@Component({
  name: 'orderdetail',
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button,
    'a-modal': Modal,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-tag': Tag,
    'a-input-group': Input.Group,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
  },
  props: {
    Form,
  },
})
class OrderDetail extends Vue {
  @Prop() visible!: boolean;

  @Prop() title?: string;

  @Prop() width?: string;

  @Prop() data?: any;

  @Prop() special?: any;

  @Prop() handleOk?: () => {};

  @Prop() handkeCancel?: () => {};

  detailVis: boolean = false;

  dataSource: any = [];

  column: any = [];

  handleSelectDetail(data: string[], e?: any) {
    const tmp: any = [];
    const random = Math.floor(Math.random() * 10) + 1;
    const random2 = Math.floor(Math.random() * 10) + 1;
    this.dataSource = tmp;
    data.map((item: any, index: number) =>
      tmp.push({ name: item, type: `类型${index + random}`, area: `区域${index + random2}` }),
    );
    this.detailVis = true;
  }

  handleConfirm() {
    this.detailVis = false;
  }

  handleModalCancel() {
    this.detailVis = false;
  }

  handleDisplay(name: string) {
    if (name === 'xianlu') {
      this.column = [
        { title: '名称', dataIndex: 'name', width: '40%' },
        { title: '区域', dataIndex: 'area', width: '40%' },
      ];
    } else {
      this.column = [{ title: '姓名', dataIndex: 'name', width: '40%' }];
    }
    window.api.inspectRoad({ page: 1, size: 100 }).then(({ data }) => {
      this.handleSelectDetail(data.entity.data[0][name]);
    });
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div>
        <a-modal
          visible={this.$props.visible}
          onOk={this.$props.handleOk}
          onCancel={this.$props.handkeCancel}
          width={this.$props.width}
          title={'发票信息'}
          okText={this.special ? '确认已开票' : '确定'}
        >
          <div Style={{ padding: '15px' }}>
            {console.log(this.$props.special)}
            {this.$props.special ? (
              <a-form>
                <a-form-item props={{ ...this.formItemLayout }} label='公司名称'>
                  <a-input-group compact>
                    {getFieldDecorator('gongsi2', {
                      initialValue: this.data.gongsi2 ? this.data.gongsi2 : undefined,
                      rules: [{ required: true, message: '请输入公司名称' }],
                    })(<a-input placeholder='请输入公司名称'></a-input>)}
                  </a-input-group>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='公司税号'>
                  <a-input-group compact>
                    {getFieldDecorator('shuihao', {
                      initialValue: 10086,
                      rules: [{ required: true, message: '请输入公司税号' }],
                    })(<a-input placeholder='请输入公司税号'></a-input>)}
                  </a-input-group>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='公司地址'>
                  <a-input-group compact>
                    {getFieldDecorator('dizhi', {
                      initialValue: '重庆市渝中区龙湖时代天街',
                      rules: [{ required: true, message: '请输入公司地址' }],
                    })(<a-input placeholder='请输入公司地址'></a-input>)}
                  </a-input-group>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='公司电话'>
                  <a-input-group compact>
                    {getFieldDecorator('phone', {
                      initialValue: 10086,
                      rules: [{ required: true, message: '请输入公司电话' }],
                    })(
                      <a-input
                        addonBefore={getFieldDecorator('prefix', {
                          initialValue: '86',
                        })(
                          <a-select style={{ width: 70 }}>
                            <a-select-option value='86'>+86</a-select-option>
                            <a-select-option value='87'>+87</a-select-option>
                          </a-select>,
                        )}
                        placeholder='请输入公司电话'
                      ></a-input>,
                    )}
                  </a-input-group>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='开户银行'>
                  <a-input-group compact>
                    {getFieldDecorator('yinh', {
                      initialValue: '中国建设银行',
                      rules: [{ required: true, message: '请输入开户银行' }],
                    })(<a-input placeholder='请输入开户银行'></a-input>)}
                  </a-input-group>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='开户账号'>
                  <a-input-group compact>
                    {getFieldDecorator('zhanh', {
                      initialValue: 10000,
                      rules: [{ required: true, message: '请输入开户账号' }],
                    })(<a-input placeholder='请输入开户账号'></a-input>)}
                  </a-input-group>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='发票类型'>
                  <a-input-group compact>
                    {getFieldDecorator('val', {
                      initialValue: 'a',
                      rules: [{ required: true, message: '请选择发票类型' }],
                    })(
                      <a-radio-group buttonStyle='solid'>
                        <a-radio-button value='a'>增值税普通发票</a-radio-button>
                        <a-radio-button value='b'>增值税专用发票</a-radio-button>
                        <a-radio-button value='c'>税务机打服务发票</a-radio-button>
                      </a-radio-group>,
                    )}
                  </a-input-group>
                </a-form-item>
              </a-form>
            ) : (
              <a-form>
                <a-form-item props={{ ...this.formItemLayout }} label='公司名称'>
                  <span>{this.data.gongsi2 ? this.data.gongsi2 : undefined}</span>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='公司税号'>
                  <span>10086</span>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='公司地址'>
                  <span>10086</span>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='公司电话'>
                  <span>023-</span>
                  <span>10086</span>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='开户银行'>
                  <span>中国建设银行</span>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='开户账号'>
                  <span>10000</span>
                </a-form-item>
                <a-form-item props={{ ...this.formItemLayout }} label='发票类型'>
                  <span>{this.data.type ? this.data.type : undefined}</span>
                </a-form-item>
              </a-form>
            )}
          </div>
        </a-modal>
      </div>
    );
  }
}

export default Form.create({
  props: {
    visible: Boolean,
    title: String,
    width: String,
    data: Object,
    handleOk: Function,
    handkeCancel: Function,
    special: Boolean,
  },
})(OrderDetail);
