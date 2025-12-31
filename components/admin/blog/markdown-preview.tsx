"use client"

import { useMemo } from "react"

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const html = useMemo(() => renderMarkdown(content), [content])

  if (!content.trim()) {
    return (
      <div className="text-slate-400 text-sm italic">
        La vista previa aparecerá aquí...
      </div>
    )
  }

  return (
    <div 
      className="article-content prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^#### (.*$)/gim, '<h4 class="article-h4">$1</h4>')
    .replace(/^### (.*$)/gim, '<h3 class="article-h3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="article-h2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="article-h1">$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-semibold italic">$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="article-li">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="article-li-num">$1</li>')
    // Blockquote
    .replace(/^> (.*$)/gim, '<blockquote class="article-quote">$1</blockquote>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="article-link" target="_blank" rel="noopener">$1</a>')
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="article-hr" />')
    // Code
    .replace(/`([^`]+)`/g, '<code class="article-code">$1</code>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full" />')
    // Paragraphs
    .replace(/^(?!<[hlubc]|<bl|<li|<hr|<img)(.*$)/gim, (match) => {
      if (match.trim() === '' || match.startsWith('<')) return match
      return `<p class="article-p">${match}</p>`
    })
    // Remove empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, '')
}

