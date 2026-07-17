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

- 上游 `README.md` → 本仓库 `data/README.md`：可以直接使用的产品
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

## 自动同步上游数据

仓库只保留一个名为“同步上游项目数据”的 GitHub Actions 工作流，负责让网站数据持续跟随原始仓库更新。

工作流每天执行一次，计划时间为 UTC 01:17，即北京时间约 09:17。GitHub Actions 在繁忙时可能延迟几分钟，也可以在 Actions 页面通过 `workflow_dispatch` 随时手动触发。

一次同步会依次完成：

1. 检出网站仓库的最新 `main` 分支。
2. 从原始仓库下载四个 Markdown 数据文件。
3. 检查下载结果是否为空，并确认文件中包含可识别的项目条目。
4. 比较上游数据和本站数据是否存在变化。
5. 如果没有变化，直接结束，不产生提交和部署。
6. 如果存在变化，安装依赖并运行 `npm run build` 验证网站。
7. 构建成功后，由 `github-actions[bot]` 将数据更新提交到 `main` 分支。
8. Vercel 检测到新提交后自动构建，并更新线上网站。

如果下载、数据检查或网站构建失败，工作流会停止，不会覆盖当前数据，也不会发布异常版本。

相关文件：

- `.github/workflows/sync-upstream.yml`：定时计划和 GitHub Actions 执行步骤
- `scripts/sync-upstream.sh`：上游文件下载与内容检查脚本

除了自动同步，也可以直接修改仓库内的数据文件并推送到 `main` 分支，Vercel 同样会自动重新构建和发布网站。

## 项目提交

如果希望将自己的作品收录到原始项目列表，请前往上游仓库查看投稿规范并提交 Pull Request：

**[前往原始仓库提交项目](https://github.com/1c7/chinese-independent-developer)**

## 说明

本项目是原始开源数据的独立网站展示版本。项目名称、介绍和链接由对应开发者或原始数据仓库贡献者提供，访问第三方网站时请自行判断其可用性与安全性。

## License

数据内容的授权与使用规则请以[原始数据仓库](https://github.com/1c7/chinese-independent-developer)的说明为准；本站新增的界面代码沿用本仓库所声明的授权方式。
