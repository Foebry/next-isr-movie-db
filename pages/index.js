import axios from "axios";
import Link from "next/link";

const Index = ({ trending }) => {
  return (
    <>
      <main>
        <h1>Trending movies</h1>
        <section className="movies">
          {trending.map(({ id, title, year, score, img }) => (
            <article className="" key={id}>
              <h2>
                {title} <span>{year}</span>
                <span>
                  score: <span className="score">{score}</span> / 10
                </span>
              </h2>
              <Link href={`./movie/${id}`}>
                <a>
                  <div className="imgholder">
                    <img src={img} alt={`${title} poster`} />
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  // API call naar api trending movies
  const url = `${process.env.API_BASE_PATH}/trending/movie/day?api_key=${process.env.API_KEY}`;

  const {
    data: { results },
  } = await axios(url);

  const trending = results.map(
    ({ id, original_title, release_date, vote_average, poster_path }) => ({
      id,
      title: original_title,
      year: release_date.split("-")[0],
      score: vote_average,
      img: `${process.env.IMG_BASE_PATH + poster_path}`,
    })
  );

  return {
    props: {
      trending,
    },
    revalidate: 86400, // 1day
  };
};

export default Index;
