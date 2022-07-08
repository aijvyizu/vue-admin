<template>
  <div>
    <card>
      <h1>这是一个广告页面</h1>
      <el-button @click="tiaozhuan">
        下载页面
      </el-button>
    </card>
    <fileupdown
    :visible="showDialog"
    ></fileupdown>
  </div>
</template>

<script>
import Fileupdown from '@/components/dialog/FileUploadDownload'
export default {
  name: 'guanggao',
  components: { Fileupdown },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {

    tiaozhuan () {
      // this.$router.push({ path: '/fileupdown' })
    }
  }
}
</script>

<style scoped>

</style>
