import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// 🔧 Fix para que el mapa renderice bien en modal
function FixMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

export default function ModalMap({ lat, lng, onClose, destino }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-lg w-96 h-96 flex flex-col relative">
        
        {/* HEADER */}
        <div className="flex justify-end p-2">
          <button
            className="text-gray-700 px-3 py-1 font-bold rounded hover:bg-gray-200"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* MAPA */}
        <div className="flex-1">
          <MapContainer center={[lat, lng]} zoom={13} className="w-full h-full">
            <FixMap />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker position={[lat, lng]}>
              <Popup>{destino}</Popup>
            </Marker>
          </MapContainer>
        </div>

      </div>
    </div>
  );
}
