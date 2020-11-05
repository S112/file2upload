<template>
<div class="upload">
  <slot>
    <div class="upload-def clear-fix" :tag="tag">
      <File v-for="(file, i) in value" :file="file" :key="i" @click="clickFile" @remove="removeFile" />
      <Btn :multiple="multiple" v-show="isShowBtn" @add="addFiles" />
    </div>
  </slot>
</div>
</template>
<script>
import Btn from './btn.vue'
import File from './file.vue'
import ajaxUpload from '../../../assets/js/ajax.js'
import { processFiles, initFile, URL, _ready, _uploading, _error, _success } from '../../../assets/js/tool.js'

export default {
  name: 'upload',
  props: {
    tag: 0,
    value: {
      type: Array,
      default () {
        return []
      }
    },
    action: {
      type: String,
      default: '',
      required: true
    },
    max: {
      type: Number,
      default: 10
    },
    simultaneousUploads: {
      type: Number,
      default: 3
    },
    beforeUploadCheck: {
      type: Function,
      default: null
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    isShowBtn () {
      return this.value.length < this.max
    }
  },
  watch: {
    max (newVal, oldVal) {
      let gap = 0
      if (newVal < oldVal) {
        gap = Math.abs(newVal - oldVal)
        this.value.splice(-1, gap)
      }
    }
  },
  methods: {
    addFiles (files) {
      const filesLen = this.value.length
      const newFiles = []
      const maxLen = this.max - filesLen
      let i = 0
      let file = files[i]

      while (newFiles.length < maxLen && file) {
        if (this.beforeUploadCheck) {
          this.beforeUploadCheck(file)
        }
        if (!file.ignore) {
          newFiles.push(file)
          this.value.push(initFile())
        }
        file = files[++i]
      }

      processFiles(newFiles, (file, index) => {
        this.$set(this.value, filesLen + index, file)
        this.$emit('file-submitted', file)
      }, () => {
        this.$nextTick(() => {
          this.upload()
        })
      })
    },
    upload (retry) {
      if (!this.action) {
        return
      }
      const options = {
        target: this.action
      }
      const len = this.value.length
      let uploadingCount = 0
      let i = 0
      while (i < len && uploadingCount < this.simultaneousUploads) {
        const file = this.value[i]
        const status = file.status

        if (status === _ready || (retry && status === _error && file._retryId !== this.retryId)) {
          ajaxUpload(file, options, (file) => {
            if (status === _error) {
              file._retryId = this.retryId
            }
            this.$emit(file.status === _success ? 'file-success' : 'file-error', file, this.tag)
            this.upload(retry)
          })
          uploadingCount++
        } else if (status === _uploading) {
          uploadingCount++
        }
        i++
      }
    },
    clickFile (file) {
      if (file.status === 'success') {
        const index = this.value.indexOf(file)
      }
      this.$emit('file-click', file)
    },
    removeFile (file) {
      file._xhr && file._xhr.abort()
      if (file.url) {
        URL.revokeObjectURL(file.url)
      }
      const index = this.value.indexOf(file)
      this.value.splice(index, 1)
      // this.upload()
      this.$emit('file-removed', file)
    }
  },
  components: {
    Btn,
    File
  }
}
</script>

<style lang="stylus" scoped>
.upload {
  position: relative;
  .upload-def {
    margin-right: -10px;
    .upload-btn, .upload-file {
      float: left;
      margin: 0 10px 10px 0;
    }
  }
  .clear-fix {
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }
}
</style>
