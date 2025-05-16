import { Form, useRouteError, redirect, useNavigation } from 'react-router';
import { z } from 'zod';
import type { Route } from './+types/notes.new';
import { prisma } from '~/../db';
import NoteDisplay from '~/components/NoteDisplay';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import ErrorMessage from '~/components/ui/ErrorMessage';
import Input from '~/components/ui/Input';
import TextArea from '~/components/ui/TextArea';
import { badRequest } from '~/utils/bad-request';
import { slow } from '~/utils/slow';

const noteSchema = z.object({
  content: z.string().min(5, {
    message: 'Note content is too short',
  }),
  createdAt: z.date().optional(),
  id: z.string().optional(),
  title: z.string().min(2, {
    message: 'Note title is too short',
  }),
});

export const meta = () => {
  return [{ content: 'Create new note', name: 'description' }, { title: 'New note' }];
};

export const action = async ({ request }: Route.ActionArgs) => {
  const form = await request.formData();
  const result = noteSchema.safeParse({
    content: form.get('content'),
    title: form.get('title'),
  });

  if (!result.success) {
    return badRequest({
      fieldErrors: result.error.formErrors.fieldErrors,
      fields: {
        content: form.get('content') as string,
        title: form.get('title') as string,
      },
    });
  }

  await slow();

  const note = await prisma.note.create({
    data: result.data,
  });
  throw redirect(`/notes/${note.id}`);
};

export default function NewNoteRoute({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();

  // Optimistic update
  if (navigation.formData) {
    const result = noteSchema.safeParse({
      content: navigation.formData.get('content'),
      title: navigation.formData.get('title'),
    });
    if (result.success) {
      return (
        <NoteDisplay
          canDelete={false}
          note={{
            content: result.data.content,
            favorite: false,
            title: result.data.title,
          }}
        />
      );
    }
  }

  return (
    <Card>
      <h2 className="font-semibold text-xl">Add a new note</h2>
      <Form method="post">
        <Input
          label="Title:"
          errors={actionData?.fieldErrors?.title}
          defaultValue={actionData?.fields?.title}
          name="title"
          type="text"
        />
        <TextArea
          label="Content:"
          errors={actionData?.fieldErrors?.content}
          defaultValue={actionData?.fields?.content}
          name="content"
        />
        <div className="flex justify-end">
          <Button type="submit">Add</Button>
        </div>
      </Form>
    </Card>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return <ErrorMessage>Something unexpected went wrong. Sorry about that.</ErrorMessage>;
}
