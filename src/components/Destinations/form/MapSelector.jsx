import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Icono del marcador
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapSelector({ open, onClose, onSelectLocation, initialLocation }) {
  const [position, setPosition] = useState(initialLocation || { lat: -17.393, lng: -66.158 });
  const [title, setTitle] = useState("");

  // Componente para manejar drag del marcador
  function DraggableMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return (
      <Marker
        position={position}
        draggable={true}
        icon={markerIcon}
        eventHandlers={{
          dragend: (e) => {
            setPosition(e.target.getLatLng());
          },
        }}
      >
        <Popup>Mueva el marcador para seleccionar ubicación</Popup>
      </Marker>
    );
  }

  if (!open) return null;

  const handleSave = () => {
    onSelectLocation({ ...position, title });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 p-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Inserte la ubicación en el mapa</h2>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            X
          </button>
        </div>

        {/* Formulario y mapa */}
        <div className="p-4 space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Título</label>
            <input
              type="text"
              placeholder="Ejemplo: Universidad Tomas Frias Potosi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          <MapContainer
            center={[position.lat, position.lng]}
            zoom={6}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <DraggableMarker />
          </MapContainer>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Latitud</label>
              <input
                type="text"
                value={position.lat.toFixed(6)}
                readOnly
                className="border px-2 py-1 rounded"
              />
              <small>Mueva la posición para generar este campo</small>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Longitud</label>
              <input
                type="text"
                value={position.lng.toFixed(6)}
                readOnly
                className="border px-2 py-1 rounded"
              />
              <small>Mueva la posición para generar este campo</small>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
