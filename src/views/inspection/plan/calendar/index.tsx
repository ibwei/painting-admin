import { Component, Vue } from 'vue-property-decorator';
import { Calendar, Card, Badge } from 'ant-design-vue';
import moment, { Moment } from 'moment';

import InfoModal from './infoModal';
@Component({
  name: 'inspectionPlanCalendar',
  components: {
    'a-calendar': Calendar,
    'a-card': Card,
    'a-badge': Badge,
    'info-modal': InfoModal,
  },
})
export default class InspectionPlanCalendar extends Vue {
  modalProps: {
    visible: boolean;
    date: Moment;
  } = {
    visible: false,
    date: moment(),
  };

  dateSelect = (date: Moment) => {
    this.modalProps.visible = true;
    this.modalProps.date = date;
  };

  closeModal = () => {
    this.modalProps.visible = false;
  };

  render() {
    return (
      <div style='padding: 20px'>
        <a-card title='计划日历'>
          <a-calendar on-select={this.dateSelect}>
            <div slot='dateCellRender' slot-scope='value'>
              <a-badge status='success' text='13人巡检' />
              <br />
              <a-badge status='processing' text='20条巡检路线' />
            </div>
          </a-calendar>
        </a-card>
        <info-modal {...{ props: this.modalProps }} on-close={this.closeModal} />
      </div>
    );
  }
}
