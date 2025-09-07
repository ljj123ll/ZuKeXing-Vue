import { defineStore } from 'pinia';
import {
  getActiveBanners,
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  updateBannerStatus,
  BannerProduct
} from '@/apis/bannertop';

interface BannerState {
  banners: BannerProduct[];
  allBanners: BannerProduct[];
  currentBanner: BannerProduct | null;
  loading: boolean;
  error: string | null;
}

export const useBannerStore = defineStore('banner', {
  state: (): BannerState => ({
    banners: [], // 启用的轮播图（前端展示用）
    allBanners: [], // 所有轮播图（后台管理用）
    currentBanner: null,
    loading: false,
    error: null
  }),

  getters: {
    // 获取启用的轮播图数量
    activeBannerCount: (state) => state.banners.length,
    // 获取所有轮播图数量
    totalBannerCount: (state) => state.allBanners.length,
    // 判断是否有轮播图数据
    hasBanners: (state) => state.banners.length > 0
  },

  actions: {
    // 重置错误信息
    resetError() {
      this.error = null;
    },

    // 获取启用的轮播图（前端展示用）
    async fetchActiveBanners() {
      this.loading = true;
      this.resetError();
      try {
        const data = await getActiveBanners();
        this.banners = data;
        return data;
      } catch (err) {
        this.error = '获取轮播图数据失败';
        console.error('Failed to fetch active banners:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 获取所有轮播图（后台管理用）
    async fetchAllBanners() {
      this.loading = true;
      this.resetError();
      try {
        const data = await getAllBanners();
        this.allBanners = data;
        return data;
      } catch (err) {
        this.error = '获取所有轮播图数据失败';
        console.error('Failed to fetch all banners:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 获取单个轮播图
    async fetchBannerById(id: string) {
      this.loading = true;
      this.resetError();
      try {
        const data = await getBannerById(id);
        this.currentBanner = data;
        return data;
      } catch (err) {
        this.error = '获取轮播图详情失败';
        console.error(`Failed to fetch banner with id ${id}:`, err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 新增轮播图
    async addBanner(productData: Partial<BannerProduct>) {
      this.loading = true;
      this.resetError();
      try {
        const data = await createBanner(productData);
        // 添加到所有轮播图列表中
        this.allBanners.push(data);
        // 如果是启用的，也添加到启用的轮播图列表中
        if (data.isActive) {
          this.banners.push(data);
        }
        return data;
      } catch (err) {
        this.error = '添加轮播图失败';
        console.error('Failed to add banner:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 修改轮播图
    async editBanner(id: string, productData: Partial<BannerProduct>) {
      this.loading = true;
      this.resetError();
      try {
        const data = await updateBanner(id, productData);
        
        // 更新所有轮播图列表中的数据
        const allBannerIndex = this.allBanners.findIndex(b => b._id === id);
        if (allBannerIndex !== -1) {
          this.allBanners[allBannerIndex] = data;
        }
        
        // 更新启用的轮播图列表中的数据
        const activeBannerIndex = this.banners.findIndex(b => b._id === id);
        if (activeBannerIndex !== -1) {
          if (data.isActive) {
            // 如果原来是启用的且更新后仍然启用，直接更新
            this.banners[activeBannerIndex] = data;
          } else {
            // 如果原来是启用的但更新后禁用了，从启用列表中移除
            this.banners.splice(activeBannerIndex, 1);
          }
        } else if (data.isActive) {
          // 如果原来不是启用的但更新后启用了，添加到启用列表中
          this.banners.push(data);
        }
        
        // 更新当前轮播图
        if (this.currentBanner && this.currentBanner._id === id) {
          this.currentBanner = data;
        }
        
        return data;
      } catch (err) {
        this.error = '修改轮播图失败';
        console.error(`Failed to update banner with id ${id}:`, err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 删除轮播图
    async removeBanner(id: string) {
      this.loading = true;
      this.resetError();
      try {
        await deleteBanner(id);
        
        // 从所有轮播图列表中移除
        const allBannerIndex = this.allBanners.findIndex(b => b._id === id);
        if (allBannerIndex !== -1) {
          this.allBanners.splice(allBannerIndex, 1);
        }
        
        // 从启用的轮播图列表中移除
        const activeBannerIndex = this.banners.findIndex(b => b._id === id);
        if (activeBannerIndex !== -1) {
          this.banners.splice(activeBannerIndex, 1);
        }
        
        // 重置当前轮播图
        if (this.currentBanner && this.currentBanner._id === id) {
          this.currentBanner = null;
        }
        
      } catch (err) {
        this.error = '删除轮播图失败';
        console.error(`Failed to delete banner with id ${id}:`, err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 更新轮播图状态
    async changeBannerStatus(id: string, isActive: boolean) {
      this.loading = true;
      this.resetError();
      try {
        const data = await updateBannerStatus(id, isActive);
        
        // 更新所有轮播图列表中的状态
        const allBannerIndex = this.allBanners.findIndex(b => b._id === id);
        if (allBannerIndex !== -1) {
          this.allBanners[allBannerIndex].isActive = isActive;
        }
        
        // 更新启用的轮播图列表
        const activeBannerIndex = this.banners.findIndex(b => b._id === id);
        if (isActive && activeBannerIndex === -1) {
          // 如果启用且不在启用列表中，添加
          this.banners.push(data);
        } else if (!isActive && activeBannerIndex !== -1) {
          // 如果禁用且在启用列表中，移除
          this.banners.splice(activeBannerIndex, 1);
        }
        
        return data;
      } catch (err) {
        this.error = '更新轮播图状态失败';
        console.error(`Failed to update banner status with id ${id}:`, err);
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
});