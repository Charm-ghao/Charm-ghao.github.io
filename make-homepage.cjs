const fs = require('fs');
const path = require('path');
const src = path.resolve('homepage-backup/Charm-ghao.github.io-main');
const out = path.resolve('chuanwu-homepage');
fs.cpSync(src,out,{recursive:true});
const pages=[['','个人简介','PROFILE'],['publication','发表论文','PUBLICATIONS'],['network','课题组信息','ACADEMIC NETWORK'],['dailylife','科研日常','RESEARCH & LIFE']];
const emoji=/[\p{Extended_Pictographic}\p{Emoji_Modifier}\uFE0F\u200D]/gu;
function clean(s,prefix){
 return s.replace(/<!--[\s\S]*?-->/g,'').replace(/<a\b[^>]*class="headerlink"[^>]*><\/a>/g,'').replace(/<\/?font\b[^>]*>/g,'').replace(/\sstyle="[^"]*"/g,'').replace(emoji,'').replace(/<table>/g,'<div class="table-wrap"><table>').replace(/<\/table>/g,'</table></div>').replace(/href="https:\/\/charm-ghao.github.io\/"/g,`href="${prefix}index.html"`).replace(/(href|src)="\/(?!\/)([^"]*)"/g,`$1="${prefix}$2"`).replace(/(<a\b[^>]*>)\s*(<\/a>)/g,'$1查看原文 ↗$2');
}
const raw=fs.readFileSync(path.join(src,'index.html'),'utf8');
const socials=[...raw.matchAll(/<a class="e-social-link"[^>]*href="([^"]+)"[^>]*>[\s\S]*?<span>([^<]+)<\/span><\/a>/g)].filter(x=>!x[2].includes('China'));
for(const [slug,title,en] of pages){
 const prefix=slug?'../':'./';
 const original=fs.readFileSync(path.join(src,slug,'index.html'),'utf8');
 let content=clean(original.match(/<article>([\s\S]*?)<\/article>/)[1],prefix).replace(/^\s*<hr>/,'');
 if(!slug){
  content=content.replace('<div>','<div class="intro-grid">').replace('<div>','<div class="intro-copy">');
  // Attach layout classes only to the two original introduction columns.
  content=content.replace('<div>\n\n<p><strong> 联系方式','<div class="contact-card">\n\n<p><strong> 联系方式');
 }
 if(slug==='network') content=content.replace(/<h1\b/g,'<h2').replace(/<\/h1>/g,'</h2>');
 const nav=pages.map(([s,t])=>`<a href="${prefix}${s?s+'/':''}index.html" ${s===slug?'aria-current="page"':''}>${t}</a>`).join('\n');
 const hero=!slug?`<div class="eyebrow">REMOTE SENSING · GEOGRAPHIC INFORMATION SCIENCE</div><h1>赵传武 <span>Chuanwu Zhao</span></h1><p class="position">博士后研究人员 · 北京航空航天大学国际创新学院（杭州）</p><div class="topics"><span>遥感信息提取</span><span>植被异常检测</span><span>城市地表监测</span><span>资源环境评估</span></div>`:`<div class="eyebrow">${en}</div><h1>${title}</h1>`;
 const html=`<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | 赵传武 Chuanwu Zhao</title>
<meta name="description" content="赵传武的学术主页：遥感信息提取、植被异常检测、城市地表监测与资源环境评估。">
<link rel="icon" href="${prefix}img/favicon.png"><link rel="stylesheet" href="${prefix}style.css">
</head><body>
<a class="skip" href="#content">跳至正文</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="${prefix}index.html"><span class="monogram">CZ</span><span>Chuanwu Zhao<small>赵传武 · 学术主页</small></span></a><nav aria-label="主要导航">${nav}</nav></div></header>
<div class="layout"><aside class="profile"><img class="portrait" src="${prefix}img/B2.jpg" alt="赵传武的个人照片" width="857" height="1026"><div class="profile-body"><p class="profile-name">Chuanwu Zhao</p><p class="motto">The third time is the charm.</p><p class="place">中国 · 杭州</p><a class="email" href="mailto:chuanwu@buaa.edu.cn">chuanwu@buaa.edu.cn</a><div class="socials">${socials.map(x=>`<a href="${x[1]}" target="_blank" rel="noopener noreferrer">${x[2]==='GoogleScholar'?'Google Scholar':x[2]} <span aria-hidden="true">↗</span></a>`).join('\n')}</div></div></aside>
<main id="content" class="${slug||'home'}"><section class="page-heading">${hero}</section><article>
<!-- 编辑提示：以下正文可直接修改；保留 HTML 标签，在标签之间更新文字。 -->
${content}
</article></main></div>
<footer><span>© 2023–2026 Chuanwu Zhao</span><span>The third time is the charm.</span><a href="#content">返回顶部 ↑</a></footer>
</body></html>`;
 fs.writeFileSync(path.join(out,slug,'index.html'),html);
}
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('Created four pages: '+out);
