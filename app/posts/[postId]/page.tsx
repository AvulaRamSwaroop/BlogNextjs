import getFormattedData from "@/lib/getFormattedData";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

import { notFound } from "next/navigation";

export async function page({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();

  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) return notFound();

  return <div>page</div>;
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) notFound();

  const { title, date, contentHtml } = await getPostData(postId);

  const pubDate = getFormattedData(date);

  return (
    <main className="px-6 prose text-white prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl  mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <button className="border-r-slate-500">
            <Link
              href="/"
              className="text-gray-50 font-bold text-xl p-20 pt-30 "
            >
              ← Back to home
            </Link>
          </button>
        </p>
      </article>
    </main>
  );
}
