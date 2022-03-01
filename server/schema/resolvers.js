const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, { UserId }, context) => {
        if (!context.user){
          throw new AuthenticationError('Not logged in')
        }
        const user = await User.findOne ({ _id: UserId });
        return user;
      }, 
    },
  
    Mutation: {
      addUser: async (parent, { name }) => {
        const user = await User.create({ name })
        return user;
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
      saveBook: async (parent, { UserId, book }) => {
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
      removeBook: async (parent, { UserId, book }) => {
        return User.findOneAndUpdate(
          { _id: UserId },
          { $pull: { books: book } },
          { new: true }
        );
      },
    },
  };

module.exports = resolvers;