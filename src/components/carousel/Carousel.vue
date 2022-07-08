<template>
  <div class="carousel">
<!--    <span class="demonstration">默认 Hover 指示器触发</span>-->
    <el-carousel :interval="4500" height="700px" >
        <el-carousel-item v-for="item in tips" :key="item.id">
          <h3 v-show="item.id<4" class="small" >{{ item.T }}</h3>
          <img v-show="item.id>=4" :src="item.T" class="image">
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      tips: [
        {
          id: 1,
          T: `这是一个Carousel 走马灯

            默认 Hover 指示器触发`
        },
        { id: 2, T: '写了一个简单的echarts图标' },
        { id: 3, T: '还有一个复杂的图标' },
        { id: 4, T: 'https://ts1.cn.mm.bing.net/th/id/R-C.0cda61506f02d7583006b73e222f7b16?rik=YOvEjdAwraOGBw&riu=http%3a%2f%2fwww.p5w.net%2fnews%2fcjxw%2f201307%2fW020130703445434881427.jpg&ehk=V%2b%2bHdFg70Jnzl%2f28wsXPctL07O6lOEpURkx%2fEfzCVNQ%3d&risl=&pid=ImgRaw&r=0' },
        { id: 5, T: 'https://i.loli.net/2021/08/10/pj46B79XLudiv1z.jpg' }
      ]
    }
  },
  methods: {
    setImg () {
      // 首次加载时,需要调用一次
      this.screenWidth = window.innerWidth
      this.setSize()
      // 窗口大小发生改变时,调用一次
      window.onresize = () => {
        this.screenWidth = window.innerWidth
        this.setSize()
      }
    }
  }
}
</script>

<style scoped>
img{
  /*设置图片宽度和浏览器宽度一致*/
  height:inherit;
  margin: auto;
  position: relative;
}
.carousel{
  margin: 0 auto;
  height: 200px;
  position: fixed;
  top: auto;
  width: 60em;
}
.el-carousel__item h3 {
  width: 80%;
  left: 15%;
  color: #0a76f5;
  font-size: 44px;
  opacity: 0.75;
  line-height: 100px;
  top:50%;
  position: absolute;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.image{
  position: relative;
  /*text-align: center;*/
}
.small{
  margin-left: 500px;
}
</style>
