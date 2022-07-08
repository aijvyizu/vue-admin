<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <!-- 页面主题 -->
    <div class="zsgc-div">
        <div style="height: 200px">
          <h1>这是一个跳转的用户统计页面</h1>
          <el-button onclick="location.reload()">location.reload</el-button>
        </div>
    </div>
    <div>
      <MyEcharts></MyEcharts>
    </div>
    <div>
      <template>
        <div id="chart_work" class="c-myEcharts"/>
      </template>
    </div>
  </el-container>

</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'
import MyEcharts from './echarts/My-echarts'

export default {
  components: { MyEcharts },
  mixins: [],
  props: {
    reportKey: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      barData: {
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }]
      },
      // yAxis: {},
      // series: {}
      dataMax: {},
      sun: 0,
      formData: {},
      userList: {},
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10

    }
  },
  created () {
    this.getUser()
  },
  mounted () {
    this.init()
    // this.showChart()
  },
  methods: {
    async getUser () {
      const { data } = await this.$http.get('/user/getList')
      // console.log(result)
      if (data.status !== 200) {
        return this.$message.error('未查到数据')
      }
      this.userList = data.obj1
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    async showChart () {
      const myChart = echarts.init(document.getElementById('chart_work'))
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + '<br/>' +
              params[1].seriesName + ' : ' +
              params[1].value + ' <br/>'
          }
          // axisPointer: {
          //   type: 'shadow',
          //   shadowStyle: {
          //     shadowBlur: 0,
          //     opacity: 0.1
          //   }
          // }
        },
        grid: {
          y: 15,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: [
          {
            show: true,
            boundaryGap: true,
            type: 'category',
            name: '',
            data: this.barData.yAxis.data,
            // 升序
            inverse: false,
            axisLabel: {
              textStyle: {
                show: true,
                fontFamily: '微软雅黑',
                color: '#0aefef',
                fontSize: '15'
              }
            },
            axisLine: { // y轴
              show: false
            },
            axisTick: { // y轴刻度线
              show: false
            },
            splitLine: { // 网格线
              show: false
            }
          }
        ],
        xAxis: [
          {
            max: this.sun,
            show: false,
            type: 'value',
            name: '销量(kg)',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '背景',
            type: 'bar',
            barWidth: 15,
            barGap: '-100%',
            data: [3, 3, 3, 3],
            itemStyle: {
              normal: {
                color: 'rgb(201,205,227)',
                barBorderRadius: 8
              }
            }
          },
          {
            label: {
              show: true,
              // labelText在bar外右上方
              position: 'insideTopRight',
              offset: [-11, -2],
              distance: -12,
              color: '#37BBF8'
            },
            // 覆盖掉另一条bar
            barGap: '-100%',
            barCategoryGap: '50%',
            barWidth: 15, // 修改柱状图的宽度
            itemStyle: {
              color: '#36adee',
              emphasis: {
                barBorderRadius: 8
              },
              normal: {
                // color: 'rgb(18,241,197)',
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   { offset: 0, color: '#83bff6' },
                //   { offset: 0.5, color: '#188df0' },
                //   { offset: 1, color: '#188df0' }
                // ]),
                // 渐变色
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    {
                      offset: 0,
                      color: '#d6dde8'
                    },
                    {
                      offset: 1,
                      color: '#37BBF8'
                    }
                  ]
                ),
                shadowBlur: 20,
                shadowColor: 'rgba(64,95,94,0.5)',
                barBorderRadius: 8
              }
            },
            // showBackground: true,
            // backgroundStyle: {
            //   // 背景圆角不生效
            //   borderRadius: 8,
            //   // 背景色
            //   color: 'rgb(9,60,167)'
            //   // color: 'rgb(211,216,227)'
            // },
            name: '人数',
            type: 'bar',
            stack: '总量',
            // data: [1, 20, 3, 30, 40]
            data: this.barData.series.data
          }
        ]
      }
      myChart.setOption(option)
      // const that = this
      // this指向事件源
      myChart.on('click', function (param) {
        console.log('大法师的' + param)// 这里根据param填写你的跳转逻辑
        // that.$router.push({ name: 'workTitle', params: { report: that.reportKey }})
      })
      // myChart.on('click', (param) => {
      //   // console.log('大法师的' + param)// 这里根据param填写你的跳转逻辑
      //   this.$router.push({ name: 'workTitle', params: { report: this.reportKey }})
      // })
    },
    goToWork () {
      // 跳转到上一次浏览的页面
      // this.$router.go(-1);
      // 跳转到指定的页面
      // this.$router.replace('/menu');
      // 跳转到指定路由名字下
      // this.$router.replace({ name: 'workTitle' })
      // 通过push进行跳转
      // this.$router.push({ name: 'workTitle', params: { report: 'all' }})
    },
    async init () {
      const { data } = await this.$http.get('/user/getList')
      // console.log(result)
      if (data.status !== 200) {
        return this.$message.error('未查到数据')
      }
      // this.barData = data
      // 自己定义的数据
      this.barData.series[0].data = [1, 2, 3, 8]
      this.sun = 0
      for (let i = 0; i < 4; i++) {
        this.sun = this.sun + this.barData.series[0].data[i]
      }
      for (let i = 0; i < 4; i++) {
        this.dataMax[i] = this.sun
      }
      console.log(this.barData)
      // await this.showChart()
      await this.showChart()
      // }
      // else {
      //   this.$message.info('提示', '服务部异常！')
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
}

.myEcharts {
  height: 500px;
  width: 500px;
}

.el-aside {
  background-color: #676767;
}

.el-main {
  background-color: #faf7fa;
}

.home-container {
  height: 100%;
}

.c-myEcharts {
  height: 100%;
}
</style>
