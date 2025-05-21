import { z } from 'zod';

export const noteSchema = z.object({
  content: z.string().min(5, {
    message: 'Note content is too short',
  }),
  title: z.string().min(2, {
    message: 'Note title is too short',
  }),
});
