import * as trpc from '@trpc/server';
import { z } from 'zod';
import { wrapSuccess } from '../utils';

export const ratingRouter = trpc.router().query('get-pokemon2', {
  input: z.object({
    id: z.string()
  }),
  resolve({ input }) {
    const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${input.id}/`);
    return wrapSuccess(pokemon);
  }
});
