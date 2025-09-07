<template>
  <!-- 语义化替换：div → footer，提升可访问性 -->
  <footer id="site-footer">
    <!-- 页脚第一部分：品牌Slogan区 -->
    <div class="store-point-wrapper">
      <div class="one-sentence-box">
        <h3 class="one-sentence-title">租客行</h3> <!-- 语义化标题标签 -->
        <p class="one-sentence-desc">最具性价比的大疆，使用最少的钱享受完整的大疆，享一站式官方服务。</p> <!-- 语义化文本标签 -->
      </div>
    </div>

    <!-- 页脚第二部分：导航+社交+版权区 -->
    <div class="grid-container">
      <!-- 导航链接区 -->
      <div class="footer-category">
        <div class="grid-stretch-between">
          <!-- 补充a标签，完善跳转逻辑 -->
          <a href="#" class="footer-item">首页</a>
          <a href="#" class="footer-item">产品中心</a>
          <a href="#" class="footer-item">关于我们</a>
          <a href="#" class="footer-item">客服中心</a>
        </div>
      </div>

      <!-- 品牌Logo+社交链接区 -->
      <div class="footer-about">
        <div class="footer-nav">
          <a href="#"><img src="@/assets/images/DJlogo.svg" alt="大疆logo" class="dj-logo"></a>
        </div>
        <ul class="nav-right">
          <li class="nav-item"><a href="#">常见问题</a></li>
          <li class="nav-item"><a href="#">联系我们</a></li>
        </ul>
        <ul class="footer-social">
          <li class="social-imglogo"><a href="#"><img src="@/assets/images/wechatlogo.png" alt="微信"></a></li>
          <li class="social-imglogo"><a href="#"><img src="@/assets/images/weibologo.png" alt="微博"></a></li>
          <li class="social-imglogo"><a href="#"><img src="@/assets/images/douyinlogo.png" alt="抖音"></a></li>
          <li class="social-imglogo"><a href="#"><img src="@/assets/images/bilibililogo.png" alt="哔哩哔哩"></a></li>
          <li class="social-imglogo"><a href="#"><img src="@/assets/images/redbooklogo.png" alt="小红书"></a></li>
        </ul>
      </div>

      <!-- 法律链接+语言选择区 -->
      <div class="footer-bottom">
        <div class="footer-legal">
          <ul class="legal-links">
            <!-- 补充常见法律链接，完善功能 -->
            <li><a href="#">隐私政策</a></li>
            <li><a href="#">服务条款</a></li>
            <li><a href="#">法律声明</a></li>
            <li><a href="#">网站问题反馈</a></li>
          </ul>
        </div>
        <div class="footer-change-country">
          <div class="select-language">
            中国大陆/简体中文 <i class="icon-down"></i> <!-- 补充下拉图标，提示可交互 -->
          </div>
        </div>
      </div>

      <!-- 版权+广告声明区 -->
      <div class="footer-ad-desc">
        <div class="copyright">Copyright © 2025 租客行. 版权所有.</div>
        <div class="footer-record">粤ICP备2022092332号</div>
        <p>本网站直接或间接向消费者推销商品或者服务的商业宣传均属于“广告”（包装及参数、售后保障等商品信息除外）</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 预留交互逻辑位置（如语言切换、反馈弹窗等）
</script>

<style scoped lang="scss">
// 1. 定义全局变量：统一颜色、间距、字体，便于维护
$footer-bg: #272727;          // 页脚背景色
$text-primary: #ffffff;       // 主文字色（标题、导航）
$text-secondary: rgba(255, 255, 255, 0.85); // 次要文字色（描述）
$text-tertiary: rgba(255, 255, 255, 0.6);   //  tertiary文字色（版权、声明）
$border-color: rgba(255, 255, 255, 0.12);   // 边框色（柔和不刺眼）
$hover-color: rgba(255, 255, 255, 0.2);     // 悬停背景色
$transition: all 0.3s ease;   // 统一过渡动画

// 2. 基础样式重置与统一
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; // 避免padding导致宽度溢出
}

a {
  text-decoration: none; // 统一清除链接下划线
  color: inherit;        // 继承父级文字色
  cursor: pointer;
}

ul {
  list-style: none; // 清除列表默认样式
}

// 3. 页脚外层容器
#site-footer {
  background: $footer-bg;
  padding: 32px 20px; // 左右留20px内边距，解决小屏幕溢出
  color: $text-secondary;
  font-size: 14px;
  line-height: 1.5;
}

// 4. 第一部分：品牌Slogan区
.store-point-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 32px;
  border-bottom: 1px solid $border-color;
  text-align: center;

  .one-sentence-box {
    max-width: 700px; // 替代固定693px，适配小屏幕
    margin: 0 auto;

    .one-sentence-title {
      font-size: 18px;
      font-weight: 600;
      color: $text-primary;
      margin-bottom: 16px; // 替换margin-top，间距更合理
    }

    .one-sentence-desc {
      font-size: 14px;
      color: $text-secondary;
      line-height: 22px; // 提升可读性
    }
  }
}

// 5. 第二部分：核心内容区（统一容器样式）
.grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px; // 与上部分隔，替代原margin-top
}

// 5.1 导航链接区
.footer-category {
  .grid-stretch-between {
    display: flex; // 补全flex属性，原样式缺少display导致布局失效
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; // 小屏幕自动换行
    gap: 16px; // 换行后间距，避免拥挤

    .footer-item {
      color: $text-primary;
      font-size: 14px; // 原12px偏小，提升可读性
      font-weight: 500;
      padding: 8px 0; // 增加点击区域
      transition: $transition;

      &:hover {
        color: $text-secondary; // 悬停变色，反馈明确
        transform: translateY(-2px); // 轻微上浮，增强交互感
      }
    }
  }
}

// 5.2 品牌Logo+社交链接区
.footer-about {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $border-color;
  padding: 32px 0 16px; // 上下间距优化
  margin-top: 16px;
  flex-wrap: wrap; // 小屏幕换行
  gap: 24px;

  .footer-nav {
    .dj-logo {
      width: 48px; // 原42px偏小，提升品牌识别度
      height: auto; // 保持比例，避免拉伸
      transition: $transition;
      /* 新增：强制透明，消除发白隐患 */
      background: transparent !important; // 强制背景透明，优先级拉满
      border: none !important; // 清除可能的默认边框
      outline: none !important; // 清除聚焦时的默认轮廓
      padding: 0 !important; // 清除可能的内边距
      margin: 0 !important; // 清除可能的外边距
      /* 新增：消除SVG抗锯齿导致的细微白边（深色背景下常见） */
      filter: drop-shadow(0 0 0 transparent); // 屏蔽默认阴影
      -webkit-filter: drop-shadow(0 0 0 transparent); // 兼容webkit内核浏览器

      &:hover {
        transform: scale(1.05); // 悬停轻微放大，增强交互
      }
    }
  }

  .nav-right {
    display: flex; // 横向排列
    gap: 20px; // 间距统一
    margin-right: 700px;

    .nav-item {
      color: $text-secondary;
      transition: $transition;

      &:hover {
        color: $text-primary;
        text-decoration: underline; // 悬停下划线，明确链接属性
      }
      a {
        margin-right: 12px;
      }
    }
  }

  .footer-social {
    display: flex;
    align-items: center;
    gap: 12px; // 社交图标间距

    .social-imglogo {
      width: 36px; // 原32px，增加点击区域
      height: 36px;
      border-radius: 50%;
       /* 关键修改1：容器背景改为完全透明（原背景是 rgba(255,255,255,0.05) 浅色） */
      background: transparent; 
      display: flex;
      align-items: center;
      justify-content: center;
      transition: $transition;

      &:hover {
        background: $hover-color; // 悬停背景加深，反馈明确
        transform: scale(1.1); // 轻微放大，增强交互
      }

      img {
        height: 18px; // 原16px，配合容器放大
        width: auto;
        /* 关键修改2：确保图片自身背景透明（避免图片自带白色底色） */
        background: transparent !important;
        border: none !important; // 清除图片可能的默认边框
      }
    }
  }
}

// 5.3 法律链接+语言选择区
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  flex-wrap: wrap;
  gap: 16px;

  .footer-legal {
    .legal-links {
      display: flex;
      gap: 16px;
      margin-bottom: 8px; // 与反馈链接分隔

      li a {
        color: $text-tertiary;
        font-size: 12px;
        transition: $transition;

        &:hover {
          color: $text-secondary;
        }
      }
    }
  }

  .footer-change-country {
    .select-language {
      color: $text-tertiary;
      font-size: 12px;
      cursor: pointer;
      transition: $transition;
      display: flex;
      align-items: center;
      gap: 4px;

      &:hover {
        color: $text-secondary;
      }

      .icon-down {
        // 下拉图标（可替换为SVG或字体图标）
        display: inline-block;
        width: 8px;
        height: 8px;
        border-left: 1px solid $text-tertiary;
        border-bottom: 1px solid $text-tertiary;
        transform: rotate(-45deg);
        transition: $transition;
      }

      &:hover .icon-down {
        border-color: $text-secondary;
      }
    }
  }
}

// 5.4 版权+广告声明区
.footer-ad-desc {
  text-align: center; // 居中对齐，提升视觉整洁度
  padding: 16px 0 8px;
  color: $text-tertiary;
  font-size: 12px;
  line-height: 20px;

  .copyright,
  .footer-record {
    margin-bottom: 8px; // 上下分隔
  }

  p {
    max-width: 800px; // 限制宽度，避免长句换行混乱
    margin: 0 auto;
  }
}

// 6. 响应式适配（针对手机端优化）
@media (max-width: 768px) {
  .footer-about {
    justify-content: center; // 小屏幕居中对齐
  }

  .footer-bottom {
    justify-content: center; // 小屏幕居中对齐
  }

  .footer-category .grid-stretch-between {
    justify-content: center; // 导航小屏幕居中
  }

  .one-sentence-box {
    padding: 0 16px; // 小屏幕左右留距，避免文字贴边
  }
}

// 7. 补充下拉图标样式（若使用字体图标可替换）
.icon-down {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-left: 1px solid $text-tertiary;
  border-bottom: 1px solid $text-tertiary;
  transform: rotate(-45deg);
  transition: $transition;
}
</style>