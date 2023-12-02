'use client'

import { AgGridReact } from 'ag-grid-react'
import { MouseEvent, useRef } from 'react'
import { CellValueChangedEvent, ColDef } from 'ag-grid-community'
import { Todo } from '@/models/Todo'
import { useSet } from '@/hooks/useSet'
import { updateCellColor } from '@/utils/ag-util'
import { useCrudTodo } from '@/hooks/useCrudTodo'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

export default function TodoRowEdit() {
  const gridRef = useRef<AgGridReact<Todo>>(null)
  const { todos, error, isLoading, updateTodo } = useCrudTodo()
  const { values: nodeIds, addValue: addNodeId, delValue: delNodeId } = useSet<string>()

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
    if (event.oldValue === event.newValue) return

    const nodeId = event.node.id
    if (nodeId === undefined) return

    addNodeId(nodeId)
    updateCellColor(event, nodeId, 'LightYellow')
  }

  const handleSave = (_: MouseEvent<HTMLButtonElement>) => {
    for (const nodeId of Array.from(nodeIds)) {
      const todo = gridRef.current?.api.getRowNode(nodeId)?.data

      if (todo) {
        updateTodo(todo)
        delNodeId(nodeId)
      }
    }
  }

  return (
    <div>
      <div className="w-fit mx-auto my-10">
        <button className="btn-primary" onClick={handleSave}>Save</button>
        {nodeIds.size} rows modified.

        <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
          <AgGridReact
            ref={gridRef}
            rowData={todos}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            editType="fullRow"
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
    </div>
  )
}
