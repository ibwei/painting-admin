<template>
  <div class="select-wrap">
    <a-collapse v-model="active" :bordered="false" :style="{width:'100%'}">
      <template v-slot:expandIcon="props">
        <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
      </template>
      <a-collapse-panel key="1" header="设备" :style="customStyle">
        <div class="device-icon">
          <div  v-for="(item,index) of deviceIconList" :key="index" class="icon-area">
            <img
              class="icon-item"
              :src="item.icon"
              @click="changeMouse(item.icon,'设备')"
            >
            <span  class="tooltip">{{item.name}}</span>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="设施" :style="customStyle">
        <div class="device-icon">
          <div  v-for="(item,index) of  facilitiesIconList" :key="index" class="icon-area">
            <img
              class="icon-item"
              :src="item.icon"
              @click="changeMouse(item.icon,'设施')"
            >
            <span  class="tooltip">{{item.name}}</span>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="管道" :style="customStyle">
        <div class="device-icon">
          <div  v-for="(item,index) of  lineIconList" :key="index" class="icon-area">
            <img
              class="icon-item"
              :src="item.icon"
              @click="changeMouse(item.icon,'管道')"
            >
            <span  class="tooltip">{{item.name}}</span>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { Collapse, CollapsePanel, Icon, Tooltip } from 'ant-design-vue'
export default {
  components: {
    'a-collapse-panel': Collapse.Panel,
    'a-collapse': Collapse,
    'a-icon': Icon,
  },
  data() {
    return {
      active: '1',
      selectType: '',
      selectIcon: '',
      deviceIconList: [{
        icon: '/map/deviceIcon/dianqi.png',
        name: '电气设备',
      }, {
        icon: '/map/deviceIcon/shuibiao.png',
         name: '水表设备',
      }, {
        icon: '/map/deviceIcon/dianzu.png',
         name: '电阻设备',
      }],
      facilitiesIconList: [{
        icon: '/map/deviceIcon/f1.png',
         name: '电气设施',
      }, {
        icon: '/map/deviceIcon/f2.png',
         name: '电缆设施',
      }, {
        icon: '/map/deviceIcon/f4.png',
         name: '水压设施',
      }, {
        icon: '/map/deviceIcon/f5.png',
         name: '电缆设施',
      }],
      lineIconList: [{
        icon: '/map/deviceIcon/l1.png',
         name: '水管管道',
      }, {
        icon: '/map/deviceIcon/l2.png',
         name: '电缆管道',
      }, {
        icon: '/map/deviceIcon/l3.png',
         name: '电阻管道',
      }, {
        icon: '/map/deviceIcon/l4.png',
         name: '线缆管道',
      }],
      customStyle:
        'background:#fff;border-radius: 0px;margin: 10px;border: 0;overflow: hidden',
    };
  },
  beforeDestroy() {
    console.log('BRE')
    document.body.style.cursor = '';
  },
  methods: {
    changeMouse(url, type) {
      console.log(url)
      console.log(type)
      document.body.style.cursor = `url(${url}),auto`;
      this.$emit('changeMouse', url, type);
    },
  },

};
</script>

<style lang="less" scoped>
.select-wrap {
  width: 100%;
}
.card{
  position: absolute;
  z-index: 99999;
  border:1px solid red;
}
.tooltip{
  display: none;
}

.device-icon {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
}
.icon-item {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 5px 5px;
  cursor: pointer;
}
.icon-area{
  position: relative;
  overflow: visible;
}
.icon-area:hover > .tooltip{
  position: absolute;
  z-index: 99999;
  display: flex;
  width: 70px;
  padding:2px 1px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background:rgba(0, 0, 0, 0.8);
  color:#fff;
  top: 30px;
  left: -10px;
}
</style>
