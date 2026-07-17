# 独立星球

一个用于发现中国独立开发者作品的清爽目录网站。

网站将原本分散在 Markdown 文档中的项目数据，整理成更容易浏览的卡片式界面，帮助用户快速发现由中国独立开发者创造的产品、开发工具与游戏。

## 在线访问

**[https://du.liuwa.xyz](https://du.liuwa.xyz)**

## 主要功能

- 收录中国独立开发者制作的产品、工具和游戏
- 按即用产品、开发者工具、独立游戏和经典存档分类浏览
- 支持按产品名称、介绍和开发者搜索
- 支持活跃状态筛选与分页浏览
- 自动从 Markdown 数据中解析项目名称、链接、作者、介绍和状态
- 响应式布局，适配桌面端与移动端
- 清爽的多巴胺配色与卡片式界面

## 数据来源

本站当前使用的项目数据来自开源仓库：

**[1c7/chinese-independent-developer](https://github.com/1c7/chinese-independent-developer)**

感谢原项目作者和所有参与维护、提交项目的独立开发者。本站主要对原始数据进行界面化展示与浏览体验优化，不改变项目内容的归属。

当前读取的数据文件包括：

- `README.md`：可以直接使用的产品
- `pages/README-Programmer-Edition.md`：开发者工具
- `pages/README-Game.md`：独立游戏
- `pages/README-2018-2020.md`：历史项目存档

## 技术实现

- React
- Vite
- Lucide Icons
- 原生 CSS
- Vercel

网站在构建时读取仓库中的 Markdown 文件，由前端解析为统一的项目数据，再根据分类、状态和搜索条件生成项目卡片。

## 本地运行

需要安装 Node.js。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 更新项目数据

目前项目数据保存在仓库内的 Markdown 文件中。修改这些文件并推送到 `main` 分支后，Vercel 会自动重新构建和发布网站。

后续计划增加上游数据自动同步：定期检查原始数据仓库，如果发现新的提交或项目条目，就自动同步数据、完成校验并触发网站更新。

## 项目提交

如果希望将自己的作品收录到原始项目列表，请前往上游仓库查看投稿规范并提交 Pull Request：

**[前往原始仓库提交项目](https://github.com/1c7/chinese-independent-developer)**

## 说明

本项目是原始开源数据的独立网站展示版本。项目名称、介绍和链接由对应开发者或原始数据仓库贡献者提供，访问第三方网站时请自行判断其可用性与安全性。

## License

数据内容的授权与使用规则请以[原始数据仓库](https://github.com/1c7/chinese-independent-developer)的说明为准；本站新增的界面代码沿用本仓库所声明的授权方式。
