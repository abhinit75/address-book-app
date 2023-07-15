import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "./api";
import PersonList from "./components/PersonList";
import PersonDetails from "./components/PersonDetails";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await api.get("?results=50");
        setPersons(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPersons();
  }, []);

  return (
    <Router>
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
