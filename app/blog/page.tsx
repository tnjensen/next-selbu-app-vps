import type { Metadata } from "next";
import Image from "next/image";
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

export default async function Blog() {
  const data = (await getAllPosts()) as WpPost[]

  return (
    <div className='blog flex flex-col items-center py-2'>
      {data && data.map((item) => (
        <div className="card flex flex-col gap-4" key={item.id}>
          <h2 dangerouslySetInnerHTML={{ __html: item.title.rendered }} className="text-2xl text-center"></h2>
          {item._embedded?.["wp:featuredmedia"]?.[0] && <Image src={item._embedded['wp:featuredmedia'][0]?.source_url} alt={item._embedded['wp:featuredmedia'][0]?.alt_text ?? ""} width={400} height={250} className="" />}
          <span dangerouslySetInnerHTML={{ __html: item.content.rendered }} className="pb-4"></span>
        </div>
      ))}
    </div>
  )
}