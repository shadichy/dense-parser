import e from"emmet";const t={".avif":"avif",".bmp":"bmp",".gif":"gif",".ico":"x-icon",".jpeg":"jpeg",".jpg":"jpeg",".png":"png",".svg":"svg+xml",".tif":"tiff",".tiff":"tiff",".webp":"webp"},s=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];var r=!1;const a=e=>"[object Array]"===Object.prototype.toString.call(e),c=()=>r=!0;function i(t,r="div"){if("string"==typeof t)try{return e.default(t)}catch(e){return t}let c={},n="",l="";const p=-1!==s.indexOf(r);function f(e){switch(e){case"tag":r=t[e];break;case"panel":p||(n+=i(t[e],"nav"));break;case"header":case"footer":p||(n+=i(t[e],e));break;case"_":case"content":p?(c.title=t[e],c.alt=t[e]):"string"!=typeof t[e]&&a(t[e])?t[e].forEach((e=>n+=i(e))):n+=i(t[e]);break;case"style":const{classes:s,styles:f}=o(t[e],"body"==r);s.forEach((e=>l+=" "+e)),""!=f&&(c[e]=f);break;case"title":case"desc":p&&(c.title=t[e],c.alt=t[e]);break;case"class":a(t[e])?t[e].forEach((e=>l+=e+" ")):l=t[e];break;case"#":case"comment":n+=`\x3c!-- ${t[e]} --\x3e`;case"stylesheet":case"preview":case"script":case"keywords":case"logo":case"lang":break;case"type":if("body"==r)break;default:c[e]=t[e]}}a(t)?t.forEach((e=>f(e))):Object.keys(t).forEach((e=>f(e))),""!==l&&(c.class=l.trimStart().trimEnd());let y="";return Object.entries(c).forEach((([e,t])=>y+=`${e}="${t}"`)),`<${r}${""===y?"":" "+y}${p?"/>":`>${n}</${r}>`}`}function o(t,s){if("string"==typeof t)try{return{classes:[],styles:e.default(t,{type:"stylesheet"})}}catch(e){return{classes:[],styles:t}}let a=[],c="";return r?(s||(t.size||(t.size=1),t.type||(t.type="box")),Object.entries(t).forEach((([e,s])=>{switch(e){case"design":a.push(s);break;case"type":a.push(s+t.size);break;case"centerChild":case"size":break;case"border-radius":c+=`${e}:${"full"==s?"100vw":s};`;break;default:c+=`${e}:${s};`}}))):Object.entries(t).forEach((([e,t])=>c+=`${e}:${t}`)),{classes:a,styles:c}}function n(e){const s=e.title||"Document",r=e.type||"website",c=e.lang||"en";let n="";if(e.logo){const s=e.logo.match(/\.([a-zA-Z0-9_]+)/g),r=t[s[s.length-1].toLowerCase()]||!1;n=`<link rel="shortcut icon"href="${e.logo}"${r?`type="image/${r}"`:""}/>`,delete e.logo}let l="";e.preview&&(l=`<meta property="og:image"content="${e.preview}"/><meta name="twitter:card"content="summary_large_image"/>`,delete e.preview);let p="";e.keywords&&("string"==typeof e.keywords?p=e.keywords:e.keywords.forEach(((e,t)=>p+=(0==t?"":", ")+e)),p=`<meta name="keywords"content="${p}"/>`,delete e.keywords);let f="";e.desc&&(f=`<meta property="description"content="${e.desc}"/><meta property="og:description"content="${e.desc}"/>`,delete e.desc);let y="";if(e.stylesheet){let t="";("string"!=typeof e.stylesheet&&a(e.stylesheet)?e.stylesheet:[e.stylesheet]).forEach((e=>{if("string"==typeof e){if(!e)return;const s=e.match(/\.s?[ca]{1}ss/gi);if(!s)return void(t+=e);""!=s[s.length-1]&&e.endsWith(s[s.length-1])?y+=`<link rel="stylesheet"href="${e}">`:t+=e}else Object.entries(e).forEach((([e,s])=>t+=`${e}{${o(s).styles}}`))})),""!==t&&(y+=`<style>${t}</style>`),delete e.stylesheet}let g="";if(e.script){let t="";("object"!=typeof e.script?[e.script]:a(e.script)?e.script:Object.values(e.script)).forEach((e=>{if("function"==typeof e)t+=e.toString();else{if(!e)return;const s=e.match(/\.(([cm]?[tjlecs]+s[xm0-9]?)|((lit)?((iced)|(coffee)))|eg)/gi);if(!s)return void(t+=e);""!=s[s.length-1]&&e.endsWith(s[s.length-1])?g+=`<script language="javascript"type="text/javascript"src="${e}"><\/script>`:t+=e}})),""!==t&&(g+=`<script language="javascript"type="text/javascript">${t}<\/script>`),delete e.script}return`<!DOCTYPE html><html lang="${c}"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width,initial-scale=1.0"/><title>${s}</title>${n}${p}<meta property="og:title"content="${s}"/><meta property="og:type"content="${r}"/>${f}${l}${y}${g}</head>${i(e,"body")}</html>`}export{n as default,n as parse,i as parseElement,c as useDense};
//# sourceMappingURL=parser.es.js.map
