<template>
      <div class="user-header">
        <input type="file" name="image" accept="image/*" @change='onchangeImgFun'
               class="header-upload-btn user-header-com">
        <img  alt="" :src='imgStr' class="user-header-img user-header-com">
        <p class="tip">图片限制50kb <span class="error">{{errorStr}}</span></p>
      </div>
  <!-- input 的accept属性可以用来解决格式筛选问题 -->
</template>

<script>
export default {
  name: 'TouXiang',
  data () {
    return {
      mulist: [],
      imgStr: '',
      errorStr: ''
    }
  },
  created () {
    // this.getmu()
  },
  methods: {
    onchangeImgFun (e) {
      var file = e.target.files[0]
      console.log(file)
      // 获取图片的大小，做大小限制有用
      const imgSize = file.size
      console.log(imgSize)
      var _this = this // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 50 * 1024) {
        // 合格
        _this.errorStr = ''
        console.log('大小合适')
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0])
        // console.log(window.URL.createObjectURL(e.target.files[0])) // 获取当前文件的信息

        // base64方法 2
        var reader = new FileReader()
        reader.readAsDataURL(file) // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result
          console.log(dataURL)
          _this.imgStr = dataURL
          // 下面逻辑处理
        }
      } else {
        console.log('大小不合适')
        _this.errorStr = '图片大小超出范围'
      }
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

<style scoped>
.user-header{
  position: fixed;
  display: inline-block;
  /* 相对元素原来的位置距离上边缘 50px */
  right: 150px;
  top: 5px;
}
.user-header-com{
  width: 50px;
  height: 50px;
  display: inline-block;
}
.header-upload-btn{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}
.tip{
  position: relative;
  font-size: 14px;
  color: #666;
}
/* error是用于错误提示 */
.error{
  font-size: 12px;
  color: tomato;
  margin-left: 10px;
}
</style>
