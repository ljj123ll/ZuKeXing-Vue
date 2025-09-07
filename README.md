以下是 **6 个核心集合** 的 JSON 格式实例（严格匹配之前的字段设计，包含 MongoDB 合法数据类型，可直接用于 `db.collection.insertOne()` 或 `insertMany()` 操作）。注意：  
- `ObjectId` 需用 24 位十六进制字符串（示例中已生成合法格式，关联字段需保持一致，如 `carts.userId` 对应 `users._id`）；  
- 货币类型（`Decimal128`）用 `NumberDecimal("数值")` 表示（MongoDB 中需显式声明，避免浮点精度丢失）；  
- 日期类型用 `ISODate("YYYY-MM-DDTHH:MM:SSZ")` 表示（UTC 时间，MongoDB 默认存储格式）。


## 1. users 集合实例（用户数据）
```json
{
  "_id": ObjectId("60d21b4667d0d8992e610c85"), // 唯一用户ID（MongoDB自动生成，示例为合法格式）
  "username": "zhang_san123", // 登录用户名（唯一）
  "password": "$2b$10$EixZaYb05TjGQpXy1tU5hu9GQpXy1tU5hu9GQpXy1tU5hu", // bcrypt哈希后的密码（非明文）
  "realName": "张三", // 真实姓名（下单必填）
  "phone": "13800138000", // 手机号（唯一）
  "idCardPhoto": "https://oss-example.com/idcards/60d21b4667d0d8992e610c85.jpg", // 身份证照片URL
  "alipayAccount": "zhangsan@alipay.com", // 支付宝账号（可选，唯一）
  "sesameCredit": 720, // 芝麻信用分（≥650可免押金）
  "status": "normal", // 状态：normal（正常）/ disabled（禁用）
  "createdAt": ISODate("2024-01-15T08:30:00Z"), // 账号创建时间
  "updatedAt": ISODate("2024-02-20T14:15:00Z") // 信息更新时间（如修改手机号后刷新）
}
```


## 2. items 集合实例（租借物品数据，含2个分类示例）
### 示例1：无人机（大疆 Mini 3 Pro）
```json
{
  "_id": ObjectId("60d21c5867d0d8992e610c86"), // 物品唯一ID
  "itemNo": "DJI-MINI3-001", // 自定义物品编号（唯一）
  "name": "大疆 Mini 3 Pro 无人机（带畅飞套装）", // 物品名称
  "rentalSpecs": [ // 多租期定价（days=租期天数，dailyPrice=单日租金）
    {"days": 3, "dailyPrice": NumberDecimal("100.00")},
    {"days": 7, "dailyPrice": NumberDecimal("80.00")},
    {"days": 30, "dailyPrice": NumberDecimal("50.00")}
  ],
  "deposit": NumberDecimal("3000.00"), // 押金价格
  "coverPhoto": "https://oss-example.com/items/dji-mini3-cover.jpg", // 封面图URL
  "stock": 5, // 库存数量（可租5台）
  "category": "无人机", // 分类（枚举值）
  "description": "<p>大疆 Mini 3 Pro 无人机，支持4K HDR视频，续航34分钟，带ND滤镜套装和备用电池，适合户外航拍。</p><p>注意：禁止在禁飞区飞行，需提前实名登记。</p>", // 富文本详细介绍
  "detailPhotos": [ // 详细图片集URL（轮播图）
    "https://oss-example.com/items/dji-mini3-1.jpg",
    "https://oss-example.com/items/dji-mini3-2.jpg",
    "https://oss-example.com/items/dji-mini3-3.jpg"
  ],
  "status": "available", // 状态：available（可租）/ maintaining（维护中）/ outOfStock（无库存）
  "createdAt": ISODate("2024-01-01T10:00:00Z"),
  "updatedAt": ISODate("2024-03-10T09:20:00Z") // 最近更新：调整了30天租期价格
}
```

### 示例2：拍立得（富士 mini11）
```json
{
  "_id": ObjectId("60d21d6a67d0d8992e610c87"),
  "itemNo": "FUJI-MINI11-002",
  "name": "富士拍立得 mini11（含10张相纸）",
  "rentalSpecs": [
    {"days": 2, "dailyPrice": NumberDecimal("15.00")},
    {"days": 7, "dailyPrice": NumberDecimal("10.00")},
    {"days": 15, "dailyPrice": NumberDecimal("8.00")}
  ],
  "deposit": NumberDecimal("300.00"),
  "coverPhoto": "https://oss-example.com/items/fuji-mini11-cover.jpg",
  "stock": 12,
  "category": "拍立得",
  "description": "<p>富士 mini11 拍立得，自动测光，支持自拍模式，赠送10张白边相纸，适合旅行、聚会即时拍照。</p><p>归还时需返还相机本体，相纸用完不额外收费。</p>",
  "detailPhotos": [
    "https://oss-example.com/items/fuji-mini11-1.jpg",
    "https://oss-example.com/items/fuji-mini11-2.jpg"
  ],
  "status": "available",
  "createdAt": ISODate("2024-01-05T11:30:00Z"),
  "updatedAt": ISODate("2024-02-15T16:40:00Z")
}
```


## 3. carts 集合实例（购物车数据，关联用户和物品）
```json
{
  "_id": ObjectId("60d21e7c67d0d8992e610c88"), // 购物车唯一ID
  "userId": ObjectId("60d21b4667d0d8992e610c85"), // 关联users集合的张三（_id一致）
  "items": [ // 购物项列表（用户选中的物品）
    {
      "itemId": ObjectId("60d21c5867d0d8992e610c86"), // 关联items的大疆无人机
      "itemName": "大疆 Mini 3 Pro 无人机（带畅飞套装）", // 冗余物品名称（避免关联查询）
      "selectedDays": 7, // 用户选择租期7天（匹配rentalSpecs.days）
      "dailyPrice": NumberDecimal("80.00"), // 选中租期的单日价格（冗余自items）
      "quantity": 1 // 租借数量（默认1，设备通常单次租1台）
    },
    {
      "itemId": ObjectId("60d21d6a67d0d8992e610c87"), // 关联items的富士拍立得
      "itemName": "富士拍立得 mini11（含10张相纸）",
      "selectedDays": 2,
      "dailyPrice": NumberDecimal("15.00"),
      "quantity": 1
    }
  ],
  "updatedAt": ISODate("2024-04-05T19:25:00Z") // 最后更新：添加拍立得的时间
}
```


## 4. orders 集合实例（订单数据，关联用户和物品，冗余关键信息）
```json
{
  "_id": ObjectId("60d21f8e67d0d8992e610c89"), // 订单唯一ID
  "orderNo": "ORD-20240405-0001", // 自定义订单号（唯一，格式：ORD-日期-序号）
  "userId": ObjectId("60d21b4667d0d8992e610c85"), // 关联用户张三
  "realName": "张三", // 冗余下单时的姓名（用户后续改姓名不影响订单）
  "phone": "13800138000", // 冗余下单时的手机号
  "deliveryAddress": "北京市朝阳区建国路88号现代城5号楼1单元1001室", // 送货地址
  "shipmentDate": ISODate("2024-04-06T10:15:00Z"), // 发货日期（已发货状态时填写）
  "rentalDays": 7, // 总租借天数（取订单项中最大租期，此处为无人机的7天）
  "totalAmount": NumberDecimal("590.00"), // 总租金（无人机：7*80=560 + 拍立得：2*15=30）
  "depositAmount": NumberDecimal("0.00"), // 实际押金（免押金，故为0）
  "isDepositFree": true, // 是否免押金（基于张三芝麻信用720≥650）
  "orderStatus": "已发货", // 订单状态：已支付/已发货/已送达/已归还/逾期归还
  "orderItems": [ // 订单项（冗余物品关键信息，避免items数据变动影响订单）
    {
      "itemId": ObjectId("60d21c5867d0d8992e610c86"),
      "itemName": "大疆 Mini 3 Pro 无人机（带畅飞套装）",
      "itemNo": "DJI-MINI3-001", // 冗余物品编号（内部核对用）
      "selectedDays": 7,
      "dailyPrice": NumberDecimal("80.00"),
      "quantity": 1,
      "subtotal": NumberDecimal("560.00") // 订单项小计（7*80*1）
    },
    {
      "itemId": ObjectId("60d21d6a67d0d8992e610c87"),
      "itemName": "富士拍立得 mini11（含10张相纸）",
      "itemNo": "FUJI-MINI11-002",
      "selectedDays": 2,
      "dailyPrice": NumberDecimal("15.00"),
      "quantity": 1,
      "subtotal": NumberDecimal("30.00") // 订单项小计（2*15*1）
    }
  ],
  "createdAt": ISODate("2024-04-05T20:00:00Z"), // 下单时间
  "updatedAt": ISODate("2024-04-06T10:15:00Z") // 状态更新时间（改为“已发货”的时间）
}
```


## 5. messages 集合实例（留言数据，含2种状态示例）
### 示例1：未回答（租金问题）
```json
{
  "_id": ObjectId("60d220a067d0d8992e610c90"), // 留言唯一ID
  "msgNo": "MSG-20240406-0001", // 自定义留言编号（唯一）
  "userId": ObjectId("60d21b4667d0d8992e610c85"), // 关联用户张三
  "userName": "张三", // 冗余用户名（显示时无需关联users）
  "content": "请问大疆 Mini 3 Pro 租10天的话，单日价格是多少？可以按30天的单价算吗？", // 留言内容
  "replyContent": null, // 未回答，故为null
  "module": "租金问题", // 留言模块（枚举值）
  "msgStatus": "未回答", // 状态：未回答/已回答
  "msgTime": ISODate("2024-04-06T09:30:00Z"), // 留言时间
  "replyTime": null, // 未回答，故为null
  "updatedAt": ISODate("2024-04-06T09:30:00Z")
}
```

### 示例2：已回答（押金问题）
```json
{
  "_id": ObjectId("60d221b2667d0d8992e610c91"),
  "msgNo": "MSG-20240405-0002",
  "userId": ObjectId("60d21b4667d0d8992e610c85"),
  "userName": "张三",
  "content": "免押金需要芝麻信用多少分？押金什么时候退还？",
  "replyContent": "您好！芝麻信用分≥650分可免押金；押金将在您归还设备并验收无误后，24小时内退还至您的支付宝账号。", // 管理员回复内容
  "module": "押金问题",
  "msgStatus": "已回答",
  "msgTime": ISODate("2024-04-05T11:20:00Z"),
  "replyTime": ISODate("2024-04-05T14:05:00Z"), // 回复时间
  "updatedAt": ISODate("2024-04-05T14:05:00Z") // 更新为“已回答”的时间
}
```


## 6. news 集合实例（新闻数据，含2种状态示例）
### 示例1：已发布（国庆优惠活动）
```json
{
  "_id": ObjectId("60d222c467d0d8992e610c92"), // 新闻唯一ID
  "newsNo": "NEWS-20240925-0001", // 自定义新闻编号（唯一）
  "title": "国庆租借优惠：无人机租7天免2天租金，拍立得买1赠1！", // 新闻标题
  "content": "<h3>国庆租借福利活动</h3><p>1. 活动时间：2024年10月1日-10月7日</p><p>2. 活动内容：</p><ul><li>所有无人机机型租7天免2天租金（即付5天费用）；</li><li>拍立得租借满3天，赠送10张相纸；</li><li>新用户首单立减50元（限订单金额≥200元）。</li></ul><p>活动说明：优惠不叠加，订单需在9月30日前下单锁定。</p>", // 富文本内容
  "author": "管理员小李", // 作者
  "newsStatus": "已发布", // 状态：已发布/草稿
  "publishTime": ISODate("2024-09-25T08:00:00Z"), // 发布时间（已发布时必填）
  "createdAt": ISODate("2024-09-24T16:30:00Z"), // 草稿创建时间
  "updatedAt": ISODate("2024-09-25T08:00:00Z") // 更新为“已发布”的时间
}
```

### 示例2：草稿（新品上架通知）
```json
{
  "_id": ObjectId("60d223d667d0d8992e610c93"),
  "newsNo": "NEWS-20241010-0002",
  "title": "新品上架：索尼A7M4微单相机，支持4K视频拍摄！",
  "content": "<p>预计10月15日上架索尼A7M4微单相机，配备24-105mm镜头，租金每天120元，押金5000元。</p><p>提前预约可享首单8折优惠，预约通道即将开启...</p>",
  "author": "管理员小王",
  "newsStatus": "草稿", // 未发布，为草稿
  "publishTime": null, // 草稿状态，发布时间为null
  "createdAt": ISODate("2024-10-08T11:10:00Z"),
  "updatedAt": ISODate("2024-10-08T11:10:00Z")
}
```


## 使用说明
1. **创建数据库**：先在 MongoDB 中创建数据库（如 `drone_rental_db`），命令：  
   ```javascript
   use drone_rental_db; // 切换到目标数据库（不存在则自动创建）
   ```
2. **插入实例**：对每个集合执行插入操作，示例（插入用户）：  
   ```javascript
   db.users.insertOne({
     "_id": ObjectId("60d21b4667d0d8992e610c85"),
     "username": "zhang_san123",
     // ... 其他字段（复制上述users实例完整JSON）
   });
   ```
3. **关联一致性**：插入 `carts`、`orders` 时，确保 `userId`、`itemId` 与 `users`、`items` 的 `_id` 完全匹配（示例中已做好关联，可直接复用）。
4. **索引创建**：插入数据后，按之前设计创建索引（提升查询效率），示例（创建用户username唯一索引）：  
   ```javascript
   db.users.createIndex({ "username": 1 }, { unique: true });
   ```
   # 修改后的 users 集合实例（新增用户权限字段）
```json
{
  "_id": ObjectId("60d21b4667d0d8992e610c85"), // 唯一用户ID（MongoDB自动生成，示例为合法格式）
  "username": "zhang_san123", // 登录用户名（唯一）
  "password": "$2b$10$EixZaYb05TjGQpXy1tU5hu9GQpXy1tU5hu9GQpXy1tU5hu", // bcrypt哈希后的密码（非明文）
  "realName": "张三", // 真实姓名（下单必填）
  "phone": "13800138000", // 手机号（唯一）
  "idCardPhoto": "https://oss-example.com/idcards/60d21b4667d0d8992e610c85.jpg", // 身份证照片URL
  "alipayAccount": "zhangsan@alipay.com", // 支付宝账号（可选，唯一）
  "sesameCredit": 720, // 芝麻信用分（≥650可免押金）
  "status": "normal", // 状态：normal（正常）/ disabled（禁用）
  "role": "user", // 新增：用户权限（核心用于登录跳转判断），枚举值：user（普通用户）、admin（管理员），默认"user"
  "createdAt": ISODate("2024-01-15T08:30:00Z"), // 账号创建时间
  "updatedAt": ISODate("2024-02-20T14:15:00Z") // 信息更新时间（如修改手机号后刷新）
}
```

## 补充说明：管理员账号实例（用于后台登录）
若需创建管理员账号，只需将 `role` 设为 `admin`，示例如下：
```json
{
  "_id": ObjectId("60d21b4667d0d8992e610c86"), // 管理员唯一ID
  "username": "admin_li", // 管理员登录名（建议带标识，避免与普通用户混淆）
  "password": "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 管理员密码（需更强哈希，避免弱密码）
  "realName": "李管理员", // 管理员真实姓名（内部管理用）
  "phone": "13900139000", // 管理员手机号（唯一）
  "idCardPhoto": "https://oss-example.com/idcards/admin-li.jpg", // 管理员身份证（可选，视业务是否要求）
  "alipayAccount": "", // 管理员可无需绑定支付宝（非租借用户）
  "sesameCredit": 0, // 管理员无需芝麻信用（设为0即可）
  "status": "normal", // 管理员状态（默认正常，禁用需谨慎）
  "role": "admin", // 权限设为"admin"，登录时识别为管理员
  "createdAt": ISODate("2024-01-01T10:00:00Z"), // 管理员账号创建时间（建议手动创建，不开放注册）
  "updatedAt": ISODate("2024-03-01T16:30:00Z") // 管理员信息更新时间
}
```


## 1. 权限字段核心作用（登录跳转逻辑）
登录时，后端通过 `username`/`phone` 查询用户信息后，根据 `role` 字段判断跳转方向：
- 若 `role === "admin"`：返回“管理员身份标识”，前端跳转到 **后台管理页面**（如 `/admin/dashboard`）；
- 若 `role === "user"`：返回“普通用户身份标识”，前端跳转到 **用户前台首页**（如 `/user/home`）。

示例后端判断逻辑（伪代码）：
```javascript
// 登录接口逻辑
async function login(username, password) {
  // 1. 查询用户
  const user = await db.users.findOne({ username });
  if (!user) return { code: -1, msg: "用户不存在" };
  
  // 2. 验证密码（bcrypt比对）
  const isPwdValid = await bcrypt.compare(password, user.password);
  if (!isPwdValid) return { code: -1, msg: "密码错误" };
  
  // 3. 根据role判断跳转方向
  let redirectUrl = "/user/home"; // 默认普通用户跳转
  if (user.role === "admin") {
    redirectUrl = "/admin/dashboard"; // 管理员跳转后台
  }
  
  // 4. 返回结果（含身份标识和跳转地址）
  return {
    code: 0,
    msg: "登录成功",
    data: {
      userId: user._id,
      role: user.role, // 前端需存储role（如localStorage）
      redirectUrl
    }
  };
}
```


## 2. 安全性建议
1. **管理员账号创建方式**：  
   禁止通过普通用户注册接口生成管理员（避免恶意注册），需通过 **数据库手动插入** 或 **内部专属后台创建页面** 生成（仅超级管理员可操作）。
   
2. **权限字段索引**：  
   若需频繁筛选管理员（如后台统计管理员列表），可给 `role` 字段加索引，提升查询效率：
   ```javascript
   // 给users集合的role字段创建索引
   db.users.createIndex({ "role": 1 });
   ```

3. **前端权限控制**：  
   即使通过URL强制访问后台（如普通用户手动输入 `/admin/dashboard`），前端需先校验 `localStorage` 中的 `role` 是否为 `admin`，若不是则强制跳转前台（避免越权访问）。