# 赵传武的个人主页

这是可直接编辑、可直接部署到 GitHub Pages 的静态网站。无需安装 Hexo、Node.js 或数据库。HTML 文件就是完整源文件。

## 在本机预览

解压整个文件夹，双击最外层 index.html。保留目录结构；不要只复制一个 HTML 文件。三个主要页面均支持直接打开。

## 修改内容

用 VS Code 或其他文本编辑器打开文件。搜索要修改的原句，只修改标签之间的文字，保存后刷新浏览器。

| 内容 | 文件 |
| --- | --- |
| 个人介绍、最新动态、教育、荣誉、项目、联系方式 | index.html |
| 论文及专利 | publication/index.html |
| 科研日常和资源链接 | dailylife/index.html |
| 配色、字体、间距和手机布局 | style.css |
| 头像 | img/B2.jpg |

每个页面的页头和侧栏分别保存在该页面内。如果修改姓名、单位、侧栏邮箱或导航，请同步检查三个页面。

### 增加一篇论文

在 publication/index.html 中找到对应年份的 `<ol>`，复制一条完整的 `<li>…</li>`，更新作者、年份、题目、期刊和链接。新增年份可以复制一个 `<h4>年份</h4>` 和后面的 `<ol>…</ol>`。

### 增加一条动态

在 index.html 搜索“最新动态”，在现有动态之前添加：

```html
<p><strong>[2026-09] 动态标题</strong><br>填写真实的进展内容。</p>
<hr>
```

## 发布到原来的 GitHub Pages

1. 保留旧站 ZIP 备份。
2. 登录 GitHub，打开 Charm-ghao/Charm-ghao.github.io。
3. 上传本文件夹中的文件和目录到仓库根目录；不要上传 ZIP，也不要再套一层 chuanwu-homepage 文件夹。根目录必须直接看到 index.html。
4. 提交前检查差异。首次替换至少涉及 index.html、style.css、publication/index.html、dailylife/index.html。图片若没有变动，无需重复上传。
5. 检查 Settings → Pages 当前发布设置。如果使用分支发布，选择 main 和 / (root)。如果目前使用 GitHub Actions，则先检查原有工作流，不要直接假定配置相同。
6. 等待 Pages 部署完成，在原网址检查主页及三个栏目，再用手机检查一次。

仓库已保留原图、附件、旧文章和归档以兼容旧地址；旧文章仍使用原来的样式。新增 .nojekyll 用于直接发布静态文件。

## 迁移说明

内容来自用户提供的旧站备份，没有新增论文、奖项或未经确认的学术成果。论文列表已补充至 2026 年；新增六篇按用户提供信息及出版方记录整理。期刊影响因子、分区、成员状态及外部资源链接均为原站历史信息，未重新核验。

旧版动画挂件未加入三个新版页面；对应文件保留供旧页面使用。网站常规阅读和导航不依赖外部脚本或字体服务。

以后换电脑只需重新下载仓库，即可继续编辑。不要再用旧 Hexo 发布命令覆盖这些文件。

课题组页面已移除。发布到旧仓库时，还需删除仓库现有的 network/index.html；只上传新文件不会删除旧页面。

科研日常已精简为科研数据（地理、生态、遥感，每类两个官方入口）和三个常用工具。新增数据入口于 2026-09-22 依据官方页面说明整理，具体产品权限以各平台为准。


排版采用 Segoe UI 英文与系统中文字体（苹方、等线、微软雅黑等），正文为 15px、1.7 倍行高，栏目标题为 18px，主标题为 26px。紧凑排版规则位于 style.css 末尾，可统一调整，不依赖在线字体。


科研数据采用按行排列的分组列表，保留六个平台入口，新增用户提供的十个数据集。时间范围与分辨率按用户提供的选用范围显示，不代表各平台全部产品覆盖。Chloris 访问状态按用户说明标为已申请、待审批；未替用户申请或下载数据。


追加 GHFD、Curtis 等的 DGFL、WDPA 和 ESRI 大洲边界入口，共 20 行。GFC、GDFL、Ecoregions 与 Natural Earth 已存在，未重复添加；DGFL 与 WRI/Google DeepMind 的 GDFL 是不同条目。ESRI 链接是检索门户；DGFL 链接指向 Curtis et al. (2018), DOI: 10.1126/science.aau3445 的论文入口。未提供地址的 Figs. 1–4 源数据未加入。


文献统一为：作者. 题目. 斜体期刊名. 年份, 卷(期), 页码或文章号. 保留赵传武中英文姓名加粗及原文链接，删除作者星号与 SCI/EI/核心/分区/影响因子标注。专利保持类型与专利号，年份同样移至标题之后。此次是格式统一，未重新核对全部旧文献元数据。

NEWS 论文缩略图：Zhao et al. (2026), Remote Sensing, 18(14), 2333，图2顶部两行。论文：https://doi.org/10.3390/rs18142333 。图片来源：https://pub.mdpi-res.com/remotesensing/remotesensing-18-02333/article_deploy/html/images/remotesensing-18-02333-g002.png 。版权归作者所有，采用 CC BY 4.0（https://creativecommons.org/licenses/by/4.0/）；裁剪保留原图顶部 Before 和 After 两行，按比例缩小显示，未修改影像内容。


2025-03 NEWS 图1：Zhao et al. (2025), DOI: 10.1016/j.jag.2025.104510，CC BY。图片来源：https://ars.els-cdn.com/content/image/1-s2.0-S1569843225001578-gr1.jpg ，按比例缩小，未裁剪或改绘。

2025-08 NEWS 图2：Ma et al. (2025), DOI: 10.1080/17538947.2025.2540078，CC BY 4.0。图片由用户提供，按比例缩小显示，未裁剪或改绘。

2025-02 NEWS 图2：Zhao et al. (2025), IEEE Transactions on Geoscience and Remote Sensing，https://ieeexplore.ieee.org/document/10900554 。图片由用户提供，按比例缩小显示，未裁剪或改绘。
