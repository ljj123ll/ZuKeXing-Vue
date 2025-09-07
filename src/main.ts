import { createApp } from 'vue'
import '@/styles/common.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // 导入 Pinia
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 1. 创建 Pinia 实例
const pinia = createPinia()

// 2. 创建 Vue 应用实例
const app = createApp(App)

// 3. 安装 Element Plus
app.use(ElementPlus)

// 4. 安装 Pinia
app.use(pinia)

// 5. 安装路由
app.use(router)

// 6. 挂载应用
app.mount('#app')