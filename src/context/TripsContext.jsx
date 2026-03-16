// src/context/TripsContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const TripsContext = createContext();

export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/viajes`);
      if (!response.ok) throw new Error("Error al cargar viajes");
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const addTrip = async (newTrip) => {
    try {
      const response = await fetch(`${API_URL}/viajes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrip),
      });
      if (!response.ok) throw new Error("Error agregando viaje");
      const savedTrip = await response.json();
      setTrips((prev) => [...prev, savedTrip]);
    } catch (error) {
      console.error("Error agregando viaje:", error);
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      const response = await fetch(`${API_URL}/viajes/${updatedTrip.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTrip),
      });
      if (!response.ok) throw new Error("Error actualizando viaje");
      const savedTrip = await response.json();
      setTrips((prev) =>
        prev.map((trip) => (trip.id === savedTrip.id ? savedTrip : trip))
      );
    } catch (error) {
      console.error("Error actualizando viaje:", error);
    }
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, updateTrip, loading }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => useContext(TripsContext);