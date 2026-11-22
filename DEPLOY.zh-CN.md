# Puppy Factory：个人网站部署说明

这是当前上线第 4 版的源码和可直接部署的静态文件。HTML、CSS、JavaScript、字体与字体许可证都在包里，网页运行不依赖 ChatGPT、第三方接口、登录或后端，也不需要安装依赖或执行构建。

## 最短部署步骤

1. 解压 `Puppy-Factory-source-v4.zip`，打开里面的 `Puppy-Factory` 文件夹。
2. 在个人站的静态目录中创建 `puppy-factory` 文件夹。
3. 把 **`dist` 文件夹内的全部内容**复制进去，包括字体和 `font-licenses` 子文件夹。
4. 按个人站原来的方式发布，然后访问 `https://你的域名/puppy-factory/`。
5. 在作品页添加一个链接，指向 `/puppy-factory/`。

所有程序和字体路径都是相对路径，可以直接部署到子目录。保留访问地址末尾的 `/`；一般静态服务器会自动补上。

### 如果个人站用 Vite、Astro、Next.js 或类似框架

把 `dist` 内的内容放进个人站项目的 `public/puppy-factory/`。例如，复制后的首页路径是 `public/puppy-factory/index.html`，不是 `public/puppy-factory/dist/index.html`。然后提交并按原有流程发布个人站。

作品链接可以写成：

```html
<a href="/puppy-factory/">Puppy Factory · 小狗颜文字工厂</a>
```

### 如果使用服务器上传文件

把 `dist` 内的内容上传到网站根目录下的 `puppy-factory/`，与其他静态页面一样提供访问即可。服务器需正确提供 `.js`、`.css` 和 `.woff` 文件；JavaScript 模块应使用 JavaScript MIME 类型，不能被个人站的页面路由回退成 HTML。

### 如果独立托管成一个静态站

上传或设置发布目录为 `dist`，构建命令留空。在该站点的根网址打开即可。可部署文件只有约百 KB 量级，没有 `node_modules`。

## 在电脑上预览

在解压后的 `Puppy-Factory` 文件夹打开终端，运行：

```bash
python3 -m http.server 8000 --directory dist
```

Windows 如果用 Python Launcher：

```powershell
py -m http.server 8000 --directory dist
```

然后打开 `http://localhost:8000/`。网页使用 JavaScript 模块，请通过这个本地服务器打开，直接双击 `index.html` 可能会被浏览器阻止。

## 修改与检查

| 文件 | 作用 |
| --- | --- |
| `dist/index.html` | 页面结构和文字 |
| `dist/style.css` | 奶油粉配色、字体、响应式与吸附布局 |
| `dist/model.js` | 颜文字零件、完整预设、组合和复制逻辑 |
| `dist/picker.js` | 心情筛选、最近使用、展开选择与跳转计算 |
| `dist/app.js` | 页面交互 |
| `dist/puppy-unicode-*.woff` | 随站字体，上传时全部保留 |
| `dist/font-licenses/` | 随站字体许可证，分发时保留 |
| `tests/` | Unicode、复制、收藏与选择器测试 |
| `source-manifest.json` | 原始版本、提交号和文件校验值 |

如已安装 Node.js，可在项目根目录运行 `npm test`。测试不需要 `npm install`。

## 收藏与复制

- 收藏和最近使用记录存在浏览器本地，并按域名隔离。换到个人站后不会自动带上旧站的收藏；这个源码包不包含浏览器里的私人收藏数据。
- 推荐用 HTTPS 发布，以使用浏览器标准剪贴板 API；受限时网页会尝试兼容复制，并提供手动复制。
- 修改网页后如果仍看到旧页面，可刷新缓存；发布时请一起上传配套的 JS、CSS 和字体。

## 导出内容与验证范围

本包保留原始应用代码、测试、字体及许可证，额外提供本说明和版本校验清单。源站部署身份及访问凭据不在导出包内。

导出时会重新运行项目测试，并检查页面、模块和字体引用是否完整。导出检查不等于个人站部署后的手机视觉或系统剪贴板实测；上传后可用手机确认复制、收藏和滚动卡片。
