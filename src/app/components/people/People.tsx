"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { fetchPeopleThunk } from "@/store/slices/people";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 90,
  },

  { field: "email", headerName: "Email", width: 250 },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    gender: "Male",
    email: "laura.woods@example.com",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    gender: "Male",
    email: "laura.woods@example.com",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    gender: "Male",
    email: "laura.woods@example.com",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    gender: "Male",
    email: "laura.woods@example.com",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    gender: "Male",
    email: "laura.woods@example.com",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    gender: "Male",
    email: "laura.woods@example.com",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    gender: "Male",
  },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36, gender: "Male" },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, gender: "Male" },
];

export const People = () => {
  const { people } = useSelector((state: RootState) => state.people);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchPeopleThunk());
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>People Listing</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
