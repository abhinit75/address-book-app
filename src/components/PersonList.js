import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PersonList = ({ persons }) => {
  const [search, setSearch] = useState({
    query: "",
    list: [],
  });

  // Watch for changes in the persons prop
  useEffect(() => {
    setSearch((prevSearch) => ({ ...prevSearch, list: persons }));
  }, [persons]);

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
  return (
    <div className="flex flex-wrap p-4">
      <h1 className="text-2xl font-bold mb-4 w-full">Address Book</h1>
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
              className="w-full h-64 object-cover"
              src={person.picture.large}
              alt={`${person.name.first} ${person.name.last}`}
            />
            <div className="p-4">
              <h2 className="text-xl">{`${person.name.first} ${person.name.last}`}</h2>
              <p className="text-gray-500">{person.email}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PersonList;
