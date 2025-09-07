<template>
  <div class="orders-section">
    <div class="orders-header">
      <h3>订单列表</h3>
      <el-input
        placeholder="搜索订单号"
        v-model="orderSearch"
        prefix-icon="Search"
        class="order-search-input"
      />
    </div>
    
    <!-- 订单类型筛选 -->
    <div class="order-filters">
      <el-radio-group v-model="orderType" size="small">
        <el-radio-button label="all">全部订单</el-radio-button>
        <el-radio-button label="pending">待付款</el-radio-button>
        <el-radio-button label="confirmed">待确认</el-radio-button>
        <el-radio-button label="completed">已完成</el-radio-button>
        <el-radio-button label="cancelled">已取消</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 订单列表 -->
    <el-table :data="ordersData" style="width: 100%">
      <el-table-column prop="orderId" label="订单编号" width="200" />
      <el-table-column prop="itemName" label="商品名称" />
      <el-table-column prop="totalPrice" label="订单金额" width="120" />
      <el-table-column prop="status" label="订单状态" width="120">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">{{ getStatusText(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button link type="primary" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ordersData.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElTag, ElPagination, ElRadioGroup, ElRadioButton, ElInput } from 'element-plus';

// 订单相关数据
const orderSearch = ref('');
const orderType = ref('all');
const currentPage = ref(1);
const pageSize = ref(10);

// 模拟订单数据
const ordersData = ref([
  {
    orderId: 'ORD20240601001',
    itemName: '豪华套房一晚',
    totalPrice: 1288,
    status: 'completed',
    createdAt: '2024-06-01 14:30:22'
  },
  {
    orderId: 'ORD20240528002',
    itemName: '标准间两晚',
    totalPrice: 1680,
    status: 'completed',
    createdAt: '2024-05-28 09:15:36'
  },
  {
    orderId: 'ORD20240605003',
    itemName: '商务套房一晚',
    totalPrice: 988,
    status: 'pending',
    createdAt: '2024-06-05 16:42:10'
  }
]);

// 获取订单状态标签类型
const getStatusTagType = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'warning',
    confirmed: 'primary',
    completed: 'success',
    cancelled: 'danger'
  };
  return statusMap[status] || 'default';
};

// 获取订单状态文本
const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待付款',
    confirmed: '待确认',
    completed: '已完成',
    cancelled: '已取消'
  };
  return statusMap[status] || status;
};
</script>

<style scoped lang="scss">
.orders-section {
  padding: 20px 0;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.order-search-input {
  width: 300px;
}

.order-filters {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .orders-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .order-search-input {
    width: 100%;
    margin-top: 10px;
  }
}
</style>