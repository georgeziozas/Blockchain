import { useState, useRef, useEffect } from "react";
import { Movie } from "./Movie";
import { Filter } from "../Filter";

/*const movies = [
  {
    name: "Spiderman Movie",
  },
  {
    name: "Batman Movie",
  },
  {
    name: "Superman Movie",
  },
  {
    name: "Joker Movie",
  },
];
*/
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=dc2186adca14baa7feb430350e8179cd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

const CONFIG_URL =
  "https://api.themoviedb.org/3/configuration?api_key=dc2186adca14baa7feb430350e8179cd";

export function MoviesList() {
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState([]);
  const [config, setConfig] = useState({});

  const ulRef = useRef(null);
  const ref = useRef(null);

  const getMovies = async () => {
    try {
      const res = await fetch(API_URL);
      const movies = await res.json();
      setMovies(movies.results);
      console.log("movies", movies);
    } catch (e) {
      console.error(e);
    }
  };

  const getConfig = async () => {
    try {
      const res = await fetch(CONFIG_URL);
      const config = await res.json();
      setConfig(config);
      console.log("config", config);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMovies(); //everytime something renders this is fired, if we have an empty [] after the comma, then it will only be called once on the first render.
    getConfig();
  }, []);

  return (
    <div ref={ulRef}>
      {/*This way we can use Ref to create dummy inputs. An input that we can take its value and do whatever we want with this value without having to use state which will re-render the whole page!*/}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(ref.current.value);
        }}
      >
        <input ref={ref} />
        <button />
      </form>
      <Filter filter={filter} setFilter={setFilter} />
      <ul className="movies-list">
        {movies
          .filter((movie) => {
            return movie.title.toLowerCase().includes(filter.toLowerCase());
          })
          .map((movie) => {
            return <Movie key={movie.id} config={config} movie={movie} />;
          })}
      </ul>
    </div>
  );
}
