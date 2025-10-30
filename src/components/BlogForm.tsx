import { CREATE_BLOG } from "@/graphql/BlogMutation";
import { useMutation } from "@apollo/client";

export default function BlogForm() {
  const [createBlog, { data, loading, error }] = useMutation(CREATE_BLOG);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createBlog({
      variables: {
        input: {
          title: "New Blog",
          slug: "new-blog",
          category: "Tutorial",
          author: { connect: { id: "author-id" } },
          content: { text: "This is the body" },
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Blog"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
