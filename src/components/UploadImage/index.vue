<template>
  <div class="clearfix">
    <a-upload
      listType="picture-card"
      :fileList="fileList"
      :showUploadList="true"
      action="/api/image/upload"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < pictureLength">
        <a-icon type="plus" />
        <div class="ant-upload-text">{{placeholder}}</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import { Upload, Modal, Icon } from 'ant-design-vue';
import axios from 'axios';
export default {
  name: 'UploadImage',
  components: {
    'a-upload': Upload,
    'a-modal': Modal,
    'a-icon': Icon,
  },
  props: {
    //要上传的图片张数
    pictureLength: {
      type: Number,
      default: 1,
    },
    placeholder: {
      type: String,
      default: '上传图片',
    },
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      // 远程返回的图片url,单张图片是字符串,多张图片以逗号分隔
      remoteUrl: '',
      uploadedList: [],
    };
  },
  methods: {
    handleCancel () {
      this.previewVisible = false;
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },

    handleChange ({ fileList }) {
      this.fileList = fileList;
      const urlList = [];
      for (let i = 0; i < this.fileList.length; i++) {
        if (fileList[i].status && fileList[i].status === 'done') {
          if (fileList[i].response.resultCode === 0) {
            urlList.push(this.fileList[i].response.data.path);
            //上传成功,则添加到已经保存的列表
            if (this.uploadedList.indexOf(this.fileList[i].uid) === -1) {
              this.uploadedList.push(this.fileList[i].uid);
              this.$message.success('图片上传成功!');
              this.$emit('uploaded', urlList.join(','));
            }
          } else {
            this.$message.success(this.fileList[i].response.resultMessage);
            return false;
          }
        }
      }
    },
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
