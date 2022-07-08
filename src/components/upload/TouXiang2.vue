<template>
<div id="app">
  <div class="item_bock">
    <div class="head_img">
      <img :src="userInfo.avatar"/>
    </div>
    <div class="setting_right" @click.stop="uploadHeadImg">
      <div class="caption">更改头像</div>
<!--      <p class="tip">图片限制50kb <span class="error">{{errorStr}}</span></p>-->
    </div>
    <input accept="image/*" class="hiddenInput" type="file" @change="handleFile"/>
  </div>
</div>
</template>
<script>
export default {
  name: 'touxiang2',
  data () {
    return {
      userInfo: {
        // avatar: 'https://img2.woyaogexing.com/2019/03/02/e4a5eedffb4b470f84d9d5a54b762985!400x400.jpeg'
        avatar: '../assets/touxiang/微信图片_20220622163655.jpg'
      }
    }
    // 初始图片
  },
  methods: {
    // 打开图片上传
    uploadHeadImg: async function (e) {
      this.$el.querySelector('.hiddenInput').click()
      // this.upload()
      const file = e.target.files[0]
      const fileFormData = new FormData()
      fileFormData.append('file', file)
      const { data: result } = await this.$http.post('/sys/file/upload', fileFormData)
      // const { data: result } = await this.$http.post('/sys/file/upload', this.userInfo.avatar)
      if (result.status === 200) {
        await this.$router.push('/home')
        this.$message.success(result.message)
      } else if (result.status === 250) {
        this.$message.error(result.message)
      } else {
        this.$message.error('网络异常')
      }
    },
    // 将头像显示
    handleFile: function (e) {
      const $target = e.target || e.srcElement
      const file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        const res = data.target || data.srcElement
        this.userInfo.avatar = res.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style>
.item_bock {
  position: absolute;
  top: 5px;
  right: 80px;
  display: inline-block;
  /*display: flex;*/
  align-items: center;
  justify-content: space-between;
  height:50px;
  width: 50px;
  /*padding:0px 24px 0px 38px;*/
  border-bottom: 1px solid #f7f7f7;
  background: #fff;
}
.head_img{
  height: 5px;
}
.head_img img{
  width:50px;
  height:50px;
  /*原头像*/
  /*border-radius:60px*/
}
.setting_right{
  display: flex;
  height: 25px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput{
  display: none;
  position: absolute;
  left: 0;
  top: 0;
}
.caption {
  position: relative;
  right: 50px;
  color: #8F8F8F;
  font-size: 12px;
  height: 37px;
}
</style>
