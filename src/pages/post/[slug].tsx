import type { GetStaticProps, GetStaticPaths } from "next";

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
  content?: string;
};

type Props = { post: Post };

export default function PostDetail({ post }: Props) {
  if (!post) return <div>Post not found</div>;
  return (
    <main className="max-w-2xl mx-auto py-12 px-3">
      <h1 className="text-3xl font-bold mb-5">{post.title}</h1>
      {post.featuredImage?.url && (
        <img
          src={post.featuredImage.url}
          alt={post.featuredImage.altText}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <div className="text-gray-500 mb-4">{post.excerpt}</div>
      <div className="text-base text-gray-700 dark:text-gray-200 prose">
        {post.content}
      </div>
      <div className="mt-8 text-xs text-gray-400">
        By {post.author?.name} •{" "}
        {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div className="mt-2">
        Tags:{" "}
        {post.tags?.map((tag) => (
          <span key={tag} className="bg-gray-100 px-2 py-1 mr-2 rounded">
            {tag}
          </span>
        ))}
      </div>
    </main>
  );
}

// Generate paths for all posts at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts: Post[] = await res.json();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/posts/${params?.slug}`);
  const post = await res.json();
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
};
