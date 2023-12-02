'use client'

import { useRef } from 'react'
import { useCrudTodo } from '@/hooks/useCrudTodo'

export default function Todos() {
  const titleRef = useRef<HTMLInputElement>(null)
  const { todos, error, isLoading, addTodo, updateTodo, updateCompleted, deleteTodo } = useCrudTodo()

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const clearTitle = () => {
    if (titleRef.current) titleRef.current.value = ''
  }

  const addNewTodo = async () => {
    const title = titleRef.current?.value
    if (!title) return

    addTodo(title, clearTitle)
  }

  return (
    <div className="w-fit mx-auto my-10">
      <input type="text" placeholder='What needs to be done?'
        onKeyDown={e => (e.key === "Enter") && addNewTodo()}
        className="dark:text-gray-600" ref={titleRef}></input>
      {' '}

      <button className="btn-primary my-2"
        onClick={addNewTodo}>Add Todo</button>

      <div data-testid="todo-count">
        {todos?.filter(x => x.completed === false).length} items left
      </div>

      <ul className="list-disc">
        {todos?.map(todo => <li key={todo.id} data-testid="todo-item">
          {todo.id}:
          {' '}

          <input type="text" defaultValue={todo.title} data-testid="todo-title"
            className={"bg-inherit focus:bg-white" + (todo.completed && " completed")}
            onBlur={ev => {
              if (todo.title !== ev.target.value)
                updateTodo({ ...todo, title: ev.target.value })
            }}
            onKeyDown={ev => {
              if (ev.nativeEvent.isComposing || ev.key !== 'Enter') return
              ev.currentTarget.blur()
            }}
          />
          <input type="checkbox" checked={todo.completed} className="mx-2"
            onChange={ev => updateCompleted(todo.id, ev.target.checked)} />
          {' '}

          <button className="btn-primary my-1" onClick={() => deleteTodo(todo.id)}>Del</button>
        </li>)}
      </ul>
    </div>
  )
}
