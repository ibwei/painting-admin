import { Vue, Component, Prop } from 'vue-property-decorator';
import { Modal, List, Avatar, Tag } from 'ant-design-vue';
import moment, { Moment } from 'moment';

import './infoModal.less';

@Component({
  components: {
    'a-modal': Modal,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-avatar': Avatar,
    'a-tag': Tag,
  },
})
class InfoModal extends Vue {
  @Prop() visible!: boolean;

  @Prop() date!: Moment;

  submit() {}

  cancel() {
    this.$emit('close');
  }

  listData: {
    id: number;
    name: string;
  }[] = [
    {
      id: 1,
      name: '巡检任务1',
    },
    {
      id: 2,
      name: '巡检任务1',
    },
  ];

  render() {
    return (
      <a-modal
        width='50%'
        title={`日期详情--${this.date.format('YYYY-MM-DD')}`}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-list itemLayout='horizontal' dataSource={this.listData}>
          {this.listData.map((item, index) => (
            <a-list-item slot='renderItem'>
              <a-list-item-meta>
                <ul class='detail_list' slot='description'>
                  <li class='item'>
                    <span class='label'>巡检人：</span>
                    <p class='txt'>王二</p>
                  </li>
                  <li class='item'>
                    <span class='label'>巡检区域：</span>
                    <p class='txt'>区域1</p>
                  </li>
                  <li class='item'>
                    <span class='label'>巡检路线：</span>
                    <p class='txt'>巡检路线3</p>
                  </li>
                  <li class='item'>
                    <span class='label'>巡检时间：</span>
                    <p class='txt'>2019-11-28 10:00:00</p>
                  </li>
                  <li class='item'>
                    <span class='label'>巡检状态：</span>
                    <p class='txt'>
                      <a-tag color='green'>巡检完成</a-tag>
                    </p>
                  </li>
                </ul>
                <a slot='title' href='https://www.baidu.com/'>
                  {item.name}
                </a>
                <a-avatar
                  slot='avatar'
                  src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                />
              </a-list-item-meta>
              <a slot='actions'>详情</a>
            </a-list-item>
          ))}
        </a-list>
      </a-modal>
    );
  }
}

export default InfoModal;
