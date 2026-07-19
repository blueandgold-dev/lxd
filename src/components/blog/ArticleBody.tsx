import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import type { ArticleBlock } from "@/data/posts";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="article-prose">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={block.id} id={block.id}>
              {block.title}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "orderedList") {
          return (
            <ol key={index}>
              {block.items.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  {item.text ? <span>{item.text}</span> : null}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "quote") {
          return <blockquote key={index}>{block.text}</blockquote>;
        }

        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="article-table-wrapper">
              <table>
                <thead>
                  <tr>
                    {block.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("-")}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={block.src} className="article-image">
              <Image src={block.src} alt={block.alt} width={1200} height={720} />
              <figcaption>{block.caption}</figcaption>
            </figure>
          );
        }

        if (block.type === "download") {
          return (
            <aside key={block.href} className="article-download">
              <div>
                <p className="article-download__eyebrow">{block.fileType}</p>
                <h3>{block.title}</h3>
                <p>{block.description}</p>
              </div>
              <a href={block.href} download>
                <Download aria-hidden="true" />
                Download
              </a>
            </aside>
          );
        }

        if (block.type === "collapsible") {
          return (
            <details key={`${block.title}-${index}`} className="article-collapsible">
              <summary>
                <span>
                  <strong>{block.title}</strong>
                  <small>{block.summary}</small>
                </span>
              </summary>
              <pre>
                <code>{block.code}</code>
              </pre>
            </details>
          );
        }

        if (block.type === "externalLink") {
          return (
            <aside key={`${block.href}-${index}`} className="article-link-callout">
              <div>
                <p className="article-link-callout__eyebrow">Final Output</p>
                <h3>{block.title}</h3>
                <p>{block.description}</p>
              </div>
              <a href={block.href} target="_blank" rel="noreferrer">
                <ExternalLink aria-hidden="true" />
                {block.label}
              </a>
            </aside>
          );
        }

        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
