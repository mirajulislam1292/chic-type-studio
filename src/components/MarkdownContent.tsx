import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  return text.split(/(!\[[^\]]*\]\(https?:\/\/[^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, index) => {
    const image = part.match(/^!\[([^\]]*)\]\((https?:\/\/[^)]+)\)$/);
    if (image) return <img key={index} src={image[2]} alt={image[1].trim()} loading="lazy" className="my-6 rounded-xl border border-zinc-800" />;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    return part;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-a:text-orange-400 prose-code:text-orange-300 prose-code:before:content-none prose-code:after:content-none">
      {blocks.map((block, index) => {
        if (block.startsWith("```")) return <pre key={index}><code>{block.replace(/^```[^\n]*\n?/, "").replace(/```$/, "")}</code></pre>;
        if (block.startsWith("### ")) return <h3 key={index}>{inline(block.slice(4))}</h3>;
        if (block.startsWith("## ")) return <h2 key={index}>{inline(block.slice(3))}</h2>;
        if (block.startsWith("# ")) return <h1 key={index}>{inline(block.slice(2))}</h1>;
        const lines = block.split("\n");
        if (lines.every((line) => line.startsWith("- "))) return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{inline(line.slice(2))}</li>)}</ul>;
        return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{inline(line)}{lineIndex < lines.length - 1 && <br />}</span>)}</p>;
      })}
    </div>
  );
}
