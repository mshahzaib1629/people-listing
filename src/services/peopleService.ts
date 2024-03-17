import axios from "axios";

const fetchPeople = async (page: number, pageSize: number, filter: string) => {
  try {
    // TODO: Prepare queryParams
    
    // @TODO: Make API Call here
    console.log("fetch People called");
    const response = await axios.get(
      "https://randomuser.me/api/?page=1&results=5&seed=abc"
    );

    console.log("response: ", response);
    return [];
  } catch (error) {
    console.log("error at fetchPeople: ", error);
  }
};

const PeopleService = {
  fetchPeople,
};

export default PeopleService;
