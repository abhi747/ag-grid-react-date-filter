import { AgGridReact } from "ag-grid-react";
import "./App.css";
import { useState } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { isBefore, isValid, startOfDay } from "date-fns";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowData = [
  {
    dateField: "2025-12-01",
  },
  {
    dateField: "2025-12-04",
  },
  {
    dateField: "2025-12-02",
  },
  {
    dateField: "2025-12-08",
  },
  {
    dateField: "2025-12-03",
  },
];

const columnDefs = [
  {
    field: "dateField",
    headerName: "Date",
    valueGetter: ({ data }) => new Date(data.dateField),
    valueFormatter: ({ value }) => value?.toLocaleDateString(),
    filter: "agDateColumnFilter",
    floatingFilter: true,
    filterParams: {
      browserDatePicker: false,
      comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
        console.log("Comparator invoked", filterLocalDateAtMidnight, cellValue);

        const parsedCellValue = new Date(cellValue);
        if (!isValid(parsedCellValue)) return 0;

        const cellDate = startOfDay(parsedCellValue);

        if (isBefore(cellDate, filterLocalDateAtMidnight)) {
          return -1; // cellValue is before the filter date
        } else if (isBefore(filterLocalDateAtMidnight, cellDate)) {
          return 1; // cellValue is after the filter date
        }
        return 0; // cellValue is the same as the filter date
      },
    },
  },
];

function App() {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
}

export default App;
