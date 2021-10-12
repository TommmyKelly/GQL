import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
      friends {
        age
        name
      }
      favoriteMovies {
        id
        isInTheaters
        name
      }
    }
  }
`;
const QUERY_ALL_Movies = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_Movies);
  const [getMovie, { data: singleMovie, error: singleMovieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);
  const [createUser, { data: newUser, error: newUserError }] =
    useMutation(CREATE_USER_MUTATION);
  const [movieSearch, setMovieSearch] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    console.log(error);
  }

  if (singleMovieError) {
    console.log(singleMovieError);
  }
  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Age'
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type='text'
          placeholder='Nationally'
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username: userName,
                  age: Number(age),
                  nationality,
                },
              },
            });
            refetch(data);
          }}
        >
          Create user
        </button>
      </div>
      {data.users?.map((user) => (
        <div>
          <h1>{user.name}</h1>
        </div>
      ))}
      {movieData?.movies.map((movie) => (
        <div>
          <h1>{movie.name}</h1>
        </div>
      ))}
      <div>
        <input
          type='text'
          placeholder='search...'
          value={movieSearch}
          onChange={(e) => setMovieSearch(e.target.value)}
        />
        <button
          onClick={() => {
            getMovie({
              variables: {
                name: movieSearch,
              },
            });
          }}
        >
          Get Movie
        </button>
        <div>{singleMovie?.movie.name}</div>
      </div>
    </div>
  );
};

export default DisplayData;
