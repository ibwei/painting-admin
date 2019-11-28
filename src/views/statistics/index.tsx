import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'statistics',
})
export default class Statistics extends Vue {
  render() {
    const { keepList } = this.$store.state.app;
    return (
      <div>
        <keep-alive max={10} include={keepList}>
          <router-view />
        </keep-alive>
      </div>
    );
  }
}
