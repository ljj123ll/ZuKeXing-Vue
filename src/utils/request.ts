import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useUserStore } from '@/stores/modules/user';
import { ElMessage } from 'element-plus';// UI组件的提示框

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    // 默认请求头
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器：发送请求前的处理
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore();
    // 如果已登录（有token），自动在请求头添加Token（用于后端认证）
    if (userStore.token) {
      config.headers = config.headers || {};
      // 格式通常为"Bearer Token值"
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // 请求发送失败时的错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器：收到响应后的处理
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 后端返回的原始数据
    const { data } = response;
    
    // 如果后端返回错误码
    if (data.code !== 200) {
      // 提示错误信息
      ElMessage.error(data.message || '操作失败');
      // 抛错，让调用方可以catch
      return Promise.reject(new Error(data.message || 'Error'));
    }
    // 成功时返回后端数据（简化调用方处理）
    return data;
  },

  (error: AxiosError) => {
    // 处理HTTP状态码错误（如401未授权、500服务器错误）
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          // 提取后端返回的具体错误信息（如“账户不存在”“密码错误”）
          ElMessage.error(data?.message || '请求参数错误'); 
          break;
        case 401:
          ElMessage.error('请先登录');
          // 清除登录状态并跳转登录页
          const userStore = useUserStore();
          userStore.logout();
          window.location.href = '/login';
          break;
        case 403:
          ElMessage.error('没有权限');
          break;
        case 404:
          ElMessage.error('请求地址不存在');
          break;
        case 500:
          ElMessage.error('服务器内部错误');
          break;
        default:
          ElMessage.error(`请求错误: ${error.response.status}`);
      }
    } else if (error.request) {
      ElMessage.error('请求超时，请稍后重试');
    } else {
      ElMessage.error('请求失败，请稍后重试');
    }
    
    return Promise.reject(error);
  }
);

export default request;
