<template>
    <div class="profile-container">
        <div class="profile-header">
            <div class="header-actions">
                <h2>个人中心</h2>
                <el-button class="logout-btn" type="danger" @click="handleLogout">退出账号</el-button>

            </div>
            <div class="profile-avatar-section">
                <div class="avatar-upload">
                    <el-avatar :size="100" :src="userInfo.avatar ? baseImgUrl + userInfo.avatar : defaultAvatar">
                        <span v-if="!userInfo.avatar">{{ userInfo.username?.[0] || '用' }}</span>
                    </el-avatar>
                    <div class="avatar-uploader">
                        <input id="avatarInput" type="file" @change="handleAvatarUpload" accept="image/*">
                        <label for="avatarInput" class="upload-text">更换头像</label>
                    </div>
                </div>
                <div class="user-basic-info">
                    <h3>{{ userInfo.realName || userInfo.username }}</h3>
                    <p class="user-role">{{ userInfo.role === 'admin' ? '管理员' : '普通用户' }}</p>
                    <p class="user-id">账号ID: {{ userInfo.userId }}</p>
                    <p class="join-time">注册时间: {{ formatDate(userInfo.createdAt) }}</p>
                </div>
            </div>
        </div>

        <el-tabs v-model="activeTab" class="profile-tabs">
            <!-- 个人信息表单 -->
            <el-tab-pane label="基本信息" name="basic">
                <el-form ref="basicFormRef" :model="basicForm" :rules="basicRules" class="info-form">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="basicForm.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="basicForm.realName" placeholder="请输入真实姓名" />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="basicForm.phone" placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="支付宝账号" prop="alipayAccount">
                        <el-input v-model="basicForm.alipayAccount" placeholder="请输入支付宝账号" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="basicForm.gender">
                            <el-radio label="male">男</el-radio>
                            <el-radio label="female">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker v-model="basicForm.birthday" type="date" placeholder="选择日期"
                            value-format="YYYY-MM-DD" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleUpdateBasicInfo">保存修改</el-button>
                        <el-button @click="resetBasicForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <!-- 修改密码表单 -->
            <el-tab-pane label="修改密码" name="password">
                <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" class="password-form">
                    <el-form-item label="当前密码" prop="oldPassword">
                        <el-input type="password" v-model="passwordForm.oldPassword" placeholder="请输入当前密码" />
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input type="password" v-model="passwordForm.password" placeholder="请输入新密码" />
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="confirmPassword">
                        <el-input type="password" v-model="passwordForm.confirmPassword" placeholder="请再次输入新密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleUpdatePassword">修改密码</el-button>
                        <el-button @click="resetPasswordForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <!-- 账号订单区域 -->
            <el-tab-pane label="我的订单" name="orders">
                <shopping-order />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElForm, ElFormItem, ElInput, ElButton, ElTabs, ElTabPane, ElAvatar, ElRadioGroup, ElRadio, ElDatePicker, ElMessageBox } from 'element-plus';
import { useUserStore } from '@/stores/modules/user';
import { updateUserInfo, uploadAvatar, getUserInfo } from '@/apis/user';
import ShoppingOrder from './components/ShoppingOrder.vue';

// 用户Store和路由
const userStore = useUserStore();
const router = useRouter();
const userInfo = ref(userStore.userInfo || {});
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

// Tab切换
const activeTab = ref('basic');

// 表单引用
const basicFormRef = ref<InstanceType<typeof ElForm>>();
const passwordFormRef = ref<InstanceType<typeof ElForm>>();

// 定义后端图片服务的基础 URL（根据你的实际后端地址修改）
const baseImgUrl = 'http://localhost:3000';


// 基本信息表单
const basicForm = reactive({
    username: userInfo.value.username || '',
    realName: userInfo.value.realName || '',
    phone: userInfo.value.phone || '',
    alipayAccount: userInfo.value.alipayAccount || '',
    gender: userInfo.value.gender || '',
    birthday: userInfo.value.birthday || ''
});

// 密码表单
const passwordForm = reactive({
    oldPassword: '',
    password: '',
    confirmPassword: ''
});

// 表单验证规则
const basicRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ]
};

const passwordRules = {
    oldPassword: [
        { required: true, message: '请输入当前密码', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
        {
            validator: (rule: any, value: string, callback: any) => {
                if (value !== passwordForm.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
};

// 格式化日期
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 处理头像上传
const handleAvatarUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        // 检查文件大小（限制为2MB）
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            ElMessage.error('文件大小不能超过2MB');
            return;
        }

        ElMessage({ message: '头像上传中...', type: 'info' });

        // 使用实际的上传接口
        uploadAvatar(file).then(res => {
            if (res.code === 200 && res.result?.avatar) {
                // 先更新store中的用户信息
                userStore.updateUserInfo({ avatar: res.result.avatar });
                // 重新从store获取最新的用户信息，确保视图正确更新
                userInfo.value = { ...userStore.userInfo || {} };

                ElMessage.success('头像更新成功');
            } else {
                ElMessage.error('头像上传失败：' + res.message);
            }
        }).catch(error => {
            console.error('头像上传错误:', error);
            ElMessage.error('头像上传失败，请稍后重试');
        });

        // 清空input，允许重复上传同一文件
        target.value = '';
    }
};

// 重置基本信息表单
const resetBasicForm = () => {
    Object.assign(basicForm, {
        username: userInfo.value.username || '',
        realName: userInfo.value.realName || '',
        phone: userInfo.value.phone || '',
        alipayAccount: userInfo.value.alipayAccount || '',
        gender: userInfo.value.gender || '',
        birthday: userInfo.value.birthday || ''
    });
    basicFormRef.value?.clearValidate();
};

// 重置密码表单
const resetPasswordForm = () => {
    Object.assign(passwordForm, {
        oldPassword: '',
        password: '',
        confirmPassword: ''
    });
    passwordFormRef.value?.clearValidate();
};

// 更新基本信息
const handleUpdateBasicInfo = () => {
    basicFormRef.value?.validate((valid) => {
        if (valid) {
            updateUserInfo(basicForm).then(() => {
                // 更新本地用户信息
                userStore.updateUserInfo(basicForm);
                Object.assign(userInfo.value, basicForm);
                ElMessage.success('个人信息更新成功');
            }).catch(() => {
                ElMessage.error('个人信息更新失败');
            });
        }
    });
};

// 更新密码
const handleUpdatePassword = () => {
    passwordFormRef.value?.validate((valid) => {
        if (valid) {
            updateUserInfo(passwordForm).then(() => {
                ElMessage.success('密码更新成功，请重新登录');
                // 重置表单
                resetPasswordForm();
                // 强制用户重新登录
                userStore.logout();
                router.push('/login');
            }).catch(() => {
                ElMessage.error('密码更新失败，请检查当前密码是否正确');
            });
        }
    });
};

// 退出账号
const handleLogout = () => {
    ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        // 调用退出登录方法
        userStore.logout();
        // 跳转到登录页
        router.push('/login');
        ElMessage.success('已成功退出登录');
    }).catch(() => {
        // 用户取消退出
        ElMessage.info('已取消退出');
    });
};

// 从服务器获取最新用户信息
const fetchUserInfo = async () => {
    try {
        const res = await getUserInfo();
        if (res.code === 200 && res.result) {
            // 更新store中的用户信息
            userStore.saveLoginInfo(userStore.token, res.result);
            // 更新本地引用
            userInfo.value = res.result;
            // 重置表单
            resetBasicForm();
        }
    } catch (error) {
        console.error('获取用户信息失败:', error);
    }
};

// 组件挂载时初始化数据
onMounted(() => {
    // 优先从服务器获取最新的用户信息
    fetchUserInfo();
});
</script>

<style scoped lang="scss">
.profile-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.profile-header {
    margin-bottom: 30px;

    .header-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    h2 {
        margin-top: 50px;
        margin-bottom: 0;
    }

    .logout-btn {
        margin-top: 50px;
        margin-bottom: 0;
    }

}

.profile-avatar-section {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
}

.avatar-upload {
    position: relative;
    margin-right: 30px;
}

.avatar-uploader {
    position: absolute;
    bottom: -10px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 12px;
    cursor: pointer;
}

.avatar-uploader:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

.avatar-uploader input {
    display: none;
}

.upload-text {
    display: block;
    cursor: pointer;
}

.user-basic-info h3 {
    margin: 0 0 10px 0;
    font-size: 20px;
    font-weight: 600;
}

.user-role {
    color: #666;
    margin: 0 0 5px 0;
}

.user-id,
.join-time {
    color: #999;
    margin: 0 0 5px 0;
    font-size: 14px;
}

.profile-tabs {
    margin-top: 20px;
}

.info-form,
.password-form {
    max-width: 600px;
    padding: 20px;
    background-color: #fafafa;
    border-radius: 8px;
}

.el-form-item {
    margin-bottom: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .profile-container {
        padding: 10px;
    }

    .header-actions {
        flex-direction: column;
        align-items: flex-start !important;
    }

    .header-actions button {
        margin-top: 10px;
    }

    .profile-avatar-section {
        flex-direction: column;
        text-align: center;
    }

    .avatar-upload {
        margin-right: 0;
        margin-bottom: 20px;
    }
}
</style>