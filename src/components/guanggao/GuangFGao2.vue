<template>
  <div>
      <h1>这是一个cesium页面</h1>
      <el-button @click="tiaozhuan">
        下载页面
      </el-button>
    <uploaddownload
      :outerVisible="showDialog"
    ></uploaddownload>
  </div>
</template>

<script>
import uploaddownload from '@/components/dialog/uploadDownloadDialog.vue'
export default {
  name: 'guanggao2',
  components: { uploaddownload },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    tiaozhuan () {
      this.showDialog = true
    },
    closeDialog (flag) {
      // console.log(flag, 'flag')
      if (flag !== 'quxiao') {
        // 重新刷新表格内容
        this.getUser()
      }
      this.showDialog = false
      // 重置tabelItem数据
      // Object.assign(this.tableItem, this.$options.data().tableItem)
    }
  }
}
</script>

<style scoped>

</style>
