<!--my-table.vue-->
<template>
  <div>
    <el-card>
      <title>MyTable</title>
      <el-form ref="queryForm" :model="tableItem" label-width="200px">
        <!--          <el-form-item label="选择配置：">-->
        <!--            <el-select v-model="formData.pzId" placeholder="请选择配置..." value-key="id">-->
        <!--              <el-option v-for="config in configs" :key="config.id" :value="config.id" :label="config.pzmc">{{ config.pzmc }}</el-option>-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <el-form-item label="所属月:">
          <el-date-picker
            v-model="tableItem.birthday"
            type="month"
            value-format="MM月"
            format="MM"
            placeholder="选择月"
          />
        </el-form-item>
      </el-form>
      <el-button class="filter-item2" icon="el-icon-refresh" type="warning" @click="listQuery">
        搜索
      </el-button>
    </el-card>
<!--    <div>-->
<!--      <ul class="desc-list">-->
<!--        <li>不用担心不同数据调用弹框造成的数据污染和页面bug</li>-->
<!--        <li>保留了Element提供的el-dialog弹框弹出特效</li>-->
<!--        <li>模拟了完整的操作流程</li>-->
<!--      </ul>-->
<!--    </div>-->
    <el-card>
      <el-button type="text" icon="el-icon-circle-plus-outline" @click="addUser()">新增表单的 Dialog</el-button>

      <!--      小弹窗-->
      <add-update
        id="add-update"
        v-if="dialogFormVisible"
        ref="dialogComponent"
        :dialog-type="dialogType"
        :item-info="tableItem"
        :showDialog="dialogFormVisible"
        :disabledDialog="dialogFormVisibleDisabled"
        @closeDialog="closeDialog"
      ></add-update>
<!--      用户表单-->
      <el-table
        :data="carList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        stripe
        v-loading="this.tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width:100%">
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="250">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="membertype"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="community"
          label="小区">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="200" >
            <el-button @click="userView(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" icon="el-icon-edit" @click="userUpdate (scope.row)">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="userDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <!--    <el-table-column v-for="(item,key) in carList[0]" :key="key">-->
        <!--      <template slot="header">{{key}}</template>-->
        <!--      <template slot-scope="scope">{{carList[scope.$index][key]}}</template>-->
        <!--    </el-table-column>-->
        <!--        <el-table-column v-for="(item,key) in carList[0]" :key="key" :label="key" :prop="key">-->
        <!--        </el-table-column>-->
      </el-table>
      <el-empty description="描述文字" v-if="tableEmpty"></el-empty>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2,4,6,8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="carList.length"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddUpdate from "../dialog/AddUpdate";
export default {
  name: 'MyTable',
  components: { AddUpdate },
  props: {
    listLoading: {
      type: Boolean,
      default: false
    }
  },
  // inject: ['reload'],
  data () {
    return {
      tableItem: {
        username: '',
        password: '',
        community: '',
        property: '',
        birthday: '',
        sex: '',
        phone: '',
        membertype: ''
      },
      // addUpdateVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleDisabled: false,
      dialogType: '',
      carList: [],
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 6,
      tableLoading: false,
      tableEmpty: false
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    listQuery () {
      // this.tableLoading = true
      this.getUser()
      setTimeout(() => {
        // this.tableLoading = false
      }, 1000)
    },
    closeDialog (flag) {
      // console.log(flag, 'flag')
      if (flag !== 'quxiao') {
        // 重新刷新表格内容
        this.getUser()
      }
      this.dialogFormVisible = false
      // 重置tabelItem数据
      // Object.assign(this.tableItem, this.$options.data().tableItem)
    },
    userView (row) {
      // document.getElementById('add-update').readOnly()
      this.tableItem = row
      this.dialogFormVisible = true
      this.dialogFormVisibleDisabled = true
    },
    userUpdate (row) {
      this.tableItem = row
      this.dialogType = 'update'
      this.dialogFormVisible = true
      this.dialogFormVisibleDisabled = false
    },
    userDelete (row) {
      console.log(row.id, 'id')
      this.$http.delete('user/delete/' + row.id)
        .then(({ data }) => {
          if (data.status === 200) {
            this.$message.success('删除成功')
            // 删除后重新访问接口
            this.getUser()
            // 控制显示隐藏
            // this.reload()
          } else {
            console.log('没有获取到数据')
          }
        })
        .catch((err) => {
          console.log('获取数据出错', err)
        })
    },
    async getUser () {
      this.$http.get('user/getList')
        .then(( data ) => {
          this.tableLoading = true
          if (data.status === 200) {
            this.carList = data.obj1
            console.log(this.carList)
            this.tableEmpty = false
            this.tableLoading = false
            setTimeout(() => {
            }, 2000)
          } else {
            this.tableLoading = false
            this.tableEmpty = true
            console.log('没有获取到数据')
          }
        })
        .catch((err) => {
          console.log('获取数据出错', err)
        })
    },
    async addUser () {
      this.dialogFormVisibleDisabled = false
      this.dialogFormVisible = true
      this.dialogType = 'add'
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    async resetQuery () {
      this.$router.go(0)
      this.tableLoading = true
      setTimeout(() => {
        this.tableLoading = false
      }, 2000)
    }
  }
}

</script>
<style scoped>
filter-item2{
  left: 40%;
  position: absolute;
}
</style>
