<template>
  <!-- 1. 外层容器加独特类名 .aquatic-main，避免全局样式污染 -->
  <main class="aquatic-main">
    <div class="intro-container">
      <span>discover</span>
      <h1>aquatic animals</h1>
      <hr>
      <p>Beauty and mystery are hidden under the sea. Explore with our application to know about Aquatic Animals.</p>
      <a href="#" class="download-btn">download app</a>
    </div>

    <div class="swiper-container">
      <!-- 2. Swiper 容器加独特类名 .swiper-aquatic，与其他轮播区分 -->
      <div class="swiper swiper-aquatic">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-slide--one">
            <div class="slide-content">
              <h2>Jellyfish</h2>
              <p>Jellyfish and sea jellies are the informal common names given to the medusa-phase of certain gelatinous members of the subphylum Medusozoa, a major part of the phylum Cnidaria.</p>
              <a href="https://en.wikipedia.org/wiki/Jellyfish" target="_blank">explore</a>
            </div>
          </div>
          <div class="swiper-slide swiper-slide--two">
            <div class="slide-content">
              <h2>Seahorse</h2>
              <p>Seahorses are mainly found in shallow tropical and temperate salt water throughout the world. They live in sheltered areas such as seagrass beds, estuaries, coral reefs, and mangroves. Four species are found in Pacific waters from North America to South America.</p>
              <a href="https://en.wikipedia.org/wiki/Seahorse" target="_blank">explore</a>
            </div>
          </div>
          <div class="swiper-slide swiper-slide--three">
            <div class="slide-content">
              <h2>octopus</h2>
              <p>Octopuses inhabit various regions of the ocean, including coral reefs, pelagic waters, and the seabed; some live in the intertidal zone and others at abyssal depths. Most species grow quickly, mature early, and are short-lived.</p>
              <a href="https://en.wikipedia.org/wiki/Octopus" target="_blank">explore</a>
            </div>
          </div>
          <div class="swiper-slide swiper-slide--four">
            <div class="slide-content">
              <h2>Shark</h2>
              <p>Sharks are a group of elasmobranch fish characterized by a cartilaginous skeleton, five to seven gill slits on the sides of the head, and pectoral fins that are not fused to the head.</p>
              <a href="https://en.wikipedia.org/wiki/Shark" target="_blank">explore</a>
            </div>
          </div>
          <div class="swiper-slide swiper-slide--five">
            <div class="slide-content">
              <h2>Dolphin</h2>
              <p>Dolphins are widespread. Most species prefer the warm waters of the tropic zones, but some, such as the right whale dolphin, prefer colder climates. Dolphins feed largely on fish and squid, but a few, such as the orca, feed on large mammals such as seals.</p>
              <a href="https://en.wikipedia.org/wiki/Dolphin" target="_blank">explore</a>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <img 
      src="https://cdn.pixabay.com/photo/2021/11/04/19/39/jellyfish-6769173_960_720.png" 
      alt="background jellyfish" 
      class="bg"
    >
    <img 
      src="https://cdn.pixabay.com/photo/2012/04/13/13/57/scallop-32506_960_720.png" 
      alt="background scallop" 
      class="bg2"
    >
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
// 导入 Swiper 完整包（保持原逻辑，统一样式源）
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

onMounted(() => {
  // 3. 初始化时指定独特类名 .swiper-aquatic，仅作用于当前轮播
  new Swiper('.swiper-aquatic', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true
    },
    keyboard: { enabled: true },
    mousewheel: { thresholdDelta: 70 },
    loop: true,
    pagination: {
      el: '.swiper-pagination', // 仅作用于当前轮播的分页器
      clickable: true
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
      1560: { slidesPerView: 3 }
    }
  })
})
</script>

<!-- 4. 添加 scoped，确保样式仅作用于当前组件 -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Roboto:wght@300;400;500;900&display=swap");

/* 5. 全局通配符改为局部容器下的通配符，避免影响其他组件 */
.aquatic-main * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

/* 所有样式均基于 .aquatic-main 或 .swiper-aquatic 限定范围 */
.aquatic-main {
  position: relative;
  width: calc(min(90rem, 90%));
  margin: 0 auto;
  min-height: 100vh;
  column-gap: 3rem;
  padding-block: min(20vh, 3rem);
}

.bg {
  position: fixed;
  top: -4rem;
  left: -12rem;
  z-index: -1;
  opacity: 0;
}
.bg2 {
  position: fixed;
  bottom: -2rem;
  right: -3rem;
  z-index: -1;
  width: 9.375rem;
  opacity: 0;
}

.intro-container span {
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 1rem;
  color: #717171;
}
.intro-container h1 {
  text-transform: capitalize;
  letter-spacing: 0.8px;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: clamp(3.4375rem, 3.25rem + 0.75vw, 4rem);
  background-color: #005baa;
  background-image: linear-gradient(45deg, #005baa, #000000);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
.intro-container hr {
  display: block;
  background: #005baa;
  height: 0.25rem;
  width: 6.25rem;
  border: none;
  margin: 1.125rem 0 1.875rem 0;
}
.intro-container p {
  line-height: 1.6;
  margin-bottom: 1rem;
}
.download-btn {
  border: 2px solid #c2c2c2;
  margin-top: 2.188rem;
  padding: 0.625rem 1.875rem;
}

/* 限定当前组件的链接样式 */
.aquatic-main a {
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  color: #717171;
  font-weight: 500;
  background: #fff;
  border-radius: 3.125rem;
  transition: 0.3s ease-in-out;
}
.aquatic-main a:hover {
  border: 0.125rem solid #005baa;
  color: #005baa;
}

.swiper-container {
  width: 100%;
  padding-top: 3.125rem;
  min-height: 30rem;
}

/* 6. Swiper 动态元素用 ::v-deep 穿透，且限定 .swiper-aquatic 容器 */
::v-deep .swiper-aquatic .swiper-pagination-bullet {
  width: 0.75rem;
  height: 0.75rem;
  background: #e0e0e0;
  opacity: 1;
}
::v-deep .swiper-aquatic .swiper-pagination-bullet-active {
  background: #005baa;
  width: 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}
::v-deep .swiper-aquatic .swiper-pagination {
  bottom: 1.25rem !important;
}

::v-deep .swiper-aquatic .swiper-slide {
  width: 18.75rem;
  height: 28.125rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: self-start;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}
::v-deep .swiper-aquatic .swiper-slide:not(.swiper-slide-active) {
  opacity: 0.7;
  transform: scale(0.95);
}
::v-deep .swiper-aquatic .swiper-slide .slide-content {
  display: none;
  opacity: 0;
  padding-bottom: 0.625rem;
  width: 100%;
}
::v-deep .swiper-aquatic .swiper-slide-active .slide-content {
  display: block;
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: translateY(0);
}

::v-deep .swiper-aquatic .swiper-slide h2 {
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.4;
  margin-bottom: 0.625rem;
  padding: 0 0 0 1.563rem;
  text-transform: uppercase;
}
::v-deep .swiper-aquatic .swiper-slide p {
  color: #dadada;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  padding: 0 1.563rem;
  line-height: 1.6;
  font-size: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
::v-deep .swiper-aquatic .swiper-slide .slide-content a {
  margin: 1.25rem 1.563rem 3.438rem 1.563rem;
  padding: 0.438em 1.875rem;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
}

/* 轮播背景图样式限定 */
::v-deep .swiper-aquatic .swiper-slide--one {
  background: linear-gradient(to top, #0f2027 0%, rgba(32, 58, 67, 0) 60%, rgba(44, 83, 100, 0) 100%),
    url("https://images.unsplash.com/photo-1628944682084-831f35256163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
      no-repeat 50% 50% / cover;
}
::v-deep .swiper-aquatic .swiper-slide--two {
  background: linear-gradient(to top, #0f2027 0%, rgba(32, 58, 67, 0) 60%, rgba(44, 83, 100, 0) 100%),
    url("https://images.unsplash.com/photo-1515309025403-4b0184873cef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80")
      no-repeat 50% 50% / cover;
}
::v-deep .swiper-aquatic .swiper-slide--three {
  background: linear-gradient(to top, #0f2027 0%, rgba(32, 58, 67, 0) 60%, rgba(44, 83, 100, 0) 100%),
    url("https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
      no-repeat 50% 50% / cover;
}
::v-deep .swiper-aquatic .swiper-slide--four {
  background: linear-gradient(to top, #0f2027 0%, rgba(32, 58, 67, 0) 60%, rgba(44, 83, 100, 0) 100%),
    url("https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
      no-repeat 50% 50% / cover;
}
::v-deep .swiper-aquatic .swiper-slide--five {
  background: linear-gradient(to top, #0f2027 0%, rgba(32, 58, 67, 0) 60%, rgba(44, 83, 100, 0) 100%),
    url("https://images.unsplash.com/photo-1570481662006-a3a1374699e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80")
      no-repeat 50% 50% / cover;
}

::v-deep .swiper-aquatic.swiper-3d .swiper-slide-shadow-left,
::v-deep .swiper-aquatic.swiper-3d .swiper-slide-shadow-right {
  background-image: none;
}

/* 响应式样式限定在当前组件 */
@media screen and (min-width: 48rem) {
  .aquatic-main {
    display: flex;
    align-items: center;
  }
  .bg,
  .bg2 {
    opacity: 0.1;
  }
  .intro-container {
    width: 40%;
  }
}
@media screen and (max-width: 47.99rem) {
  .intro-container h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
  }
  ::v-deep .swiper-aquatic .swiper-slide {
    width: 80%;
    height: 25rem;
  }
  .swiper-container {
    min-height: 28rem;
  }
}
@media screen and (min-width: 93.75rem) {
  .swiper-container {
    width: 85%;
  }
}
</style>