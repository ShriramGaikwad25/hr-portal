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
  username?: string;
  managerId?: string;
  managerName?: string;
};

type ActionsCellParams = ICellRendererParams<UserRow> & {
  context?: { onEdit?: (row: UserRow) => void };
};

function ActionsCell(props: ActionsCellParams) {
  const { onEdit } = props.context ?? {};
  const row = props.data;
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
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
    </div>
  );
}

type UsersGridProps = {
  rowData: UserRow[];
  onEdit?: (row: UserRow) => void;
  /** Controlled quick filter (search) text from parent */
  quickFilterText: string;
};

export function UsersGrid({ rowData, onEdit, quickFilterText }: UsersGridProps) {
  const defaultPageSize = 10;

  const columnDefs = useMemo<ColDef<UserRow>[]>(
    () => [
      {
        field: "firstName",
        headerName: "First Name",
        flex: 1,
        minWidth: 120,
        sort: "asc",
        sortIndex: 0,
      },
      { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
      { field: "department", headerName: "Department", flex: 1, minWidth: 130 },
      { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 100,
        cellClass: (params) => {
          const v = params.value?.toUpperCase();
          if (v === "ACTIVE") return "text-emerald-600 font-medium";
          if (v === "TERMINATED") return "text-amber-600 font-medium dark:text-amber-400";
          return "text-slate-500";
        },
      },
      { field: "jobTitle", headerName: "Job Title", flex: 1, minWidth: 150 },
      {
        headerName: "",
        width: 88,
        minWidth: 88,
        maxWidth: 88,
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: ActionsCell,
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
    <div className="mt-4 w-full">
      <AgGridReact<UserRow>
        theme={themeQuartz}
        rowData={rowData}
        quickFilterText={quickFilterText}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        context={context}
        domLayout="autoHeight"
        suppressCellFocus={true}
        pagination={true}
        paginationPageSize={defaultPageSize}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
}
