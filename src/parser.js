/*

    The MIT License (MIT)

    Copyright (c) 2022-2023 Shadichy and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import emmet from "emmet"

const mimeTypes = {
	".avif": "avif",
	".bmp": "bmp",
	".gif": "gif",
	".ico": "x-icon",
	".jpeg": "jpeg",
	".jpg": "jpeg",
	".png": "png",
	".svg": "svg+xml",
	".tif": "tiff",
	".tiff": "tiff",
	".webp": "webp",
}

const voidElements = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"menuitem",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
]

var isDense = false

const isArray = (o) => Object.prototype.toString.call(o) === "[object Array]",
	useDense = () => (isDense = true)

function parseElement(content, _tag = "div") {
	if (typeof content === "string")
		try {
			return emmet.default(content)
		} catch (e) {
			return content
		}
	let htmlAtt = {},
		child = "",
		classlist = ""

	const isVoid = voidElements.indexOf(_tag) !== -1

	function subparse(k) {
		switch (k) {
			case "tag":
				_tag = content[k]
				break
			case "panel":
				if (!isVoid) child += parseElement(content[k], "nav")
				break
			case "header":
			case "footer":
				if (!isVoid) child += parseElement(content[k], k)
				break
			case "_":
			case "content":
				if (!isVoid)
					typeof content[k] === "string" || !isArray(content[k])
						? (child += parseElement(content[k]))
						: content[k].forEach((o) => (child += parseElement(o)))
				else {
					htmlAtt["title"] = content[k]
					htmlAtt["alt"] = content[k]
				}
				break
			case "style":
				const { classes, styles } = parseCss(content[k], _tag == "body")
				classes.forEach((c) => (classlist += " " + c))
				if (styles != "") htmlAtt[k] = styles
				break
			case "title":
			case "desc":
				if (isVoid) {
					htmlAtt["title"] = content[k]
					htmlAtt["alt"] = content[k]
				}
				break
			case "class":
				isArray(content[k])
					? content[k].forEach((c) => (classlist += c + " "))
					: (classlist = content[k])
				break
			case "#":
			case "comment":
				child += `<!-- ${content[k]} -->`
			case "stylesheet":
			case "preview":
			case "script":
			case "keywords":
			case "logo":
			case "lang":
				break
			case "type":
				if (_tag == "body") break
			default:
				htmlAtt[k] = content[k]
				break
		}
	}

	isArray(content)
		? content.forEach((k) => subparse(k))
		: Object.keys(content).forEach((k) => subparse(k))

	if (classlist !== "") htmlAtt["class"] = classlist.trimStart().trimEnd()

	let htmlAttStr = ""
	Object.entries(htmlAtt).forEach(([k, v]) => (htmlAttStr += `${k}="${v}"`))

	return `<${_tag}${htmlAttStr === "" ? "" : " " + htmlAttStr}${
		isVoid ? "/>" : `>${child}</${_tag}>`
	}`
}

function parseCss(style, isBody) {
	if (typeof style === "string")
		try {
			return {
				classes: [],
				styles: emmet.default(style, { type: "stylesheet" }),
			}
		} catch (e) {
			return { classes: [], styles: style }
		}
	let classlist = [],
		css = ""

	if (isDense) {
		if (!isBody) {
			if (!style.size) style.size = 1
			if (!style.type) style.type = "box"
		}
		Object.entries(style).forEach(([k, v]) => {
			switch (k) {
				case "design":
					classlist.push(v)
					break
				case "type":
					classlist.push(v + style.size)
					break
				case "centerChild":
					break
				case "border-radius":
					css += `${k}:${v == "full" ? "100vw" : v};`
					break
				case "size":
					break
				default:
					css += `${k}:${v};`
					break
			}
		})
	} else Object.entries(style).forEach(([k, v]) => (css += `${k}:${v}`))

	return { classes: classlist, styles: css }
}

function parse(data) {
	const title = data.title || "Document",
		type = data.type || "website",
		lang = data.lang || "en"

	let logo = ""
	if (data.logo) {
		const x = data.logo.match(/\.([a-zA-Z0-9_]+)/g),
			xt = mimeTypes[x[x.length - 1].toLowerCase()] || false
		logo = `<link rel="shortcut icon"href="${data.logo}"${
			xt ? `type="image/${xt}"` : ""
		}/>`
		delete data.logo
	}

	let preview = ""
	if (data.preview) {
		preview = `<meta property="og:image"content="${data.preview}"/><meta name="twitter:card"content="summary_large_image"/>`
		delete data.preview
	}

	let keywords = ""
	if (data.keywords) {
		typeof data.keywords === "string"
			? (keywords = data.keywords)
			: data.keywords.forEach((k, i) => (keywords += (i == 0 ? "" : ", ") + k))
		keywords = `<meta name="keywords"content="${keywords}"/>`
		delete data.keywords
	}

	let desc = ""
	if (data.desc) {
		desc = `<meta property="description"content="${data.desc}"/><meta property="og:description"content="${data.desc}"/>`
		delete data.desc
	}

	let style = ""
	if (data.stylesheet) {
		let styleContent = ""
		const styleArray =
			typeof data.stylesheet === "string" || !isArray(data.stylesheet)
				? [data.stylesheet]
				: data.stylesheet
		styleArray.forEach((t) => {
			if (typeof t === "string") {
				if (!t) return
				const x = t.match(/\.s?[ca]{1}ss/gi)
				if (!x) {
					styleContent += t
					return
				}
				x[x.length - 1] != "" && t.endsWith(x[x.length - 1])
					? (style += `<link rel="stylesheet"href="${t}">`)
					: (styleContent += t)
			} else
				Object.entries(t).forEach(
					([k, v]) => (styleContent += `${k}{${parseCss(v).styles}}`)
				)
		})
		if (styleContent !== "") style += `<style>${styleContent}</style>`
		delete data.stylesheet
	}

	let script = ""
	if (data.script) {
		let scriptContent = ""
		const scriptArray =
			typeof data.script !== "object"
				? [data.script]
				: isArray(data.script)
				? data.script
				: Object.values(data.script)
		scriptArray.forEach((t) => {
			if (typeof t === "function") scriptContent += t.toString()
			else {
				if (!t) return
				const x = t.match(
					/\.(([cm]?[tjlecs]+s[xm0-9]?)|((lit)?((iced)|(coffee)))|eg)/gi
				)
				if (!x) {
					scriptContent += t
					return
				}
				x[x.length - 1] != "" && t.endsWith(x[x.length - 1])
					? (script += `<script language="javascript"type="text/javascript"src="${t}"></script>`)
					: (scriptContent += t)
			}
		})
		if (scriptContent !== "")
			script += `<script language="javascript"type="text/javascript">${scriptContent}</script>`
		delete data.script
	}

	return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width,initial-scale=1.0"/><title>${title}</title>${logo}${keywords}<meta property="og:title"content="${title}"/><meta property="og:type"content="${type}"/>${desc}${preview}${style}${script}</head>${parseElement(
		data,
		"body"
	)}</html>`
}

export default parse
export { parseElement as parseElement, parse as parse, useDense as useDense }
