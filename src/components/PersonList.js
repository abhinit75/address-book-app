import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PersonList = ({ persons }) => {
  const [search, setSearch] = useState({
    query: "",
    list: [],
  });

  // Declare countries inside the component and update it with useEffect
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setSearch((prevSearch) => ({ ...prevSearch, list: persons }));
    setFilter((prevSearch) => ({ ...prevSearch, country: "All" }));
    const uniqueCountries = [
      ...new Set(persons.map((person) => person.location.country)),
    ];
    setCountries(uniqueCountries);
  }, [persons]);

  // handle the search bar functionality
  const handleChange = (e) => {
    const filteredUsers = persons.filter((person) =>
      `${person.name.first} ${person.name.last}`
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setSearch({
      query: e.target.value,
      list: filteredUsers,
    });
  };

  // Handling the filter panel
  const [filter, setFilter] = useState({
    country: "All",
  });

  const handleFilterChange = (e) => {
    let filteredUsers;

    if (e.target.value === "All") {
      filteredUsers = persons;
    } else {
      filteredUsers = persons.filter(
        (person) =>
          person.location.country.toLowerCase() === e.target.value.toLowerCase()
      );
    }

    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    setSearch({ query: "", list: filteredUsers });
  };

  return (
    <div className="flex">
      <div className="w-1/4 min-h-screen p-4 bg-gray-200">
        <h2 className="font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label htmlFor="country" className="block mb-2">
            Country
          </label>
          <select
            name="country"
            id="country"
            className="w-full p-2"
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {countries.map((country) => (
              <option value={country.toLowerCase()}>{country}</option>
            ))}
            {/* Add other country options here */}
          </select>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <div className="flex flex-wrap p-4">
          <input
            className="border rounded w-full py-2 px-3 text-grey-darker mb-4"
            type="text"
            placeholder="Search by name..."
            value={search.query}
            onChange={handleChange}
          />
          {search.list.map((person, index) => (
            <Link
              key={index}
              to={`/person/${index}`}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div className="border rounded shadow hover:shadow-lg transition duration-200 ease-in-out">
                <img
                  className="w-64 h-64 object-cover"
                  src={person.picture.large}
                  alt={`${person.name.first} ${person.name.last}`}
                />
                <div className="p-4">
                  <h2 className="text-xl">{`${person.name.first} ${person.name.last}`}</h2>
                  <p className="text-gray-500 text-xs truncate ...">
                    {person.email}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonList;
