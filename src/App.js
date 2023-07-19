import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "./server/api";
import PersonList from "./components/PersonList";
import PersonDetails from "./components/PersonDetails";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const localData = localStorage.getItem("persons");

  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      if (localData) {
        setPersons(JSON.parse(localData));
        setLoading(false);
      } else {
        try {
          const response = await api.get("?results=100");
          const personsWithId = await response.data.results.map((person) => ({
            ...person,
            id: uuidv4(),
          }));
          const personsMap = await personsWithId.reduce((map, person) => {
            map[person.id] = person;
            return map;
          }, {});
          setPersons(personsMap);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchPersons();
  }, [localData]);

  if (loading) return <div>Loading...</div>; // replace with a loading animation
  if (error) return <div>Error: {error.message}</div>; // replace with a error component

  const clearData = () => {
    localStorage.removeItem("persons");
    window.location.reload(); // or you can fetch the data again and update the state.
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/person/:id"
          element={<PersonDetails persons={persons} />}
        />
        <Route path="/" element={<PersonList persons={persons} />} />
      </Routes>
    </Router>
  );
};

export default App;
