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
        <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import {Upload, Modal, Icon} from 'ant-design-vue';
import axios from 'axios';
export default {
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
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      // 远程返回的图片url,单张图片是字符串,多张图片以逗号分隔
      remoteUrl: '',
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },

    handleChange({fileList}) {
      this.fileList = fileList;
      //上传单张模式
      if (this.pictureLength === 1) {
        if (fileList[0].status && fileList[0].status === 'done') {
          if (fileList[0].response.resultCode === 0) {
            this.$message.success('上传图片成功!');
            this.$emit('uploaded', this.fileList[0].response.data.path);
          } else {
            this.$message.success('上传图片失败!');
          }
        }
      }
      //上传多张图片模式
      if (this.pictureLength !== 1) {
        if (fileList[0].status === 'done') {
          if (fileList[0].response.resultCode === 0) {
            this.$message.success('上传图片成功!');
            this.$emit('uploaded', this.fileList[0].response.data.path);
          } else {
            this.$message.success('上传图片失败!');
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
