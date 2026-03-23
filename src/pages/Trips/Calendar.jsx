import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import PageMeta from "../../components/common/PageMeta";
import { useTripsStore } from "../../../src/zustand/useTripsStore";
import TripsTable from "../../components/Trips/tables/TripsTable";

const Calendar = () => {
  const { trips, fetchTrips } = useTripsStore();

  const [events, setEvents] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const calendarRef = useRef(null);

  useEffect(() => {
    fetchTrips();
  }, []);
  const getColor = (trip) => {
    const hoy = new Date();
    const inicio = new Date(trip.fecha_inicial);
    const fin = new Date(trip.fecha_final);

    const estado = (trip.estado || "").toLowerCase();

    if (estado === "cancelado") return "#ef4444";
    if (fin < hoy) return "#22c55e";
    if (inicio <= hoy && fin >= hoy) return "#f59e0b";
    if (inicio > hoy) return "#3b82f6";

    return "#3b82f6";
  };

  // MAPEAR EVENTOS
  useEffect(() => {
    if (!trips) return;

    const mapped = trips.map((trip) => ({
      id: trip.id,
      title: trip.entidad || "Viaje",
      start: trip.fecha_inicial,
      end: trip.fecha_final,
      allDay: true,
      extendedProps: { trip },
      backgroundColor: getColor(trip),
    }));

    setEvents(mapped);
  }, [trips]);

  //CLICK para ABRIR MODAL
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

      {/*MODAL CON TODA LA TABLA */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[95%] max-w-7xl rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-3 right-3 text-gray font-bold bg-white-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">
              Gestión del Viaje
            </h2>

            <TripsTable externalTripId={selectedTrip.id} />

          </div>

        </div>
      )}
    </>
  );
};

export default Calendar;