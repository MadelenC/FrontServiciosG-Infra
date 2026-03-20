import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

import PageMeta from "../../components/common/PageMeta";
import { useTripsStore } from "../../../src/zustand/useTripsStore";

import TripsRow from "../../components/Trips/tables/TripsRow";

const Calendar = () => {
  const { trips, fetchTrips } = useTripsStore();

  const [events, setEvents] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const calendarRef = useRef(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  // 🎨 COLORES POR ESTADO + FECHA
  const getColor = (trip) => {
    const hoy = new Date();
    const inicio = new Date(trip.fecha_inicial);
    const fin = new Date(trip.fecha_final);

    const estado = (trip.estado || "").toLowerCase();

    if (estado === "cancelado") return "#ef4444"; // rojo

    if (fin < hoy) return "#22c55e"; // verde (concluido)

    if (inicio <= hoy && fin >= hoy) return "#f59e0b"; // amarillo

    if (inicio > hoy) return "#3b82f6"; // azul

    return "#3b82f6";
  };

  // 📌 MAPEAR TRIPS A EVENTOS
  useEffect(() => {
    if (!trips) return;

    const mapped = trips.map((trip) => ({
      id: trip.id,
      title: trip.entidad || "Viaje",

      start: trip.fecha_inicial,
      end: trip.fecha_final,

      allDay: true,

      extendedProps: {
        trip,
      },

      backgroundColor: getColor(trip),
    }));

    setEvents(mapped);
  }, [trips]);

  // 📌 CLICK EN EVENTO
  const handleEventClick = (clickInfo) => {
    const trip = clickInfo.event.extendedProps.trip;
    setSelectedTrip(trip);
  };

  return (
    <>
      <PageMeta title="Calendario de Viajes" description="Sistema de viajes" />

      {/* TITULO */}
      <div className="text-center my-4">
        <h1 className="text-3xl font-bold">Calendario de Viajes</h1>

        <div className="text-sm text-gray-600 mt-2">
          <p>🟢 Verde: Viaje concluido</p>
          <p>🟡 Amarillo: En proceso</p>
          <p>🔵 Azul: Próximo viaje</p>
          <p>🔴 Rojo: Cancelado</p>
        </div>
      </div>

      {/* CALENDARIO */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl border">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={esLocale}
          firstDay={1}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventClick={handleEventClick}
        />
      </div>

      {/* 🔥 MODAL CON TABLA COMPLETA */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] max-w-6xl rounded-xl shadow-lg p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-600"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">
              Detalle del Viaje
            </h2>

            {/* 🔥 TABLA COMPLETA */}
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Entidad</th>
                  <th>Tipo</th>
                  <th>Objetivo</th>
                  <th>Días</th>
                  <th>Pasajeros</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                <TripsRow
                  trip={selectedTrip}
                  onOpenModal={() => {}}
                  onCancelTrip={(id) => {
                    const updated = trips.map(t =>
                      t.id === id ? { ...t, estado: "Cancelado" } : t
                    );
                    useTripsStore.setState({ trips: updated });
                  }}
                />
              </tbody>
            </table>

          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;