const fetchPeople = async (page: number, pageSize: number, filter: string) => {
  try {
    // @TODO: Make API Call here
    console.log("fetch People called");
    return [];
  } catch (error) {
    console.log("error at fetchPeople: ", error);
  }
};

const PeopleService = {
  fetchPeople,
};

export default PeopleService;
