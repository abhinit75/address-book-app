import { Link } from "react-router-dom";

const PersonList = ({ persons }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Address Book</h1>
      {persons.map((person, index) => (
        <Link key={index} to={`/person/${index}`} className="block mb-2">
          <div className="p-4 border rounded">
            <h2 className="text-xl">{`${person.name.first} ${person.name.last}`}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PersonList;
