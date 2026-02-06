# 生产级网站配置指南

## 1. 配置自定义域名

### 1.1 在 Cloudflare 中添加自定义域名

1. **登录 Cloudflare 仪表板**：访问 https://dash.cloudflare.com/ 并登录你的账号

2. **添加站点**：
   - 在左侧导航栏中，点击 **网站**
   - 点击 **添加站点** 按钮
   - 输入你的自定义域名（例如：`example.com`）
   - 点击 **添加站点** 按钮

3. **选择套餐**：
   - 选择适合你需求的套餐（免费套餐对于大多数个人网站已经足够）
   - 点击 **继续** 按钮

4. **验证 DNS 记录**：
   - Cloudflare 会扫描你的域名当前的 DNS 记录
   - 确认记录无误，或根据需要添加/修改记录
   - 点击 **继续** 按钮

5. **更改域名服务器**：
   - Cloudflare 会提供一组域名服务器地址
   - 登录你的域名注册商账户
   - 将域名服务器设置更改为 Cloudflare 提供的地址
   - 保存更改
   - 返回 Cloudflare 仪表板，点击 **完成，检查名称服务器** 按钮

### 1.2 配置 DNS 记录指向 Cloudflare Pages

1. **获取 Cloudflare Pages 项目 URL**：
   - 在 Cloudflare 仪表板中，导航到 **Pages**
   - 选择你的项目
   - 复制项目的 `.pages.dev` URL（例如：`portfolio-website.pages.dev`）

2. **添加 CNAME 记录**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **DNS**
   - 点击 **添加记录** 按钮
   - 选择记录类型为 **CNAME**
   - **名称**：输入子域名（例如：`www` 或 `@` 表示根域名）
   - **目标**：粘贴你的 Cloudflare Pages 项目 URL（例如：`portfolio-website.pages.dev`）
   - **TTL**：选择 **自动**
   - **代理状态**：保持为 **已代理**（启用 Cloudflare 功能）
   - 点击 **保存** 按钮

3. **添加 A 记录（根域名）**：
   - 如果你想使用根域名（例如：`example.com`）而不是子域名：
   - 点击 **添加记录** 按钮
   - 选择记录类型为 **A**
   - **名称**：输入 `@`
   - **IPv4 地址**：输入 Cloudflare Pages 的 IP 地址（请参考 Cloudflare 文档获取最新 IP）
   - **TTL**：选择 **自动**
   - **代理状态**：保持为 **已代理**
   - 点击 **保存** 按钮

### 1.3 在 Cloudflare Pages 中添加自定义域名

1. **导航到 Pages 项目**：
   - 在 Cloudflare 仪表板中，导航到 **Pages**
   - 选择你的项目

2. **添加自定义域名**：
   - 在项目设置页面，点击 **自定义域名** 选项卡
   - 点击 **设置自定义域名** 按钮
   - 输入你的自定义域名（例如：`www.example.com`）
   - 点击 **继续** 按钮

3. **验证域名所有权**：
   - Cloudflare 会自动验证域名所有权（如果 DNS 记录已正确配置）
   - 验证成功后，点击 **完成** 按钮

4. **等待 SSL 证书颁发**：
   - Cloudflare 会自动为你的域名颁发 SSL 证书
   - 这可能需要几分钟时间
   - 证书颁发后，你的域名将显示为 **活动** 状态

## 2. 启用 HTTPS 和 SSL/TLS 设置

### 2.1 配置 SSL/TLS 加密模式

1. **导航到 SSL/TLS 设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **SSL/TLS** → **概述**

2. **选择加密模式**：
   - 从下拉菜单中选择 **完全** 或 **完全(严格)**
   - **完全**：加密从访客到 Cloudflare 和从 Cloudflare 到你的源服务器的连接
   - **完全(严格)**：与完全相同，但还验证源服务器的证书

3. **保存设置**：
   - 点击 **保存** 按钮

### 2.2 启用 HTTP 严格传输安全 (HSTS)

1. **导航到 HSTS 设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **SSL/TLS** → **边缘证书**

2. **启用 HSTS**：
   - 向下滚动到 **HTTP 严格传输安全 (HSTS)** 部分
   - 点击 **启用 HSTS** 按钮

3. **配置 HSTS 设置**：
   - **最大年龄**：设置为至少 6 个月（15768000 秒）
   - **包括子域**：根据需要启用
   - **预加载**：根据需要启用（这会将你的域名添加到浏览器的 HSTS 预加载列表）
   - **应用** 按钮

### 2.3 验证 HTTPS 配置

1. **访问你的网站**：
   - 在浏览器中访问你的自定义域名
   - 确认地址栏显示锁图标，表示连接是安全的

2. **使用 SSL 检查工具**：
   - 使用在线 SSL 检查工具（如 https://www.ssllabs.com/ssltest/）验证你的 SSL 配置
   - 确保获得 A 或 A+ 评级

## 3. 性能优化

### 3.1 启用 Cloudflare 缓存

1. **导航到缓存设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **缓存** → **配置**

2. **配置缓存规则**：
   - **浏览器缓存 TTL**：设置为至少 4 小时
   - **缓存状态**：设置为 **已启用**

3. **创建页面规则**（可选）：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **规则** → **页面规则**
   - 点击 **创建页面规则** 按钮
   - 输入 URL 模式（例如：`example.com/*`）
   - 添加设置：**缓存级别** → **缓存所有内容**
   - 点击 **保存并部署** 按钮

### 3.2 启用自动压缩

1. **导航到速度设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **速度** → **优化**

2. **启用压缩**：
   - 确保 **自动压缩** 选项已启用
   - 确保 **Brotli** 选项已启用

### 3.3 优化图片加载

1. **使用 Cloudflare Images**（可选）：
   - 在 Cloudflare 仪表板中，导航到 **Images**
   - 按照提示设置 Cloudflare Images
   - 上传你的图片并使用 Cloudflare 提供的 URL

2. **使用 R2 存储桶**：
   - 使用之前创建的 R2 存储桶存储和提供图片
   - 确保图片使用适当的格式和大小

3. **启用图片优化**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **速度** → **优化**
   - 启用 **自动 WebP 转换**
   - 启用 **有损压缩**（根据需要调整压缩级别）

## 4. 安全设置

### 4.1 配置 Cloudflare Web Application Firewall (WAF)

1. **导航到 WAF 设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **安全** → **WAF**

2. **启用托管规则集**：
   - 确保 **Cloudflare 托管规则集** 已启用
   - 设置规则集动作为 **阻止** 或 **挑战**

3. **创建自定义规则**（可选）：
   - 点击 **创建规则** 按钮
   - 根据你的需求配置规则
   - 点击 **保存** 按钮

### 4.2 启用 DDoS 保护

1. **导航到 DDoS 保护设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **安全** → **DDoS**

2. **启用 DDoS 保护**：
   - 确保 **DDoS 攻击保护** 已启用
   - 根据需要调整敏感度设置

### 4.3 配置速率限制

1. **导航到速率限制设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **安全** → **速率限制规则**

2. **创建速率限制规则**：
   - 点击 **创建规则** 按钮
   - 输入规则名称
   - 配置匹配条件（例如：`URI Path` 包含 `/api/`）
   - 设置速率限制（例如：每 10 秒 10 个请求）
   - 配置动作（例如：**阻止**）
   - 点击 **保存** 按钮

### 4.4 配置内容安全策略 (CSP)

1. **导航到内容安全策略设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **安全** → **内容安全策略**

2. **创建 CSP**：
   - 点击 **创建策略** 按钮
   - 根据你的网站需求配置 CSP
   - 点击 **保存** 按钮

## 5. 环境变量和密钥管理

### 5.1 在 Cloudflare Pages 中配置生产环境变量

1. **导航到 Pages 项目设置**：
   - 在 Cloudflare 仪表板中，导航到 **Pages**
   - 选择你的项目
   - 点击 **设置** 选项卡

2. **配置环境变量**：
   - 滚动到 **环境变量** 部分
   - 点击 **添加变量** 按钮
   - 输入变量名称和值
   - 选择 **生产** 环境
   - 点击 **保存** 按钮

### 5.2 使用 Cloudflare Workers Secrets 存储敏感信息

1. **创建 Worker**（如果尚未创建）：
   - 在 Cloudflare 仪表板中，导航到 **Workers 和 Pages** → **Workers**
   - 点击 **创建服务** 按钮
   - 输入服务名称
   - 选择 **HTTP 路由器** 触发器
   - 点击 **创建服务** 按钮

2. **添加 Secrets**：
   - 选择你的 Worker 服务
   - 点击 **设置** 选项卡
   - 点击 **变量** 选项卡
   - 点击 **添加变量** 按钮
   - 输入变量名称和值
   - 勾选 **加密使用 Workers KV** 选项
   - 点击 **保存** 按钮

## 6. 自动部署流程优化

### 6.1 配置 GitHub Actions 工作流

1. **创建 GitHub Actions 工作流文件**：
   - 在你的 GitHub 仓库中，创建 `.github/workflows/deploy.yml` 文件

2. **配置工作流**：
   ```yaml
   name: Deploy to Cloudflare Pages

   on:
     push:
       branches:
         - master
     pull_request:
       branches:
         - master

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18
         - name: Install dependencies
           run: npm install
         - name: Run tests
           run: npm test
         - name: Build project
           run: npm run build

     deploy:
       needs: build
       runs-on: ubuntu-latest
       if: github.event_name == 'push' && github.ref == 'refs/heads/master'
       steps:
         - uses: actions/checkout@v3
         - name: Deploy to Cloudflare Pages
           uses: cloudflare/pages-action@v1
           with:
             apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
             accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
             projectName: portfolio-website
             directory: dist
             branch: master
   ```

3. **配置 GitHub Secrets**：
   - 在你的 GitHub 仓库中，导航到 **Settings** → **Secrets and variables** → **Actions**
   - 点击 **New repository secret** 按钮
   - 添加以下 secrets：
     - `CLOUDFLARE_API_TOKEN`：你的 Cloudflare API 令牌
     - `CLOUDFLARE_ACCOUNT_ID`：你的 Cloudflare 账户 ID

### 6.2 设置分支部署

1. **配置分支部署**：
   - 在 Cloudflare 仪表板中，导航到 **Pages** → 你的项目 → **设置** → **部署**
   - 在 **分支部署** 部分，启用 **自动部署来自每个提交的预览**
   - 选择你要自动部署的分支

2. **配置生产分支**：
   - 在 **生产分支** 部分，选择 `master` 分支作为生产分支

## 7. 监控和日志

### 7.1 启用 Cloudflare Analytics

1. **导航到 Analytics 设置**：
   - 在 Cloudflare 仪表板中，导航到你的域名 → **分析**

2. **查看分析数据**：
   - 查看流量、带宽、请求等数据
   - 设置自定义报告（如果需要）

### 7.2 配置 Web Vitals 监控

1. **导航到 Web Vitals 设置**：
   - 在 Cloudflare 仪表板中，导航到 **Pages** → 你的项目 → **分析**

2. **启用 Web Vitals**：
   - 确保 **Web Vitals** 已启用
   - 查看核心网页指标数据

### 7.3 设置错误监控

1. **集成错误监控服务**：
   - 考虑集成第三方错误监控服务，如 Sentry 或 LogRocket
   - 按照服务提供商的说明进行设置

## 8. 备份和灾备

### 8.1 定期备份 D1 数据库

1. **导出 D1 数据库**：
   - 使用 Wrangler CLI 导出数据库：
     ```bash
     wrangler d1 export portfolio-db --output=backup.sql
     ```

2. **设置定期备份**：
   - 创建一个脚本，定期执行导出命令
   - 将备份文件存储在安全的位置

### 8.2 备份 R2 存储桶内容

1. **使用 rclone 备份 R2**：
   - 安装 rclone：https://rclone.org/download/
   - 配置 rclone 连接到你的 R2 存储桶
   - 执行备份命令：
     ```bash
     rclone sync r2:portfolio-assets /path/to/backup
     ```

2. **设置定期备份**：
   - 创建一个脚本，定期执行同步命令

### 8.3 配置 KV 数据备份策略

1. **导出 KV 数据**：
   - 使用 Wrangler CLI 导出 KV 数据：
     ```bash
     wrangler kv:bulk export portfolio-kv --output=kv-backup.json
     ```

2. **设置定期备份**：
   - 创建一个脚本，定期执行导出命令

## 9. 网站可靠性工程

### 9.1 实现健康检查端点

1. **创建健康检查端点**：
   - 在你的项目中，创建一个 `health` 端点
   - 例如，在 `src/pages/Health.tsx` 中：
     ```tsx
     import React from 'react';

     const Health: React.FC = () => {
       return (
         <div>
           <h1>Health Check</h1>
           <p>Status: OK</p>
           <p>Time: {new Date().toISOString()}</p>
         </div>
       );
     };

     export default Health;
     ```

2. **更新路由**：
   - 在 `App.tsx` 中添加健康检查页面的路由

### 9.2 配置监控告警

1. **使用 Cloudflare Alerting**：
   - 在 Cloudflare 仪表板中，导航到 **分析** → **告警**
   - 点击 **创建告警** 按钮
   - 配置告警条件（例如：4xx 错误率超过 5%）
   - 设置通知渠道（例如：电子邮件、Slack）
   - 点击 **保存** 按钮

### 9.3 建立部署回滚机制

1. **使用 Cloudflare Pages 部署历史**：
   - 在 Cloudflare 仪表板中，导航到 **Pages** → 你的项目 → **部署历史**
   - 找到你想要回滚到的部署
   - 点击 **...** 按钮 → **回滚到这个部署**

## 10. 合规性和 SEO

### 10.1 配置 robots.txt

1. **创建 robots.txt 文件**：
   - 在你的项目的 `public` 目录中，创建 `robots.txt` 文件

2. **配置 robots.txt**：
   ```
   User-agent: *
   Allow: /

   Sitemap: https://example.com/sitemap.xml
   ```

### 10.2 设置 sitemap.xml

1. **创建 sitemap.xml 文件**：
   - 在你的项目的 `public` 目录中，创建 `sitemap.xml` 文件

2. **配置 sitemap.xml**：
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://example.com/</loc>
       <lastmod>2026-02-06</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://example.com/about</loc>
       <lastmod>2026-02-06</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://example.com/services</loc>
       <lastmod>2026-02-06</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
   </urlset>
   ```

### 10.3 实现结构化数据

1. **添加结构化数据**：
   - 在你的页面中添加 JSON-LD 格式的结构化数据
   - 例如，在首页中添加网站结构化数据：
     ```html
     <script type="application/ld+json">
     {
       "@context": "https://schema.org",
       "@type": "WebSite",
       "name": "Portfolio Website",
       "url": "https://example.com/",
       "description": "A personal portfolio website showcasing projects and skills",
       "potentialAction": {
         "@type": "SearchAction",
         "target": "https://example.com/search?q={search_term_string}",
         "query-input": "required name=search_term_string"
       }
     }
     </script>
     ```

### 10.4 确保网站可访问性合规

1. **使用可访问性测试工具**：
   - 使用 Lighthouse 或 axe-core 测试网站可访问性
   - 按照工具的建议进行改进

2. **遵循 WCAG 指南**：
   - 遵循 Web 内容无障碍指南 (WCAG) 2.1 标准
   - 确保网站对所有人可访问

## 11. 测试和验证

### 11.1 性能测试

1. **使用 Lighthouse 测试**：
   - 在 Chrome 中，打开开发者工具
   - 切换到 **Lighthouse** 选项卡
   - 选择 **性能**、**可访问性**、**最佳实践**、**SEO**
   - 点击 **生成报告** 按钮
   - 按照建议进行改进

### 11.2 安全测试

1. **使用安全扫描工具**：
   - 使用在线安全扫描工具，如 SSL Labs 或 SecurityHeaders.com
   - 按照建议进行改进

### 11.3 跨浏览器兼容性测试

1. **测试主流浏览器**：
   - 在 Chrome、Firefox、Safari、Edge 等主流浏览器中测试你的网站
   - 确保在所有浏览器中显示正常

### 11.4 移动设备响应式测试

1. **使用设备模拟器**：
   - 在 Chrome 开发者工具中，使用设备模拟器测试不同设备尺寸
   - 确保网站在移动设备上显示正常

2. **在实际设备上测试**：
   - 在实际的移动设备上测试你的网站
   - 确保触摸交互正常

## 12. 文档和维护

### 12.1 更新项目文档

1. **更新 README.md**：
   - 更新项目的 README.md 文件，添加生产环境配置信息
   - 包括部署步骤、环境变量说明等

2. **创建维护文档**：
   - 创建详细的维护文档，包括：
     - 常见问题和解决方案
     - 定期维护任务
     - 备份和恢复流程

### 12.2 建立维护计划

1. **制定定期维护任务**：
   - 每周：检查网站性能和错误
   - 每月：备份数据，更新依赖
   - 每季度：安全扫描，性能优化

2. **设置维护日历**：
   - 使用日历工具跟踪维护任务
   - 设置提醒，确保按时完成维护

## 总结

通过遵循本指南，你可以将你的 GitHub 项目部署到 Cloudflare 并配置为生产级网站。关键步骤包括：

1. **配置自定义域名**：添加域名，配置 DNS 记录
2. **启用 HTTPS**：配置 SSL/TLS 设置，启用 HSTS
3. **性能优化**：启用缓存，配置压缩，优化图片
4. **安全设置**：配置 WAF，启用 DDoS 保护，设置速率限制
5. **自动化部署**：配置 GitHub Actions，设置分支部署
6. **监控和备份**：启用分析，设置告警，定期备份
7. **合规性和 SEO**：配置 robots.txt，设置 sitemap.xml，实现结构化数据
8. **测试和验证**：性能测试，安全测试，兼容性测试
9. **文档和维护**：更新文档，建立维护计划

按照这些步骤，你可以确保你的网站安全、可靠、高性能，为访问者提供良好的用户体验。
