import { useParams } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import React from "react";

const PersonDetails = React.memo(({ persons }) => {
  const { id } = useParams();
  const person = persons[id]; // persons is an object and each user has a unique uid generated to it

  return (
    <div className="h-screen p-6 overflow-y-auto bg-white dark:bg-gray-900">
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-700 dark:text-white">
        <div className="flex">
          <div className="w-1/3">
            <img
              className="w-64 mx-auto rounded-full"
              src={person.picture.large}
              alt={`${person.name.first} ${person.name.last}`}
            />
          </div>
          <div className="w-2/3 pl-6">
            <h2 className="text-2xl font-bold">{`${person.name.first} ${person.name.last}`}</h2>
            <p className="text-gray-500">{person.email}</p>
            <ul className="mt-4 space-y-2 text-xl list-disc list-inside">
              <li>
                <BsFillPersonFill className="inline mr-2" />{" "}
                {person.login.username}
              </li>
              <li>
                <FaPhoneAlt className="inline mr-2" /> {person.phone}
              </li>
              <li>
                <FaEnvelope className="inline mr-2" /> {person.email}
              </li>
              <li>
                <MdLocationOn className="inline mr-2" />{" "}
                {`${person.location.street.name} ${person.location.street.number}, ${person.location.city}, ${person.location.state}, ${person.location.country}`}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PersonDetails;
