const fs=require('fs');
const file='chuanwu-homepage/publication/index.html';
let html=fs.readFileSync(file,'utf8');
const originalLinks=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
let papers=0,patents=0;
html=html.replace(/(<li\b[^>]*>)([\s\S]*?)(<\/li>)/g,(_,open,body,close)=>{
 const year=body.match(/\((19\d{2}|20\d{2})\)\./);
 if(!year)return open+body+close;
 const patent=body.includes('<b>中国专利</b>');
 body=body.replace(/\s*[（(]<b>(?:SCI|EI|北大核心|CSCD)[\s\S]*?<\/b>[)）]/g,'');
 body=body.replace(/<\/?em>/g,'');
 body=body.replace(/\*/g,'');
 body=body.replace(/\s*\((?:19\d{2}|20\d{2})\)\./,'');
 body=body.replace(/<b>([\s\S]*?)<\/b>[,.]?\s*/,(_,journal)=>patent?`中国专利. ${year[1]}, `:`<em class="citation-journal">${journal}</em>. ${year[1]}, `);
 body=body.replace(/(\d+\(\d+\))\.\s*(\d)/g,'$1, $2');
 // Conference records without volume/pages retain their known year only.
 body=body.replace(/(\b(?:19|20)\d{2}),\s*(<a\b)/,'$1. $2');
 body=body.replace(/(CN[\d.]+)\s+(<a\b)/,'$1. $2');
 if(patent)patents++;else papers++;
 return open+body+close;
});
html=html.replace(/<p><b><br>\*\s*Corresponding author<\/b><\/p>\s*/,'');
const updatedLinks=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
if(JSON.stringify(originalLinks)!==JSON.stringify(updatedLinks))throw Error('Links changed unexpectedly');
if(papers!==38||patents!==4)throw Error(`Unexpected counts: ${papers}, ${patents}`);
if(/SCI-Q|TOP,|IF (?:=|&#x3D;)|北大核心|CSCD/.test(html))throw Error('Ranking labels remain');
fs.writeFileSync(file,html);
console.log(JSON.stringify({papers,patents,linksPreserved:updatedLinks.length}));
