import { useMemo } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useOrderApprovalStore }
from "../../zustand/useOrderApprovalStore";

export default function DashboardChart() {

  const { orders } =
    useOrderApprovalStore();

  const data = useMemo(() => {

    const grouped = {};

    orders.forEach((o) => {

      const taller =
        o.taller || "Sin taller";

      grouped[taller] =
        (grouped[taller] || 0) + 1;

    });

    return Object.entries(grouped)
      .map(([name, total]) => ({
        name,
        total,
      }));

  }, [orders]);

  return (

    <div className="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-2xl p-6 shadow-sm
    ">

      <div className="mb-5">

        <h2 className="
          text-lg font-semibold
          text-gray-800 dark:text-white
        ">
          Solicitudes por Taller
        </h2>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.2}
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#4F46E5"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}