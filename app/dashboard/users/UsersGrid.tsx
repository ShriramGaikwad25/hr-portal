"use client";

import "./agGridSetup";

import { useMemo } from "react";
import { themeQuartz, type ColDef, type ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

export type UserRow = {
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  status: string;
  jobTitle: string;
  employeeId?: string;
  managerId?: string;
  managerName?: string;
};

type EditIconCellParams = ICellRendererParams<UserRow> & {
  context?: { onEdit?: (row: UserRow) => void };
};

function EditIconCell(props: EditIconCellParams) {
  const onEdit = props.context?.onEdit;
  const row = props.data;
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
      aria-label="Edit"
      onClick={() => row && onEdit?.(row)}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </button>
  );
}

type UsersGridProps = {
  rowData: UserRow[];
  onEdit?: (row: UserRow) => void;
};

export function UsersGrid({ rowData, onEdit }: UsersGridProps) {
  const columnDefs = useMemo<ColDef<UserRow>[]>(
    () => [
      { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
      { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
      { field: "department", headerName: "Department", flex: 1, minWidth: 130 },
      { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 100,
        cellClass: (params) =>
          params.value?.toUpperCase() === "ACTIVE" ? "text-emerald-600 font-medium" : "text-slate-500",
      },
      { field: "jobTitle", headerName: "Job Title", flex: 1, minWidth: 150 },
      {
        headerName: "",
        width: 64,
        minWidth: 64,
        maxWidth: 64,
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: EditIconCell,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const context = useMemo(() => ({ onEdit }), [onEdit]);

  return (
    <div className="mt-8 w-full">
      <AgGridReact<UserRow>
        theme={themeQuartz}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        context={context}
        domLayout="autoHeight"
        suppressCellFocus={true}
      />
    </div>
  );
}
