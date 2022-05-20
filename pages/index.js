import Head from "next/head";
import Link from "next/link";

export async function getStaticProps(context) {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokedex/1/")
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
    })
    .then((respostaEmObjeto) => {
      fetch("https://pokeapi.co/api/v2/pokemon/${pokeId}/")
      return respostaEmObjeto.pokemon_entries
    });
  return {
    props: {
      pokemons
    },
  };
}

export default function Home(props) {
  const { pokemons } = props;

  return (
    <div>
      <Head>
        <title >Pokedex</title>
      </Head>
      <h1>Pokedex</h1>
      <ul className="flex flex-wrap w-full p-5 break-all">
        {pokemons.map((pokemon) => (
          <li
           className="bg-cyan-800 p-2 border-2 border-cyan-700 w-40 h-40 m-5 hover:animate-pulse rounded-full"
          key={pokemon.entry_number}>
            <Link href={`/pokemon/${pokemon.entry_number}`}>
              <a>
                <strong>
                  <span className="capitalize">
                    {pokemon.pokemon_species.name}
                  </span>
                </strong>
                <span>
                  #{pokemon.entry_number}
                </span>
                <img
                className="w-23 h-23"
                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
