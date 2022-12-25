import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Ping } from '@/components';
import { getPokemonId, trpc } from '../utils';

const Results = () => {
  const getPokemonsQuery = trpc.useQuery(['pokemons.get-pokemons'], {
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  if (!getPokemonsQuery.data?.success || !getPokemonsQuery.data.data?.length) {
    return <Ping />;
  }

  const pokemons = getPokemonsQuery.data.data.map((pokemon) => {
    const votes = pokemon.likes! + pokemon.dislikes! || 1;
    const percent = Math.round((pokemon.likes! / votes) * 100);
    return (
      <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-3'>
        <div className='flex justify-between'>
          <h2 className='text-lg font-medium'>{pokemon.name}</h2>
          <span>{getPokemonId(pokemon.id)}</span>
        </div>
        <div className='flex items-center justify-center'>
          <Image src={pokemon.image} width={100} height={100} layout='fixed' />
        </div>
        <div>
          <div>
            likes: <span className='text-lg font-bold'>{pokemon.likes}</span>
          </div>
          <div>
            dislikes: <span className='text-lg font-bold'>{pokemon.dislikes}</span>
          </div>
          <div>
            percent: <span className='text-lg font-bold'>{percent}%</span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='my-4'>
        <h1 className='text-xl font-bold'>Results</h1>
      </div>
	  <Link href="/">Home</Link>
      <div className='grid w-8/12 grid-cols-3 gap-3'>{pokemons}</div>
    </section>
  );
};

export default Results;
