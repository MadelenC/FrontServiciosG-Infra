import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import {
  FaClipboardList,
  FaTools,
  FaUsers,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Solicitudes",
      subtitle: "Gestión de solicitudes",
      icon: <FaClipboardList size={24} />,
      route: "/solicitudes",
      color: "from-indigo-500 to-blue-500",
      glow: "shadow-indigo-500/20",
    },

    {
      title: "Mantenimientos",
      subtitle: "Pedidos y control",
      icon: <FaTools size={24} />,
      route: "/pedido",
      color: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/20",
    },

    {
      title: "Usuarios",
      subtitle: "Administración del sistema",
      icon: <FaUsers size={24} />,
      route: "/usuarios",
      color: "from-fuchsia-500 to-purple-500",
      glow: "shadow-fuchsia-500/20",
    },

  ];

  return (

    <div className="space-y-8">

      <PageMeta
        title="Dashboard"
        description="Sistema Administrativo"
      />

      <PageBreadcrumb pageTitle="Dashboard" />

      {/* ================= HERO ================= */}

      <div
        className="
          relative overflow-hidden
          rounded-[34px]
          h-[320px]
          shadow-2xl
        "
      >

        {/* IMAGEN */}

        <img
          src="https://infraestructura.uatf.edu.bo/img/tres.jpg"
          alt="UATF"
          className="
            absolute inset-0
            w-full h-full
            object-cover
            scale-105
          "
        />

        {/* OVERLAY */}

        <div className="
          absolute inset-0
          bg-black/65
          backdrop-blur-[2px]
        " />

        {/* EFECTO */}

        <div className="
          absolute
          -top-20
          -right-20
          w-72 h-72
          rounded-full
          bg-white/10
          blur-3xl
        " />

        {/* CONTENIDO */}

        <div className="
          relative z-10
          h-full
          flex flex-col
          justify-center
          items-center
          text-center
          px-6
        ">

          {/* LOGO */}

          <div className="
            relative
            w-28 h-28
            rounded-full
            overflow-hidden
            border border-white/30
            shadow-2xl
            mb-6
            bg-white/10
            backdrop-blur-md
          ">

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzIA0oXO4nlNelb3xVEbIz4kbVTczb4UIGfA&s"
              alt="Logo"
              className="
                w-full h-full
                object-cover
              "
            />

          </div>

          {/* TITULO */}

          <h1 className="
            text-4xl md:text-5xl
            font-black
            tracking-tight
            text-white
            leading-tight
          ">
            UNIVERSIDAD AUTÓNOMA
            <br />
            TOMÁS FRÍAS
          </h1>

          <p className="
            mt-4
            text-white/80
            max-w-2xl
            text-sm md:text-base
            leading-relaxed
          ">
            Sistema Administrativo de
            Solicitudes y Gestión Institucional
          </p>

        </div>

      </div>

      {/* ================= CARDS ================= */}

      <div className="
        grid grid-cols-1
        md:grid-cols-3
        gap-6
        -mt-14
        relative
        z-20
      ">

        {actions.map((item, i) => (

          <div
            key={i}
            onClick={() => navigate(item.route)}
            className={`
              group
              relative overflow-hidden
              rounded-[28px]
              p-7
              cursor-pointer
              transition-all duration-500
              hover:-translate-y-2
              hover:shadow-2xl
              ${item.glow}

              bg-white/80
              dark:bg-gray-900/80
              backdrop-blur-xl

              border border-white/40
              dark:border-gray-800
            `}
          >

            {/* EFECTO */}

            <div className={`
              absolute top-0 right-0
              w-32 h-32
              rounded-full
              blur-3xl
              opacity-20
              bg-gradient-to-br
              ${item.color}
            `} />

            {/* ICON */}

            <div className={`
              relative z-10
              w-16 h-16
              rounded-2xl
              flex items-center justify-center
              text-white
              shadow-lg
              bg-gradient-to-br
              ${item.color}
              group-hover:scale-110
              transition-transform duration-300
            `}>
              {item.icon}
            </div>

            {/* BODY */}

            <div className="relative z-10 mt-6">

              <h2 className="
                text-2xl
                font-bold
                text-gray-800
                dark:text-white
              ">
                {item.title}
              </h2>

              <p className="
                mt-2
                text-sm
                text-gray-500
              ">
                {item.subtitle}
              </p>

              <div className="
                mt-5
                text-sm
                font-semibold
                text-indigo-500
              ">
                Acceder →
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}