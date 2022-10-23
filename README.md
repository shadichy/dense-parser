# DENSE JSON-to-HTML PARSER

This nodejs library parses json objects to html directly, with emmet abbreviation built in, helps increasing coding speed, reduce time messing with html

## Installation

### NodeJS, Deno

Just simply install the library using `npm`, `yarn` or `pnpm`

```sh
npm install dense-parser
yarn add dense-parser
pnpm i dense-parser
```

then

```js
const dense_parser = require("dense-parser") // Of course, you can use methods directly for short
```

### Browser

Add this to your html source

```html
<script language="javascript" type="text/javascript" src="https://github.com/shadichy/dense-parser/raw/master/dist/parser.umd.js"></script>
```

or

```html
<script language="javascript" type="text/javascript" src="https://github.com/shadichy/dense-parser/raw/master/dist/parser.iife.js"></script>
```

## Usage

To parse an object that represents a document, just pass it to `dense-parser`'s `parse` function

```js
const htmlObject = {
    title: "This is title",
    logo: "/path/to/your/favicon.png",
    stylesheet: [
        "/path/to/style1.css", 
        "/path/to/style2.css" , 
        "/path/to/style3.css"
    ],
    script: [
        "/path/to/script1.js", 
        "/path/to/script2.js"
    ],
    _: {
        _: "This is a div inside body!"
    }
}

console.log(dense_parser.parse(htmlObject)) 
```

Output:

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width,initial-scale=1.0"/><title>This is title</title><link rel="shortcut icon"href="/path/to/your/favicon.png"type="image/png"/><meta property="og:title"content="This is title"/><meta property="og:type"content="website"/><link rel="stylesheet"href="/path/to/style1.css"><link rel="stylesheet"href="/path/to/style2.css"><link rel="stylesheet"href="/path/to/style3.css"><script language="javascript"type="text/javascript"src="/path/to/script1.js"></script><script language="javascript"type="text/javascript"src="/path/to/script2.js"></script></head><body><div>This is a div inside body!</div></body></html>
```

(_You'll need to "beautify" it, for sure :)_)

To parse an object that represents a single html element, pass it to `parseElement` function

```js
const elementObject = {
    tag: "span",
    id: "someRandomTag",
    class: ["dense"],
    style: {
        display: "block",
        "border-radius": "10px",
        width: "100%"
    },
    content: "div>p{This is the span content}",
    title: "get this when your hover"
}

console.log(dense_parser.parseElement(elementObject))
```

Output:

```html
'<span tag="span"id="someRandomTag"style="display:block;border-radius:10px;width:100%"title="get this when your hover"class="dense"><div><p>This is the span content</p></div></span>'
```

(_A html beautify library is recommended :)_)

### Syntax

#### Element snippets

| Property          | Type                  | Desciption
| ------------- | ------------- | ----------------------------------------------------------------- |
| `tag`             | String                | HTML tag
| `class`           | String, Array         | Element classes
| `style`           | String, Object        | Element CSS style
| `-`, `content`    | String, Array, Object | Element inner content, can be single element or array of children
| `#`               | String                | Comment

And all other HTML element attributes inherited

#### Document snippets

Inherited from Element syntax with some additions

| Property          | Type                  | Description
| ------------- | ------------- | ----------------------------------------------------------------- |
| `title`           | String                | Page title
| `desc`            | String                | Page desciption
| `logo`            | String                | URL to favicon path
| `preview`         | String                | URL to preview picture (for social network)
| `type`            | String                | Page type, can be `website` or `article`
| `lang`            | String                | Page language
| `keyword`         | String, Array         | Keywords for SEO
| `stylesheet`      | String, Array, Object | Define document stylesheet (Object) or link to external CSS paths
| `script`          | String, Array, Object | Create `<script>` tag that contains JavaScript code (String) or link to external JavaScript paths ()

### For Dense-eco users

Execute `useDense()` after import

```js
const { parse, parseElement, useDense } = require("dense-parser")

useDense()

... // Do whatever
```
