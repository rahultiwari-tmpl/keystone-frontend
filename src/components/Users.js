import React from "react";
import { gql, useQuery } from "@apollo/client";

// GraphQL query to fetch users
const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div>
      <h2>User List</h2>
      {data.users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {data.users.map((user) => (
            <li key={user.id}>
              {user.name} (ID: {user.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
