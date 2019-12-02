import { Component, Vue } from 'vue-property-decorator';
import { Tag, Card, Row, Col, Modal } from 'ant-design-vue';

@Component({
  name: 'message',
  components: {
    'a-tag': Tag,
  },
})
export default class Message extends Vue {
  render() {
    return <div>123</div>;
  }
}
