import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

type GetTodosResponse = Todo[]

interface AddTodoRequest {
    id: string | number;
    title: string;
    completed: boolean;
}

interface UpdateTodoRequest extends Todo { }

interface DeleteTodoRequest {
    id: number;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    //tags for updating the state of data for every
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<GetTodosResponse, void>({
            query: () => '/todos',
            transformResponse: (res: GetTodosResponse) =>
                res.sort((a: Todo, b: Todo) => b.id - a.id),
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation<void, AddTodoRequest>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation<void, UpdateTodoRequest>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation<void, DeleteTodoRequest>({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = apiSlice;
