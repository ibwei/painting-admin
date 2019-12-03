import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal } from 'ant-design-vue';
import { quillEditor } from 'vue-quill-editor';

// 富文本框样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './index.less';

@Component({
  name: 'message',
  components: {
    'a-tag': Tag,
    'a-card': Card,
    'quill-editor': quillEditor,
  },
})
export default class Message extends Vue {
  content: string =
    '<p>短信服务（Short Message Service）是为用户提供的一种通信服务的能力。</p><p>支持向国内和国际快速发送验证码、短信通知和推广短信，服务范围覆盖全球200多个国家和地区。国内短信支持三网合一专属通道，与工信部携号转网平台实时互联。电信级运维保障，实时监控自动切换，到达率高达99%。</p><p><br></p><h2><strong>测试文本</strong></h2><h3><strong>测试文本</strong></h3><p>测试为全球企业客户提供国际/港澳台短信发送服务，通过API/SDK方式调用短信发送能力，将指定信息发送至境外手机号码。</p><ul><li>适用于企业向客户发送验证码、系统通知、会员服务等短信。</li><li>支持客户从中国境内向港澳台及其他境外手机号码发送短信。</li><li>支持客户在境外地区之间向境外手机号码发送短信。</li></ul><h3><strong>测试文本</strong></h3><p>支持通过短信形式发送通知。</p><ul><li>安全可靠：保证99%到达率，国内短信电信级运维保障，实时监控自动切换。</li><li>大容量高并发：支撑双11期间2亿用户发送6亿短信。</li></ul><h3><strong>测试文本</strong></h3><p>在短信验证场景中，支持通过短信形式发送验证码。</p><ul><li>3秒可达，国内短信采用三网合一专属通道，与工信部携号转网平台实时互联。</li><li>国际短信直连境外运营商和供应商，通道正规、覆盖率高且稳定。</li></ul><h3><strong>测试文本</strong></h3><p>支持多种推广内容的短信发放，为提升企业产品增加曝光率提供帮助。</p><ul><li>支持业务推广、新产品宣讲、会员关怀等推广短信发送。</li><li>提供批量发送、定时发送等功能，适用于多种推广场景。</li></ul><h3><strong>测试文本</strong></h3><p>支持在后端服务处理完成任务时，回调通知用户。进而减少用户、Web前端和后端服务之间大量不必要的轮询请求。</p><p><br></p><h3><strong>测试文本</strong></h3><ul><li>提供请求量、发送成功量、失败量等统计数据。</li><li>支持通过日期、手机号等维度查看短信发送详情。</li></ul><h3><strong>测试文本</strong></h3><p>阿里云短信服务提供发送总量阈值功能服务，当日或当月发送短信总量超出预设数量时，系统将会触发告警通知送达预设的告警联系人，以减少或避免被盗刷带来的损失。</p>';

  editorOption: any = {};

  onEditorBlur = (e: any) => {
    console.log(e);
  };

  onEditorFocus = (e: any) => {
    console.log(e);
  };

  onEditorReady = (e: any) => {
    console.log(e);
  };

  render() {
    return (
      <a-card title='短信服务管理' class='bjq'>
        <quill-editor
          v-model={this.content}
          ref='myQuillEditor'
          options={this.editorOption}
          on-blur={this.onEditorBlur.bind(this)}
          on-focus={this.onEditorFocus.bind(this)}
          on-ready={this.onEditorReady.bind(this)}
        ></quill-editor>
      </a-card>
    );
  }
}
