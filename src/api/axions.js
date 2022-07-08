import axions from "autoprefixer";
import Vue from "vue";
axions.defaults.baseURL = '/api'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axions.defaults.baseURL = 'http://192.168.0.128:8090/'
Vue.prototype.axions = axions

export default axions;
