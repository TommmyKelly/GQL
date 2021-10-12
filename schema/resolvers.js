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
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;

      UserList.map((user) => {
        if (user.id == id) {
          user.username = newUsername;
        }
      });
      const res = UserList.find((user) => user.id == id);
      return res;
    },
    deleteUser: (parent, args) => {
      const id = args.id;

      UserList.forEach((user, index) => {
        if (user.id == id) {
          UserList.splice(index, 1);
        }
      });

      return "Hello";
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
