import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { initializeApollo } from "../lib/apollo";
import { GET_USERS } from "@/graphql/UserQuery";
import { ArrowRight, FileText, BookOpen } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const REFRESH_TIME = 10;

// Define the user object structure
type User = {
  id: string;
  name: string;
};

// Props type for Home component
interface HomeProps {
  users: User[];
}

// Component uses props instead of useQuery
export default function Home({ users }: HomeProps) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center px-4 py-16`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to Keystone Demo</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Explore users, posts, and blogs connected via GraphQL API
        </p>
      </div>

      {/* Two main cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 w-full max-w-3xl">
        <Link
          href="/post"
          className="group flex flex-col items-start justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 shadow hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold">Posts</h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            View and explore all posts from the Keystone CMS API.
          </p>
          <div className="flex items-center gap-2 text-blue-500 group-hover:translate-x-1 transition-transform">
            <span>Go to Posts</span>
            <ArrowRight size={18} />
          </div>
        </Link>

        <Link
          href="/blog"
          className="group flex flex-col items-start justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 shadow hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold">Blogs</h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            Browse insightful blogs and technical articles.
          </p>
          <div className="flex items-center gap-2 text-green-500 group-hover:translate-x-1 transition-transform">
            <span>Go to Blogs</span>
            <ArrowRight size={18} />
          </div>
        </Link>
      </div>

      {/* User List */}
      <div className="w-full max-w-md text-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        {users.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-none"
              >
                <span className="font-medium">{user.name}</span>
                <span className="text-zinc-500 text-sm"> (ID: {user.id})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = initializeApollo();
  try {
    const { data } = await client.query({ query: GET_USERS });

    if (!data || !data?.users) {
      return { notFound: true };
    }
    return {
      props: { users: data.users },
      revalidate: REFRESH_TIME,
    };
  } catch (error) {
    return { notFound: true };
  }
}
