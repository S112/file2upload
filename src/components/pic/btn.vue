<template>
<div class="btn">
  <slot>
    <div class="btn-def"><i></i></div>
  </slot>
  <input class="btn-input" type="file" :accept="accept" :multiple="multiple" @change="changeHandler" />
</div>
</template>

<script>
export default {
  name: 'btn',
  props: {
    accept: { // 文件上传类型
      type: String,
      default: 'image/*'
    },
    multiple: { // 是否允许用户选择多个文件
      type: Boolean,
      default: true
    }
  },
  methods: {
    changeHandler (e) {
      const fileEle = e.currentTarget
      const files = fileEle.files

      if (files) {
        this.$emit('add', files)
        fileEle.value = null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../..//assets/css/var.styl";
.btn {
  position: relative;
  overflow: hidden;
  &:active {
    .btn-def { background-color: $upload-btn-active-bgc; }
  }
  .btn-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    font-size: 0;
    opacity: 0;
  }
  .btn-def {
    box-sizing: border-box;
    position: relative;
    width: 80px;
    height: 80px;
    background-color: $upload-btn-bgc;
    box-shadow: $upload-btn-box-shadow;
    border-radius: 2px;
    border:1px dashed $upload-btn-border-color;
    > i {
      &::before, &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 2px;
        transform: translate(-50%, -50%);
        background-color: $upload-btn-color;
      }
      &::after {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
  }
}
</style>
