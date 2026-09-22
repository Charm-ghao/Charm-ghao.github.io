const fs=require('fs');
const papers=[
 {authors:['Chuanwu Zhao*','Huijie Zhao','Yaozhong Pan','Guifei Jing'],title:'Optimizing Spectral Inputs for Deep Learning-Based Vegetation Destruction Detection Using Sentinel-2 Imagery',journal:'Remote Sensing',volume:'18(14)',article:'2333',doi:'10.3390/rs18142333'},
 {authors:['Ying Cui','Guobin Shi','Chuanwu Zhao','Qingqing Li','Hansi Yao','Wei Guo'],title:'A global continuous 500 m nighttime light dataset (1992–2024) via NDVI-guided DMSP-OLS correction and U-TransNet cross-sensor harmonization',journal:'International Journal of Applied Earth Observation and Geoinformation',volume:'148',article:'105230',doi:'10.1016/j.jag.2026.105230'},
 {authors:['Lingang Wang','Yuan Gao','Yaozhong Pan','Wenjie Feng','Xingsheng Xia','Chuanwu Zhao','Xuechang Zheng','Hongyan Che','Yongsheng Huang','Xuehui Hou'],title:'A novel spectral and phenological composite index for the early automatic mapping of potatoes from Sentinel-2 multi-temporal images',journal:'Computers and Electronics in Agriculture',volume:'244',article:'111459',doi:'10.1016/j.compag.2026.111459'},
 {authors:['Shoujia Ren','Yaozhong Pan','Chuanwu Zhao','Yuan Gao','Gelilan Ma'],title:'ASAI: A general and training-free artificial surfaces anomaly index using post-disaster single-temporal and high-resolution imagery',journal:'International Journal of Applied Earth Observation and Geoinformation',volume:'146',article:'105050',doi:'10.1016/j.jag.2025.105050'},
 {authors:['Mingxiu Tang','Xiufang Zhu','Chuanwu Zhao','Junying Song','Chang Xiao','Rui Guo'],title:'REBAI: Development and validation of a novel indicator for burned area detection using Sentinel-2 images',journal:'Ecological Indicators',volume:'182',article:'114501',doi:'10.1016/j.ecolind.2025.114501'},
 {authors:['Yuan Gao','Yaozhong Pan','Xiufang Zhu','Hanyi Wu','Shoujia Ren','Chuanwu Zhao'],title:'NDCI-mGMM: a novel and automated model for dynamic maize mapping during the growing season',journal:'GIScience & Remote Sensing',volume:'63(1)',article:'2606468',doi:'10.1080/15481603.2025.2606468'}
];
const file='chuanwu-homepage/publication/index.html';
let html=fs.readFileSync(file,'utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const additions=papers.filter(p=>!html.includes('https://doi.org/'+p.doi));
const entries=additions.map(p=>`<li data-doi="${p.doi}">${p.authors.map(a=>a.startsWith('Chuanwu Zhao')?`<strong>${escape(a)}</strong>`:escape(a)).join(', ')}. (2026). ${escape(p.title)}. <b>${escape(p.journal)}</b>, ${p.volume}, ${p.article}. <a target="_blank" rel="noopener noreferrer" href="https://doi.org/${p.doi}">查看原文 ↗</a></li>`).join('\n');
if(additions.length) html=html.replace('<article>',`<article>\n<h4 id="publications-2026">2026</h4>\n<ol>\n${entries}\n</ol>\n`);
fs.writeFileSync(file,html);
console.log('Added '+additions.length+' unique publications.');
