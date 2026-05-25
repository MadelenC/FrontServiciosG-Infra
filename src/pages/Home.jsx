import { useNavigate } from "react-router-dom";

import {
  FaTools,
  FaCar,
  FaBuilding,
} from "react-icons/fa";

export default function Home() {

  const navigate = useNavigate();

  const irLogin = (modulo) => {
    navigate(`/signin?module=${modulo}`);
  };

  const modules = [

    {
      title: "Mantenimiento",
      description:
        "Gestión de mantenimiento y solicitudes técnicas.",
      icon: <FaTools size={26} />,
      color:
        "text-indigo-400 bg-indigo-500/10",
      border:
        "hover:border-indigo-500/40",
      route:
        "mantenimiento",
    },

    {
      title: "Viajes",
      description:
        "Control y administración de viajes institucionales.",
      icon: <FaCar size={26} />,
      color:
        "text-cyan-400 bg-cyan-500/10",
      border:
        "hover:border-cyan-500/40",
      route:
        "viajes",
    },

    {
      title: "Servicios",
      description:
        "Administración de servicios y operaciones generales.",
      icon: <FaBuilding size={26} />,
      color:
        "text-emerald-400 bg-emerald-500/10",
      border:
        "hover:border-emerald-500/40",
      route:
        "servicios",
    },

  ];

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#020617]">

      
      <img
        src="https://virtual.uatf.edu.bo/pluginfile.php/1/theme_almondb/sliderimage1/1775771905/Gemini_Generated_Image_cmhqhmcmhqhmcmhq%20%281%29.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

 

      <div className="absolute inset-0 bg-[#020617]/85"></div>

   

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-black/40 to-cyan-950/20"></div>

    
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

   

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-indigo-300 text-xs mb-5">
            UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
          </p>

          <h1 className="text-white text-5xl md:text-6xl font-black leading-tight">
            Sistema Administrativo
          </h1>

          <p className="mt-5 text-white/60 text-sm md:text-base max-w-2xl">
            Plataforma institucional para gestión de mantenimiento,
            servicios y administración universitaria.
          </p>

        </div>

       

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

          {modules.map((item, index) => (

            <div
              key={index}
              onClick={() => irLogin(item.route)}
              className={`group cursor-pointer bg-[#111827] border border-[#1F2937] ${item.border} rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#172033] hover:shadow-2xl`}
            >

          

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                {item.icon}
              </div>

              

              <h2 className="text-2xl font-bold text-white mb-3">
                {item.title}
              </h2>


              <p className="text-sm leading-relaxed text-white/55">
                {item.description}
              </p>


              <div className="mt-8 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-all">
                Ingresar al módulo
                <span className="ml-2 transition-all group-hover:translate-x-1">
                  →
                </span>
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}