<template>
    <section class="section-partner">
        <div class="auto-fix-container">
            <h4 class="section-title">
                <p class="section-en-title">PARTNER</p>
                合作伙伴
            </h4>
            <div class="partner-list">
                <div class="partner-box">
                    <img class="partner-img" src="http://www.feiyouyun.com/image/index/home_logo1.png">
                </div>
                <div class="partner-box">
                    <img class="partner-img" src="http://www.feiyouyun.com/image/index/home_logo2.png">
                </div>
                <div class="partner-box">
                    <img class="partner-img" src="http://www.feiyouyun.com/image/index/home_logo3.png">
                </div>
                <div class="partner-box">
                    <img class="partner-img" src="http://www.feiyouyun.com/image/index/home_logo5.png">
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

</script>

<style scoped lang="scss">

// 合作伙伴区块样式
.section-partner {
    display: block;
    padding: 60px 0;
    width: 100%;
    text-align: center;
    background-color: #f9f9f9;
    font-family: "Microsoft Yahei", sans-serif;
}

// 容器样式
.auto-fix-container {
    position: relative;
    display: block;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

// 标题样式
.section-title {
    position: relative;
    display: block;
    margin-bottom: 30px;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    color: #333;
}

// 英文标题样式
.section-en-title {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    font-weight: 700;
    color: #1956ec;
    opacity: 0.1;
    white-space: nowrap;
}

// 标题装饰线
.section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: #1956ec;
    margin: 15px auto 0;
    border-radius: 2px;
}

// 合作伙伴列表容器
.partner-list {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
}

// 合作伙伴项样式
.partner-box {
    flex: 0 0 calc(25% - 30px);
    max-width: 200px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
}

// 合作伙伴项悬停效果
.partner-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

// 合作伙伴图片样式
.partner-img {
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
    background-color: transparent;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: auto;
}

// 响应式适配
@media (max-width: 768px) {
    .section-title {
        font-size: 28px;
    }
    
    .section-en-title {
        font-size: 22px;
        top: -15px;
    }
    
    .partner-list {
        gap: 20px;
    }
    
    .partner-box {
        flex: 0 0 calc(50% - 10px);
        padding: 15px;
        height: 80px;
    }
    
    .partner-img {
        max-height: 60px;
    }
}

@media (max-width: 480px) {
    .section-partner {
        padding: 40px 0;
    }
    
    .section-title {
        font-size: 24px;
    }
    
    .section-en-title {
        font-size: 18px;
        top: -10px;
    }
    
    .partner-box {
        flex: 0 0 100%;
    }
}

</style>