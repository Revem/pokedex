import Link from "next/link";

export default function Pokemon({ pokemon}) {
  console.log(pokemon);
  return (
    <div>
      Id: {pokemon.id} <br />
      Nome: {pokemon.name} <br />
      <img
                className="w-23 h-23"
                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
      Descrição: {pokemon.flavor_text_entries[7].flavor_text} <br />
      <Link href='../'><a>Voltar para o inicio</a></Link>
    </div>
  );
}


export async function getStaticProps({ params }) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`)
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

