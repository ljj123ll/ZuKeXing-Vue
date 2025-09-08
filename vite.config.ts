import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve:{
    // 配置路径别名
    alias:{
      // 把路径指向src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5174, // 固定端口
    headers: {
      'Cache-Control': 'no-store', // 禁用浏览器缓存，避免复用5173的token缓存
      'X-Frame-Options': 'DENY', // 禁止嵌入5173的iframe，切断iframe跨源通信
    },
    origin: 'http://localhost:5174', // 明确当前源，避免Vite返回模糊源导致混淆
  },
  define: {
    'import.meta.env.VITE_PORT': JSON.stringify(5174), // 注入端口环境变量（供存储key使用）
  }
})
