import Link from "next/link";
import type { GetStaticProps } from "next";

// Define Post type for TypeScript
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: { url: string; altText: string };
  author: { name: string; email: string };
  publishedAt: string;
  tags?: string[];
};

type Props = { posts: Post[] };

export default function PostList({ posts }: Props) {
  return (
    <main className="max-w-5xl mx-auto py-12 px-3">
      <h1 className="text-3xl font-bold mb-7">All Blog Posts</h1>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            key={post.id}
            className="block group"
          >
            <div className="border rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-black overflow-hidden">
              {post.featuredImage?.url && (
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.altText}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:text-indigo-600">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                  <span>By {post.author?.name}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

// Fetch data from REST API at build time
export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();
  return { props: { posts }, revalidate: 60 };
};
