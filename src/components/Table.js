import React, { useEffect, useState } from "react";

const Table = () => {
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState([]);

  const pokeGetir = async () => {
    try {
      await fetch("https://pokeapi.co/api/v2/pokemon/")
        .then((resp) => resp.json())
        .then((data) => setPokemon(data));
    } catch (error) {
      return "Errorrrrrrr";
    }
  };

  const pokemonGetir = async () => {
    const arr = [];
    if (pokemon?.results?.length > 0) {
      for (let i = 0; i < pokemon.results.length; i++) {
        await fetch(pokemon?.results[i].url)
          .then((resp) => resp.json())
          .then((data) => arr.push(data));
      }

      setUrl(arr);
    }
  };

  const nextPokeGetir = async (string) => {
    if (string === "previous") {
      pokemon.previous !== null &&
        (await fetch(pokemon.previous)
          .then((resp) => resp.json())
          .then((data) => setPokemon(data)));
    } else if (string === "next") {
      pokemon.next !== null &&
        (await fetch(pokemon.next)
          .then((resp) => resp.json())
          .then((data) => setPokemon(data)));
    } else if (string === "first") {
      await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
        .then((resp) => resp.json())
        .then((data) => setPokemon(data));
    } else {
      await fetch("https://pokeapi.co/api/v2/pokemon/?offset=1260&limit=20")
        .then((resp) => resp.json())
        .then((data) => setPokemon(data));
    }
  };

  useEffect(() => {
    if (pokemon.length == 0) {
      pokeGetir();
    }
    pokemonGetir();
  }, [pokemon]);

  // console.log(pokemon?.results);
  console.log(url);
  console.log(pokemon);

  return (
    <>
      <div className=" text-center m-5 flex flex-wrap justify-center items-center">
        <button
          className="btn btn-accent mr-4 w-32  "
          onClick={() => nextPokeGetir("first")}
        >
          First Page
        </button>
        <button
          className="btn btn-accent mr-4 w-32"
          onClick={() => nextPokeGetir("previous")}
        >
          Previous
        </button>
        <button
          className="btn btn-accent w-32 mr-4"
          onClick={() => nextPokeGetir("next")}
        >
          Next
        </button>{" "}
        <button
          className="btn btn-accent w-32 mr-4"
          onClick={() => nextPokeGetir("last")}
        >
          Last Page
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3 ">
        {url?.map((poke) => (
          <div className="card  bg-base-100 shadow-xl  border-4 max-sm:w-[100%] sm:w-[100%] md:w-[40%] lg:w-[30%] ">
            <figure>
              <img
                src={
                  poke.sprites.other.dream_world.front_default ??
                  "https://cdn.vox-cdn.com/thumbor/XMdhZQsFV9RbvRO7kvYFxCvzNis=/0x0:1366x768/775x775/filters:focal(525x192:743x410):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/71772445/ash-pikachu.0.0.jpg"
                }
                alt="Shoes"
                className="w-[200px] h-[200px]"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title text-center mx-auto">{poke.name}</h2>
              <h2 className="card-title text-center mx-auto">
                Height: {poke.height}&nbsp;&nbsp; Weight: {poke.weight}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
