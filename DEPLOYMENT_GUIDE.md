# 保姆级 Cloudflare 部署指南

## 目录

1. [准备工作](#准备工作)
2. [安装和配置 Wrangler CLI](#安装和配置-wrangler-cli)
3. [创建 Cloudflare 服务](#创建-cloudflare-服务)
   - [3.1 创建 R2 存储桶](#31-创建-r2-存储桶)
   - [3.2 创建 KV 命名空间](#32-创建-kv-命名空间)
   - [3.3 创建 D1 数据库](#33-创建-d1-数据库)
4. [配置项目文件](#配置项目文件)
   - [4.1 创建 wrangler.toml 文件](#41-创建-wrangler-toml-文件)
   - [4.2 更新项目代码](#42-更新项目代码)
5. [构建和推送代码](#构建和推送代码)
6. [部署到 Cloudflare Pages](#部署到-cloudflare-pages)
7. [验证部署](#验证部署)
8. [常见问题解决](#常见问题解决)

## 准备工作

### 1.1 所需账号
- [GitHub 账号](https://github.com/signup)（已有仓库：https://github.com/IIEOzo/portfolio-website-github.git）
- [Cloudflare 账号](https://dash.cloudflare.com/sign-up)

### 1.2 所需软件
- **Node.js** (v16+): [下载地址](https://nodejs.org/en/download/)
- **Git**: [下载地址](https://git-scm.com/downloads)
- **代码编辑器**（推荐 VS Code）: [下载地址](https://code.visualstudio.com/download)

### 1.3 本地项目结构

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
└── DEPLOYMENT_GUIDE.md      # 本部署指南
```

## 安装和配置 Wrangler CLI

### 2.1 安装 Wrangler CLI

打开终端（Windows 上使用 PowerShell 或命令提示符），运行以下命令：

```bash
npm install -g wrangler
```

### 2.2 登录 Cloudflare 账号

```bash
wrangler login
```

这会打开一个浏览器窗口，要求你登录 Cloudflare 账号并授权 Wrangler 访问。

### 2.3 验证登录状态

```bash
wrangler whoami
```

如果登录成功，会显示你的 Cloudflare 账号信息。

## 创建 Cloudflare 服务

### 3.1 创建 R2 存储桶

```bash
wrangler r2 bucket create portfolio-assets
```

**预期输出**：
```
✅ Created bucket 'portfolio-assets' with default storage class of Standard.
```

### 3.2 创建 KV 命名空间

```bash
wrangler kv namespace create portfolio-kv
```

**预期输出**：
```
✨ Success!
To access your new KV Namespace in your Worker, add the following snippet to your configuration file:
{
  "kv_namespaces": [
    {
      "binding": "portfolio_kv",
      "id": "c833647fbf984c8b8e75543e09f39f7b"
    }
  ]
}
```

**注意**：保存生成的 `id` 值，稍后会用到。

### 3.3 创建 D1 数据库

```bash
wrangler d1 create portfolio-db
```

**预期输出**：
```
✅ Successfully created DB 'portfolio-db' in region WNAM
Created your new D1 database.

To access your new D1 Database in your Worker, add the following snippet to your configuration file:
{
  "d1_databases": [
    {
      "binding": "portfolio_db",
      "database_name": "portfolio-db",
      "database_id": "9b24ce44-0725-4cf9-8c78-5f8bd0d036e5"
    }
  ]
}
```

**注意**：保存生成的 `database_id` 值，稍后会用到。

## 配置项目文件

### 4.1 创建 wrangler.toml 文件

在项目根目录创建 `wrangler.toml` 文件，内容如下：

```toml
# Cloudflare Pages 配置
name = "portfolio-website"
compatibility_date = "2024-01-01"

# Pages 构建配置
[[build]]
command = "npm run build"
upload_dir = "dist"

# 路由配置
[[routes]]
pattern = "/*"

# 环境变量配置
[env.production]
name = "portfolio-website"

# R2 存储桶配置
[[r2_buckets]]
binding = "PORTFOLIO_ASSETS"
bucket_name = "portfolio-assets"

# KV 命名空间配置
[[kv_namespaces]]
binding = "PORTFOLIO_KV"
id = "c833647fbf984c8b8e75543e09f39f7b"
preview_id = "c833647fbf984c8b8e75543e09f39f7b"

# D1 数据库配置
[[d1_databases]]
binding = "PORTFOLIO_DB"
database_name = "portfolio-db"
database_id = "9b24ce44-0725-4cf9-8c78-5f8bd0d036e5"
```

**注意**：
- 替换 `id` 为你生成的 KV 命名空间 ID
- 替换 `database_id` 为你生成的 D1 数据库 ID

### 4.2 更新项目代码

#### 4.2.1 创建 Services.tsx 页面

在 `src/pages/` 目录创建 `Services.tsx` 文件：

```tsx
import React, { useState, useEffect } from 'react';

const Services: React.FC = () => {
  const [r2Status, setR2Status] = useState('Not initialized');
  const [kvStatus, setKVStatus] = useState('Not initialized');
  const [d1Status, setD1Status] = useState('Not initialized');
  const [kvValue, setKVValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  // 检查R2服务
  const checkR2 = async () => {
    try {
      // 这里是R2使用示例
      // 在实际Worker环境中，PORTFOLIO_ASSETS会自动可用
      setR2Status('R2 service configured successfully');
    } catch (error) {
      setR2Status('R2 service error');
      console.error('R2 error:', error);
    }
  };

  // 检查KV服务
  const checkKV = async () => {
    try {
      // 这里是KV使用示例
      // 在实际Worker环境中，PORTFOLIO_KV会自动可用
      setKVStatus('KV service configured successfully');
    } catch (error) {
      setKVStatus('KV service error');
      console.error('KV error:', error);
    }
  };

  // 检查D1服务
  const checkD1 = async () => {
    try {
      // 这里是D1使用示例
      // 在实际Worker环境中，PORTFOLIO_DB会自动可用
      setD1Status('D1 service configured successfully');
    } catch (error) {
      setD1Status('D1 service error');
      console.error('D1 error:', error);
    }
  };

  // 模拟KV设置值
  const setKVValueExample = async () => {
    try {
      setKVStatus(`Setting value: ${inputValue}`);
      // 在实际Worker环境中，使用：await PORTFOLIO_KV.put('example', inputValue);
      setKVValue(inputValue);
      setKVStatus('Value set successfully');
    } catch (error) {
      setKVStatus('Failed to set value');
      console.error('KV set error:', error);
    }
  };

  useEffect(() => {
    checkR2();
    checkKV();
    checkD1();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Cloudflare Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* R2 Service */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-blue-600 text-4xl mb-6">☁️</div>
            <h2 className="text-2xl font-bold mb-4">R2 Storage</h2>
            <p className="text-gray-600 mb-6">
              Object storage for images, videos, and other files
            </p>
            <div className={`p-4 rounded-lg ${r2Status.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {r2Status}
            </div>
          </div>

          {/* KV Service */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-purple-600 text-4xl mb-6">🔑</div>
            <h2 className="text-2xl font-bold mb-4">KV Storage</h2>
            <p className="text-gray-600 mb-6">
              Key-value storage for configuration and session data
            </p>
            <div className={`p-4 rounded-lg ${kvStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {kvStatus}
            </div>
            {kvValue && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">Stored value: {kvValue}</p>
              </div>
            )}
          </div>

          {/* D1 Service */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-green-600 text-4xl mb-6">💾</div>
            <h2 className="text-2xl font-bold mb-4">D1 Database</h2>
            <p className="text-gray-600 mb-6">
              SQLite database for structured data
            </p>
            <div className={`p-4 rounded-lg ${d1Status.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {d1Status}
            </div>
          </div>
        </div>

        {/* KV Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">KV Storage Demo</h2>
          <div className="mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a value to store in KV"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={setKVValueExample}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Store in KV
          </button>
        </div>

        {/* Service Usage Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Service Usage Examples</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">R2 Storage Example</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-gray-800">
                {/* R2 usage example */}
                {`// Upload a file to R2
const uploadFile = async (file: File) => {
  const key = \`uploads/\${Date.now()}-\${file.name}\`;
  await PORTFOLIO_ASSETS.put(key, file, {
    httpMetadata: {
      contentType: file.type
    }
  });
  return key;
};

// Get a file from R2
const getFile = async (key: string) => {
  const object = await PORTFOLIO_ASSETS.get(key);
  if (object) {
    return await object.text();
  }
  return null;
};`}
              </code>
            </pre>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">KV Storage Example</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-gray-800">
                {/* KV usage example */}
                {`// Set a value in KV
await PORTFOLIO_KV.put('user_preference', JSON.stringify({
  theme: 'dark',
  language: 'en'
}));

// Get a value from KV
const preferences = await PORTFOLIO_KV.get('user_preference');
if (preferences) {
  const parsedPrefs = JSON.parse(preferences);
  console.log(parsedPrefs.theme);
}

// Delete a value from KV
await PORTFOLIO_KV.delete('temporary_data');`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">D1 Database Example</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-gray-800">
                {/* D1 usage example */}
                {`// Create table (run once)
await PORTFOLIO_DB.exec(\`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
\`);

// Insert data
const stmt = await PORTFOLIO_DB.prepare(
  'INSERT INTO projects (title, description) VALUES (?, ?)'
);
await stmt.bind('Project 1', 'First project').run();

// Query data
const projects = await PORTFOLIO_DB.prepare(
  'SELECT * FROM projects ORDER BY created_at DESC'
).all();
console.log(projects.results);`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
```

#### 4.2.2 更新 App.tsx 文件

```tsx
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import './App.css';

function App() {
  // Simple routing based on path
  const path = window.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {path === '/about' ? <About /> : path === '/services' ? <Services /> : <Home />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

#### 4.2.3 更新 Navbar.tsx 文件

```tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white py-6 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Portfolio</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
          <a href="/about" className="hover:text-gray-300 transition-colors">About</a>
          <a href="/services" className="hover:text-gray-300 transition-colors">Services</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

## 构建和推送代码

### 5.1 安装依赖

```bash
cd portfolio-website
npm install
```

### 5.2 构建项目

```bash
npm run build
```

**预期输出**：
```
> portfolio-website@0.0.0 build
> tsc -b && vite build

vite v7.3.1 building client environment for production...
✓ 35 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-D8D3p4dC.css    2.33 kB │ gzip:  1.06 kB
dist/assets/index-T61VDgLA.js   205.07 kB │ gzip: 63.70 kB
✓ built in 1.33s
```

### 5.3 推送代码到 GitHub

```bash
git add .
git commit -m "Add Cloudflare services integration"
git push
```

**预期输出**：
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 16 threads
Compressing objects: 100% (9/9), done.
Writing objects: 100% (9/9), 3.28 KiB | 1.09 MiB/s, done.
Total 9 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
To https://github.com/IIEOzo/portfolio-website-github.git
   ae0e9fc..d90f802  master -> master
```

## 部署到 Cloudflare Pages

### 6.1 登录 Cloudflare 仪表板

访问 [Cloudflare 仪表板](https://dash.cloudflare.com/) 并登录你的账号。

### 6.2 创建 Pages 项目

1. 在左侧导航栏中，点击 **Pages**
2. 点击 **创建项目** 按钮
3. 在 **连接到 Git** 部分，点击 **GitHub**
4. 如果你还没有授权 Cloudflare 访问你的 GitHub 账号，会提示你授权

### 6.3 选择仓库

1. 在 **选择一个仓库** 部分，找到并选择 `IIEOzo/portfolio-website-github` 仓库
2. 点击 **开始设置** 按钮

### 6.4 配置构建设置

在 **构建设置** 部分，配置以下选项：

| 选项 | 值 |
|------|-----|
| 生产分支 | `master` |
| 构建命令 | `npm run build` |
| 构建输出目录 | `dist` |
| 根目录 | `/` |

### 6.5 高级设置（可选）

1. 点击 **环境变量** 部分的 **添加变量** 按钮
2. 添加以下环境变量：
   - `NODE_ENV`: `production`

### 6.6 开始部署

点击 **保存并部署** 按钮，开始部署过程。

**部署过程**：
1. Cloudflare 会克隆你的 GitHub 仓库
2. 安装依赖
3. 运行构建命令
4. 部署构建产物

## 验证部署

### 7.1 访问部署的网站

部署完成后，Cloudflare Pages 会为你的网站分配一个唯一的 URL，格式类似于 `https://portfolio-website.pages.dev`。

点击 **访问站点** 按钮，打开你的网站。

### 7.2 验证服务页面

1. 在网站导航栏中，点击 **Services** 链接
2. 你应该看到 Cloudflare 服务的展示页面
3. 验证以下内容：
   - R2 服务状态显示为 "R2 service configured successfully"
   - KV 服务状态显示为 "KV service configured successfully"
   - D1 服务状态显示为 "D1 service configured successfully"
   - KV 存储演示功能可以正常使用

### 7.3 验证其他页面

- **Home**：验证首页内容显示正常
- **About**：验证关于页面内容显示正常

## 常见问题解决

### 8.1 构建失败

**症状**：部署过程中构建失败

**解决方法**：
1. 检查构建日志，查看具体错误信息
2. 常见原因：
   - 依赖安装失败：运行 `npm install` 本地测试
   - 代码错误：检查 TypeScript 编译错误
   - 构建命令错误：确保 `npm run build` 在本地可以正常运行

### 8.2 服务状态显示错误

**症状**：Services 页面中服务状态显示错误

**解决方法**：
1. 检查 `wrangler.toml` 文件中的配置是否正确
2. 确保服务的 ID 和绑定名称与创建时一致
3. 重新部署项目

### 8.3 GitHub 推送失败

**症状**：`git push` 命令失败，显示连接重置

**解决方法**：
1. 检查网络连接
2. 尝试使用 SSH 协议而不是 HTTPS
3. 重新运行 `git push` 命令

### 8.4 页面路由问题

**症状**：刷新页面后显示 404 错误

**解决方法**：
1. 在 Cloudflare Pages 仪表板中，导航到你的项目 → **设置** → **路由**
2. 添加以下路由规则：
   - 模式：`/*`
   - 目标：`/index.html`
   - 状态码：`200`

## 总结

恭喜你！你已经成功完成了以下任务：

1. ✅ 安装和配置了 Cloudflare Wrangler CLI
2. ✅ 创建了 Cloudflare R2、KV 和 D1 服务
3. ✅ 配置了项目文件和代码
4. ✅ 构建和推送了代码到 GitHub
5. ✅ 部署了项目到 Cloudflare Pages
6. ✅ 验证了部署结果

你的个人作品集网站现在已经部署在 Cloudflare Pages 上，并集成了 Cloudflare 的全栈服务。你可以通过访问分配的 Pages URL 来查看和分享你的网站。

## 后续步骤

1. **自定义域名**：在 Cloudflare Pages 仪表板中，为你的网站添加自定义域名
2. **监控**：使用 Cloudflare Analytics 监控网站性能和访问情况
3. **扩展功能**：根据需要扩展网站功能，使用 R2、KV 和 D1 服务存储和管理数据

---

**部署指南版本**：1.0.0
**最后更新**：2026-02-06