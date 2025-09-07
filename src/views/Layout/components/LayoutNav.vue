<template>
    <div id="site-header" :class="{ 'scrolled': isScrolled }">
        <div class="navbar-container">
            <!-- 左边logo区域 -->
            <div class="navbar-header">
                <a href="#" class="navbar-brand">
                    <span class="navbar-brand-logo"></span>
                </a>
            </div>

            <!-- 中间整体导航区 -->
            <div class="site-header-navbar">
                <!-- 中左侧的导航栏 -->
                <ul class="navbar-category">
                    <li class="category-item" v-for="(item, index) in navItems" :key="index"
                        :class="{ 'active': activeIndex === index }">
                         
                        <RouterLink :to="getRoutePath(index)"
                            class="nav-item-title"
                            @click="setActive(index)"
                            >
                            {{ item }}
                        </RouterLink>
                    </li>
                </ul>

                <!-- 右侧的搜索，登录，购物车 -->
                <ul class="navbar-right">
                    <!-- 🔴 关键修改：搜索图标 + 悬浮弹出的搜索栏 -->
                    <li class="nav-search">
                        <!-- 搜索图标 -->
                        <a href="" class="nav-link-search" @click.prevent>
                            <span class="search-btn"></span>
                        </a>
                        <!-- 悬浮弹出的搜索栏（默认隐藏） -->
                        <div class="search-bar">
                            <input type="text" placeholder="搜索内容...">
                            <button class="search-submit">搜索</button>
                        </div>
                    </li>

                    <li class="nav-user">
                        <RouterLink :to="userStore.isLoggedIn ? '/profile' : '/login'" class="nav-link-user">
                            <div v-if="userStore.isLoggedIn && userStore.userInfo?.avatar" class="user-avatar">
                                <img :src="baseImgUrl + userStore.userInfo.avatar" alt="用户头像">
                            </div>
                            <span v-else class="user-btn"></span>
                        </RouterLink>
                    </li>
                    <li class="nav-store">
                        <a href="" class="nav-link-store">
                            <span class="store-btn"></span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- 移动端菜单按钮 -->
            <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
                <span class="hamburger"></span>
            </button>
        </div>

        <!-- 移动端菜单 -->
        <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
            <ul class="mobile-nav">
                <li v-for="(item, index) in navItems" :key="index" :class="{ 'active': activeIndex === index }">
                    <a href="#" @click="setActive(index)">{{ item }}</a>
                </li>
            </ul>
        </div>

        <!-- 🔴 删除原来的全屏搜索框 -->
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';

// 导航项数据
const navItems = ref(['首页', '关于我们', '租赁中心', '新闻资讯', '客服中心']);

// 获取当前路由
const route = useRoute();
const userStore = useUserStore();

// 定义后端图片服务的基础 URL（根据实际后端地址修改）
const baseImgUrl = 'http://localhost:3000';

// 根据索引返回对应的路由路径
const getRoutePath = (index) => {
  // 与 router 配置中的 path 一一对应
  const paths = [
    '/',                // 首页（对应 index=0）
    '/about',           // 关于我们（对应 index=1）
    '/rentcenter',      // 租赁中心（对应 index=2）
    '/news',            // 新闻资讯（对应 index=3）
    '/clienteleservice' // 客服中心（对应 index=4）
  ];
  return paths[index];
};

// 根据路由路径获取对应的索引
const getRouteIndex = (path) => {
  const paths = [
    '/',                // 首页（对应 index=0）
    '/about',           // 关于我们（对应 index=1）
    '/rentcenter',      // 租赁中心（对应 index=2）
    '/news',            // 新闻资讯（对应 index=3）
    '/clienteleservice' // 客服中心（对应 index=4）
  ];
  const index = paths.indexOf(path);
  return index !== -1 ? index : 0; // 默认返回首页索引
};

// 活跃的导航项索引
const activeIndex = ref(0);
// 移动端菜单状态
const isMobileMenuOpen = ref(false);
// 滚动状态 - 用于导航栏样式变化
const isScrolled = ref(false);

// 设置活跃导航项
const setActive = (index: number) => {
    activeIndex.value = index;
    isMobileMenuOpen.value = false;
};

// 切换移动端菜单
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 监听滚动事件
const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
};

// 根据当前路由更新激活状态
const updateActiveIndex = () => {
  // 对于个人中心页面，我们不设置任何导航项为激活状态
  if (route.path === '/profile' || route.path === '/admin') {
    activeIndex.value = -1;
  } else {
    activeIndex.value = getRouteIndex(route.path);
  }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    // 初始化时根据当前路由设置激活状态
    updateActiveIndex();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// 监听路由变化，更新激活状态
watch(
  () => route.path,
  () => {
    updateActiveIndex();
  }
);

// 🔴 删除原来的搜索框控制逻辑（isSearchOpen、toggleSearch）
</script>


<style scoped lang="scss">
#site-header {
    background: transparent;
    position: fixed;
    width: 100%;
    height: 64px;
    top: 0;
    left: 0;
    z-index: 900;
    transition: all 0.3s ease;

    &.scrolled {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .navbar-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        position: relative;
    }

    .navbar-header {
        display: flex;
        align-items: center;

        .navbar-brand {
            display: inline-block;
            text-decoration: none;
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.05);
            }

            .navbar-brand-logo {
                background-image: url('@/assets/images/DJlogo2.svg');
                transition: backgroundImage 0.3s ease;
                vertical-align: middle;
                display: inline-block;
                width: 45px;
                height: 26px;
                background-size: cover;
            }
        }
    }

    .site-header-navbar {
        display: flex;
        align-items: center;
        flex: 1;
        margin: 0 20px;

        .navbar-category {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            gap: 10px;
            max-width: 900px;

            .category-item {
                font-size: 14px;
                line-height: 14px;
                position: relative;

                .nav-item-title {
                    color: #333;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 64px;
                    padding: 0 15px;
                    text-decoration: none;
                    font-weight: 500;
                    letter-spacing: -0.02em;

                    &:hover {
                        color: #f31515;
                    }
                }

                &.active .nav-item-title {
                    color: #f31515;
                    font-weight: 600;
                }

                &.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 3px;
                    background-color: #f31515;
                    border-radius: 3px;
                }
            }
        }

        .navbar-right {
            list-style: none;
            padding: 0;
            margin: 0 0 0 auto;
            display: flex;
            align-items: center;
            height: 100%;

            >li {
                margin-left: 15px;
                position: relative;
            }

            /* 🔴 关键修改：搜索图标 + 悬浮搜索栏样式 */
            .nav-search {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                height: 100%;
                font-size: 14px;
                line-height: 14px;
                position: relative;
                /* 作为搜索栏的定位容器 */

                /* 搜索图标 */
                .nav-link-search {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #303233;
                    text-decoration: none;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                }

                /* 悬浮弹出的搜索栏（默认隐藏） */
                .search-bar {
                    position: absolute;
                    right: 0;
                    /* 对齐搜索图标右侧 */
                    top: 50%;
                    transform: translateY(-50%) translateX(100%);
                    /* 初始在右侧完全隐藏 */
                    transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
                    opacity: 0;
                    visibility: hidden;
                    /* 避免隐藏时可点击 */
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: white;
                    padding: 4px;
                    border-radius: 24px;
                    /* 圆角优化 */
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    /* 阴影增强层次 */
                    z-index: 1000;
                    /* 确保在其他元素上方 */

                    /* 搜索输入框 */
                    input {
                        width: 300px;
                        /* 搜索框宽度，可按需调整 */
                        height: 36px;
                        padding: 0 16px;
                        border: none;
                        border-radius: 18px;
                        /* 与高度匹配的圆角 */
                        outline: none;
                        font-size: 14px;
                        background: #f5f5f5;
                        transition: background 0.3s ease;

                        &:focus {
                            background: #eee;
                            /* 聚焦时背景变化 */
                        }
                    }

                    /* 搜索按钮 */
                    .search-submit {
                        height: 36px;
                        padding: 0 16px;
                        border: none;
                        border-radius: 18px;
                        background: #f31515;
                        color: white;
                        font-size: 10px;
                        cursor: pointer;
                        transition: background 0.3s ease, transform 0.2s ease;

                        &:hover {
                            background: #d10f0f;
                            /* 深色hover效果 */
                            transform: scale(1.05);
                            /* 轻微放大反馈 */
                        }

                        &:active {
                            transform: scale(0.98);
                            /* 点击收缩反馈 */
                        }
                    }
                }

                /* 🔴 悬浮触发：鼠标移到搜索图标区域时显示搜索栏 */
                &:hover .search-bar {
                    transform: translateY(-50%) translateX(0);
                    /* 从右向左弹出 */
                    opacity: 1;
                    visibility: visible;
                }

                /* 搜索图标背景图 */
                .search-btn {
                    background-image: url('@/assets/images/searchblack.svg');
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    vertical-align: middle;
                    background-position: center;
                    background-size: cover;
                    transition: transform 0.3s ease;
                }

                /* 图标hover放大 */
                &:hover .search-btn {
                    transform: scale(1.1);
                }
            }

            /* 登录、购物车图标样式（保留原逻辑） */
            .nav-user,
            .nav-store {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                height: 100%;
                font-size: 14px;
                line-height: 14px;

                .nav-link-user,
                .nav-link-store {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #303233;
                    text-decoration: none;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                }

                .user-btn,
                .store-btn {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    vertical-align: middle;
                    background-position: center center;
                    background-size: cover;
                    transition: transform 0.3s ease;
                }

                &:hover .user-btn,
                &:hover .store-btn {
                    transform: scale(1.1);
                }
            }

            .user-btn {
                background-image: url('@/assets/images/userblack.svg');
            }

            .store-btn {
                background-image: url('@/assets/images/DJstores.svg');
            }
        }
    }

    /* 移动端菜单按钮 */
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
        z-index: 1000;

        .hamburger {
            display: block;
            width: 24px;
            height: 2px;
            background: #333;
            position: relative;
            transition: all 0.3s ease;

            &::before,
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                background: #333;
                transition: all 0.3s ease;
            }

            &::before {
                top: -8px;
            }

            &::after {
                bottom: -8px;
            }
        }

        &.active .hamburger {
            background: transparent;

            &::before {
                transform: rotate(45deg) translate(5px, 5px);
            }

            &::after {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    }

    /* 移动端菜单 */
    .mobile-menu {
        position: fixed;
        top: 64px;
        left: 0;
        width: 100%;
        background: white;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 899;

        &.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .mobile-nav {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                border-bottom: 1px solid #f5f5f5;

                &.active a {
                    color: #f31515;
                    font-weight: 600;
                }

                a {
                    display: block;
                    padding: 15px 20px;
                    color: #333;
                    text-decoration: none;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: #f9f9f9;
                        color: #f31515;
                    }
                }
            }
        }
    }

    /* 响应式设计 */
    @media (max-width: 992px) {
        .site-header-navbar {
            display: none;
        }

        .mobile-menu-btn {
            display: block;
        }

        /* 🔴 移动端隐藏悬浮搜索栏（可按需调整为点击触发） */
        .navbar-right .nav-search .search-bar {
            display: none;
        }
    }

    @media (min-width: 993px) {
        .mobile-menu {
            display: none !important;
        }
    }
}
</style>