'use client'

import { CellValueChangedEvent, ColDef, RowValueChangedEvent } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { Todo } from '@/models/Todo'
import { useCrudTodo } from '@/hooks/useCrudTodo'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

export default function TodoCellEdit() {
  const gridRef = useRef<AgGridReact<Todo>>(null)
  const { todos, error, isLoading, updateTodoField } = useCrudTodo()

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const columnDefs: ColDef<Todo>[] = [
    { field: 'id', editable: false },
    { field: 'title' },
    { field: 'completed' }
  ]

  const defaultColDef = {
    filter: true,
    sortable: true,
    editable: true,
  }

  const onCellValueChanged = (event: CellValueChangedEvent<Todo>) => {
    if (event.colDef.field)
      updateTodoField(event.data.id, event.colDef.field, event.newValue)
  }

  const onRowValueChanged = (event: RowValueChangedEvent<Todo>) => {
    const todo = event.data
    if (todo)
      console.log(todo)
      // updateTodo(todo)
  }

  return (
    <div className="w-fit mx-auto my-10">
      <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>

        <AgGridReact
          ref={gridRef}
          rowData={todos}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          editType="fullRow"
          onCellValueChanged={onCellValueChanged}
          onRowValueChanged={onRowValueChanged}
        />

      </div>
    </div>
  )
}
