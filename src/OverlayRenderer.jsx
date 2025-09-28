import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { assetUrl } from "./relativePaths";

export default function OverlayRenderer({ markdown, data }) {
  if (!markdown) return null;

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img({ node, ...props }) {
            return (
              <img
                {...props}
                src={assetUrl(data.content, props.src)}
                style={{ maxWidth: "100%", borderRadius: 8, margin: "12px 0" }}
              />
            );
          },
          a({ node, ...props }) {
            const href = assetUrl(data.content, props.href);
            const external = /^https?:/.test(href);
            return (
              <a
                {...props}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "underline" }}
              />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
