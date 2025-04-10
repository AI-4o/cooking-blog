"use client"

import Image from "next/image"
import { MDXRemote } from "next-mdx-remote"

const components = {
  h1: (props: any) => <h1 className="mt-8 mb-4 text-3xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="mt-6 mb-3 text-2xl font-bold" {...props} />,
  h3: (props: any) => <h3 className="mt-4 mb-2 text-xl font-bold" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />,
  ol: (props: any) => <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="my-4 border-l-4 border-primary/50 pl-4 italic text-muted-foreground" {...props} />
  ),
  img: (props: any) => (
    <div className="my-6">
      <Image
        src={props.src || "/placeholder.svg"}
        alt={props.alt || ""}
        width={800}
        height={500}
        className="rounded-lg"
      />
      {props.alt && <p className="mt-2 text-sm text-center text-muted-foreground">{props.alt}</p>}
    </div>
  ),
}

interface MDXContentProps {
  content: any
}

export function MDXContent({ content }: MDXContentProps) {
  // If content is null or undefined, show an error message
  if (!content) {
    return <div className="p-4 bg-red-100 text-red-800 rounded">MDX content is missing</div>;
  }
  
  return (
    <div className="mdx-content">
     <MDXRemote {...content} components={components} />
    </div>
  );
} 