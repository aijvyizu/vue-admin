<template #default="{row}">
  <div class="form-container">
    <div style="text-align: center">
      <li>标题</li>
      <el-checkbox-group v-model="type" size="small" >
        <el-checkbox label="测试" border />
        <el-checkbox label="姓名" border />
        <el-checkbox label="年龄" border />
        <el-checkbox label="性别" border />
      </el-checkbox-group>
    </div>
    <!--      <el-form-item label="文件类型：">-->
    <!--        <el-input v-model="formData.fileName" />-->
    <!--      </el-form-item>-->
    <div class="layer-footer-button">
      <el-button v-if="params.isEdit === 'Y'" type="primary" size="mini" @click="commit">确认</el-button>
      <el-button type="danger" size="mini" @click="createWORD">生成word</el-button>
      <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="downLoadWORDs">
        下载模板
      </el-button>
    </div>
  </div>
</template>

<script>

import { save } from '@/api/CRUDCore'
import { layerMixin } from '@/libs/core'

export default {
  name: 'fileupdown',
  components: { },
  mixins: [layerMixin],
  props: {
  },
  data () {
    return {
      id: '',
      type: []
    }
  },
  computed: {
  },
  watch: {},
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    downLoadWORDs () {
      // this.$utils.fileDownload(`/file-item/downloadWORDs`)
      this.$utils.fileDownload('/file-item/downloadWORDs', { type: this.type })
    },
    createWORD () {
      // this.$utils.fileDownload(`/file-item/downloadWORDs`)
      this.$utils.fileDownload(`/ht-item/userinfo/${this.id}createWORD`, { type: this.type })
    },
    async init () {
      // const { id } = this.params
      this.id = '2021122005351229'
      // if (id) {
      //   const { data } = await get(`/file-item/get/${id}`)
      //   this.formData = data
      // }
    },
    commit () {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          const { code, message } = await save('/file-item/save', this.formData)
          if (code === '0') {
            this.$utils.message('success', '数据保存成功！')
            this.cancel(true)
          } else {
            this.$utils.errorMessage('错误', message)
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
