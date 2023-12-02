import { Todo } from '@/models/Todo'
import { showSuccess } from '@/utils/showMessage'
import { useCrud, useUpdateFields } from '@/swr-lib/useSwr'

export const useCrudTodo = () => {
  const { data: todos, error, isLoading, create, update, remove } = useCrud<Todo>('/todos')
  const { updateFields } = useUpdateFields<Todo>('/todos')

  const addTodo = (title: string, callback: (() => void)) => {
    create({ id: null!, title: title, completed: false, createdAt: null, updatedAt: null })
      .then(res => {
        callback()
        showSuccess(`Added ${res.id} ${res.title}`)
      })
  }

  const updateTodo = (todo: Todo) => {
    update(todo)
      .then(res => showSuccess(`Updated ${res.id} ${res.title}`))
  }

  const updateTodoField = (id: number, fieldName: string, fieldValue: string | number | boolean) => {
    updateFields({ id, fields: { [fieldName]: fieldValue } })
      .then(res => showSuccess(`Updated ${id} ${fieldName} = ${res[fieldName as keyof typeof todos]}`))
  }

  const updateCompleted = (id: number, completed: boolean) => {
    updateTodoField(id, 'completed', completed)
  }

  const deleteTodo = (todoId: number) => {
    remove(todoId)
      .then(() => showSuccess(`Deleted ${todoId}`))
  }

  return { todos, error, isLoading, addTodo, updateTodo, updateTodoField, updateCompleted, deleteTodo }
}
