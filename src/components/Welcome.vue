<template>
  <div>
    <h1 class="h1-title" style="text-align: justify-all">welcome</h1>
    <el-row>
      <el-col :span="16">
        <Carousel class="carousel"></Carousel>
      </el-col>
    <el-col :span="8">
    </el-col>
      </el-row>

<!--    <GuangGaoChuang></GuangGaoChuang>-->
  </div>
</template>
<script>
import Carousel from '@/components/carousel/Carousel'
export default {
  name: 'welcome',
  components: { Carousel }
}
</script>
<style>
  .h1-title{
    font-style:oblique;
    font-size:2.5em;
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
  }
  .carousel{
    left: auto;
    position: fixed;
  }
</style>
