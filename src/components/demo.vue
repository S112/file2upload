<template>
<div class="demo">
  <p v-show="title" class="title" v-text="title"></p>
  <p v-show="desc" class="desc" v-text="desc"></p>
  <div class="upload-box clear">
    <Pic v-model="picArr" :action="option.action" :max="option.max" :simultaneous-uploads="option.simultaneousUploads" :beforeUploadCheck="beforeUploadCheck"
    @file-success="fileSuc" @file-error="fileError" @file-removed="fileRemoved" />
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
        action: 'https://jsonplaceholder.typicode.com/photos/',
        max: 3,
        simultaneousUploads: 3
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
    fileRemoved (file) {
      console.log(`${file.name}删除成功`)
    },
    fileError (file) {
      console.log(this.picArr)
      console.log(`${file.name}上传失败`)
    },
    fileSuc (file) {
      console.log(this.picArr)
      console.log(`${file.name}上传成功`)
      // 从 file.response 里面获取 图片路径
    }
  },
  components: {
    Pic
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/border.styl";
.demo {
  .test {
    all-border-1px(#e5e5e5);
    width: 100px;
    height: 100px;
  }
  .title {
    font-size 14px
    line-height 16px
  }
  .desc {
    font-size 12px
    line-height 16px
    color #AA22F6
  }

  .clear {
    zoom: 1;
    .before {
      content: ' ';
      clear: both;
      display: block;
    }
  }
  .upload-box {
    padding-top: 10px;
  }
  .upload-btn {
    padding-top: 15px;
    position: relative;
    overflow: hidden;
    &:active {
      .upload-btn-def { background-color: rgba(0, 0, 0, .04); }
    }
    .upload-btn-def {
      position: relative;
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 2px;
      all-border-1px(#e5e5e5);
      > i {
        &::before, &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 2px;
          transform: translate(-50%, -50%);
          background-color: #666;
        }
        &::after {
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
    }
  }
  .mt10 { margin-top: 10px; }
  .red { color: #ff4556; }
  .fs12 { font-size: 12px; }
}
</style>
