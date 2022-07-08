<template>
  <div class="logi_container">
    <img src="../assets/城市.jpg" class="Logi_img"/>
<!--    <Logon></Logon>-->
    <div class="login_box">
      <!-- 头像区域-->
      <div class="avatar_box">
        <img src="../assets/touxiang/微信图片_20220531161507.jpg" alt="VUE图片" />
<!--        <img src="http://192.168.0.128:9001/buckets/bucket/browse/MjAyMi0wNy8wNS8xMTYyNTJmOGFjMzg0ZGU4OTlkZDEzYWEyYzdmZmUwMS5qcGc=" alt="VUE图片" />-->
      </div>

      <el-form ref="loginFromRef" :rules="loginfromRule" :model="loginfrom" label-width="80px" class="login_form">
        <el-form-item label="用户" prop="username">
<!--          .native 修饰符的作用简单讲就是绑定一个原生事件,将标签变为普通的HTML标签,不然该事件是无法触发的-->
          <el-input v-model="loginfrom.username" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginfrom.password" @keyup.enter.native="login" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @keyup.enter="keyDown" @click="login">登录</el-button>
          <el-button type="info" @click="restloginFrom">重置页面</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import Logon from '@/components/login/Logon'
export default {
  // components: { Logon },
  data () {
    return {
      thedivShow: true,
      loginfrom: {
        username: '',
        password: ''
      },
      loginfromRule: {
        // 验证用户名是否合法
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
      }
    }
  },
  created () {
  },
  // watch () {
  //   const self = this
  //   document.onkeydown = function (e) {
  //     const ev = document.all ? window.event : e
  //     if (ev.keyCode === 13) {
  //       self.login()
  //     }
  //   }
  // },
  methods: {
    keyDown (e) {
      // 如果是回车则执行登录方法
      this.$message.warning(1111111)
      if (e.keyCode == 13) {
        // 需要执行的登录方法
        this.login()
      }
    },
    restloginFrom () {
      // this对象代表当前组件对象
      // console.log(this)
      // 实现数据重置
      this.$refs.loginFromRef.resetFields()
    },
    login () {
      this.$refs.loginFromRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('登录失败')
          return
        }
        const { data: result } = await this.$http.post('user/login', this.loginfrom)
        if (result.status === 200) {
          await this.$router.push('/home')
          this.$message.success(result.message)
        } else if (result.status === 250) {
          this.$message.error(result.message)
        } else {
          this.$message.error('网络异常')
        }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Logi_img {
  height: 100%;
  width: 100%;
}

.logi_container {
  background-color: #55aaff;
  height: 100%;
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #EEEEEE;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #DDDDDD; /* 添加阴影*/
  position: absolute;           /* 绝对定位*/
  left: 50%;                    /* 距离左侧50%*/
  transform: translate(-50%,-50%);   /*回调50%*/
  background-color: #FFFFFF;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #EEEEEE;
  }
}
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #FFFFFF;
  /* 设定圆弧角*/
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #EEEEEE;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #DDDDDD; /* 添加阴影*/
    position: absolute;           /* 绝对定位*/
    left: 50%;                    /* 距离左侧50%*/
    transform: translate(-50%,-50%);   /*回调50%*/
    background-color: #FFFFFF;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #EEEEEE;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;

  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.login_box {
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
