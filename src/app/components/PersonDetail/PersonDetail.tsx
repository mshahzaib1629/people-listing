"use client";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Person } from "@/store/slices/people";

export default function PersonDetail(props: any) {
  const { people } = useSelector((state: RootState) => state.people);
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    const filtered = people.filter((person) => person.id === props.personId);
    if (filtered.length > 0) {
      setPerson(filtered[0]);
    }
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Typography variant="h4" component="h4">
        Person Detail
      </Typography>
      <Box sx={{ flexGrow: 1 }} style={{ marginTop: "60px" }}>
        <Grid container spacing={2}>
          <Grid xs={2} style={{ marginRight: "20px" }}>
            <Item>
              <Avatar
                alt="Remy Sharp"
                src={person?.pictureUrl}
                sx={{ width: 108, height: 108 }}
              />
            </Item>
          </Grid>
          <Grid xs={8}>
            <Typography variant="h6">
              First Name:{" "}
              <span>
                <Typography variant="body1">{person?.firstName}</Typography>
              </span>
            </Typography>
            <Typography variant="h6">
              Last Name:{" "}
              <span>
                <Typography variant="body1">{person?.lastName}</Typography>
              </span>
            </Typography>
            <Typography variant="h6">
              Age:{" "}
              <span>
                <Typography variant="body1">{person?.age}</Typography>
              </span>
            </Typography>
            <Typography variant="h6">
              Gender:{" "}
              <span>
                <Typography variant="body1">
                  {person?.gender.toUpperCase()}
                </Typography>
              </span>
            </Typography>
            <Typography variant="h6">
              Email:{" "}
              <span>
                <Typography variant="body1">{person?.email}</Typography>
              </span>
            </Typography>
            <Typography variant="h6">
              Address:{" "}
              <span>
                <Typography variant="body1">
                  {person?.address.city}, {person?.address.country} (
                  {person?.address.postCode})
                </Typography>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
