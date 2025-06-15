import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gfm from "@bytemd/plugin-gfm";
import gfm_zhHans from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import highlightSSR from "@bytemd/plugin-highlight-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import { type EditorProps } from "@bytemd/react";
import { merge } from "lodash-es";
import { common } from "lowlight";

// highlight需要额外扩充的高亮语言
import asciidoc from "highlight.js/lib/languages/asciidoc";
import dart from "highlight.js/lib/languages/dart";
import nginx from "highlight.js/lib/languages/nginx";
import mermaid from '@bytemd/plugin-mermaid'

import { headingPlugin, prettyLinkPlugin } from "./plugins";

export const plugins = [
  breaks(),
  frontmatter(),
  mediumZoom(),
  gfm({ locale: gfm_zhHans }),
  highlightSSR({
    languages: {
      // @bytemd/plugin-highlight-ssr 是基于 rehype-highlight 的封装
      // 而 rehype-highlight 是基于 lowlight 的封装
      // 使用 lowlight 中一个叫 common 的配置对象，这个对象包含了常用的预定义的语言高亮配置，如 js,ts,go,css等等
      // 为什么不导入全量的高亮语言配置是因为全量的配置太大了，只导入常用的语言高亮配置就够了，这样可以减少打包出来的体积
      ...common,

      // 默认common配置中没有以下几个语言高亮配置，这里我们自己加上
      dart: dart, // flutter代码会用到dart
      nginx: nginx, // nginx配置文件高亮
      asciidoc: asciidoc, // asciidoc高亮, 控制台输出信息高亮
    },
  }),
  prettyLinkPlugin(),
  headingPlugin(),
  mermaid( {
    theme: "dark"
  }), 
];

export const sanitize: EditorProps["sanitize"] = (schema) => {
  const customerSchema = merge({}, schema, {
    tagNames: [
      ...schema.tagNames, // 保留原始的 Markdown 标签
      "iframe",
      "div",
      "span",
      "svg",
      "path",
      "g",
      "line",
      "rect",
      "circle",
      "text",
      "marker",
    ],
    attributes: {
      ...schema.attributes,
      iframe: [
        "src",
        "style",
        "title",
        "all",
        "sandbox",
        "scrolling",
        "border",
        "frameborder",
        "framespacing",
        "allowfullscreen",
      ],
      div: ["class", "style"],
      span: ["class", "style"],
      svg: ["width", "height", "viewBox", "xmlns", "fill", "stroke", "style", "class"],
      path: ["d", "fill", "stroke"],
      g: ["transform", "fill"],
      line: ["x1", "y1", "x2", "y2", "stroke"],
      rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke"],
      circle: ["cx", "cy", "r", "fill", "stroke"],
      text: ["x", "y", "fill", "font-size", "text-anchor", "dominant-baseline"],
      marker: ["id", "refX", "refY", "markerWidth", "markerHeight", "orient"],
    },
  });
  
  return customerSchema;
};



