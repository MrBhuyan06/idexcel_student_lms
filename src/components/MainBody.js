import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { rowData } from "../constant.js";
import { useCallback } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import Model from "./Model.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  //   bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MainBody = () => {
  //define the col
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [activePage, setActivePage] = useState(true);
  const [editData, setEditData] = useState([]);
  const [rowsData, setRowsData] = useState(rowData);
  const [viewData, setViewsData] = useState();
  const [viewMode, setViewMode] = useState(false);
  console.log("log check", rowsData);
  //   const [allrowData, setAllRowsData] = useState([]);
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const SimpleComp = (p) => {
    console.log("render");
    console.log(p);
    console.log(p.colDef.cellRendererParams);
    // const { onDelete } = p.colDef.cellRendererParams;
    const onEdit = useCallback(() => {
      setIsModalOpen(!IsModalOpen);
      setEditValue(!editValue);
      setEditData(p.data);
      console.log(p.data);
    });
    const handleDelete = () => {
      onDelete(p.data);
    };

    return (
      <>
        <div className="flex gap-2">
          <button
            className="px-4 rounded-md text-center bg-red-100 "
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="px-4 rounded-md text-center bg-green-400"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </>
    );
  };

  const [colDef, setColDef] = useState([
    { field: "Name" },
    { field: "Dob" },
    { field: "Age" },
    { field: "Std" },
    { field: "Address" },
    { field: "Gender" },
    {
      field: "Action",
      cellRenderer: SimpleComp,
      //   cellRendererParams: {
      //     onDelete: (dataToDelete) => onDelete(dataToDelete),
      //   },
    },
  ]);

  const onDelete = (p) => {
    console.log("onDeleteOutSide");
    console.log(rowsData);

    const filteredData = rowsData.filter((data) => data.Id !== p.Id);
    setRowsData(filteredData);
  };

  const cellClickedListener = useCallback((event) => {
    // console.log("cellClicked", event.data.Id);

    if (event.colDef.field === "Name") {
      console.log("got the pont");
      console.log([event.data]);
      setViewsData(event.data);
      console.log(viewData);
      setViewMode(!viewMode);
      console.log(viewMode);
      setIsModalOpen(!IsModalOpen);
      setActivePage(!activePage);
    }
    // onDelete(event);
  });

  const handleOpenModal = () => {
    setIsModalOpen(!IsModalOpen);
    setEditValue(false);
    setActivePage(!activePage);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="p-2 bg-blue-400 rounded-md hover:bg-blue-500 "
      >
        {activePage ? "Add Student" : "Back"}
      </button>
      {IsModalOpen && (
        <Model
          rowData={rowsData}
          rowDataFn={setRowsData}
          edit={editValue}
          editDatas={editData}
          IsModalOpenHandle={IsModalOpen}
          setModelOpenHandleFn={setIsModalOpen}
          setEditDatas={setEditData}
          setActiveFn={setActivePage}
          setActiveVar={activePage}
          setViewDataFn={setViewsData}
          setViewDataVar={viewData}
          setViewValue={viewMode}
        />
      )}

      {IsModalOpen || (
        <div className="ag-theme-alpine" style={{ height: 400, width: 1400 }}>
          <AgGridReact
            rowData={rowsData}
            columnDefs={colDef}
            onCellClicked={cellClickedListener}
          ></AgGridReact>
        </div>
      )}
    </>
  );
};

export default MainBody;
