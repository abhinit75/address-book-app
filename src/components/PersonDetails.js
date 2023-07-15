import React from "react";
import { useParams } from "react-router-dom";

const PersonDetails = ({ persons }) => {
  const { id } = useParams();
  const person = persons[id];

  if (!person) {
    return <div>No person found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{`${person.name.first} ${person.name.last}`}</h1>
      <p className="mb-2">
        <strong>Email: </strong>
        {person.email}
      </p>
      <p className="mb-2">
        <strong>Phone: </strong>
        {person.phone}
      </p>
      <p className="mb-2">
        <strong>Location: </strong>
        {`${person.location.street.name} ${person.location.street.number}, ${person.location.city}, ${person.location.state}, ${person.location.country}`}
      </p>
    </div>
  );
};

export default PersonDetails;
