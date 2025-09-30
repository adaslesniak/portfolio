import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { assetUrl } from "./relativePaths";

// Helper: turn YT url into an embed url (supports youtu.be, /watch?v=, /shorts/, start time)
function embeddedYtLink(node) {
  if(!node || !Array.isArray(node.children) || node.children.length !== 3) {
    return null;
  }
  const betweenBrackets = node.children[1];
  if(!Array.isArray(betweenBrackets.children) || betweenBrackets.children.length !== 1) {
    return null;
  }
  const rawLink = String(betweenBrackets.children[0].value ?? "").trim();
  try {
    const u = new URL(/^https?:\/\/\S+$/.test(rawLink) ? rawLink : null);
    const host = u.hostname.replace(/^www\./, "");
    if (!["youtube.com", "m.youtube.com", "youtu.be"].includes(host)) return null;

    let id = null;
    if (host === "youtu.be") {
      id = u.pathname.slice(1);
    } else if (u.pathname === "/watch") {
      id = u.searchParams.get("v");
    } else if (u.pathname.startsWith("/shorts/")) {
      id = u.pathname.split("/")[2];
    } else if (u.pathname.startsWith("/embed/")) {
      id = u.pathname.split("/")[2];
    }
    if (!id) return null;

    const start = u.searchParams.get("t") || u.searchParams.get("start");
    const startSec = start
      ? /^\d+$/.test(start) ? start : parseInt(String(start).replace(/[^\d]/g, ""), 10)
      : null;

    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      ...(startSec ? { start: String(startSec) } : {})
    });

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  } catch {
    return null;
  }
}

function embeddedYtVideo(link) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%", // 16:9
        margin: "12px 0",
        borderRadius: 8,
        overflow: "hidden",
        background: "#000"
      }}
    >
      <iframe
        src={link}
        title="YouTube video"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

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
          p({node, children, ...props}) {
            // Only embed when label === raw URL (Markdown like: [https://...])
            const ytLink = embeddedYtLink(node);
            if(ytLink) {
              return embeddedYtVideo(ytLink);
            }
            return <p {...props}>{children}</p>;
          },
          a({ node, children, ...props }) {
            // Keep the original href separate from the asset-resolved one
            const rawHref = props.href;
            const href = assetUrl(data.content, rawHref);
            const external = /^https?:/i.test(href);  // Default: normal link
            return (
              <a
                {...props}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "underline" }}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
