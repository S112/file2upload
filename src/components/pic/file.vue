<template>
<div class="file" @click="clickFile">
  <slot>
    <div class="file-def" :style="fileStyle">
      <div class="close" @click.stop="removeFile"><i class="iconfont iconchaguanbi"></i></div>
      <div class="file-state" :class="fileStatusCls">
        <i v-show="statusCls==='success'" class="file-status iconfont iconchenggong success-icon" :class="statusCls"></i>
        <i v-show="statusCls==='warn'" class="file-status iconfont iconicon116 warn-icon" :class="statusCls"></i>
        <span class="file-progress">{{fileProgress}}</span>
      </div>
    </div>
  </slot>
</div>
</template>

<script>
import { _success, _error } from '../../../assets/js/tool.js'
const statusMap = {
  success: 'success',
  error: 'warn'
}

export default {
  name: 'file',
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  computed: {
    fileStatusCls () {
      const file = this.file
      const status = file.status
      if (file.progress >= 0.01 || status === _success || status === _error) {
        return 'file_stat'
      }
    },
    fileStyle () {
      const url = this.file.url || this.file.base64
      if (!url) {
        return
      }
      return {
        'background-image': `url("${url}")`
      }
    },
    statusCls () {
      const status = this.file.status
      return statusMap[status]
    },
    fileProgress () {
      if (this.statusCls) {
        return '100%'
      }
      const p = Math.min(Math.floor(this.file.progress * 100), 99)
      return `${p}%`
    }
  },
  methods: {
    clickFile () {
      this.$emit('click', this.file)
    },
    removeFile() {
      this.$emit('remove', this.file)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../../assets/css/var.styl";
@import '../../../assets/iconfont/iconfont.css'
.file {
  position: relative;
  .file-def {
    position: relative;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    background: $upload-file-bgc no-repeat center;
    background-size: cover;
    border-radius: 2px;
    > .close {
      position: absolute;
      z-index: 2;
      top: -5px;
      right: -5px;
      color: $upload-file-remove-color;
      font-size: 16px;
      background-color: $upload-file-remove-bgc;
      border-radius: 50%;
    }
  }
  .file-state {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 0;
    background-color: $upload-file-state-bgc;
    border-radius: 2px;
    transition: opacity .1s;
    &::before {
      content: ".";
      position: relative;
      left: -50%;
      display: block;
      width: 1px;
      height: 1px;
      margin-left: -1px;
      background-color: rgba(0, 0, 0, .1);
    }
  }
  .file_stat { opacity: 1; }
  .file-status {
    position: relative;
    z-index: 1;
    display: none;
  }
  .file-status.success, .file-status.warn {
    display: block;
  }
  .file-status.success, .file-status.warn {
    &::after {
      content: "";
      z-index: -1;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: .56em;
      height: .56em;
      border-radius: 50%;
    }
    + .file-progress {
      display: none;
    }
  }
  .file-progress {
    color: $upload-file-progress-color;
    font-size: 20px;
  }
  .success-icon { font-size:30px; color:#5EC087; }
  .warn-icon { font-size:30px; color:#FF4556; }
}
</style>
