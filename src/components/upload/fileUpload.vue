<template>
  <div>

    <!-- 上传文件 -->
    <el-upload
      :limit="5"
      :auto-upload="false"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :action="doUpload"
      class="upload-demo"
      @download="handleDownload"
      list-type="picture"
      :file-list="fileList"
    >
      <el-button size="small" type="upload">查找文件</el-button>
    </el-upload>
    <div class="el-upload__tip">{{ '' == this.uploadFileName ? '暂无文件上传' : this.uploadFileName }}</div>
    <el-button type="primary" @click="uploadFile">确 定</el-button>
  </div>
</template>

<script>
import url from 'url'
// import { save } from '@/api/CRUDCore'
export default {
  name: 'fileUpload',
  data () {
    return {
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ],
      uploadFileName: '',
      doUpload: '#',
      // doUpload: 'http://192.168.0.128:9001/buckets/bucket/browse',
      // doUpload: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      file: null
    }
  },
  methods: {
    beforeUpload (file) {
      debugger
      console.log(file, '文件')
      this.files = file
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2) {
        this.$message.warning('上传模板只能是 xls、xlsx格式!')
        return
      }
      if (!isLt2M) {
        this.$message.warning('上传模板大小不能超过 5MB!')
        return
      }
      this.fileName = file.name
      return false // 返回false不会自动上传
    },
    handleChange (file, fileList) {
      console.log('filechange')
      this.fileList = fileList.slice(0)
    },
    // 文件下载
    handleDownload (file) {
      this.$message.warn('您点击了下载')
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      // console.log(fileList)
    },
    // 文件超出个数限制时的钩子
    handleExceed (file, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${file.length} 个文件，共选择了 ${file.length + fileList.length} 个文件`)
    },
    upload (event) {
      // 将接收到的文件以表单形式post到接口
      console.log(event)
      const file = event.target.fileList[0]
      const formData = new FormData()
      formData.append('file', file)
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }, // 文件上传配置
        responseType: 'arraybuffer'// 文件下载配置
      }
      this.$axios
        .post('/sys/file/upload', formData, config)// 进行了跨域代理
        .then(response => {
          // 对返回的文件流进行下载
          const url = window.URL.createObjectURL(new Blob([response.data])) // 创建下载链接
          const link = document.createElement('a') // 创建a标签
          link.style.display = 'none' // 将a标签隐藏
          link.href = url // 给a标签添加下载链接
          link.setAttribute('download', 'abc.docx') // 此处注意，要给a标签添加一个download属性，属性值就是文件名称 否则下载出来的文件是没有属性的，空白白
          document.body.appendChild(link)
          link.click() // 执行a标签
        })
    },

    /**
     * 上传文件
     */
    uploadFile () {
      if (this.fileList !== undefined && this.fileList.length > 0) {
      // if (this.fileList[0] != null) {
        // 这边可以携带参数，id，code，name什么的
        // const formData = new FormData()
        // formData.append('file', this.fileList[0])
        // 这个是axios方法，你自己的方法
        this.file = this.fileList[0]
        console.log('数值不为空')
        this.uploadF(this.file).then((res) => {
        // this.uploadF(formData).then((res) => {
          return console.info('上传结果', res)
        })
      } else {
        return console.info('请选择上传的文件！')
      }
    },
    async uploadF () {
      console.log('上传' + this.file)
      if (this.fileName == '') {
        this.$message.warning('请选择要上传的文件！')
        return '请选择要上传的文件！'
      }
      const fileFormData = new FormData()
      fileFormData.append('file', this.file)// filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      const requestConfig = {
        headers: {
          'Content-Type': '\n' +
            'multipart/form-data; boundary=--------------------------291736872413083531659167'
          // 'Content-Type': 'multipart/form-data'
        }
      }
      const { code } = this.$http.post('/sys/file/upload' + fileFormData, requestConfig).then((res) => {
      // const { code } = this.$http.post('/sys/file/upload' + fileFormData, requestConfig)
        if (code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refresh-list', true)
            }
          })
        } else {
          return this.$message.error(res)
        }
      })
    },
    /**
     * 下载文件
     * @param docId
     */
    downloadFile () {
      var elemIF = document.createElement('iframe')
      // 这是你后端拼接的url，和axios请求url写法一样，一般为了解决跨域问题，都会做代理，所以一般不会把ip地址拼接上去
      elemIF.src = url
      elemIF.style.display = 'none'
      // 将iframe放到body后面
      document.body.appendChild(elemIF)
    }

  }
}
</script>
