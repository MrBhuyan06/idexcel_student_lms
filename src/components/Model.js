import React, { useState } from "react";
import { generateUniqueId } from "../constant.js";

const Model = ({
  rowData,
  rowDataFn,
  edit,
  editDatas,
  setEditDatas,
  setModelOpenHandleFn,
  IsModalOpenHandle,
  setActiveFn,
  setActiveVar,
  setViewDataFn,
  setViewDataVar,
  setViewValue,
}) => {
  console.log("edit", edit);
  console.log("editData", editDatas);
  console.log("read data", setViewDataVar);
  console.log("view", setViewValue);
  const [name, setName] = useState("");
  const [Age, setAge] = useState();
  const [Dob, setDob] = useState("");
  const [Std, setStd] = useState("");
  const [Address, setAddress] = useState("");
  const [Gender, setGender] = useState("male");
  const [rowssData, setRowssData] = useState({});

  function handleAdd() {
    setRowssData({
      ...rowssData,
      Id: generateUniqueId(),
      Name: name,
      Age: Number(Age),
      Dob: Dob,
      Std: Std,
      Address: Address,
      Gender: Gender,
    });
    setEditDatas([]);
  }
  function editHandler() {
    const updateState = rowData.map((item) => {
      if (item.Id === editDatas.Id) {
        return { ...item, ...editDatas };
      }
      return item;
    });
    rowDataFn(updateState);
    setEditDatas([]);
  }

  function closHandler() {
    setEditDatas([]);

    console.log(editDatas);
    setModelOpenHandleFn(false);
    setActiveFn(true);
  }

  return (
    <>
      <div
        className="border-2 rounded-md p-4 bg-slate-300  shadow-2xl "
        style={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingRight: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
        }}
      >
        {" "}
        <div className="flex items-center  justify-between">
          <p className="text-center text-lg font-bold ">
            {edit ? "Edit" : "Add Student"}
          </p>
          <img
            className="w-10 cursor-pointer"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmDceIqxqEV1HwV2yYz9l0IswPDhYkjKqrUdMWfFSbg&s"
            alt=""
            onClick={closHandler}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            rowDataFn([...rowData, rowssData]);
            edit ? editHandler() : handleAdd();
          }}
        >
          <div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your name?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setName(e.target.value);

                  setEditDatas({ ...editDatas, Name: e.target.value });
                }}
                value={
                  editDatas?.Name || setViewDataVar?.Name
                    ? editDatas.Name || setViewDataVar.Name
                    : name
                }
                disabled={setViewValue}
              />
            </div>

            {/* dob */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your Dob?</span>
              </label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={
                  editDatas?.Dob || setViewDataVar?.Dob
                    ? editDatas?.Dob || setViewDataVar?.Dob
                    : Dob
                }
                onChange={(e) => {
                  setDob(e.target.value);
                  console.log(typeof e.target.value);
                  setEditDatas({ ...editDatas, Dob: e.target.value });
                }}
                disabled={setViewValue}
              />
            </div>

            {/* age */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your Age?</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                disabled
                // onChange={(e) => {
                //   setAge(e.target.value);

                //   setEditDatas({ ...editDatas, Age: e.target.value });
                // }}
                value={Age}
              />
            </div>

            {/* Std */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">In Which std Do you read</span>
              </label>
              <select
                className="select select-bordered"
                onChange={(e) => {
                  setStd(e.target.value);
                  console.log(typeof e.target.value);
                  if (e.target.value === "1") {
                    setAge(6);
                  } else {
                    setAge(Number(e.target.value) + 6);
                  }
                  setEditDatas({ ...editDatas, Std: e.target.value });
                }}
                // value={editDatas?.Std}
                value={
                  editDatas?.Std || setViewDataVar?.Std
                    ? editDatas?.Std || setViewDataVar?.Std
                    : ""
                }
                disabled={setViewValue}
              >
                <option disabled selected>
                  Std
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </div>

            <div className="form-control flex flex-row gap-2 mt-2">
              Male
              <input
                type="radio"
                name="radio-1"
                // // checked={editDatas?.Gender === "male"}
                // checked
                onClick={() => {
                  setGender("male");
                }}
                className="radio"
                value={
                  editDatas?.Gender || setViewDataVar?.Gender
                    ? editDatas?.Gender || setViewDataVar?.Gender
                    : "male"
                }
                checked={
                  editDatas?.Gender === "male" ||
                  setViewDataVar?.Gender === "male" ||
                  Gender
                }
                disabled={setViewValue}
              />
              Female
              <input
                type="radio"
                name="radio-1"
                checked={
                  editDatas?.Gender === "female" ||
                  setViewDataVar?.Gender === "female" ||
                  Gender
                }
                onClick={() => {
                  setGender("female");
                }}
                className="radio"
                value={
                  editDatas?.Gender || setViewDataVar?.Gender
                    ? editDatas?.Gender || setViewDataVar?.Gender
                    : "female"
                }
                disabled={setViewValue}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Address</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                  setEditDatas({ ...editDatas, Address: e.target.value });
                }}
                value={
                  editDatas?.Address || setViewDataVar?.Address
                    ? editDatas?.Address || setViewDataVar?.Address
                    : Address
                }
                disabled={setViewValue}
              ></textarea>
            </div>
          </div>
          {edit ? (
            <button
              // onClick={}
              className="p-2 bg-blue-400 rounded-md hover:bg-blue-500  mt-2"
            >
              edit
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="p-2 bg-blue-400 rounded-md hover:bg-blue-500  mt-2"
              disabled={setViewValue}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Model;
