const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(password: String!, email: String!): Auth
    addUser(userName: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput): User
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID
    email: String
    userName: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  
  type Auth {
    token: ID
    user: User
  } 

  input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

`;

module.exports = typeDefs;
