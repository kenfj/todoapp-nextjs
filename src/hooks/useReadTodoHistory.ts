import { TodoHistory } from "@/models/TodoHistory"
import { useCrud } from "@/swr-lib/useSwr"

export const useReadTodoHistory = () => {
  const { data: todoHistories, error, isLoading } = useCrud<TodoHistory>('/todo-histories')

  return { todoHistories, error, isLoading }
}
