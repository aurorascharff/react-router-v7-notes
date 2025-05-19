import { Form } from 'react-router';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
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
