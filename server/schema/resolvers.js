const { AuthenticationError } = require('apollo-server-express');
// const { default: context } = require('react-bootstrap/esm/AccordionContext');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        console.log("bruhhhhh")
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user with this email found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, { UserId, book }, context) => {
        return User.findOneAndUpdate(
          { _id: UserId },
          {
            $addToSet: { books: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      // removeBook: async (parent, { UserId, book }) => {
      //   if (context.user){
      //   return User.findOneAndUpdate(
      //     { _id: UserId },
      //     { $pull: { books: book } },
      //     { new: true }
      //   )};
      // },
    },
  };

module.exports = resolvers;