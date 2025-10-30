import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: BlogCreateInput!) {
    createBlog(data: $input) {
      id
      title
      slug
      category
      author {
        name
      }
      publishedAt
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $input: BlogUpdateInput!) {
    updateBlog(where: { id: $id }, data: $input) {
      id
      title
      subtitle
      category
      updatedAt
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(where: { id: $id }) {
      id
      title
    }
  }
`;
