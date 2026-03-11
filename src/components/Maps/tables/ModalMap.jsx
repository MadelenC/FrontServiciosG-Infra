import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ModalMap({ lat, lng, onClose, destino }) {
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" bg-white rounded-lg p-4 w-96 h-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 font-bold"
          onClick={onClose}
        >
          X
        </button>
        <MapContainer center={[lat, lng]} zoom={13} className="w-full h-full">
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
  );
}
