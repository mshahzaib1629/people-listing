"use client";
import { useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import {
  changeFilter,
  changePage,
  fetchPeopleThunk,
} from "@/store/slices/people";
import {
  Avatar,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "./people.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import BackdropLoading from "../BackdropLoading";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function People() {
  const { people, filter, page, pageSize, isLoading } = useSelector(
    (state: RootState) => state.people
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPeopleThunk());
  }, [filter, page]);

  function handlePageChange(direction: number) {
    dispatch(changePage(direction));
  }

  const handleChangeFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: "all" | "male" | "female"
  ) => {
    dispatch(changeFilter(newFilter));
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h4" component="h4">
        People Listing
      </Typography>
      <BackdropLoading isLoading={isLoading} />
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleChangeFilter}
        aria-label="Platform"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="male">Male</ToggleButton>
        <ToggleButton value="female">Female</ToggleButton>
      </ToggleButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow
                key={person.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Avatar alt="Remy Sharp" src={person.pictureUrl} />
                </TableCell>
                <TableCell align="left">{person.firstName}</TableCell>
                <TableCell align="left">{person.lastName}</TableCell>
                <TableCell align="left">{person.age}</TableCell>
                <TableCell align="left">
                  {person.gender.toUpperCase()}
                </TableCell>
                <TableCell align="left">{person.email}</TableCell>
                <TableCell align="left">
                  {
                    <Link href={`/${person.id}`}>
                      <VisibilityIcon />
                    </Link>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div className={"paginationButtons"}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(-1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        &nbsp;
        <Button variant="outlined" onClick={() => handlePageChange(+1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
