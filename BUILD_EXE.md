# 🎵 构建 EXE 可执行文件

## 前置要求

```bash
# 安装依赖
npm install

# 进入客户端目录
cd client
npm install
cd ..

# 全局安装 electron-builder（可选）
npm install -g electron-builder
```

## 快速构建

### 方式 1: 完整安装程序 (推荐)

```bash
# 构建 NSIS 安装程序 (.exe 安装向导)
npm run build

# 输出文件位置：
# dist/Audio to Tab Converter Setup 1.0.0.exe  (安装程序)
# dist/Audio to Tab Converter 1.0.0.exe        (便携版)
```

### 方式 2: 仅便携版

```bash
# 只生成便携式 EXE（无需安装）
npx electron-builder --win --portable

# 输出文件：
# dist/Audio to Tab Converter-1.0.0-portable.exe
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.js` | Electron 主进程，管理窗口和后端服务 |
| `preload.js` | 安全隔离的进程间通信 |
| `package.json` | 构建配置和依赖 |

## 构建输出

生成的 EXE 文件包含：
- ✅ 完整的 React 前端应用
- ✅ Express 后端服务
- ✅ 音频处理功能
- ✅ 跨平台图标和快捷方式

## 发布文件

构建完成后，`dist` 目录包含：

```
dist/
├── Audio to Tab Converter Setup 1.0.0.exe     # 安装程序
├── Audio to Tab Converter 1.0.0-portable.exe  # 便携版
└── builder-effective-config.yaml              # 构建配置
```

### 安装程序 (Setup .exe)
- 需要用户权限
- 自动卸载程序
- 创建开始菜单快捷方式
- 允许自定义安装路径

### 便携版 (.exe)
- 无需安装，直接运行
- 独立完整的可执行文件
- 可放在 USB 或云盘运行

## 自定义配置

编辑 `package.json` 中的 `build` 字段：

```json
{
  "build": {
    "appId": "com.audio-to-tab.app",
    "productName": "Audio to Tab Converter",
    "win": {
      "target": ["nsis", "portable"]
    }
  }
}
```

## 签名证书（可选）

如需代码签名以提高安全性：

```bash
# 使用证书文件
{
  "build": {
    "win": {
      "certificateFile": "path/to/certificate.pfx",
      "certificatePassword": "your-password"
    }
  }
}
```

## 常见问题

### Q: 如何更改应用图标？
A: 将 `icon.png` (256x256) 放在 `assets/` 目录

### Q: 如何更改应用名称？
A: 修改 `package.json` 中的 `productName` 字段

### Q: 支持 32 位系统吗？
A: 支持，修改 `package.json` 中的 `arch` 配置

### Q: 可以发布到 Windows Store 吗？
A: 可以，使用 `appx` target（需要开发者账户）

## 验证构建

构建完成后验证 EXE：

```bash
# 运行便携版
dist/Audio\ to\ Tab\ Converter-1.0.0-portable.exe

# 或运行安装程序
dist/Audio\ to\ Tab\ Converter\ Setup\ 1.0.0.exe
```

## 分发

EXE 文件可以直接分发：
- 📧 邮件发送
- ☁️ 云盘分享
- 🌐 网站下载
- 💾 光盘或 USB

---

**快速命令**
```bash
npm run react-build  # 构建 React
npm run build        # 构建 EXE
```
