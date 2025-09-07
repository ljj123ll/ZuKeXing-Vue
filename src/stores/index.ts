import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建Pinia实例
const pinia = createPinia()

// 安装持久化插件（自动将state持久化到localStorage/sessionStorage）
pinia.use(persist)

export default pinia


// 导出user store供全局使用
export * from './modules/user'
