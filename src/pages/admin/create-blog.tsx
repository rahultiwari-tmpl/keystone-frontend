import BlogForm from "@/components/BlogForm";

export default function CreateBlogPage() {
  return (
    <div className="max-w-xl mx-auto pt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <BlogForm />
    </div>
  );
}
