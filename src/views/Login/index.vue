<template>
  <div class="auth-page">
    <!-- 返回首页按钮 -->
    <button class="back-to-home" @click="goToHome">
      <i class="fas fa-arrow-left"></i> 返回首页
    </button>
    
    <h2>登录，租客行</h2>
    <div 
      class="container" 
      id="container"
      :class="{ 'right-panel-active': isSignUp }"
    >

    <!-- 注册表单容器 -->
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleRegister">
          <h1>创建账号</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span></span>
          <input type="text" v-model="registerForm.username" placeholder="输入用户名" />
          <input type="text" v-model="registerForm.phone" placeholder="输入电话号" />
          <input type="password" v-model="registerForm.password" placeholder="输入密码" />
          <input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码" />
          <button type="submit" :loading="registerLoading">注册</button>
        </form>
      </div>


       <!-- 登录表单容器 -->
      <div class="form-container sign-in-container">
        <form @submit.prevent="handleLogin">
          <h1>登录</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>使用用户名或电话进行登录</span>
          <input type="text" v-model="loginForm.account" placeholder="输入用户名或者电话" />
          <input type="password" v-model="loginForm.password" placeholder="输入密码" />
          
          <button type="submit" :loading="loginLoading">登录</button>
        </form>
      </div>

      <!-- 切换覆盖层（带左右文字面板） -->
      <div class="overlay-container">
        <div class="overlay">

          <div class="overlay-panel overlay-left">
            <h1>欢迎回来!</h1>
            <p>点击下面的登录来与我们保持联系</p>
            <button class="ghost" id="signIn" @click="toggleForm(false)">登录</button>
          </div>

          <div class="overlay-panel overlay-right">
            <h1>你好朋友!</h1>
            <p>输入您的个人信息并开始与我们一起旅行</p>
            <button class="ghost" id="signUp" @click="toggleForm(true)">注册</button>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>
        张得帅的 <i class="fa fa-heart"></i>租客行
        <a target="_blank" href="">张得帅</a>
        -点击了解我
        <a target="_blank" href="">寻找我的踪迹</a>.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { login as loginApi, register as registerApi } from '@/apis/user';

// 路由实例
const router = useRouter();
// 用户store
const userStore = useUserStore();

// 响应式状态管理表单切换
const isSignUp = ref(false);

// 登录表单数据
const loginForm = ref({
  account: '',
  password: ''
});

// 注册表单数据
const registerForm = ref({
  username: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

// 加载状态
const loginLoading = ref(false);
const registerLoading = ref(false);

// 切换表单的方法
const toggleForm = (signUp) => {
  isSignUp.value = signUp;
};

// 返回首页方法
const goToHome = () => {
  router.push('/');
};

// 登录方法
const handleLogin = async () => {
  // 表单验证
  if (!loginForm.value.account || !loginForm.value.password) {
    ElMessage.error('请填写用户名/手机号和密码');
    return;
  }

  try {
    loginLoading.value = true;
    const res = await loginApi(loginForm.value);
    
    // 保存登录信息到store
    userStore.saveLoginInfo(res.result.token, res.result.userInfo);
    
    ElMessage.success('登录成功');
    // 根据用户角色判断跳转页面
    if (res.result.userInfo.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  } catch (error) {
    // 错误处理已经在request.ts中处理
  } finally {
    loginLoading.value = false;
  }
};

// 注册方法
const handleRegister = async () => {
  // 表单验证
  if (!registerForm.value.username || !registerForm.value.phone || !registerForm.value.password) {
    ElMessage.error('请填写完整的注册信息');
    return;
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }

  try {
    registerLoading.value = true;
    const res = await registerApi(registerForm.value);
    
    ElMessage.success('注册成功，请登录');
    // 切换到登录表单
    toggleForm(false);
    // 清空注册表单
    registerForm.value = {
      username: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };
  } catch (error) {
    // 错误处理已经在request.ts中处理
  } finally {
    registerLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.auth-page {
  background: #f6f5f7;
  background-image: url('@/assets/images/loginbackground.jpg');
  background-size: cover;  /* 图片覆盖容器 */
  background-repeat: no-repeat; /* 不重复平铺 */
  background-position: center; /* 图片居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;

  h2 {
    color: #FFFFFF;
  }
}

/* 返回首页按钮样式 */
.back-to-home {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transform: translateX(-3px);
  }

  i {
    margin-right: 5px;
  }
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
              0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #FF416C;
  background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
  background: linear-gradient(to right, #FF4B2B, #FF416C);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
  background-image: url('@/assets/images/eva1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
  background-image: url('@/assets/images/eva2.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
