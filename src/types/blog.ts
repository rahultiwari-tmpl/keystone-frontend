// types/blog.ts
import type { ParsedUrlQuery } from "querystring";

type Author = {
  name: string;
};

// Define a recursive document node structure
export interface DocumentNode {
  type?: string;
  level?: number;
  text?: string;
  children?: DocumentNode[]; // recursion for nested content
  href?: string;
  layout?: number[];
  [key: string]: unknown; // keeps flexibility for custom fields like "code", "italic"
}

export type Blog = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string;
  category: string;
  content: {
    document: DocumentNode[]; // use the recursive type instead of Record
  };
  author?: Author;
  publishedAt: string;
};

// Add this interface for Next.js dynamic routes
export interface Params extends ParsedUrlQuery {
  slug: string;
}
