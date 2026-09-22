const fs=require('fs');
const file='chuanwu-homepage/dailylife/index.html';
const groups=[
 ['geo-data','地理数据',[
 ['Continental Boundaries','全球大洲边界','ESRI Open Data · 数据检索入口','https://hub.arcgis.com/'],
 ['MERIT DEM','全球数字高程模型','90 m','https://global-hydrodynamics.github.io/MERIT_DEM/'],
 ['GHS-POP','全球人口','2000–2025 · 每 5 年 · 100 m','https://human-settlement.emergency.copernicus.eu/download.php?ds=pop'],
 ['GHS-BUILT-S','全球建成区表面','2000–2025 · 每 5 年 · 100 m','https://human-settlement.emergency.copernicus.eu/download.php?ds=bu'],
 ['Natural Earth','全球基础地理数据','底图 · 行政区划 · 河流湖泊','https://www.naturalearthdata.com/'],
 ['地理空间数据云','地理与遥感数据平台','DEM · 地形 · 遥感影像','https://www.gscloud.cn/']]],
 ['eco-data','生态数据',[
 ['World Database on Protected Areas (WDPA)','世界保护地数据库','全球保护地空间边界 · Protected Planet','https://www.protectedplanet.net/'],
 ['Drivers of Global Forest Loss (DGFL)','全球森林损失驱动因素 · Curtis 等','Curtis et al., 2018 · 论文及补充材料入口','https://doi.org/10.1126/science.aau3445'],
 ['Drivers of Forest Loss','全球森林损失驱动因素','2001–2025 · 1 km','https://zenodo.org/records/19485190'],
 ['Terrestrial Ecoregions and Biomes','陆地生态区与生物群系','Ecoregions 2017 · 矢量','https://ecoregions.appspot.com/'],
 ['Global Terrestrial Live Biomass','全球陆地活体生物量','JPL · 2000–2019 · 逐年 · 约 10 km','https://zenodo.org/records/4161694'],
 ['Chloris Above-ground Biomass and Carbon Stock','全球地上生物量与碳储量','2000–2025 · 30 m','https://www.chloris.earth/data-products','已申请，待审批'],
 ['GBIF','全球生物多样性','物种分布记录','https://www.gbif.org/'],
 ['WorldClim','全球气候数据','生态建模 · 气候栅格','https://www.worldclim.org/data/index.html']]],
 ['rs-data','遥感数据',[
 ['Global High-resolution Forest Disturbance (GHFD)','全球高分辨率森林扰动','Figshare · 数据集入口','https://doi.org/10.6084/m9.figshare.28465178'],
 ['Global Forest Change','全球森林变化','GFC v1.13 · 2000–2025 · 30 m','https://storage.googleapis.com/earthenginepartners-hansen/GFC-2025-v1.13/download.html'],
 ['GLC_FCS30D','全球土地覆盖动态','2000–2022 · 逐年 · 30 m','https://doi.org/10.5281/zenodo.8239305'],
 ['MCD12Q1','全球土地覆盖','2002–2024 · 逐年 · 500 m','https://www.earthdata.nasa.gov/data/catalog/lpcloud-mcd12q1-061'],
 ['Copernicus Data Space','哥白尼地球观测平台','Sentinel 卫星影像','https://dataspace.copernicus.eu/'],
 ['NASA Earthdata','NASA 地球科学数据平台','地球科学 · 遥感数据','https://www.earthdata.nasa.gov/']]]
];
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;');
const html='<div class="data-rows">\n'+groups.map(([id,title,rows])=>`<section class="data-section" aria-labelledby="${id}">\n<h3 id="${id}">${title}</h3>\n<ul class="dataset-list">\n${rows.map(([name,cn,meta,url,status])=>`<li class="dataset-row"><div class="dataset-name"><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name} <span aria-hidden="true">↗</span></a><span class="dataset-description">${cn}</span></div><div class="dataset-meta">${meta}${status?`<span class="access-status">${status}</span>`:''}</div></li>`).join('\n')}\n</ul>\n</section>`).join('\n')+'\n</div>';
let source=fs.readFileSync(file,'utf8');
source=source.replace(/<div class="data-(?:grid|rows)">[\s\S]*?<\/div>\s*<\/section>\s*<section class="research-tools"/,html+'\n</section>\n<section class="research-tools"');
fs.writeFileSync(file,source);
console.log('Data rows:',groups.reduce((n,g)=>n+g[2].length,0));
