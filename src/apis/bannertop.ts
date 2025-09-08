import request from '@/utils/request';

// 轮播图产品类型定义
export interface BannerProduct {
  _id?: string;
  productId: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 获取启用的轮播图（前端展示用）
 * GET /api/products/type/top
 * 返回top类型的轮播图产品
 */
export const getActiveBanners = async (): Promise<BannerProduct[]> => {
  const response = await request.get('/products/type/top');
  return response.data || [];
};

/**
 * 获取所有轮播图（后台管理用）
 * GET /api/products/all
 * 返回所有产品，无论是否启用
 */
export const getAllBanners = async (): Promise<BannerProduct[]> => {
  const response = await request.get('/products/all');
  return response.data || [];
};

/**
 * 获取单个轮播图
 * GET /api/products/:id
 * 根据 ID 获取特定产品
 */
export const getBannerById = async (id: string): Promise<BannerProduct> => {
  const response = await request.get(`/products/${id}`);
  return response.data;
};

/**
 * 新增轮播图
 * POST /api/products
 * 请求体包含产品信息，isActive 可选（默认 true）
 */
export const createBanner = async (productData: Partial<BannerProduct>): Promise<BannerProduct> => {
  const response = await request.post('/products', productData);
  return response.data;
};

/**
 * 修改轮播图
 * PUT /api/products/:id
 * 可以部分更新，例如只更新 isActive 状态
 */
export const updateBanner = async (
  id: string,
  productData: Partial<BannerProduct>
): Promise<BannerProduct> => {
  const response = await request.put(`/products/${id}`, productData);
  return response.data;
};

/**
 * 删除轮播图
 * DELETE /api/products/:id
 * 根据 ID 删除特定产品
 */
export const deleteBanner = async (id: string): Promise<void> => {
  await request.delete(`/products/${id}`);
};

/**
 * 更新轮播图状态
 * PUT /api/products/:id/active
 * 专门用于更新isActive状态
 */
export const updateBannerStatus = async (
  id: string,
  isActive: boolean
): Promise<BannerProduct> => {
  const response = await request.put(`/products/${id}`, { isActive });
  return response.data;
};