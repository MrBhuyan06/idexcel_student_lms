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
  const [editData, setEditData] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  //   const [allrowData, setAllRowsData] = useState([]);
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const SimpleComp = (p) => {
    const onEdit = useCallback(() => {
      setIsModalOpen(!IsModalOpen);
      setEditValue(!editValue);
      setEditData(p.data);
      console.log(p.data);
    });
    const onDelete = useCallback(() => {
      console.log(rowsData);
      //   const filterDelData = rowsData.filter((data) => {
      //     console.log(rowsData);
      //     console.log(data);
      //     console.log(data.Id != p.data.Id);
      //     return data.Id !== p.data.Id;
      //   });
      //   console.log(filterDelData);
      //   setRowsData(filterDelData);
      //   console.log(p.data.Name);
    }, [p.Id, rowsData]);

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
            onClick={onDelete}
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
    { field: "Action", cellRenderer: SimpleComp },
  ]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event.data.Id);
    // if (event.colDef.field === "Action") {
    //   setIsModalOpen(!IsModalOpen);
    // }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(!IsModalOpen);
    setEditValue(false);
  };

  // edit Logic
  // const editDataFilter = rowsData.find((data) => {
  //   return data.Id === editData?.Id;
  // });

  // console.log(editDataFilter);

  // const updatedTaskIndex = rowsData.findIndex((data) => {
  //   return data.Id === editDataFilter?.Id;
  // });
  // console.log(updatedTaskIndex);
  // rowsData.splice(updatedTaskIndex, 1);
  // setRowsData(editDataFilter);

  useEffect(() => {
    // console.log("useEffect");
    setRowsData(rowData);
    // setAllRowsData(rowData);
  }, []);

  //   if (rowsData.length === 0) {
  //     return;
  //   }
  console.log(rowsData);
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="p-2 bg-blue-400 rounded-md hover:bg-blue-500 "
      >
        Add Student
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
