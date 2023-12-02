import { CellValueChangedEvent } from 'ag-grid-community'

// ag Grid change cell color on Cell Value Change
// https://stackoverflow.com/questions/62222534
export const updateCellColor = <T>(event: CellValueChangedEvent<T>, nodeId: string, color: string) => {
  event.colDef.cellStyle = params => {
    const bgColor = `${params.rowIndex}` === nodeId ? color : ''
    return { 'backgroundColor': bgColor }
  }

  event.api.refreshCells({
    force: true,
    columns: [event.column.getId()],
    rowNodes: [event.node]
  })
}
