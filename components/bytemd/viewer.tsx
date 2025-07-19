"use client";

import * as React from "react";
import { Viewer } from "@bytemd/react";
import { sanitize } from "./config";
import { useTheme } from "next-themes";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import gfm from "@bytemd/plugin-gfm";
import highlightSSR from "@bytemd/plugin-highlight-ssr";
import { common } from "lowlight";
import gfm_zhHans from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import mermaidPlugin from "@bytemd/plugin-mermaid";
import asciidoc from "highlight.js/lib/languages/asciidoc";
import dart from "highlight.js/lib/languages/dart";
import nginx from "highlight.js/lib/languages/nginx";
import { headingPlugin, prettyLinkPlugin } from "./plugins";

interface BytemdViewerProps {
  body: string;
}

export const BytemdViewer = ({ body }: BytemdViewerProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const theme = resolvedTheme ?? "light";
  
  const plugins = React.useMemo(
    () => [
      mermaidPlugin({
        theme: theme === "dark" ? "dark" : "default",
      }),
      breaks(),
      frontmatter(),
      mediumZoom(),
      gfm({ locale: gfm_zhHans }),
      highlightSSR({
        languages: {
          ...common,
          dart,
          nginx,
          asciidoc,
        },
      }),
      prettyLinkPlugin(),
      headingPlugin(),
    ],
    [theme]
  );
  
  if (!mounted) return null;
  
  return (
    <div className="prose prose-headings:mt-8 dark:prose-invert">
      <Viewer value={body} plugins={plugins} sanitize={sanitize} />
    </div>
  );
};
