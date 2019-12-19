/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator';
import { Tag, Modal, Button, Table, Row, Col, Card, Input } from 'ant-design-vue';
import './index.less';
//@ts-ignore
import UploadImage from '@/components/UploadImage';
import { loadDrawingManager, loadBmap, loadMapCurveLine } from '@/utils';
@Component({
  name: 'studio',
  components: {
    'a-tag': Tag,
    'a-modal': Modal,
    'a-button': Button,
    'a-table': Table,
    'a-row': Row,
    'a-col': Col,
    'a-input': Input,
    'a-card': Card,
    UploadImage,
  },
})

export default class Studio extends Vue {


  created() {
    this.$nextTick(() => {
      window.api.paintingStudioInfo({}).then((res: any) => {
        const { resultCode } = res.data;
        if (resultCode === 0) {
          this.paintingInfo = res.data.data[0];
          this.$message.success('获取画室信息成功');
          loadBmap().then((BMap: any) => {
            this.BMap = BMap;
            this.map = new BMap.Map('map'); // 创建Map实例
            if (this.paintingInfo.address_location) {
              const [a, b] = this.paintingInfo.address_location.split(',');
              this.map.centerAndZoom(new BMap.Point(Number(a), Number(b)), 15);
              this.marker = new this.BMap.Marker(new BMap.Point(Number(a), Number(b)));
              this.map.addOverlay(this.marker);
            } else {
              this.map.centerAndZoom(new BMap.Point(106.544, 29.578), 15);
              this.marker = new this.BMap.Marker(106.544, 29.578);
              this.map.addOverlay(this.marker);
            }// 初始化地图,设置中心点坐标和地图级别
            this.map.setCurrentCity('重庆'); // 设置地图显示的城市 此项是必须设置的
            this.map.enableScrollWheelZoom(true);
          });
        } else {
          this.$message.error('获取画室信息失败');
        }
      });
    });



  }



  paintingInfo: any = {
    name: '',
    phone: '',
    wechat: '',
    address: '',
    qq: '',
    er_code: '',
    logo: '',
    email: '',
  };

  map: any = null;

  BMap: any = null;

  // 坐标定位图片
  marker: any = null;

  //覆盖物数组
  overlayList: Array<any> = [];

  // 百度地图对象
  SMap: any = null;

  // 当前地图对象实例
  SMapZoom: number = 15;

  // 当前地图对象zoom
  geolocationControl: any = null;

  // 定位
  CanvasLayer: any = null;

  //地图方法类
  mapContorl: any = null;

  //坐标
  mapCenter: {
    lat: number;
    lng: number;
  } = {
      lat: 29.563694,
      lng: 106.560421,
    };


  //默认为只读状态
  pageStatus: string = 'read';
  mapStatus: string = 'read';

  changeStatus() {
    this.pageStatus = this.pageStatus === 'read' ? 'edit' : 'read';
  }

  changeMapStatus() {
    this.mapStatus = this.mapStatus === 'read' ? 'edit' : 'read';
    if (this.mapStatus === 'edit') {
      this.map.addEventListener('click', this.moveMarket);
    } else {
      this.map.removeEventListener('click', this.moveMarket);
    }
  }

  //获取点击地图的坐标
  moveMarket(e: any) {
    console.log(e.point);
    this.paintingInfo.address_location = e.point.lng + ',' + e.point.lat;
    this.map.removeOverlay(this.marker);
    this.marker = new this.BMap.Marker(e.point);
    this.map.addOverlay(this.marker);
  }


  changeToRead() {
    this.pageStatus = 'read';
  }

  changeInfo(key: string, e: any) {
    this.paintingInfo = { ...this.paintingInfo, [key]: e.target.value };
  }

  changeImage(key: string, e: any) {
    this.paintingInfo = { ...this.paintingInfo, [key]: e };
  }

  update() {
    window.api.paintingStudioUpdate({ ...this.paintingInfo }).then((res: any) => {
      const { resultCode } = res.data;
      if (resultCode === 0) {
        this.changeToRead();
        this.mapStatus = 'read';
        this.$message.success('更新画室信息成功');
      } else {
        this.$message.error('请填完所有选项 ');
      }
    });
  }


  render() {
    return (
      <div class='studio-wrap'>
        <a-row>
          <a-col span='12' class="area">
            <a-card hoverable bodyStyle={{ height: '400px' }} title='画室基础信息'>
              <span class={this.pageStatus === 'edit' ? 'edit' : 'read'} slot='extra' onClick={this.changeStatus}>
                {this.pageStatus === 'read' ? '编辑' : '正在编辑中'}
              </span>
              <a-row>
                <a-col span="11">
                  <div class="form-item">
                    <div class="title">画室名称:</div>
                    <a-input value={this.paintingInfo.name} onChange={this.changeInfo.bind(this, 'name')} style={{ border: this.pageStatus === 'edit' ? '' : 'none', background: 'transparent' }} disabled={this.pageStatus === 'edit' ? false : true} placeholder="请输入画室名称" />
                  </div>
                </a-col>
                <a-col span="11" offset="2">
                  <div class="form-item">
                    <div class="title">电话号码:</div>
                    <a-input value={this.paintingInfo.phone} onChange={this.changeInfo.bind(this, 'phone')} style={{ border: this.pageStatus === 'edit' ? '' : 'none', background: 'transparent' }} disabled={this.pageStatus === 'edit' ? false : true} placeholder="请输入画负责人电话号码" />
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-row>
                  <a-col span="11">
                    <div class="form-item">
                      <div class="title">电子邮箱:</div>
                      <a-input value={this.paintingInfo.email} onChange={this.changeInfo.bind(this, 'email')} style={{ border: this.pageStatus === 'edit' ? '' : 'none', background: 'transparent' }} disabled={this.pageStatus === 'edit' ? false : true} placeholder="后台发送邮件的QQ邮箱" />
                    </div>
                  </a-col>
                  <a-col span="11" offset="2">
                    <div class="form-item">
                      <div class="title">画室地址:</div>
                      <a-input value={this.paintingInfo.address} onChange={this.changeInfo.bind(this, 'address')} style={{ border: this.pageStatus === 'edit' ? '' : 'none', background: 'transparent' }} disabled={this.pageStatus === 'edit' ? false : true} placeholder="官网底部所显示的地址" />
                    </div>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col span="11">
                    <div class="form-item">
                      <div class="title">联系QQ:</div>
                      <a-input value={this.paintingInfo.qq} onChange={this.changeInfo.bind(this, 'qq')} style={{ border: this.pageStatus === 'edit' ? '' : 'none', background: 'transparent' }} disabled={this.pageStatus === 'edit' ? false : true} placeholder="官网接待聊天的QQ号" />
                    </div>
                  </a-col>
                  <a-col span="11" offset="2">
                    <div class="form-item">
                      <div class="title">微信号:</div>
                      <a-input value={this.paintingInfo.wechat} onChange={this.changeInfo.bind(this, 'wechat')} style={{ border: this.pageStatus === 'edit' ? '' : 'none', background: 'transparent' }} disabled={this.pageStatus === 'edit' ? false : true} placeholder="请输入画室电子邮箱" />
                    </div>
                  </a-col>
                </a-row>
                <a-row class="upload">
                  <a-col class="upload-item" span="11" >
                    <div class="form-item">
                      <div class="title">微信二维码:</div>
                      {this.paintingInfo.er_code ? (<img class="img-item" src={this.paintingInfo.er_code}></img>
                      ) : ''}

                      {
                        this.pageStatus === 'edit' ? (<div class="image-upload">
                          <upload-image on-uploaded={this.changeImage.bind(this, 'er_code')} placeholder="更改二维码" />
                        </div>
                        ) : ''
                      }

                    </div>
                  </a-col>

                  <a-col class="upload-item" span="11" offset="2">
                    <div class="form-item">
                      <div class="title">画室Logo:</div>
                      {this.paintingInfo.logo ? (<img class="img-item" src={this.paintingInfo.logo}></img>
                      ) : ''}

                      {this.pageStatus === 'edit' ? (<div class="image-upload">
                        <upload-image on-uploaded={this.changeImage.bind(this, 'logo')} placeholder="更改logo" />
                      </div>
                      ) : ''}

                    </div>
                  </a-col>
                </a-row>
                {
                  this.pageStatus === 'edit' ? (
                    <a-row class="button-group" >
                      <a-button type="primary" onClick={this.update} style={{ marginRight: '20px' }}>提交</a-button>
                      <a-button onClick={this.changeToRead}>取消</a-button>
                    </a-row>
                  ) : ''}
              </a-row>
            </a-card>
          </a-col>
          <a-col span='12' class="area">
            <a-card hoverable title='画室地理位置' >
              <div slot='extra'>
                <span class={this.mapStatus === 'edit' ? 'edit' : 'read'} onClick={this.changeMapStatus}>
                  {this.mapStatus === 'read' ? '编辑地理位置' : '正在选择地址...'}
                </span>
                {this.mapStatus === 'edit' ? (<span class="sure" onClick={this.update}>确定</span>) : ''}
              </div>
              <div id="map"></div>
            </a-card>

          </a-col>
        </a-row>
      </div>
    );
  }
}
