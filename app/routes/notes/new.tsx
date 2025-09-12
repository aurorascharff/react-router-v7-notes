import { Form, useRouteError, redirect, useNavigation } from 'react-router';
import type { Route } from './+types/new';
import { prisma } from '~/../db';
import NoteDisplay from '~/components/NoteDisplay';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import ErrorMessage from '~/components/ui/ErrorMessage';
import Input from '~/components/ui/Input';
import TextArea from '~/components/ui/TextArea';
import { badRequest } from '~/utils/bad-request';
import { slow } from '~/utils/slow';
import { noteSchema } from '~/validations/noteSchema';

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const title = form.get('title') as string;
  const content = form.get('content') as string;
  const result = noteSchema.safeParse({
    content,
    title,
  });

  if (!result.success) {
    return badRequest({
      errors: result.error.flatten().fieldErrors,
      values: { content, title },
    });
  }

  await slow();

  const note = await prisma.note.create({
    data: result.data,
  });
  return redirect(`/notes/${note.id}`);
}

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
      <h2 className="text-2xl">Add a new note</h2>
      <Form method="post">
        <Input
          label="Title:"
          defaultValue={actionData?.values?.title}
          errors={actionData?.errors?.title}
          name="title"
          type="text"
        />
        <TextArea
          defaultValue={actionData?.values?.content}
          label="Content:"
          errors={actionData?.errors?.content}
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
