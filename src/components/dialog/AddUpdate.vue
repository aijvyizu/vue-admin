<template>
  <div>
    <!--    <el-button type="text" icon="el-icon-circle-plus-outline" @click="dialogFormVisible=true">新增表单的 Dialog</el-button>-->
    <!--    <el-dialog title="新增表单" :visible.sync="dialogFormVisible" >-->
    <el-dialog :title="dialogtype"
               :visible.sync="dialogFormVisible"
               @close="closeDialog(0)"
    >
      <el-form v-if="showDialog" :model="form" :rules="rules" ref="formInfo" :disabled="disabledDialog">
        <!--        <el-form-item label="id" :label-width="formLabelWidth">-->
        <!--          <el-input v-model="form.id" autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="username" required>
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password" required>
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" >
          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="form.birthday"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <!--          <el-input v-model="form.birthday" autocomplete="off"></el-input>-->
        </el-form-item>
        <el-form-item label="小区" :label-width="formLabelWidth" prop="community">
          <el-input v-model="form.community" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="membertype">
          <el-input v-model="form.membertype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item label="活动区域" :label-width="formLabelWidth">-->
        <!--          <el-select v-model="form.region" placeholder="请选择活动区域">-->
        <!--            <el-option label="区域一" value="shanghai"></el-option>-->
        <!--            <el-option label="区域二" value="beijing"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('quxiao')">取 消</el-button>
        <el-button v-if="!disabledDialog" type="primary" @click="saveUser(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-update',
  props: {
    disabledDialog: {
      type: Boolean,
      default: false
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    dialogType: {
      type: String,
      default: ''
    },
    itemInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    this.fuchuanzi()
  },
  data () {
    return {
      rules: {
        username: [{
          required: true,
          message: '请输入登录名称',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 30,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 30,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }]
      },
      addUpdateVisible: false,
      dialogFormVisible: false,
      dialogtype: '',
      form: {
        username: '',
        password: '',
        community: '',
        property: '',
        birthday: '',
        sex: '',
        phone: '',
        membertype: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    closeDialog (flag) {
      // Object.assign(this.form, this.$options.data().form)
      this.$refs.formInfo.resetFields()
      this.dialogFormVisible = false
      this.dialogtype = ''
      this.$message.info(flag)
      this.$emit('closeDialog', flag)
    },
    async fuchuanzi () {
      this.dialogtype = this.dialogType
      this.form = this.itemInfo
      this.dialogFormVisible = this.showDialog
    },
    saveUser (form) {
      this.$refs.formInfo.validate(
        (valid) => {
          if (valid) {
            if (this.dialogType === 'add') {
              this.addUser(form)
            } else if (this.dialogType === 'update') {
              this.updateUser(form)
            }
          } else {
            this.$message.error()
            return false
          }
        })
    },
    async addUser (form) {
      const { data } = await this.$http.post('/user/add', form)
      // console.log(data, 'this.adduser')
      if (data.status === 200) {
        this.$message.success('更新成功')
      } else {
        return this.$message.error('新增失败')
      }
      this.dialogtype = ''
      this.closeDialog('xinzeng')
    },
    async updateUser (form) {
      this.dialogFormVisible = true
      this.$http.post('user/update', form, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
        .then(({ data }) => {
          if (data.status === 200) {
            // this.carList = data.obj1
            this.$message.success('更新成功')
          } else {
            console.log('没有获取到数据')
          }
          this.dialogtype = ''
          this.closeDialog('gengxin')
        })
        .catch((err) => {
          console.log('获取数据出错', err)
        })
    }
  }
}
</script>

<style scoped>

</style>
