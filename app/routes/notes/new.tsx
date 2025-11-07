import { Form, useRouteError } from 'react-router';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import ErrorMessage from '~/components/ui/ErrorMessage';
import Input from '~/components/ui/Input';
import TextArea from '~/components/ui/TextArea';

export default function NewNoteRoute() {
  return (
    <Card>
      <h2 className="text-2xl">Add a new note</h2>
      <Form method="post">
        <Input label="Title:" name="title" type="text" />
        <TextArea label="Content:" name="content" />
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
