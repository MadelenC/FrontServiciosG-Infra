import { useEffect } from "react";

import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

import { useOrderApprovalStore }
from "../../zustand/useOrderApprovalStore";

import { useUserStore }
from "../../zustand/userStore";

export default function DashboardCards() {

  const {
    orders,
    fetchOrders,
  } = useOrderApprovalStore();

  const {
    users,
    fetchUsers,
  } = useUserStore();

  useEffect(() => {

    fetchOrders();
    fetchUsers();

  }, []);

  const aceptados =
    orders.filter(
      (o) => o.aprobacion === "aceptado"
    ).length;

  const rechazados =
    orders.filter(
      (o) => o.aprobacion === "rechazado"
    ).length;

  const cards = [

    {
      title: "Solicitudes",
      value: orders.length,
      icon: <FaClipboardList size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-500",
    },

    {
      title: "Aprobadas",
      value: aceptados,
      icon: <FaCheckCircle size={20} />,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-500",
    },

    {
      title: "Rechazadas",
      value: rechazados,
      icon: <FaTimesCircle size={20} />,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-500",
    },

    {
      title: "Usuarios",
      value: users.length,
      icon: <FaUsers size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-500",
    },

  ];

  return (

    <div className="
      grid grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-5
    ">

      {cards.map((card, i) => (

        <div
          key={i}
          className={`
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            border-l-4 ${card.border}
            rounded-2xl p-5
            shadow-sm
          `}
        >

          <div className="
            flex justify-between items-center mb-4
          ">

            <div className={`
              p-3 rounded-xl
              ${card.bg}
              ${card.color}
            `}>
              {card.icon}
            </div>

          </div>

          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <h2 className="
            text-3xl font-bold
            text-gray-900 dark:text-white
          ">
            {card.value}
          </h2>

        </div>

      ))}

    </div>

  );

}