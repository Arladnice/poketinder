import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma, wrapSuccess } from '../utils';

export const ratingRouter = trpc.router().mutation('rate-pokemon', {
  input: z.object({
    id: z.number(),
    rate: z.union([z.literal('like'), z.literal('dislike')])
  }),
  resolve: async ({ input }) => {
    const updatedPokemon = await prisma.pokemons.update({
      where: { id: input.id },
      data: { likes: input.rate === 'like' ? { increment: 1 } : { decrement: 1 } }
    });
    return wrapSuccess(updatedPokemon);
  }
});
