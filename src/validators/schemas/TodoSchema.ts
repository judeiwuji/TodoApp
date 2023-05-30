import { array, boolean, mixed, object, string } from 'yup';

export const TodoCreationSchema = object({
  title: string().required(),
  items: array(string().required()).optional(),
});

export const TodoUpdateSchema = object({
  title: string().optional(),
});

export const TodoItemCreationSchema = object({
  task: string().required(),
});

export const TodoItemUpdateSchema = object({
  task: string().optional(),
  done: boolean().optional(),
});
