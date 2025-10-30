import Link from "next/link";
import { initializeApollo } from "../../lib/apollo";
import { GET_BLOGS } from "@/graphql/BlogQuery";
import type { Blog } from "@/types/blog";
import Image from "next/image";

export const REFRESH_TIME = 10;

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-white">
            Latest Blog Posts
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3">
            Insights, tutorials, and stories from our developers.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className="group bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm 
                         hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  width={500}
                  height={250}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300"
                ></div>
                <div className="absolute bottom-4 left-4 text-sm text-white font-medium bg-black/40 px-3 py-1 rounded-full">
                  {blog.category ?? "General"}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-white line-clamp-2 group-hover:text-indigo-500 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 line-clamp-3">
                  {blog.subtitle}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    By {blog.author?.name ?? "Unknown"}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const client = initializeApollo();

  try {
    const { data } = await client.query<{ blogs: Blog[] }>({
      query: GET_BLOGS,
    });

    return {
      props: { blogs: data?.blogs },
      revalidate: REFRESH_TIME,
    };
  } catch (error) {
    return { notFound: true };
  }
}
