import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Icon, Avatar, Row, Col } from 'ant-design-vue';
import './index.less';
import AddModal from './componets/addModal';

@Component({
  name: 'shopping',
  components: {
    'a-tag': Tag,
    'a-card': Card,
    'a-icon': Icon,
    'a-card-meta': Card.Meta,
    'a-avatar': Avatar,
    'a-row': Row,
    'a-add-modal': AddModal,
    'a-col': Col,
  },
})
export default class Shopping extends Vue {
  handleOpen(e: any) {
    e.preventDefault();
    const value = e.currentTarget.getAttribute('data-value');
    this.title = value;
    this.type = 'buy';
    this.$message.success('申请开通已提交！');
  }

  handleTry() {
    this.$message.success('申请试用已提交！');
  }

  handleSelect(e: any) {
    e.preventDefault();
    const value = e.currentTarget.getAttribute('data-value');
    this.title = value;
    this.visible = true;
    this.type = 'select';
  }

  handlexf() {
    this.$message.success('申请续费成功！');
  }

  success() {
    this.visible = false;
    this.$message.success('申请开通成功！');
  }

  closeModal() {
    this.visible = false;
  }

  visible: boolean = false;

  title: string = '';

  type: string = '';

  render() {
    return (
      <div class='shopping'>
        <a-card hoverable={false} class='no'>
          <div class='card-warp'>
            <a-card-meta
              title='未开通服务'
              description='您可以挑选您需要的服务进行开通。'
            ></a-card-meta>
          </div>
          <div class='card'>
            <a-row gutter={12}>
              <a-col span={6}>
                <a-card hoverable>
                  <a-card-meta
                    title='短信服务'
                    description='短信服务是一个非常好的服务，测试填充测试填充测试填充测试填充测试填充测试...'
                  >
                    <a-icon slot='avatar' type='message' class='icon' />
                  </a-card-meta>
                  <template class='ant-card-actions' slot='actions'>
                    <div onclick={this.handleOpen} data-value={'短信服务'}>
                      立即开通
                    </div>
                    <div onclick={this.handleTry} data-value={'短信服务'}>
                      申请试用
                    </div>
                    <div onclick={this.handleSelect} data-value={'短信服务'}>
                      查看简介
                    </div>
                  </template>
                </a-card>
              </a-col>
              <a-col span={6}>
                <a-card hoverable>
                  <a-card-meta
                    title='邮箱服务'
                    description='邮箱服务是一个非常好的服务，测试填充测试填充测试填充测试填充测试填充测试...'
                  >
                    <a-icon slot='avatar' type='mail' class='icon' />
                  </a-card-meta>
                  <template class='ant-card-actions' slot='actions'>
                    <div onclick={this.handleOpen} data-value='邮箱服务'>
                      立即开通
                    </div>
                    <div onclick={this.handleTry} data-value={'短信服务'}>
                      申请试用
                    </div>
                    <div onclick={this.handleSelect} data-value='邮箱服务'>
                      查看简介
                    </div>
                  </template>
                </a-card>
              </a-col>
              <a-col span={6}>
                <a-card hoverable>
                  <a-card-meta
                    title='云巡检服务'
                    description='云巡检服务是一个非常好的服务，测试填充测试填充测试填充测试填充测试填充测试...'
                  >
                    <a-icon slot='avatar' type='cloud' class='icon' />
                  </a-card-meta>
                  <template class='ant-card-actions' slot='actions'>
                    <div onclick={this.handleOpen} data-value='云巡检服务'>
                      立即开通
                    </div>
                    <div onclick={this.handleTry} data-value={'短信服务'}>
                      申请试用
                    </div>
                    <div onclick={this.handleSelect} data-value='云巡检服务'>
                      查看简介
                    </div>
                  </template>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-card>

        <a-card hoverable={false} class='yes'>
          <div class='card-warp-yes'>
            <a-card-meta title='已开通服务' description='您可以为您的服务进行续费。'></a-card-meta>
          </div>
          <div class='card'>
            <a-row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <a-col span={6}>
                <a-card hoverable>
                  <a-card-meta title='微信公众号服务'>
                    <p slot='description'>
                      微信公众号服务是一个非常好的服务，测试填充测试填充测试填充测试填充测试填充测试...
                      <p class='express'>
                        <span style={{ marginRight: '10px' }}>到期时间:</span>无
                      </p>
                    </p>
                    <a-icon slot='avatar' type='wechat' class='icon' />
                  </a-card-meta>
                  <template class='ant-card-actions' slot='actions'>
                    <div data-value='微信公众号服务'>已永久开通</div>
                    <div onclick={this.handleSelect} data-value='微信公众号服务'>
                      查看简介
                    </div>
                  </template>
                </a-card>
              </a-col>
              <a-col span={6}>
                <a-card hoverable>
                  <a-card-meta title='组态服务'>
                    <p slot='description'>
                      组态服务是一个非常好的服务，测试填充测试填充测试填充测试填充测试填充测试...
                      <p class='express'>
                        <span style={{ marginRight: '10px' }}>到期时间:</span>2019-12-03
                      </p>
                    </p>
                    <a-icon slot='avatar' type='sliders' class='icon' />
                  </a-card-meta>
                  <template class='ant-card-actions' slot='actions'>
                    <div onclick={this.handleOpen} data-value='组态服务'>
                      立即续费
                    </div>
                    <div onclick={this.handleSelect} data-value='组态服务'>
                      查看简介
                    </div>
                  </template>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-card>

        {this.visible && (
          <a-add-modal
            visible={this.visible}
            handleOk={this.success}
            handkeCancel={this.closeModal}
            title={this.title}
            type={this.type}
            width='800px'
          ></a-add-modal>
        )}

        {this.visible && (
          <a-add-modal
            visible={this.visible}
            handleOk={this.success}
            handkeCancel={this.closeModal}
            title={this.title}
            type={this.type}
            width='800px'
          ></a-add-modal>
        )}
      </div>
    );
  }
}
