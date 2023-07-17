import { useParams } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const PersonDetails = ({ persons }) => {
  const { id } = useParams();
  const person = persons[id];

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex">
          <div className="w-1/3">
            <img
              className="rounded-full w-64 mx-auto"
              src={person.picture.large}
              alt={`${person.name.first} ${person.name.last}`}
            />
          </div>
          <div className="w-2/3 pl-6">
            <h2 className="text-2xl font-bold">{`${person.name.first} ${person.name.last}`}</h2>
            <p className="text-gray-500">{person.email}</p>
            <ul className="text-xl list-inside list-disc mt-4 space-y-2">
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
};

export default PersonDetails;
