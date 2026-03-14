"use client";

import "./agGridSetup";

import { useMemo } from "react";
import { themeQuartz, type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

export type UserRow = {
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  status: string;
  jobTitle: string;
};

type UsersGridProps = {
  rowData: UserRow[];
};

export function UsersGrid({ rowData }: UsersGridProps) {
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
          params.value === "Active" ? "text-emerald-600 font-medium" : "text-slate-500",
      },
      { field: "jobTitle", headerName: "Job Title", flex: 1, minWidth: 150 },
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

  return (
    <div className="mt-8" style={{ height: 400, width: "100%" }}>
      <AgGridReact<UserRow>
        theme={themeQuartz}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        domLayout="normal"
        suppressCellFocus={true}
      />
    </div>
  );
}
