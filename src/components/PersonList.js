import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

const PersonList = React.memo(({ persons }) => {
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("All");

  // use Effect is triggered everytime either the persons list, search criteria or filter selection changes
  useEffect(() => {
    let filteredUsers = persons;

    // Apply country filter
    if (filter !== "All") {
      filteredUsers = filteredUsers.filter(
        (person) =>
          person.location.country.toLowerCase() === filter.toLowerCase()
      );
    }

    // Apply search filter
    if (search) {
      filteredUsers = filteredUsers.filter((person) =>
        `${person.name.first} ${person.name.last}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredPersons(filteredUsers);
  }, [persons, search, filter]);

  useEffect(() => {
    const uniqueCountries = [
      ...new Set(persons.map((person) => person.location.country)),
    ];
    setCountries(uniqueCountries);
  }, [persons]);

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
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            {countries.map((country, index) => (
              <option key={index} value={country.toLowerCase()}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <div className="flex flex-wrap p-4">
          <input
            className="border rounded w-full py-2 px-3 text-grey-darker mb-4"
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-gray-600 mb-4">
            Contacts: {filteredPersons.length}
          </div>
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {filteredPersons.map((person, index) => (
              <Link
                key={index}
                to={`/person/${index}`}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <li className="flex justify-between gap-x-6 py-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer p-4">
                  <div className="flex gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={person.picture.large}
                      alt={`${person.name.first} ${person.name.last}`}
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {`${person.name.first} ${person.name.last}`}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {person.email}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.gender}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Age: {person.dob.age}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default PersonList;
