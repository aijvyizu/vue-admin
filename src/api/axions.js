
import Vue from "vue";
import axions from "autoprefixer";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axions.defaults.baseURL = 'http://192.168.0.128:8090/'
axions.defaults.baseURL = '/api'
Vue.prototype.$http = axions

// export default $http;
