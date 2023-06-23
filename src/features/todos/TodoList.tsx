import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react'
import styles from './index.module.css'
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../api/appSlice';

const TodoList = () => {
    const [newTodo, setNewTodo] = useState<string>('');

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // addTodo logic
        addTodo({ id: 1, title: newTodo, completed: false });
        setNewTodo('');
    };

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor='new-todo'>Enter a new todo item</label>
            <div className={styles.addLayer}>
                <div className='new-todo'>
                    <input
                        type='text'
                        id='new-todo'
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder='Enter new todo'
                    />
                </div>
                <button className='submit'>
                    <FontAwesomeIcon icon={faUpload} />
                </button>
            </div>
        </form>

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map((todo: any) => {
            return (
                <article key={todo.id} className={styles.fetchedDataContainer}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodo(
                                    {
                                        ...todo,
                                        completed: !todo.completed
                                    }
                                )}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <div>
                        <button
                            className="trash"
                            onClick={() => deleteTodo({ id: todo.id })}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{'error occurred'}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList