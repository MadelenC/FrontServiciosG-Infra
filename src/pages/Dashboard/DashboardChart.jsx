import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Ene", viajes: 40 },
  { name: "Feb", viajes: 25 },
  { name: "Mar", viajes: 60 },
  { name: "Abr", viajes: 35 },
  { name: "May", viajes: 80 },
  { name: "Jun", viajes: 55 },
];

export default function DashboardChart() {
  return (
    <div className="
      bg-white dark:bg-gray-900
      border border-gray-100 dark:border-gray-800
      p-6 rounded-2xl shadow-sm
    ">

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Viajes por mes
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
            }}
          />

          <Bar
            dataKey="viajes"
            fill="#4F46E5"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}