import React from "react";
import { useParams } from "react-router-dom";

const PersonDetails = ({ persons }) => {
  const { id } = useParams();
  const person = persons[id];
  if (!person) {
    return <div>No person found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-8">
        <img
          className="w-full h-64 object-cover rounded"
          src={person.picture.large}
          alt={`${person.name.first} ${person.name.last}`}
        />
        <h1 className="text-2xl font-bold my-4">{`${person.name.first} ${person.name.last}`}</h1>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Contact</h2>
        <p>
          <strong>Email:</strong> {person.email}
        </p>
        <p>
          <strong>Phone:</strong> {person.phone}
        </p>
        <p>
          <strong>Cell:</strong> {person.cell}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Location</h2>
        <p>
          <strong>Street:</strong>{" "}
          {`${person.location.street.number} ${person.location.street.name}`}
        </p>
        <p>
          <strong>City:</strong> {person.location.city}
        </p>
        <p>
          <strong>State:</strong> {person.location.state}
        </p>
        <p>
          <strong>Country:</strong> {person.location.country}
        </p>
        <p>
          <strong>Postcode:</strong> {person.location.postcode}
        </p>
      </div>
    </div>
  );
};

export default PersonDetails;
