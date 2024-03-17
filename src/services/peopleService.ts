import { Person } from "@/store/slices/people";
import axios from "axios";

const fetchPeople = async (page: number, pageSize: number, filter: string) => {
  try {
    const people: Person[] = [];
    // TODO: Prepare queryParams

    // @TODO: Make API Call here
    console.log("fetch People called");
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=${pageSize}&seed=abc&gender=${filter}`
    );

    if (response?.data?.results) {
      response?.data?.results.forEach((data: any) => {
        const person: Person = {
          id: data.login.uuid,
          firstName: data.name.first,
          lastName: data.name.last,
          address: {
            city: data.location.city,
            country: data.location.country,
            postCode: data.location.postcode,
          },
          age: data.dob.age,
          email: data.email,
          gender: data.gender,
          pictureUrl: data.picture.medium,
        };
        people.push(person);
      });
    }
    return people;
  } catch (error) {
    console.log("error at fetchPeople: ", error);
    return [];
  }
};

const PeopleService = {
  fetchPeople,
};

export default PeopleService;
