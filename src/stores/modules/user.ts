import { defineStore } from 'pinia';

// 用户信息类型定义
interface UserInfo {
  userId: string;
  username: string;
  realName: string;
  phone: string;
  idCardPhoto: string;
  alipayAccount: string;
  sesameCredit: number;
  status: string;
  role: string;
  avatar: string;
  gender: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
}

// 定义用户store
export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null') as UserInfo | null,
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.userInfo,
  },
  
  actions: {
    // 保存登录信息
    saveLoginInfo(token: string, userInfo: UserInfo) {
      this.token = token;
      this.userInfo = userInfo;
      
      // 持久化存储
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    
    // 退出登录
    logout() {
      this.token = '';
      this.userInfo = null;
      
      // 清除本地存储 清除localStorage中的数据
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    },
    
    // 更新用户信息
    updateUserInfo(info: Partial<UserInfo>) {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...info };
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      }
    }
  }
});
