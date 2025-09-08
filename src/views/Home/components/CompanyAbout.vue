<template>
    <section class="section-company">
        <div class="auto-fix-container">
            <h4 class="section-title">
                <p class="section-en-title">COMPANY PROFILE</p>
                公司简介
            </h4>
            <p class="slogan">
            【租客行】是专业无人机租赁平台，提供全国大疆无人机租赁、运动相机、手机云台出租服务，价格低服务好，支持芝麻信用分，微信支付分免押金。
            </p>
            <div class="flex-style-box company-introduce">
                <div class="introduce-type">
                    <img class="introduce-icon" src="http://www.feiyouyun.com/image/index/home_ic1.png">
                    <h6 class="introduce-title">
                        线上租机
                    </h6>
                    <p class="introduce-description">
                        正品大疆机器，涵盖多个品类，包邮安心到家，优质温馨服务！
                    </p>
                </div>
                <div class="introduce-type">
                    <img class="introduce-icon" src="http://www.feiyouyun.com/image/index/home_ic4.png">
                    <h6 class="introduce-title">
                        企业租机
                    </h6>
                    <p class="introduce-description">
                        稳定优质货源，多企业合作经验，一站式解决企业租机难题！
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">

// 公司简介区块样式
.section-company {
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

// 口号样式
.slogan {
    display: block;
    margin-bottom: 50px;
    font-size: 16px;
    line-height: 1.8;
    color: #666;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

// 介绍容器样式
.flex-style-box {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
}

// 介绍项样式
.introduce-type {
    flex: 0 0 calc(50% - 20px);
    max-width: 400px;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

// 介绍项悬停效果
.introduce-type:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

// 图标样式
.introduce-icon {
    display: inline-block;
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
    overflow-x: clip;
    overflow-y: clip;
    object-fit: contain;
    background-color: transparent;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: auto;
}

// 介绍标题样式
.introduce-title {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
}

// 介绍描述样式
.introduce-description {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
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
    
    .slogan {
        font-size: 14px;
    }
    
    .flex-style-box {
        gap: 20px;
    }
    
    .introduce-type {
        flex: 0 0 100%;
        padding: 20px;
    }
    
    .introduce-icon {
        width: 60px;
        height: 60px;
    }
    
    .introduce-title {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    .section-company {
        padding: 40px 0;
    }
    
    .section-title {
        font-size: 24px;
    }
    
    .section-en-title {
        font-size: 18px;
        top: -10px;
    }
}

</style>