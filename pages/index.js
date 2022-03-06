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
      <h1 style={{margin: '0 auto', textAlign: 'center'}}>Pokedex</h1>
      <ul style={{borderStyle: 'solid', width: '95%', margin:'0 auto', display:'grid', gridTemplateColumns: '30% 30% 30%', borderRadius:'0.25rem', borderWidth:'1px', borderColor:`rgb(145, 31, 173)`}}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number} style={{display: 'grid', borderStyle: 'solid', whiteSpace:'nowrap', margin: '1.5vw', backgroundColor:'black', borderRadius:'0.25rem', gridTemplateAreas:`'texto numero' 'imagem imagem'`, textAlign:'center', padding: '10px', borderColor:`rgb(145, 31, 173)`, borderWidth:'1px'}}>
            <Link href={`/pokemon/${pokemon.entry_number}`}><a><strong><span style={{textTransform: 'capitalize', gridArea:'texto'}}>{pokemon.pokemon_species.name}</span></strong><span style={{gridArea:'numero', color:'#a3a3a3'}}> #{pokemon.entry_number}</span><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`} style={{width: '33%', gridArea:'imagem', display:'block', margin:'0 auto', borderStyle:'solid', borderRadius:'50px', borderWidth:'1px', borderColor:'red', background:`rgb(36,0,0)`, background:`linear-gradient(180deg, rgba(36,0,0,1) 0%, rgba(255,0,0,1) 46%, rgba(0,0,0,1) 50%, rgba(255,255,255,1) 53%)`, filter:`saturate(200%) drop-shadow(0 0 1rem crimson)`}}/></a></Link></li>
        ))}
      </ul>
    </div>
  );
}
