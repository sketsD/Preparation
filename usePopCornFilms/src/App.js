import { useRef, useState, useEffect } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const API_KEY = process.env.REACT_APP_API_KEY;

const average = (arr) =>
  Math.round(arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0) * 10) /
  10;

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedID((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleReplaceWatched(movie) {
    setWatched((watched) =>
      watched.map((watchedMovie) =>
        watchedMovie.imdbID === movie.imdbID ? movie : watchedMovie
      )
    );
  }
  function handleDeleteWatched(id) {
    setWatched((watched) =>
      watched.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }

  return (
    <>
      <NavBar>
        <SearchInput query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onReplaceWatched={handleReplaceWatched}
              watched={watched}
              onDeleteMovie={handleDeleteWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>💥</span>
      {message}
      <span>💥</span>
    </p>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function SearchInput({ query, setQuery }) {
  const inputElement = useRef(null);

  useKey("enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumResults({ movies }) {
  if (movies.length === 0) return;
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return (
    <main className="main">
      {/* <ListBox movies={movies} /> */}
      {children}
    </main>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieDetails({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
  onReplaceWatched,
  onDeleteMovie,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  useKey("Escape", onCloseMovie);

  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) {
        countRef.current++;
      }
      console.log(countRef.current);
    },
    [userRating]
  );

  const isWatched = watched.find((wMovie) => wMovie.imdbID === selectedID);

  const [reset, setReset] = useState(true);

  function handleAdd(movie) {
    // console.log(movie);
    const { Title, Year, Poster, imdbRating, Runtime } = movie;
    const newWatchedMovie = {
      imdbID: selectedID,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    isWatched
      ? onReplaceWatched(newWatchedMovie)
      : onAddWatched(newWatchedMovie);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const movieRes = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`
        );
        const movie = await movieRes.json();
        setMovie(movie);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!movie) return;
      document.title = `MOVIE | ${movie.Title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <header>
          <img src={movie.Poster} alt={`Poster of the ${movie.Title}`} />
          <div className="details-overview">
            <h2>{movie.Title}</h2>
            <p>
              {movie.Released} &bull; {movie.Runtime}
            </p>
            <p> {movie.Genre}</p>
            <p>
              <span>⭐</span>
              {movie.imdbRating}
            </p>
          </div>
        </header>
      )}
      <section>
        <div className="rating">
          <StarRating
            maxRating={10}
            size={25}
            key={movie.imdbID}
            onSetRating={setUserRating}
            reset={reset}
            defaultRating={Number(isWatched?.userRating)}
          />
          {isWatched ? (
            <p>You've rated this movie {isWatched?.userRating}</p>
          ) : (
            ""
          )}

          <button className="btn-add" onClick={() => handleAdd(movie)}>
            {isWatched ? "Change your Rating" : "+ Add to List"}
          </button>
          {isWatched ? (
            <button
              className="btn-add"
              onClick={() => {
                onDeleteMovie(movie.imdbID);
                setReset(!reset);
              }}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>

      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMovieList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie, onDeleteMovie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteMovie(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
