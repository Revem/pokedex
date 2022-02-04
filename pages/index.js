import { useState, useEffect } from "react";
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
      return respostaEmObjeto.pokemon_entries;
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
        <title>Pokedex</title>
      </Head>
      <h1>Pokedex</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number}>
            <Link href={`/pokemon/${pokemon.entry_number}`}><a><img src='???'/>{pokemon.entry_number} {pokemon.pokemon_species.name}</a></Link></li>
        ))}
      </ul>
    </div>
  );
}
