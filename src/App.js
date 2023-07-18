import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "./server/api";
import PersonList from "./components/PersonList";
import PersonDetails from "./components/PersonDetails";
import Header from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([]);
  const localData = localStorage.getItem("persons");

  useEffect(() => {
    const fetchPersons = async () => {
      if (localData) {
        setPersons(JSON.parse(localData));
      } else {
        try {
          const response = await api.get("?results=100");
          setPersons(response.data.results);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchPersons();
  }, [localData]);

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
