import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query {
    blogs {
      id
      title
      subtitle
      slug
      coverImage
      category
      author {
        name
      }
      publishedAt
    }
  }
`;

export const GET_BLOG_BY_SLUG = gql`
  query BlogBySlug($slug: String!) {
    blog(where: { slug: $slug }) {
      id
      title
      subtitle
      slug
      coverImage
      category
      isFeatured
      publishedAt
      content {
        document
      }
      author {
        name
      }
    }
  }
`;
