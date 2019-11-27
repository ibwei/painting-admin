import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'inspection',
})
export default class Inspection extends Vue {
  render() {
    const { keepList } = this.$store.state.app;
    return (
      <keep-alive max={10} include={keepList}>
        <router-view />
      </keep-alive>
    );
  }
}
