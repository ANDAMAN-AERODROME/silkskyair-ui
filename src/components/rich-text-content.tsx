"use client";

import React from "react";

/* ─────────────────────────── Types ─────────────────────────── */

interface Mark {
  type: string;
  attrs?: Record<string, unknown>;
}

interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: Mark[];
  attrs?: Record<string, unknown>;
}

export interface RichTextContentProps {
  /** TipTap/Novel JSON — accepts a JSON string or a pre-parsed object */
  content: string | TipTapNode | null | undefined;
  /** Additional CSS class names for the wrapper */
  className?: string;
  /** Fallback text when content is empty / null */
  fallback?: string;
}

/* ─────────────────────────── Marks ─────────────────────────── */

function wrapMarks(text: string, marks?: Mark[], nodeKey?: string): React.ReactNode {
  if (!marks || marks.length === 0) return text;

  let node: React.ReactNode = text;

  for (let i = 0; i < marks.length; i++) {
    const mark = marks[i];
    const key = `${nodeKey ?? "m"}-${mark.type}-${i}`;
    switch (mark.type) {
      case "bold":
        node = <strong key={key}>{node}</strong>;
        break;
      case "italic":
        node = <em key={key}>{node}</em>;
        break;
      case "underline":
        node = <u key={key}>{node}</u>;
        break;
      case "strike":
        node = <s key={key}>{node}</s>;
        break;
      case "code":
        node = (
          <code key={key} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800">
            {node}
          </code>
        );
        break;
      case "link": {
        const href = (mark.attrs?.href as string) ?? "#";
        node = (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/30 transition hover:decoration-primary"
          >
            {node}
          </a>
        );
        break;
      }
      default:
        break;
    }
  }

  return node;
}

/* ────────────────────────── Node Renderer ────────────────────────── */

function renderNode(node: TipTapNode, index: number): React.ReactNode {
  const key = `${node.type}-${index}`;
  const children = node.content?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "paragraph":
      return (
        <p key={key} className="mb-3 last:mb-0">
          {children ?? <br />}
        </p>
      );

    case "heading": {
      const level = (node.attrs?.level as number) ?? 2;
      const sizes: Record<number, string> = {
        1: "text-xl font-bold mb-3",
        2: "text-lg font-semibold mb-2",
        3: "text-base font-semibold mb-2",
      };
      const cls = sizes[level] ?? sizes[3];
      if (level === 1) return <h1 key={key} className={cls}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={cls}>{children}</h2>;
      return <h3 key={key} className={cls}>{children}</h3>;
    }

    case "text":
      return <span key={key}>{wrapMarks(node.text ?? "", node.marks, key)}</span>;

    case "hardBreak":
      return <br key={key} />;

    case "horizontalRule":
      return <hr key={key} className="my-4 border-slate-200" />;

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="mb-3 border-l-4 border-slate-300 pl-4 italic text-slate-600"
        >
          {children}
        </blockquote>
      );

    case "codeBlock":
      return (
        <pre
          key={key}
          className="mb-3 overflow-x-auto rounded-lg bg-slate-100 p-4 font-mono text-sm text-slate-800"
        >
          <code>{children}</code>
        </pre>
      );

    case "bulletList":
      return (
        <ul key={key} className="mb-3 list-disc space-y-1 pl-5">
          {children}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key} className="mb-3 list-decimal space-y-1 pl-5">
          {children}
        </ol>
      );

    case "listItem":
      return <li key={key}>{children}</li>;

    case "taskList":
      return (
        <ul key={key} className="mb-3 space-y-1">
          {children}
        </ul>
      );

    case "taskItem": {
      const checked = node.attrs?.checked === true;
      return (
        <li key={key} className="flex items-start gap-2">
          <span className={`mt-0.5 ${checked ? "text-emerald-500" : "text-slate-400"}`}>
            {checked ? "☑" : "☐"}
          </span>
          <span className={checked ? "line-through text-slate-400" : ""}>{children}</span>
        </li>
      );
    }

    case "image": {
      const src = (node.attrs?.src as string) ?? "";
      const alt = (node.attrs?.alt as string) ?? "";
      return (
        <img
          key={key}
          src={src}
          alt={alt}
          className="mb-3 max-w-full rounded-lg"
          loading="lazy"
        />
      );
    }

    case "table":
      return (
        <div key={key} className="mb-3 overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200 text-sm">
            <tbody>{children}</tbody>
          </table>
        </div>
      );

    case "tableRow":
      return <tr key={key}>{children}</tr>;

    case "tableHeader":
      return (
        <th
          key={key}
          className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold"
        >
          {children}
        </th>
      );

    case "tableCell":
      return (
        <td key={key} className="border border-slate-200 px-3 py-2">
          {children}
        </td>
      );

    default:
      // Unknown node types — render children if available, or skip
      return children ? <span key={key}>{children}</span> : null;
  }
}

/* ────────────────────────── Component ────────────────────────── */

/**
 * Renders TipTap/Novel rich-text JSON as styled React elements.
 *
 * Zero external dependencies — pure React + Tailwind.
 *
 * @example
 * ```tsx
 * <RichTextContent content={tour.description_long} className="text-sm text-slate-600" />
 * ```
 */
export function RichTextContent({ content, className, fallback }: RichTextContentProps) {
  if (!content) {
    return fallback ? <p className={className}>{fallback}</p> : null;
  }

  let parsed: TipTapNode;

  if (typeof content === "string") {
    try {
      const json = JSON.parse(content);
      if (!json || typeof json !== "object" || json.type !== "doc") {
        // Not TipTap JSON — render as plain text
        return <p className={className}>{content}</p>;
      }
      parsed = json as TipTapNode;
    } catch {
      // Not JSON — render as plain text
      return <p className={className}>{content}</p>;
    }
  } else {
    parsed = content;
  }

  return (
    <div className={className}>
      {renderNode(parsed, 0)}
    </div>
  );
}
