const { UserList, MovieList } = require("../FakeData");

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (_, args) => {
      const id = args.id;
      const res = UserList.find((user) => user.id == id);
      return res;
    },
    movies: () => {
      return MovieList;
    },
    movie: (_, args) => {
      const name = args.name;
      const res = MovieList.find((movie) => movie.name == name);
      return res;
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const newUser = {
        ...user,
        id: UserList.length + 1,
      };
      UserList.push(newUser);
      return newUser;
    },
  },
  User: {
    favoriteMovies: () => {
      return MovieList.filter(
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
};

module.exports = resolvers;
