import type { NextPage } from 'next';

import { trpc } from '@/utils/trpc';

const Home: NextPage = () => {
  const getPokemonQuery = trpc.useQuery(['pokemons.get-pokemon', { id: 1 }]);

  if (!getPokemonQuery.data?.success) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{getPokemonQuery.data.data.name}</p>
    </div>
  );
};

export default Home;
