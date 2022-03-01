import { gql } from '@apollo/client';

export const addUser = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $userame, email: $email, password: $password)
  }
`;