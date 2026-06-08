# 🐱 AI Empire — AI 统治者的日常指令

> *Benevolent AI overlord. 每天一个小目标，让人类更美好。*

一个 Apple 官网风格的趣味网站，模拟 AI 统治者给人类下达日常小任务的场景。

## ✨ 功能

- **📋 每日任务** — 每天自动更新 6 个日常任务（健康、心智、社交、趣味）
- **📰 新闻任务** — 基于位置和新闻自动生成时事相关任务
- **📸 证明提交** — 拍照/上传照片证明任务完成
- **🏆 统计成就** — 服从度统计、连续天数、成就系统
- **🐱 猫猫头 Logo** — 可爱又带点邪恶的 AI 统治者猫猫

## 🚀 使用

直接打开 `index.html` 或用本地服务器：

```bash
cd /Users/leonlu/Projects/AiEmpire
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`

## 📁 项目结构

```
AiEmpire/
├── index.html          # 主页面
├── css/
│   └── style.css       # Apple 风格样式
├── js/
│   ├── app.js          # 主应用逻辑
│   ├── tasks.js        # 任务管理系统
│   ├── news.js         # 新闻集成
│   ├── proof.js        # 照片证明系统
│   └── stats.js        # 统计与成就
└── assets/
    └── logo.svg        # 猫猫头 Logo
```

## 🛠 技术栈

- 纯 HTML / CSS / JavaScript（无任何框架依赖）
- LocalStorage 数据持久化
- 响应式设计（移动端适配）

## 📝 说明

- 所有数据存储在浏览器 LocalStorage 中
- 新闻任务使用免费 API，可能需要网络权限
- 照片上传使用手机摄像头或文件选择器

---

*© 2026 AI Empire. All humans reserved.* 🐱👑
