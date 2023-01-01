import type { NextPage } from 'next';

import Image from 'next/image';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { Button, Ping } from '@/components';
import { getPokemonId } from '../utils';

const Home: NextPage = () => {
  const getPokemonQuery = trpc.useQuery(['pokemons.get-random-pokemon'], {
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  const ratePokemonQuery = trpc.useMutation(['rating.rate-pokemon'], {
    onSuccess: () => {
      getPokemonQuery.refetch();
    }
  });

  if (!getPokemonQuery.data?.success || !getPokemonQuery.data.data?.name) {
    return <Ping />;
  }

  const pokemon = getPokemonQuery.data.data;

  return (
    <section className='flex h-screen flex-col items-center justify-center'>
      <div className='mb-4'>
        <h1 className='text-xl font-bold'>Do you like tme all?</h1>
      </div>
      <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-4'>
        <Link href={`/pokemon/${pokemon.id}`}>
          <div>
            <div className='flex justify-between'>
              <h2 className='text-lg font-medium'>{pokemon.name}</h2>
              <span>{getPokemonId(pokemon.id)}</span>
            </div>
            <div className='flex cursor-pointer items-center justify-center'>
              <Image
                alt={`pokemon ${pokemon.name}`}
                src={pokemon.image}
                width={256}
                height={256}
                layout='fixed'
                className='animate-bounce'
              />
            </div>
          </div>
        </Link>

        <div className='flex gap-3'>
          <Button
            onClick={() => ratePokemonQuery.mutate({ id: pokemon.id, rate: 'like' })}
            disabled={ratePokemonQuery.isLoading}
          >
            LIKE
          </Button>
          <Button
            onClick={() => ratePokemonQuery.mutate({ id: pokemon.id, rate: 'dislike' })}
            disabled={ratePokemonQuery.isLoading}
          >
            DISLIKE
          </Button>
        </div>
      </div>
      <div className='mt-10'>
        show results{' '}
        <span className='text-blue-500'>
          <Link href='./results'>here</Link>
        </span>
      </div>
    </section>
  );
};

export default Home;
