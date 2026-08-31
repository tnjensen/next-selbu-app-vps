import type { Metadata } from "next";
import Image from "next/image";
import parse, { Element, type HTMLReactParserOptions } from "html-react-parser";
import getAllPosts from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog posts"
}

type WpPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
};

const contentOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === "img") {
      const src = domNode.attribs.src;
      const alt = domNode.attribs.alt ?? "";
      const width = Number(domNode.attribs.width) || 800;
      const height = Number(domNode.attribs.height) || 600;
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="100vw"
          className="w-full h-auto"
        />
      );
    }
    return domNode;
  },
};

export default async function Blog() {
  const data = (await getAllPosts()) as WpPost[]

  return (
    <div className='blog flex flex-col items-center py-2'>
      {data && data.map((item) => (
        <div className="card flex flex-col gap-4" key={item.id}>
          <h2 dangerouslySetInnerHTML={{ __html: item.title.rendered }} className="text-2xl text-center"></h2>
          {item._embedded?.["wp:featuredmedia"]?.[0] && <Image src={item._embedded['wp:featuredmedia'][0]?.source_url} alt={item._embedded['wp:featuredmedia'][0]?.alt_text ?? ""} width={400} height={250} className="w-full h-auto" />}
          <span className="pb-4">{parse(item.content.rendered, contentOptions)}</span>
        </div>
      ))}
    </div>
  )
}