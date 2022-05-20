import axios from "axios";

const Index = ({ trending }) => {
  return (
    <>
      <main>
        <h1>Trending movies</h1>
        <section className="movies">
          {trending.map(
            ({
              id,
              original_title: title,
              release_date,
              vote_average: score,
              poster_path,
              genres,
            }) => (
              <article className="" key={id}>
                <h2>
                  {title} <span>({release_date.split("-")[0]})</span>
                  <span>
                    score: <span class="score">{score}</span> / 10
                  </span>
                </h2>
                <div className="imgholder">
                  <img
                    src={`${process.env.IMG_BASE_PATH + poster_path}`}
                    alt={`${title} poster`}
                  />
                </div>
                <p className="genres">{genres}</p>
              </article>
            )
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  // API call naar api trending movies
  const url = `${process.env.API_BASE_PATH}/trending/movie/day?api_key=${process.env.API_KEY}`;

  const {
    data: { results: trending },
  } = await axios(url);
  return {
    props: {
      trending,
    },
  };
};

export default Index;
