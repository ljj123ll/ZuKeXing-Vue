<template>
  <div class="carousel-container">
    <!-- 加载状态 -->
    <div v-if="bannerStore.loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="bannerStore.error || bannerStore.banners.length === 0" class="error-state">
      <i class="fas fa-exclamation-circle error-icon"></i>
      <p>{{ bannerStore.error || '暂无轮播图数据' }}</p>
    </div>
    
    <!-- 轮播图主体 -->
    <div v-else class="carousel" :style="{ height: carouselHeight }">
      <!-- 轮播图片容器 -->
      <div 
        class="slides"
        :style="{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: transitionActive ? 'transform 0.5s ease-in-out' : 'none'
        }"
      >
        <div 
          class="slide" 
          v-for="(product, index) in bannerStore.banners" 
          :key="product._id"
        >
          <img 
            :src="baseImgUrl + product.imageUrl" 
            :alt="product.name" 
            class="slide-image"
            @click="handleClick"
          >
          <div class="slide-content">
            <div class="product-info">
              <div class="product-id">编号: {{ product.productId }}</div>
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-description">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <button 
      v-if="!bannerStore.loading && !bannerStore.error && bannerStore.banners.length > 1"
      class="nav-btn prev" 
      @click="prevSlide"
      aria-label="上一张"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <button 
      v-if="!bannerStore.loading && !bannerStore.error && bannerStore.banners.length > 1"
      class="nav-btn next" 
      @click="nextSlide"
      aria-label="下一张"
    >
      <i class="fas fa-chevron-right"></i>
    </button>

    <!-- 指示器 -->
    <div 
      class="indicators" 
      v-if="!bannerStore.loading && !bannerStore.error && bannerStore.banners.length > 1"
    >
      <button 
        class="indicator"
        v-for="(product, index) in bannerStore.banners" 
        :key="index"
        :class="{ active: index === currentSlide }"
        @click="goToSlide(index)"
        :aria-label="`前往第${index + 1}张`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useBannerStore } from '@/stores/modules/bannertop';
import { useRouter } from 'vue-router';

// 使用轮播图store
const bannerStore = useBannerStore();

// 使用router
const router = useRouter();

// 点击轮播图跳转到租凭中心
const handleClick = () => {
  router.push('/rentcenter');
};

// 定义后端图片服务的基础 URL（根据你的实际后端地址修改）
const baseImgUrl = 'http://localhost:3000';

// 响应式状态
const currentSlide = ref(0);
const transitionActive = ref(true);

// 轮播配置
const carouselConfig = reactive({
  height: '500px', // 轮播图高度
  autoPlay: true,  // 是否自动播放
  interval: 5000   // 自动播放间隔(ms)
});

// 获取轮播图高度
const carouselHeight = computed(() => {
  // 响应式调整高度，在小屏幕上降低高度
  return window.innerWidth < 768 ? '350px' : carouselConfig.height;
});

// 获取产品数据
const fetchProducts = async () => {
  try {
    await bannerStore.fetchActiveBanners();
  } catch (err) {
    console.error('Failed to fetch products:', err);
    // 错误信息已经在store中设置
  }
};

// 轮播控制函数
const nextSlide = () => {
  transitionActive.value = true;
  currentSlide.value = (currentSlide.value + 1) % bannerStore.banners.length;
};

const prevSlide = () => {
  transitionActive.value = true;
  currentSlide.value = 
    (currentSlide.value - 1 + bannerStore.banners.length) % bannerStore.banners.length;
};

const goToSlide = (index: number) => {
  if (index !== currentSlide.value) {
    transitionActive.value = true;
    currentSlide.value = index;
  }
};

// 自动播放相关
let intervalId: number | null = null;

const startAutoPlay = () => {
  if (carouselConfig.autoPlay && bannerStore.banners.length > 1) {
    intervalId = window.setInterval(nextSlide, carouselConfig.interval);
  }
};

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// 生命周期钩子
onMounted(() => {
  fetchProducts();
  
  // 监听窗口大小变化，用于响应式调整
  const handleResize = () => {
    // 强制刷新以更新高度
    transitionActive.value = false;
    currentSlide.value = currentSlide.value;
    setTimeout(() => {
      transitionActive.value = true;
    }, 0);
  };
  
  window.addEventListener('resize', handleResize);
  
  // 清理函数
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});

// 监听产品数据变化，初始化自动播放
watch(
  () => bannerStore.banners,
  (newVal) => {
    if (newVal.length > 0) {
      stopAutoPlay();
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
  },
  { deep: true, immediate: true }
);

// 清理
onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 加载状态样式 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

/* 错误状态样式 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #666;
}

.error-icon {
  font-size: 48px;
  color: #e74c3c;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.carousel {
  width: 100%;
  position: relative;
}

.slides {
  display: flex;
  width: 100%;
  height: 100%;
}

.slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.product-info {
  max-width: 800px;
}

.product-id {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeUp 0.6s ease forwards 0.3s;
}

.product-description {
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeUp 0.6s ease forwards 0.6s;
}

/* 导航按钮 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  color: #333;
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

/* 指示器 */
.indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

/* 动画 */
@keyframes fadeUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .slide-content {
    padding: 1.5rem;
  }
  
  .product-name {
    font-size: 1.4rem;
  }
  
  .product-description {
    font-size: 0.9rem;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
