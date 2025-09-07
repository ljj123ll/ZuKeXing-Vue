// src/shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 解决CSS模块的声明（如果使用了CSS Modules）
declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}