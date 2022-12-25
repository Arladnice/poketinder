import * as trpc from '@trpc/server';
import { MAX_POKEMON_COUNTS } from '../constants';
import { prisma, wrapSuccess } from '../utils';

export const pokemonsRouter = trpc
  .router()
  .query('get-random-pokemon', {
    resolve: async () => {
      const randomId = Math.round(Math.random() * MAX_POKEMON_COUNTS);
      const pokemon = await prisma.pokemons.findFirst({ where: { id: randomId || 1 } });
      return wrapSuccess(pokemon);
    }
  })
  .query('get-pokemons', {
    resolve: async () => {
      const pokemons = await prisma.pokemons.findMany({
        orderBy: {
          likes: 'desc'
        }
      });
      return wrapSuccess(pokemons);
    }
  });
