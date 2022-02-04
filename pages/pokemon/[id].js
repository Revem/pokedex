import Link from "next/link";

export default function Pokemon({ pokemon }) {
  console.log(pokemon);
  return (
    <div>
      Id: {pokemon.id}
      Nome: {pokemon.name}
      <img src={pokemon.sprites.front_default}  alt="Imagem de um pokémon" />
      <img src={pokemon.sprites.front_shiny} alt="Imagem de um pokémon" />

      <Link href='../'><a>Voltar para o inicio</a></Link>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }

      throw new Error('Deu problema');
    })
    .then((respostaEmObjeto) => respostaEmObjeto);

  return {
    props: {
      pokemon,
    },
  };
}

export async function getStaticPaths() {
  //Rodar algum código Node
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/1/')
  .then((respostaDoServer) => {
    if (respostaDoServer.ok) {
      return respostaDoServer.json();
    }
    throw new Error('Deu problema');
  })
  .then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);
return {
  paths: pokemons.map((pokemon) => ({ //pra cada pokemon na resposta, um caminho sera gerado
    params: {
      id: pokemon.entry_number.toString(), //necessario usar o toString porque não aceita inteiro como caminho (path)
    },
  })),
  fallback: false,
};
}

