import { GetStaticPaths, GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apollo";
import { GET_BLOGS, GET_BLOG_BY_SLUG } from "@/graphql/BlogQuery";
import type { Blog, Params } from "@/types/blog";
import Image from "next/image";

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  if (!blog) return <p>Blog not found</p>;

  const { title, subtitle, coverImage, author, content, publishedAt } = blog;

  return (
    <article className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:to-black py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Blog Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            By {author?.name ?? "Unknown"} •{" "}
            {new Date(publishedAt).toLocaleDateString()}
          </p>
        </header>

        {/* Cover Image */}
        <div className="overflow-hidden rounded-xl shadow-lg mb-12">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Blog Content */}
        <section className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-zinc-800 dark:prose-headings:text-zinc-100 prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
          {JSON.stringify(content.document?.[0]?.children?.[0]?.text, null, 2)}
        </section>

        {/* Divider */}
        <hr className="my-12 border-gray-200 dark:border-zinc-800" />

        {/* Footer / Author Info */}
        <footer className="flex flex-col items-center text-center text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src={`https://ui-avatars.com/api/?name=${
                author?.name ?? "Author"
              }`}
              alt={"image"}
              width={500}
              height={500}
              className="h-10 w-10 rounded-full border border-zinc-300 dark:border-zinc-700"
            />
            <div>
              <h3 className="font-medium">{author?.name ?? "Guest Author"}</h3>
              <p className="text-xs">Content Contributor</p>
            </div>
          </div>
          <p className="text-xs mt-4 italic text-zinc-500 dark:text-zinc-500">
            Thanks for reading this article!
          </p>
        </footer>
      </div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const client = initializeApollo();

  // ✅ Explicitly define the shape of data returned by this query
  const { data } = await client.query<{ blogs: Blog[] }>({
    query: GET_BLOGS,
  });

  const paths = data.blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<BlogDetailProps, Params> = async ({
  params,
}) => {
  const client = initializeApollo();

  // ✅ Explicitly type the expected data
  const { data } = await client.query<{ blog: Blog | null }>({
    query: GET_BLOG_BY_SLUG,
    variables: { slug: params?.slug },
  });

  if (!data.blog) return { notFound: true };

  return {
    props: { blog: data.blog },
    revalidate: 10,
  };
};
