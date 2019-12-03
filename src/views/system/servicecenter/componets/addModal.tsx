import { Component, Vue, Prop } from 'vue-property-decorator';
import { Modal, Select, Input, Row, Col, Icon } from 'ant-design-vue';

@Component({
  name: 'ChangeModal',
  components: {
    'a-input': Input,
    'a-modal': Modal,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-input-group': Input.Group,
    'a-row': Row,
    'a-col': Col,
    'a-icon': Icon,
  },
})
class ChangeModal extends Vue {
  @Prop() visible!: boolean;

  @Prop() title?: string;

  @Prop() width?: string;

  @Prop() data?: any;

  @Prop() type?: string;

  @Prop() handleOk?: () => {};

  @Prop() handkeCancel?: () => {};

  num: number = 0;

  moneny: number = 0;

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
    return (
      <div>
        <a-modal
          visible={this.$props.visible}
          onOk={this.$props.handleOk}
          onCancel={this.$props.handkeCancel}
          title={this.$props.title}
          okText='立即开通'
          width='600px'
        >
          {this.type === 'select' ? (
            <div Style={{ padding: '15px' }}>
              <p>测试服务是测试测试测试测试测试</p>
              <p>
                测试测试测试测试测试测试测试
                测试测试测试测试测试测试测试测试测试测试测试测试测试测试测
                试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测
                试测试测试测试测试测试测试测试测试测试测试测试测试测试测试 测试测试测试。
              </p>
              <p>
                <br />
              </p>
              <h2>
                <strong>测试文本</strong>
              </h2>
              <h3>
                <strong>测试文本</strong>
              </h3>
              <p>
                测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
              </p>
              <ul>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              </ul>
              <h3>
                <strong>测试文本</strong>
              </h3>
              <p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p>
              <ul>
                <li>安全可靠：测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
                <li>大容量高并发：测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              </ul>
              <h3>
                <strong>测试文本</strong>
              </h3>
              <p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p>
              <ul>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              </ul>
              <h3>
                <strong>测试文本</strong>
              </h3>
              <p>测试测试测试测试测试测试测试测试测试测试测试测试测试。</p>
              <ul>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              </ul>
              <h3>
                <strong>测试文本</strong>
              </h3>
              <p>
                测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
              </p>
              <p>
                <br />
              </p>
              <h3>
                <strong>测试文本</strong>
              </h3>
              <ul>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
                <li>测试测试测试测试测试测试测试测试测试测试测试测试测试。</li>
              </ul>
              <h3>
                <strong>测试文本</strong>
              </h3>
              <p>
                测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
              </p>
            </div>
          ) : (
            <div>
              {this.$props.title !== '邮箱服务' &&
                this.$props.title !== '微信公众号服务' &&
                this.$props.title !== '短信服务' && (
                  <div>
                    <a-row>
                      <a-col span={2}>
                        <span style={{ fontSize: '16px', height: '32px', lineHeight: '32px' }}>
                          时间:
                        </span>
                      </a-col>
                      <a-col span={22}>
                        <a-input-group compact>
                          <a-input
                            style='width:70%;textAlign:left'
                            placeholder='请输入开通时间'
                            value={this.num}
                          ></a-input>
                          <a-select style='width:30%' placeholder='请选择周期单位'>
                            <a-select-option value='1'>天</a-select-option>
                            <a-select-option value='2'>周</a-select-option>
                            <a-select-option value='3'>月</a-select-option>
                            <a-select-option value='4'>季度</a-select-option>
                            <a-select-option value='5'>年</a-select-option>
                          </a-select>
                        </a-input-group>
                      </a-col>
                    </a-row>
                    <a-row style={{ marginTop: '20px' }}>
                      <a-col span={2}>
                        <span style={{ fontSize: '16px', height: '32px', lineHeight: '32px' }}>
                          金额:
                        </span>
                      </a-col>
                      <a-col span={22}>
                        <span
                          style={{
                            fontSize: '16px',
                            height: '32px',
                            lineHeight: '32px',
                          }}
                        >
                          ￥{this.moneny}
                        </span>
                      </a-col>
                    </a-row>
                  </div>
                )}
              {this.$props.title === '短信服务' && (
                <a-input-group compact>
                  <a-input style='width:70%;textAlign:left' placeholder='请输入开通条数'></a-input>
                  <a-select style='width:30%' placeholder='请选择周期单位'>
                    <a-select-option value='1'>条</a-select-option>
                  </a-select>
                </a-input-group>
              )}
            </div>
          )}
        </a-modal>
      </div>
    );
  }
}

export default ChangeModal;
