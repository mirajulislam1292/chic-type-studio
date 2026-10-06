import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getBySlug, listRecords } from "@/lib/contentRepository";
import { blogSummary, readingTime, useSeo } from "@/lib/seo";
import type { BlogPost } from "@/lib/types";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getBySlug<BlogPost>("blog_posts", slug), listRecords<BlogPost>("blog_posts", { publishedOnly: true, pageSize: 4 })]).then(([current, all]) => {
      setPost(current);
      setRelated(all.data.filter((item) => item.slug !== slug && (!current || item.category === current.category)).slice(0, 3));
    }).finally(() => setLoading(false));
  }, [slug]);
  const description = post?.seo_description || (post ? blogSummary(post.content) : "Technical writing by M. Mahimmiraj.");
  useSeo({ title: post?.seo_title || (post ? `${post.title} — M. Mahimmiraj` : "Writing — M. Mahimmiraj"), description, path: `/blog/${slug}`, type: "article", image: post?.social_image_url || post?.cover_image_url, jsonLd: post ? { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description, datePublished: post.published_at, dateModified: post.updated_at, author: { "@type": "Person", name: post.author } } : undefined });
  return <div className="min-h-screen bg-[#050507] text-white"><Navbar /><main className="mx-auto max-w-4xl px-6 pb-24 pt-32"><Link to="/blog" className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><ArrowLeft className="h-4 w-4" />All writing</Link>
    {loading && <p className="text-zinc-500">Loading post…</p>}{!loading && !post && <div className="rounded-xl border border-zinc-800 p-10"><h1 className="text-3xl font-semibold">Post not found</h1><p className="mt-3 text-zinc-400">This post is unavailable or has not been published.</p></div>}
    {post && <article><header className="mb-10"><div className="mb-4 flex flex-wrap gap-3 text-xs font-mono text-zinc-500"><span>{post.category}</span><span>{readingTime(post.content)} min read</span>{post.published_at && <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString(undefined, { dateStyle: "long" })}</time>}</div><h1 className="text-4xl font-bold leading-tight sm:text-6xl">{post.title}</h1><p className="mt-5 text-sm text-zinc-500">By {post.author}</p></header>{post.cover_image_url && <img src={post.cover_image_url} alt="" className="mb-12 aspect-[16/9] w-full rounded-2xl border border-zinc-800 object-cover" />}<MarkdownContent content={post.content} />{post.tags.length > 0 && <div className="mt-12 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">#{tag}</span>)}</div>}</article>}
    {related.length > 0 && <aside className="mt-20 border-t border-zinc-800 pt-10"><h2 className="mb-6 text-xl font-semibold">Related writing</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((item) => <Link key={item.id} to={`/blog/${item.slug}`} className="rounded-lg border border-zinc-800 p-4 text-sm text-zinc-300 hover:border-zinc-600">{item.title}</Link>)}</div></aside>}
  </main><Footer /></div>;
}
