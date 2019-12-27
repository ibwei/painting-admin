<template>
  <div class="clearfix">
    <a-upload
      listType="picture-card"
      :fileList="fileList"
      :remove="removeImage"
      :showUploadList="true"
      :withCredentials="true"
      @preview="handlePreview"
      @change="handleChange"
      :customRequest="handleUpload"
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
      urlList: [],
      defaultFileList: [],
      index: 0,
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

    removeImage (file) {
      const id = file.uid;
      for (let i = 0; i < this.index; i++) {
        if (this.fileList[i].uid === id) {
          this.fileList.splice(id, 1);
          this.urlList.splice(id, 1);
          this.$emit('uploaded', this.urlList.join(','));
        }
      }
    },

    handleChange ({ file, fileList }) {
      if (file.status !== 'done') {
        file.status = 'done';
      }
    },

    handleUpload ({ file }) {
      const formData = new FormData();
      formData.append('file', file);
      axios({
        url: 'http://www.paintingapi.ibwei.com/api/image/upload',
        method: 'post',
        processData: false,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        if (res.data.resultCode === 0) {
          this.urlList.push(res.data.data.path);
          this.$message.success('上传成功!');
          const f = {
            uid: String(this.index++),
            name: 'xxx.png',
            status: 'done',
            url: res.data.data.path,
          };
          this.fileList.push(f);
          this.$emit('uploaded', this.urlList.join(','));
        } else {
          this.$message.error('上传失败');
        }
      }).catch((e) => {
        this.$message.error('网络异常');
      })
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
