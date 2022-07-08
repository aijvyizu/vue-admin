<template>
  <div>
    <div class="tool-button">

      <el-card>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button class="filter-item2" icon="el-icon-refresh" type="warning" @click="resetQuery">
                this.$router.go(0)
              </el-button>
            </div>
          </el-col>
          <el-col :span="6"><span class="user-span">组件化</span></el-col>
          <!--          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="6">
              <div class="grid-content bg-purple">
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!--    <h3>对象遍历</h3>-->
    <!--&lt;!&ndash;    Vue 2.2.0+的版本里，当在组件中使用v-for时，key是必须设置的。&ndash;&gt;-->
    <!--    <div v-for="(value, index) in carList" :key="index">-->
    <!--      -1-{{ value }}-2- {{ index }}-3- -->
    <!--    </div>-->
    <!-- 数组对象遍历 -->
    <!--    <div v-for="(value) in carList" :key="value.username">-->
    <!--      姓名：{{value.username}}-->
    <!--      年龄:{{value.birthday}}-->
    <MyTable
      :list-loading="listLoading"
    ></MyTable>
  </div>
</template>

<script>
import MyTable from './tables/MyTable'

export default {
  name: 'UserManage',
  components: { MyTable },
  data () {
    return {
      input: {
        id: '',
        name: '',
        address: '',
        phone: ''
      },
      date: {
        username: '',
        sex: '',
        property: '',
        phone: ''
      },
      carList: [],
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      listLoading: false
    }
  },
  created () {
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    itemClick () {
      if (!this.$route.path.includes(this.path)) {
        // 当前路径中不包括本path就执行
        this.$router.push(this.path)
      } else {
        console.log('重复点击')
      }
    },

    async resetQuery () {
      this.$router.go(0)
    }
  }

}
</script>

<style scoped>
.user-span {
  font-size: 40px
}
</style>
