import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const irLogin = (modulo) => {
    console.log("Módulo seleccionado:", modulo);
    navigate(`/signin?module=${modulo}`);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      
      <img
        src="https://virtual.uatf.edu.bo/pluginfile.php/1/theme_almondb/sliderimage1/1775771905/Gemini_Generated_Image_cmhqhmcmhqhmcmhq%20%281%29.png"
        className="absolute inset-0 w-full h-full object-cover"
        alt="background"
      />

     
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-10">
          Mantenimiento Vehicular
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div
            onClick={() => irLogin("mantenimiento")}
            className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl hover:scale-105 transition duration-300 hover:bg-white/20"
          >
            <h2 className="text-2xl font-semibold mb-2">Mantenimiento</h2>
            <p className="text-sm text-gray-200">
              Gestión de solicitudes y control de mantenimiento
            </p>
          </div>

          {/* Viajes */}
          <div
            onClick={() => irLogin("viajes")}
            className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl hover:scale-105 transition duration-300 hover:bg-white/20"
          >
            <h2 className="text-2xl font-semibold mb-2">Viajes</h2>
            <p className="text-sm text-gray-200">
              Administración de viajes y reportes
            </p>
          </div>

          {/* Servicios */}
          <div
            onClick={() => irLogin("servicios")}
            className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl hover:scale-105 transition duration-300 hover:bg-white/20"
          >
            <h2 className="text-2xl font-semibold mb-2">Servicios</h2>
            <p className="text-sm text-gray-200">
              Gestión de servicios generales
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}