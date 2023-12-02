'use client'

import { TodoHistory } from "@/models/TodoHistory"
import { ColDef, IDatasource, IGetRowsParams, TextFilterModel } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { ChangeEventHandler, useRef, useState } from "react"

import { Page } from "@/models/paginate/Page"
import { findOneWithParams } from "@/swr-lib/useSwr"

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

// https://www.ag-grid.com/react-data-grid/infinite-scrolling/

export type TextFilterWrapper = {
  filterType: string;
  operator: string;
  conditions: TextFilterModel[];
}

export default function TodoHistory() {
  const [pageSize, setPageSize] = useState(10)
  const gridRef = useRef<AgGridReact<TodoHistory>>(null)

  const columnDefs: ColDef<TodoHistory>[] = [
    { field: 'id' },
    { field: 'queryType', filterParams: { filterOptions: ["equals"] } },
    { field: 'loggedAt' },
    { field: 'todoId' },
    { field: 'title', filterParams: { filterOptions: ["contains"] } },
    { field: 'completed', filterParams: { filterOptions: ["equals"] } },
  ]

  const defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
    floatingFilter: true,
    filterParams: {
      maxNumConditions: 1,
      filterOptions: ["equals", "lessThanOrEqual", "greaterThanOrEqual"]
    }
  }

  const dataSource: IDatasource = {
    rowCount: undefined,
    getRows: (params: IGetRowsParams) => {
      const pageNum = Math.floor(params.endRow / pageSize)

      console.log(params)
      console.log('asking for ' + params.startRow + ' to ' + params.endRow)

      const pageSortParams = new URLSearchParams([
        ["_page", `${pageNum}`],
        ["_limit", `${pageSize}`],
      ])

      params.sortModel.forEach(sortModel => {
        pageSortParams.append("_sort", sortModel.colId)
        pageSortParams.append("_order", sortModel.sort)
      })

      var filterModel: { [key: string]: TextFilterModel | TextFilterWrapper } = params.filterModel
      var suffixes = new Map([
        ["equals", ""],
        ["contains", ""],
        ["lessThanOrEqual", "_lte"],
        ["greaterThanOrEqual", "_gte"],
      ])

      const filterParams = new URLSearchParams()

      Object.entries(filterModel).forEach(([column, models]) => {
        const textFilterModels = ("operator" in models) ? models.conditions : [models]

        textFilterModels.forEach(model => {
          if (model.type && suffixes.has(model.type) && model.filter)
            filterParams.append(`${column}${suffixes.get(model.type)}`, model.filter)
        })
      })

      const urlParams = new URLSearchParams([
        ...Array.from(pageSortParams.entries()),
        ...Array.from(filterParams.entries()),
      ])

      console.info(urlParams.toString())

      findOneWithParams<Page<TodoHistory>>("todo-histories", urlParams)
        .then(res => params.successCallback(res.content, res.totalElements))
        .catch(() => params.failCallback())
    }
  }

  const onPageSizeChanged: ChangeEventHandler<HTMLSelectElement> = ev => {
    const newPageSize = Number(ev.target.value)

    setPageSize(newPageSize)
    gridRef.current?.api.paginationSetPageSize(newPageSize)
  }

  return (
    <div className="w-fit mx-auto my-10">

      <div>
        Page Size:&nbsp;
        <select defaultValue={10} onChange={onPageSizeChanged}>
          <option value={3}>3</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div style={{ margin: 5 }} />

      <div className="ag-theme-alpine" style={{ width: "800px" }}>

        <AgGridReact<TodoHistory>
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          rowBuffer={0}
          pagination={true}
          paginationPageSize={pageSize}
          rowModelType="infinite"
          cacheBlockSize={pageSize}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={1000}
          maxBlocksInCache={pageSize}
          datasource={dataSource}
        />

      </div>
    </div>
  )
}
