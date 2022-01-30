import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表文件
import('./assets/css/global.css')
import('./assets/fonts/iconfont.css')

// import ZkTable from 'vue-table-with-tree-grid'
// Vue.use(ZkTable)
import ZkTable from 'vue-table-with-tree-grid'

Vue.component("tree-table", ZkTable)

// 富文本编辑
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

import axios from "axios";
// 配置基本路径
axios.defaults.baseURL = 'http://www.tangxiaoyang.vip:8888/api/v2/'
// 拦截所有请求, 对每次请求头进行处理
axios.interceptors.request.use(config => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (!userInfo) {
        return config
    }
    config.headers.Authorization = userInfo.data.token
    return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')


