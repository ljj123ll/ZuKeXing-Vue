import request from '@/utils/request';

// 登录请求参数类型：约束登录时必须传入的参数
export interface LoginParams {
  account: string;
  password: string;
}

// 登录响应数据类型：约束后端返回的登录结果结构
export interface LoginResponse {
  // 状态码（如200成功，其他为错误）
  code: number;
  // 提示信息（如"登录成功"）
  message: string;
  result: {
    // 登录成功后返回的令牌（用于后续接口认证）
    token: string;
    userInfo: {
      userId: string;
      username: string;
      realName: string;
      phone: string;
      idCardPhoto: string;
      alipayAccount: string;
      sesameCredit: number;
      status: string;
      role: string;
      avatar: string;
      gender: string;
      birthday: string;
      createdAt: string;
      updatedAt: string;
    }
  }
}

/**
 * 用户登录
 * @param params 登录参数
 * @returns 登录结果
 * 用户登录接口：发送POST请求到/auth/login
 */
export const login = (params: LoginParams): Promise<LoginResponse> => {
  return request.post('/auth/login', params);
};

/**
 * 获取当前用户信息
 * @returns 用户信息
 * 获取当前用户信息接口：发送GET请求到/user/info（需携带Token）
 */
export const getUserInfo = () => {
  return request.get('/user/info');
};

/**
 * 用户登出
 * @returns 登出结果
 * 用户登出接口：发送POST请求到/auth/logout
 */
export const logout = () => {
  return request.post('/auth/logout');
};


// 注册请求参数类型
export interface RegisterParams {
  account: string;         // 账号
  phone: string;           // 手机号
  password: string;        // 密码
  confirmPassword: string; // 确认密码
}



// 注册响应数据类型（与后端实际返回结构完全匹配）
export interface RegisterResponse {
  code: number; // 状态码，200表示注册成功
  message: string; // 提示信息，如"注册成功"
  result: { // 注册成功返回的用户完整信息（后端实际返回的所有字段）
    userId: string; // 用户唯一ID
    username: string; // 用户名/账号
    realName: string; // 真实姓名（可能为空字符串）
    phone: string; // 手机号
    idCardPhoto: string; // 身份证照片（可能为空字符串）
    alipayAccount: string; // 支付宝账号（可能为空字符串）
    sesameCredit: number; // 芝麻信用分（如600）
    status: string; // 账号状态（如"normal"表示正常）
    role: string; // 用户角色（如"user"表示普通用户）
    avatar: string | null; // 头像（可能为null）
    gender: string | null; // 性别（可能为null）
    birthday: string | null; // 生日（可能为null）
    createdAt: string; // 账号创建时间（ISO格式字符串，如"2025-09-01T13:18:16.853Z"）
    updatedAt: string; // 账号更新时间（同上）
  };
}


/**
 * 用户注册
 * @param params 注册参数
 * @returns 注册结果
 * 用户注册接口：发送POST请求到/auth/register
 */

export const register = (params: RegisterParams): Promise<RegisterResponse> => {
  return request.post('/auth/register', params);
};

// 修改用户信息请求参数类型
export interface UpdateUserInfoParams {
  // 基本信息修改（均为可选）
  username?: string;       // 账号名称（新增）
  realName?: string;       // 真实姓名
  phone?: string;          // 手机号
  avatar?: string;         // 头像URL
  gender?: string;         // 性别
  birthday?: string;       // 生日
  alipayAccount?: string;  // 支付宝账号

  // 密码修改相关（均为可选，且需同时提供）
  oldPassword?: string;    // 当前密码
  password?: string;       // 新密码（新增）
  confirmPassword?: string; // 确认新密码（新增）
}

// 修改用户信息响应数据类型
export interface UpdateUserInfoResponse {
  code: number;
  message: string;
  result: {
    userId: string;
    username: string;      // 可能已更新的账号名称
    realName: string;
    phone: string;
    avatar: string | null;
    gender: string | null;
    birthday: string | null;
    alipayAccount: string;
    status: string;
    role: string;
    createdAt: string;    // 创建时间
    updatedAt: string;     // 更新时间（修改成功后会变化）
    
  }
}

/**
 * 修改用户信息
 * @param params 要修改的用户信息
 *  - 基本信息：可单独修改其中一项或多项
 *  - 密码修改：必须同时提供password和confirmPassword
 * @returns 修改结果
 * 修改用户信息接口：发送PUT请求到/user/info
 */
export const updateUserInfo = (params: UpdateUserInfoParams): Promise<UpdateUserInfoResponse> => {
  return request.put('/user/info', params);
};
    
/**
 * 上传用户头像
 * @param file 头像文件
 * @returns 上传结果，包含新的头像URL
 * 头像上传接口：发送POST请求到/user/avatar
 */
export const uploadAvatar = (file: File): Promise<{
  code: number;
  message: string;
  result: {
    userId: string;
    avatar: string;
  };
}> => {
  const formData = new FormData();
  formData.append('avatar', file);
  return request.post('/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
    