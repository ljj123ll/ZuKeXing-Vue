<template>
  <div class="admin-container">
    <!-- 顶部导航栏 -->
    <header class="admin-header">
      <div class="header-left">
        <h1>租客行管理后台</h1>
      </div>
      <div class="header-right">
        <span class="welcome-text">欢迎，{{ currentUser?.username }}</span>
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <div class="admin-main">
      <!-- 侧边栏导航 -->
      <aside class="admin-sidebar">
        <nav>
          <ul>
            <li class="nav-item active">
              <a href="#" @click.prevent="setActive('dashboard')">
                <i class="fas fa-tachometer-alt"></i>
                <span>仪表盘</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click.prevent="setActive('users')">
                <i class="fas fa-users"></i>
                <span>用户管理</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click.prevent="setActive('properties')">
                <i class="fas fa-building"></i>
                <span>房源管理</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click.prevent="setActive('orders')">
                <i class="fas fa-file-invoice-dollar"></i>
                <span>订单管理</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click.prevent="setActive('system')">
                <i class="fas fa-cog"></i>
                <span>系统设置</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- 内容区域 -->
      <main class="content-area">
        <div class="dashboard-overview">
          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <h3>总用户数</h3>
                <p class="stat-number">1,254</p>
                <p class="stat-change">+12% 本月</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-building"></i>
              </div>
              <div class="stat-content">
                <h3>房源总数</h3>
                <p class="stat-number">328</p>
                <p class="stat-change">+5% 本月</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-file-invoice-dollar"></i>
              </div>
              <div class="stat-content">
                <h3>订单总数</h3>
                <p class="stat-number">856</p>
                <p class="stat-change">+8% 本月</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-comment-dollar"></i>
              </div>
              <div class="stat-content">
                <h3>总收入</h3>
                <p class="stat-number">¥268,450</p>
                <p class="stat-change">+15% 本月</p>
              </div>
            </div>
          </div>

          <!-- 最近活动 -->
          <div class="recent-activities">
            <h2>最近活动</h2>
            <div class="activities-list">
              <div class="activity-item">
                <div class="activity-icon">
                  <i class="fas fa-user-plus"></i>
                </div>
                <div class="activity-content">
                  <p>新用户 <strong>张三</strong> 注册了账号</p>
                  <span>10分钟前</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">
                  <i class="fas fa-home"></i>
                </div>
                <div class="activity-content">
                  <p>新上架房源 <strong>阳光花园两居室</strong></p>
                  <span>30分钟前</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">
                  <i class="fas fa-file-signature"></i>
                </div>
                <div class="activity-content">
                  <p>用户 <strong>李四</strong> 完成了一笔订单</p>
                  <span>1小时前</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { ElMessage } from 'element-plus';
import { logout } from '@/apis/user';

// 路由实例
const router = useRouter();
// 用户store
const userStore = useUserStore();

// 计算当前用户信息
const currentUser = computed(() => userStore.currentUser);

// 当前激活的导航项
const activeNavItem = ref('dashboard');

// 设置激活的导航项
const setActive = (item: string) => {
  activeNavItem.value = item;
};

// 退出登录方法
const handleLogout = async () => {
  try {
    await logout();
    userStore.logout();
    ElMessage.success('退出登录成功');
    router.push('/login');
  } catch (error) {
    // 错误处理
    ElMessage.error('退出登录失败，请重试');
  }
};
</script>

<style scoped lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.admin-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.admin-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .header-left h1 {
    font-size: 20px;
    color: #1890ff;
    margin: 0;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;

    .welcome-text {
      color: #666;
    }

    .logout-btn {
      background-color: #ff4d4f;
      color: #fff;
      border: none;
      padding: 6px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #ff7875;
      }
    }
  }
}

/* 主要内容区域 */
.admin-main {
  display: flex;
  margin-top: 64px;
  height: calc(100vh - 64px);
}

/* 侧边栏导航 */
.admin-sidebar {
  width: 200px;
  background-color: #fff;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  padding: 20px 0;
  height: 100%;
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  overflow-y: auto;

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;

    .nav-item {
      a {
        display: flex;
        align-items: center;
        padding: 12px 24px;
        color: #666;
        text-decoration: none;
        transition: all 0.3s;
        border-left: 3px solid transparent;

        i {
          margin-right: 10px;
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        &:hover {
          background-color: #f0f2f5;
          color: #1890ff;
        }
      }

      &.active {
        a {
          color: #1890ff;
          background-color: #e6f7ff;
          border-left-color: #1890ff;
          font-weight: 500;
        }
      }
    }
  }
}

/* 内容区域 */
.content-area {
  flex: 1;
  margin-left: 200px;
  padding: 24px;
  overflow-y: auto;
}

/* 仪表盘概览 */
.dashboard-overview {

  /* 统计卡片 */
  .stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 24px;

    .stat-card {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      }

      .stat-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #e6f7ff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;

        i {
          font-size: 24px;
          color: #1890ff;
        }
      }

      .stat-content {
        flex: 1;

        h3 {
          font-size: 14px;
          color: #999;
          margin: 0 0 8px 0;
          font-weight: normal;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px 0;
        }

        .stat-change {
          font-size: 12px;
          color: #52c41a;
          margin: 0;
        }
      }
    }
  }

  /* 最近活动 */
  .recent-activities {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);

    h2 {
      font-size: 18px;
      color: #333;
      margin: 0 0 20px 0;
    }

    .activities-list {
      .activity-item {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f6ffed;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;

          i {
            font-size: 16px;
            color: #52c41a;
          }
        }

        .activity-content {
          flex: 1;

          p {
            color: #333;
            margin: 0 0 4px 0;
          }

          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>

