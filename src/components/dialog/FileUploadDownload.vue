<template>
  <!-- 遮罩层 self只是点击自己-->
  <transition name="dialog-fade">
    <div class="dialog_wrap" v-show="visible" @click.self="handleMaskClose">
      <div class="dialog" :style="{ width, marginTop: top }">
        <div class="dialog_header">
          <!-- 标题的具名插槽 不传值时候 直接取title 否者替换slot-->
          <slot name="title">
            <span class="dialog_header_title">{{ title }}</span>
          </slot>
          <button class="dialog_header_btn" @click="handleClose">
            <span class="removes" titl="关闭"></span>
          </button>
        </div>
        <div class="dialog_body">
          <slot>
            <span>这是一条消息</span>
          </slot>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          >shangchuan</el-upload>
          <el-button @click="download">xiaozai</el-button>
        </div>
        <div class="dialog_footer">
          <slot name="footer"></slot>
          <slot name="footer">
            <button class="dialog_footer_cancel" @click="handleCancel">
              取消
            </button>
            <button class="dialog_footer_comfirm" @click="download">
              下载
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 *
 * * 注意点：:visible.sync="visible"
 * * * 就是原本使用 子组件修改父组件需要通过组件通讯，只不过子组件向父组件发射事件时候，
 * * * 可以设置一个限定的触发事件，也就是 `this.$emit("update:visible", false)`,
 * * * 这样的话，直接把 v-bind 与 @click 简化为 -> `:visible.sync="visible"` 可实现子组件修改父组件的状态
 */
export default {
  name: 'fileupdown2',
  props: {
    title: {
      type: String,
      default: '消息'
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false
    },
    mashFlag: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleMaskClose () {
      if (!this.mashFlag) return false
      this.$emit('handleCancel', false)
    },
    handleClose () {
      this.$emit('handleCancel', 'guanbi')
    },
    handleCancel () {
      this.$emit('handleCancel', 'quxiao')
    },
    download () {
      const { code } = this.$http.post('/sys/file/download', this.formData)
      if (code === '0') {
        this.$message.success('数据保存成功！')
        this.cancel(true)
      } else {
        this.$message.error('错误！')
      }
      this.$emit('handleCancel', 'xiazai')
    },
    upload () {
      const { code } = this.$http.post('/sys/file/upload', this.formData)
      if (code === '0') {
        this.$message.success('数据保存成功！')
        this.cancel(true)
      } else {
        this.$message.error('错误！')
      }
      this.$emit('handleCancel', 'xiazai')
    }

  }
}
</script>
<style  lang="scss" scoped>
.dialog-fade-enter-active {
  animation: fade 0.5s;
}
.dialog-fade-leave-active {
  animation: fade 0.5s reverse;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.dialog_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background: rgba(0, 0, 0, 0.5);
  .dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;
    & > .dialog_header {
      padding: 20px 20px 10px;
      line-height: 24px;
      font-size: 18px;
      color: #303133;
      .dialog_header_btn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
      }
      .removes {
        position: absolute;
        right: 0;
        top: 0;
        color: #303133;
        cursor: pointer;
      }
      .removes::before {
        content: "\2716";
      }
    }
    & > .dialog_body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    & > .dialog_footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      button {
        background: transparent;
        padding: 4px 6px;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 14px;
        border: 1px solid #ccc;
      }
      .dialog_footer_cancel {
        margin-right: 20px;
      }
    }
  }
}
</style>
