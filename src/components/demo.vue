<template>
<div class="demo">
  <p v-show="title" class="title" v-text="title"></p>
  <p v-show="desc" class="desc" v-text="desc"></p>
  <div class="upload-box">
    <Pic v-model="picArr" :action="option.action" :max="option.max" :beforeUploadCheck="beforeUploadCheck"
    @file-success="fileSuc" @file-error="fileError" @file-removed="fileRemoved" @file-click="fileClick" />
  </div>
</div>
</template>

<script>
import Pic from './pic/upload.vue'

export default {
  name: 'demo',
  data () {
    return {
      picArr: [],
      uploadNum: 0,
      sucCount: 0,
      iamgeUrl: '',
      title: '请上传3张图片',
      desc: '1.图片1, 2.图片2, 3.图片3',
      option: {
        max: 3,
        action: 'https://jsonplaceholder.typicode.com/photos/'
      }
    }
  },
  methods: {
    beforeUploadCheck (file) {
      const duplicate = this.picArr.find(v => v.name === file.name)

      // if (!(/.(xls|xlsx)$/).test(file.name)) {
      //   alert(`请上传excel文件`)
      //   file.ignore = true
      // } else
      if (file.size > 1 * 1024 * 1024) {
        alert(`图片大小不能超过1M`)
        file.ignore = true
      } else if (duplicate) {
        alert(`${duplicate.name}已上传`)
        file.ignore = true
      }
    },
    fileRemoved (file, index) {
      console.log(`${file.name}删除成功`)
      console.log(index)
    },
    fileClick (file, index) {
      console.log(`${file.name}删除成功`)
      console.log(index)
    },
    fileError (file, index) {
      console.log(this.picArr)
      console.log(`${file.name}上传失败`)
      console.log(index)
    },
    fileSuc (file, index) {
      console.log(this.picArr)
      console.log(`${file.name}上传成功`)
      console.log(index)
      // 从 file.response 里面获取 图片路径
    }
  },
  components: {
    Pic
  }
}
</script>

<style lang="stylus">
.demo {
  .upload {
    .file, .btn {
      float: left
      margin: 0 10px 10px 0
    }
  }
}
</style>

<style lang="stylus" scoped>
.demo {
  .title {
    font-size 14px
    line-height 16px
  }
  .desc {
    font-size 12px
    line-height 16px
    color #999
  }
}
</style>
