import axios from "axios";

const MovieDetail = ({
  title,
  img,
  homepage,
  imdbLink,
  budget,
  genres,
  overview,
  revenue,
  tagline,
  gross,
  profit,
}) => {
  return (
    <main className="detail">
      <h1>{title}</h1>
      <h2>{tagline}</h2>
      <div className="details">
        <aside className="movies">
          <div className="imgholder">
            <img src={img} />
          </div>
        </aside>
        <section className="detail">
          <div className="budget">
            <p>buget: {budget}</p>
            <p>revenu: {revenue}</p>
            <p>
              profit: <span className={gross}>{profit}</span>
            </p>
          </div>
          <div className="overview">
            <h3>Overview</h3>
            <p className="overview">{overview}</p>
          </div>
          <div className="links">
            <p>
              Visit{" "}
              <a href={imdbLink} target="_blank">
                imdb
              </a>{" "}
              page
            </p>
            <p>
              Visit movie{" "}
              <a href={homepage} target="_blank">
                homepage
              </a>{" "}
            </p>
          </div>
          <p>genres: {genres}</p>
        </section>
      </div>
    </main>
  );
};

export const getStaticPaths = async () => {
  const url = `${process.env.API_BASE_PATH}/trending/movie/day?api_key=${process.env.API_KEY}`;

  const {
    data: { results },
  } = await axios(url);

  return {
    paths: results.map(({ id: movieId }) => ({
      params: { movieId: movieId.toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const {
    params: { movieId },
  } = ctx;
  const url = `${process.env.API_BASE_PATH}/movie/${movieId}?api_key=${process.env.API_KEY}`;

  const {
    data: {
      original_title: title,
      poster_path,
      homepage,
      imdb_id,
      budget,
      overview,
      revenue,
      tagline,
      genres,
    },
  } = await axios(url);

  return {
    props: {
      title,
      img: `${process.env.IMG_BASE_PATH + poster_path}`,
      homepage,
      imdbLink: `https://imdb.com/title/${imdb_id}`,
      budget,
      genres: genres.map((genre) => genre.name).join(", "),
      overview,
      revenue,
      tagline,
      gross: revenue - budget > 0 ? "positive" : "negative",
      profit: revenue - budget,
    },
  };
};

export default MovieDetail;
