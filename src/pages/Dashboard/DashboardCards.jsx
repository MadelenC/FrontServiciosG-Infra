import { useNavigate } from "react-router-dom";
import {
  FaBus,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaCalendar,
  FaClipboardList,
  FaMoneyBill
} from "react-icons/fa";

export default function DashboardCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Viajes del Mes",
      value: 57,
      desc: "Total de viajes registrados",
      icon: <FaBus size={20} />,
      route: "/viajes",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      trend: "+12%",
      border: "border-blue-500"
    },
    {
      title: "Viajes Realizados",
      value: 268,
      desc: "Viajes completados",
      icon: <FaCheckCircle size={20} />,
      route: "/viajes",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      trend: "+8%",
      border: "border-green-500"
    },
    {
      title: "Viajes Pendientes",
      value: 3,
      desc: "En espera de aprobación",
      icon: <FaClock size={20} />,
      route: "/viajes",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      trend: "-2%",
      border: "border-orange-400"
    },
    {
      title: "Usuarios",
      value: 12,
      desc: "Usuarios registrados",
      icon: <FaUsers size={20} />,
      route: "/home",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-500"
    },
    {
      title: "Calendario",
      desc: "Programación de viajes",
      icon: <FaCalendar size={20} />,
      route: "/viajes/calendar",
      color: "text-cyan-600",
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      border: "border-cyan-500"
    },
    {
      title: "Autorizaciones",
      desc: "Control de salidas",
      icon: <FaClipboardList size={20} />,
      route: "/autorizacion",
      color: "text-pink-500",
      bg: "bg-pink-50 dark:bg-pink-900/20",
      border: "border-pink-400"
    },
    {
      title: "Presupuestos",
      desc: "Gestión financiera",
      icon: <FaMoneyBill size={20} />,
      route: "/presupuestos",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-400"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

      {cards.map((card, i) => (
        <div
          key={i}
          onClick={() => navigate(card.route)}
          className={`
            bg-white dark:bg-gray-900
            border border-gray-100 dark:border-gray-800
            border-t-4 ${card.border}
            rounded-2xl p-5 cursor-pointer
            shadow-sm hover:shadow-md
            transition-all duration-300
            hover:-translate-y-1
          `}
        >
          {/* ICON */}
          <div className="flex justify-between items-center mb-3">

            <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
              {card.icon}
            </div>

            {card.trend && (
              <span className={`text-xs font-semibold ${
                card.trend.includes("+") ? "text-green-500" : "text-red-500"
              }`}>
                {card.trend}
              </span>
            )}

          </div>

          {/* CONTENT */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {card.title}
          </p>

          {card.value ? (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </h2>
          ) : (
            <span className="text-sm text-indigo-500 font-medium">
              Ver módulo →
            </span>
          )}

          <p className="text-xs text-gray-400">
            {card.desc}
          </p>
        </div>
      ))}

    </div>
  );
}