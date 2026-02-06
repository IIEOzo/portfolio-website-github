# Cloudflare 服务配置指南

## 项目概述

本项目是一个个人作品集网站，部署在 Cloudflare Pages 上，并集成了 Cloudflare 的 R2（对象存储）、KV（键值存储）和 D1（SQLite 数据库）服务。

## 服务配置详情

### 1. Cloudflare Pages 部署

#### 配置文件
- **配置文件**: `wrangler.toml`
- **构建命令**: `npm run build`
- **构建输出目录**: `dist`
- **GitHub 仓库**: https://github.com/IIEOzo/portfolio-website-github.git

#### 部署步骤
1. 在 Cloudflare 仪表板中，导航到 **Pages**
2. 点击 **创建项目**
3. 选择 **连接到 Git**
4. 选择你的 GitHub 仓库
5. 配置构建设置：
   - 构建命令: `npm run build`
   - 构建输出目录: `dist`
6. 点击 **保存并部署**

### 2. Cloudflare R2 存储桶

#### 配置信息
- **存储桶名称**: `portfolio-assets`
- **绑定名称**: `PORTFOLIO_ASSETS`
- **存储类别**: Standard

#### 使用示例
```typescript
// 上传文件到 R2
const uploadFile = async (file: File) => {
  const key = `uploads/${Date.now()}-${file.name}`;
  await PORTFOLIO_ASSETS.put(key, file, {
    httpMetadata: {
      contentType: file.type
    }
  });
  return key;
};

// 从 R2 获取文件
const getFile = async (key: string) => {
  const object = await PORTFOLIO_ASSETS.get(key);
  if (object) {
    return await object.text();
  }
  return null;
};
```

### 3. Cloudflare KV 命名空间

#### 配置信息
- **命名空间名称**: `portfolio-kv`
- **绑定名称**: `PORTFOLIO_KV`
- **命名空间 ID**: `c833647fbf984c8b8e75543e09f39f7b`

#### 使用示例
```typescript
// 在 KV 中设置值
await PORTFOLIO_KV.put('user_preference', JSON.stringify({
  theme: 'dark',
  language: 'en'
}));

// 从 KV 中获取值
const preferences = await PORTFOLIO_KV.get('user_preference');
if (preferences) {
  const parsedPrefs = JSON.parse(preferences);
  console.log(parsedPrefs.theme);
}

// 从 KV 中删除值
await PORTFOLIO_KV.delete('temporary_data');
```

### 4. Cloudflare D1 数据库

#### 配置信息
- **数据库名称**: `portfolio-db`
- **绑定名称**: `PORTFOLIO_DB`
- **数据库 ID**: `9b24ce44-0725-4cf9-8c78-5f8bd0d036e5`
- **区域**: WNAM

#### 使用示例
```typescript
// 创建表（仅运行一次）
await PORTFOLIO_DB.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// 插入数据
const stmt = await PORTFOLIO_DB.prepare(
  'INSERT INTO projects (title, description) VALUES (?, ?)'
);
await stmt.bind('Project 1', 'First project').run();

// 查询数据
const projects = await PORTFOLIO_DB.prepare(
  'SELECT * FROM projects ORDER BY created_at DESC'
).all();
console.log(projects.results);
```

## 项目结构

```
portfolio-website/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # 导航栏组件
│   │   └── Footer.tsx       # 页脚组件
│   ├── pages/
│   │   ├── Home.tsx         # 首页
│   │   ├── About.tsx        # 关于页面
│   │   └── Services.tsx     # Cloudflare 服务展示页面
│   ├── App.tsx              # 应用主组件
│   └── main.tsx             # 应用入口
├── public/                  # 静态资源
├── wrangler.toml            # Cloudflare 配置文件
├── package.json             # 项目依赖
└── README_CLOUDFLARE.md     # 本配置文档
```

## 环境变量

### 本地开发
在本地开发环境中，你可以创建一个 `.env.local` 文件来设置环境变量：

```env
# 本地开发环境变量
NODE_ENV=development
```

### 生产环境
在 Cloudflare Pages 仪表板中，导航到你的项目 → **设置** → **环境变量**，添加生产环境变量：

```env
# 生产环境变量
NODE_ENV=production
```

## 服务使用指南

### 访问服务展示页面
在部署后的网站中，导航到 `/services` 路径，即可查看 Cloudflare 服务的使用示例和演示。

### 测试服务
1. **R2 测试**: 上传文件并验证是否成功存储
2. **KV 测试**: 在服务页面中使用 KV 存储演示功能
3. **D1 测试**: 执行数据库操作并验证结果

## 最佳实践

### 1. 安全性
- 不要在代码中硬编码 API 密钥或访问凭证
- 使用 Cloudflare 的环境变量存储敏感信息
- 定期轮换 API 密钥

### 2. 性能优化
- **R2**: 使用适当的缓存策略，为静态资源设置合理的缓存时间
- **KV**: 对于频繁访问的数据使用 KV，对于大型数据集使用 D1
- **D1**: 优化 SQL 查询，避免复杂的 JOIN 操作

### 3. 成本管理
- **R2**: 监控存储使用量，删除不必要的文件
- **KV**: 定期清理过期数据
- **D1**: 优化数据库大小，定期备份

### 4. 监控和维护
- 使用 Cloudflare Analytics 监控网站性能
- 设置告警以检测服务异常
- 定期检查服务使用情况和成本

## 故障排除

### 常见问题

#### 1. Pages 部署失败
- **原因**: 构建命令错误或依赖安装失败
- **解决方案**: 检查构建日志，确保所有依赖都已正确安装

#### 2. R2 访问失败
- **原因**: 存储桶权限配置错误
- **解决方案**: 检查 R2 存储桶的访问权限设置

#### 3. KV 操作失败
- **原因**: 命名空间 ID 配置错误
- **解决方案**: 验证 `wrangler.toml` 中的 KV 命名空间 ID 是否正确

#### 4. D1 查询失败
- **原因**: SQL 语法错误或表结构不存在
- **解决方案**: 检查 SQL 语句，确保表结构已正确创建

## 联系信息

如果遇到任何问题，请参考 Cloudflare 文档或联系 Cloudflare 支持。

- **Cloudflare 文档**: https://developers.cloudflare.com/
- **Cloudflare 支持**: https://support.cloudflare.com/

---

**最后更新时间**: 2026-02-06
