<template>
  <!-- 1. 外层容器加独特类名 .landscape-section，避免样式冲突 -->
  <section class="section slider-section landscape-section">
    <div class="container slider-column">
      <!-- 2. Swiper 容器保留原独特类名 .swiper-slider，与水生轮播区分 -->
      <div class="swiper swiper-slider">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in slideList" :key="index">
            <img 
              :src="item.src" 
              :alt="item.alt || 'Swiper Slide'" 
              class="slide-img"
            >
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
// 导入 Swiper 核心及模块（与水生轮播统一逻辑，避免样式重复）
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// 导入 Swiper 样式（单独模块，减少体积）
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 轮播图片列表（可通过 props 动态传入）
const slideList = [
  { src: 'https://cdn.pixabay.com/photo/2022/11/13/18/09/canyon-7589820_1280.jpg', alt: '峡谷风景' },
  { src: 'https://cdn.pixabay.com/photo/2022/11/02/22/33/autumn-7566201_1280.jpg', alt: '秋日树林' },
  { src: 'https://cdn.pixabay.com/photo/2023/04/05/09/44/landscape-7901065_1280.jpg', alt: '自然景观' },
  { src: 'https://cdn.pixabay.com/photo/2020/09/04/16/18/mountains-5544365_1280.jpg', alt: '山脉' },
  { src: 'https://cdn.pixabay.com/photo/2022/12/09/22/55/trees-7646226_1280.jpg', alt: '冬季树木' },
  { src: 'https://cdn.pixabay.com/photo/2019/09/13/11/47/mountains-4473760_1280.jpg', alt: '高山风景' }
];

onMounted(() => {
  // 3. 初始化时指定独特类名 .swiper-slider，仅作用于当前轮播
  new Swiper('.swiper-slider', {
    modules: [Pagination, Navigation, Autoplay],
    centeredSlides: true,
    slidesPerView: 1,
    grabCursor: true,
    freeMode: false,
    loop: true,
    mousewheel: false,
    keyboard: { enabled: true },

    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },

    pagination: {
      el: '.swiper-pagination', // 仅作用于当前轮播的分页器
      dynamicBullets: false,
      clickable: true
    },

    navigation: {
      nextEl: '.swiper-button-next', // 仅作用于当前轮播的导航按钮
      prevEl: '.swiper-button-prev'
    },

    breakpoints: {
      640: {
        slidesPerView: 1.25,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });
});
</script>

<!-- 4. 保留 scoped，确保样式仅作用于当前组件 -->
<style scoped>
/* 1. 基础样式变量限定在当前组件 */
:root {
  --white-100: hsl(206, 5%, 100%);
  --white-200: hsl(206, 5%, 90%);
  --white-300: hsl(206, 5%, 80%);
  --white-400: hsl(206, 5%, 65%);
  --white-500: hsl(206, 5%, 45%);

  --black-100: hsl(210, 20%, 10%);
  --black-200: hsl(210, 20%, 8%);
  --black-300: hsl(210, 20%, 6%);
  --black-400: hsl(210, 20%, 4%);
  --black-500: hsl(210, 20%, 1%);
}

/* 2. 局部样式重置，仅作用于当前轮播容器 */
.landscape-section .swiper-slider * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 3. 外层样式限定在 .landscape-section 下 */
.landscape-section .slider-section {
  margin: 0 auto;
  padding-block: 5rem;
}

.landscape-section .container {
  max-width: 75rem;
  height: auto;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

/* 4. Swiper 动态元素用 ::v-deep 穿透，且限定 .swiper-slider 容器 */
::v-deep .landscape-section .swiper-slider {
  width: 100%;
  height: auto;
}

::v-deep .landscape-section .swiper-slider .swiper-slide {
  width: auto;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 轮播图片样式限定 */
.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* 导航按钮样式限定 */
::v-deep .landscape-section .swiper-slider .swiper-button-next::after,
::v-deep .landscape-section .swiper-slider .swiper-button-prev::after {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  opacity: 0.75;
  border-radius: 50%;
  color: var(--white-100);
  background: var(--black-300);
  transition: opacity 0.3s ease;
}

::v-deep .landscape-section .swiper-slider .swiper-button-next:hover::after,
::v-deep .landscape-section .swiper-slider .swiper-button-prev:hover::after {
  opacity: 1;
}

/* 分页器样式限定 */
::v-deep .landscape-section .swiper-slider .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: var(--white-400);
  opacity: 0.7;
  margin: 0 6px !important;
}

::v-deep .landscape-section .swiper-slider .swiper-pagination-bullet-active {
  background: var(--black-300);
  opacity: 1;
  width: 10px;
  height: 10px;
}
</style>