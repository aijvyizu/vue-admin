<template>
  <el-container class="home-container">
    <!-- 头部 -->

    <el-header>
      <span class="biaoti">管理系统</span>
      <h1> 管理系统 </h1>
      <el-button class="button" plain type="info" @click="logout">退出</el-button>
      <!--      <div>-->
      <!--        <label class="col-sm-2 control-label">touxiang</label><div class="col-sm-8">-->
      <!--        <label for="id_avatar"><img src="https://img2.woyaogexing.com/2021/04/17/2f7e4012de7c4c9a8adb70a81e3581eb!400x400.jpeg" alt="图像加载失败"></label>-->
      <!--        <input type="file" id="id_avatar" name="file" style="display:none">-->
      <!--      </div>-->
        <Touxiang2></Touxiang2>
        <TouXiang></TouXiang>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu :unique-opened="true" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
        >
          <el-menu-item index="3-1">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span @click="goHome"> 首页 </span>
            </template>
          </el-menu-item>
          <el-submenu index="1" @click="showUser">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户</span>
            </template>
            <el-menu-item-group>
              <template>
                <el-menu-item index="1-1" @click="showUser">用户统计</el-menu-item>
              </template>

              <el-menu-item index="1-2" @click="userManage">用户管理</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <!-- 第二个模块 -->
          <!--          <el-submenu index="2">-->
          <!--          </el-submenu>-->
          <!-- 业主信息管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>业主信息管理</span>
            </template>
            <el-menu-item-group>
              <template></template>
              <el-menu-item index="3-1" @click="get">选项1</el-menu-item>
              <el-menu-item index="3-2" @click="get2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-3" @click="get3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 资产管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>资产管理</span>
            </template>
            <el-menu-item-group>
              <template></template>
              <el-menu-item index="3-1" @click="get">选项1</el-menu-item>
              <el-menu-item index="3-2" @click="get2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-3" @click="get3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!--        广告窗-->
        <GuangGaoChuang></GuangGaoChuang>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TouXiang from '@/components/upload/TouXiang'
import GuangGaoChuang from '@/components/guanggao/Guanggaochuang'
import Touxiang2 from '@/components/upload/TouXiang2'

export default {
  components: {
    Touxiang2,
    GuangGaoChuang,
    TouXiang
  },
  data () {
    return {
      mulist: [],
      imgStr: 'https://ts1.cn.mm.bing.net/th/id/R-C.73dfa34d2eedac31411c8f6c408f6a16?rik=uBT9uTBPi6ffXA&riu=http%3a%2f%2fimg.woyaogexing.com%2f2015%2f03%2f28%2f329f650792871f1a!200x200.jpg&ehk=DgBjUsO8lfYU0yDg20oXRMkv0h97VzInK%2bKwPPkwDec%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
      errorStr: ''
    }
  },
  created () {
    // this.getmu()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    goHome () {
      this.$router.push({ path: '/welcome' })
    },
    // async getmu () {
    //   const { data: result } = await this.$http.get('/user')
    //   if (result.data.sta !== 200) {
    //     return this.result.data.error
    //   }
    //   this.mulist = this.result.data
    //   console.log(this.mulist)
    // },
    showUser () {
      this.$router.push({ path: '/showData' })
    },
    userManage () {
      this.$router.push({ path: '/userManage' })
    },
    get () {
      alert('按钮已经触发')
    },
    get2 () {
      alert('2按钮已经触发')
    },
    get3 () {
      alert('3按钮已经触发')
    }
  }
}
</script>

<style lang="less" scoped="">
.el-header {
  line-height: 70px;
  background-color: #373D41;
  display: flex;
  //display: inline;
  align-items: center;
  justify-content: space-between;
}
.el-aside {
  background-color: #676767;
}
.el-main {
  background-color: #f8f6f8;
}
.home-container {
  height: 100%;
}
.button {
  position: absolute;
  right: 5px;
  display: inline-block;
}
h1 {
  display: inline;
}
.biaoti {
  font-size: 40px;
}
</style>
