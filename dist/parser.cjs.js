"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("emmet");const t={".avif":"avif",".bmp":"bmp",".gif":"gif",".ico":"x-icon",".jpeg":"jpeg",".jpg":"jpeg",".png":"png",".svg":"svg+xml",".tif":"tiff",".tiff":"tiff",".webp":"webp"},s=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];var r=!1;const a=e=>"[object Array]"===Object.prototype.toString.call(e);function c(t){if("string"==typeof t)try{return e.default(t,{options:{"output.indent":"","output.newline":""}})}catch(e){return t}t.tag||(t.tag="div");let r={},o="",n="";const l=-1!==s.indexOf(t.tag);function p(e){switch(e){case"panel":l||(o+=c({tag:"nav",...t[e]}));break;case"header":case"footer":l||(o+=c({tag:e,...t[e]}));break;case"_":case"content":l?(r.title=t[e],r.alt=t[e]):"string"!=typeof t[e]&&a(t[e])?t[e].forEach((e=>o+=c(e))):o+=c(t[e]);break;case"style":const{classes:s,styles:p}=i(t[e],"body"==t.tag);s.forEach((e=>n+=" "+e)),""!=p&&(r[e]=p);break;case"title":case"desc":"body"!=t.tag&&(r.title=t[e]),l&&(r.alt=t[e]);break;case"class":a(t[e])?t[e].forEach((e=>n+=e+" ")):n=t[e];break;case"#":case"comment":o+=`\x3c!-- ${t[e]} --\x3e`;break;case"stylesheet":case"preview":case"script":case"keywords":case"logo":case"lang":case"type":if("body"==t.tag)break;default:r[e]=t[e]}}a(t)?t.forEach((e=>p(e))):Object.keys(t).forEach((e=>p(e))),""!==n&&(r.class=n.trimStart().trimEnd());let g="";return Object.entries(r).forEach((([e,t])=>g+=`${e}="${t}"`)),`<${t.tag}${""===g?"":" "+g}${l?"/>":`>${o}</${t.tag}>`}`}function i(t,s){if("string"==typeof t)try{return{classes:[],styles:e.default(t,{type:"stylesheet",options:{"output.indent":"","output.newline":""}})}}catch(e){return{classes:[],styles:t}}let a=[],c="";return r?(s||(t.size||(t.size=1),t.type||(t.type="box")),Object.entries(t).forEach((([e,s])=>{switch(e){case"design":a.push(s);break;case"type":a.push(s+t.size);break;case"centerChild":case"size":break;case"border-radius":c+=`${e}:${"full"==s?"100vw":s};`;break;default:c+=`${e}:${s};`}}))):Object.entries(t).forEach((([e,t])=>c+=`${e}:${t};`)),{classes:a,styles:c}}function o(e){const s=e.title||"Document",r=e.type||"website",o=e.lang||"en";let n="";if(e.logo){const s=e.logo.match(/\.([a-zA-Z0-9_]+)/g),r=t[s[s.length-1].toLowerCase()]||!1;n=`<link rel="shortcut icon"href="${e.logo}"${r?`type="image/${r}"`:""}/>`,delete e.logo}let l="";e.preview&&(l=`<meta property="og:image"content="${e.preview}"/><meta name="twitter:card"content="summary_large_image"/>`,delete e.preview);let p="";e.keywords&&("string"==typeof e.keywords?p=e.keywords:e.keywords.forEach(((e,t)=>p+=(0==t?"":", ")+e)),p=`<meta name="keywords"content="${p}"/>`,delete e.keywords);let g="";e.desc&&(g=`<meta property="description"content="${e.desc}"/><meta property="og:description"content="${e.desc}"/>`,delete e.desc);let f="";if(e.stylesheet){let t="";("string"!=typeof e.stylesheet&&a(e.stylesheet)?e.stylesheet:[e.stylesheet]).forEach((e=>{if("string"==typeof e){if(!e)return;const s=e.match(/\.s?[ca]{1}ss/gi);if(!s)return void(t+=e);""!=s[s.length-1]&&e.endsWith(s[s.length-1])?f+=`<link rel="stylesheet"href="${e}">`:t+=e}else Object.entries(e).forEach((([e,s])=>t+=`${e}{${i(s).styles}}`))})),""!==t&&(f+=`<style>${t}</style>`),delete e.stylesheet}let y="";if(e.script){let t="";("object"!=typeof e.script?[e.script]:a(e.script)?e.script:Object.values(e.script)).forEach((e=>{if("function"==typeof e)t+=e.toString();else{if(!e)return;const s=e.match(/\.(([cm]?[tjlecs]+s[xm0-9]?)|((lit)?((iced)|(coffee)))|eg)/gi);if(!s)return void(t+=e);""!=s[s.length-1]&&e.endsWith(s[s.length-1])?y+=`<script language="javascript"type="text/javascript"src="${e}"><\/script>`:t+=e}})),""!==t&&(y+=`<script language="javascript"type="text/javascript">${t}<\/script>`),delete e.script}return`<!DOCTYPE html><html lang="${o}"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width,initial-scale=1.0"/><title>${s}</title>${n}${p}<meta property="og:title"content="${s}"/><meta property="og:type"content="${r}"/>${g}${l}${f}${y}</head>${c({tag:"body",...e})}</html>`}exports.default=o,exports.parse=o,exports.parseElement=c,exports.useDense=()=>r=!0;
//# sourceMappingURL=parser.cjs.js.map
