import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Profile from "@/views/Profile/index.vue";
import Login from "@/views/Login/index.vue";
import Admin from "@/views/Admin/index.vue";
import About from "@/views/About/index.vue";
import RentCenter from "@/views/RentCenter/index.vue";
import News from "@/views/News/index.vue";
import ClienteleService from "@/views/ClienteleService/index.vue";
import { useUserStore } from "@/stores/modules/user";
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        // 首页
        {
          path: "",
          component: Home,
        },
        // 个人中心
        {
          path: "profile",
          component: Profile,
          meta: {
            requiresAuth: true, // 需要登录
          },
        },
        // 关于
        {
          path: "about",
          component: About,
        },
        // 租凭中心
        {
          path: "rentcenter",
          component: RentCenter,
        },
        // 新闻资讯
        {
          path: "news",
          component: News,
        },
        // 客服中心
        {
          path: "clienteleservice",
          component: ClienteleService,
        },
      ],
    },
    // 登录注册页面
    {
      path: "/login",
      component: Login,
      meta: {
        requiresAuth: false, // 不需要登录
      },
    },
    // 后台管理页面
    {
      path: "/admin",
      component: Admin,
      meta: {
        requiresAuth: true, // 需要登录
        requiredRole: "admin", // 需要管理员角色
      },
    },
  ],
});

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  const userRole = userStore.userInfo?.role;

  // 检查是否需要登录
  if (to.meta.requiresAuth && !isLoggedIn) {
    ElMessage.warning("请先登录");
    return next("/login");
  }

  // 检查是否需要特定角色
  if (to.meta.requiredRole && userRole !== to.meta.requiredRole) {
    ElMessage.warning("您没有权限访问此页面");
    // 如果用户已登录但没有权限，重定向到首页
    return next(from.path || "/");
  }

  // 如果已登录用户访问登录/注册页，重定向到首页
  if (isLoggedIn && ["/login"].includes(to.path)) {
    return next("/profile");
  }

  // 其他情况，正常通过
  next();
});

export default router;
