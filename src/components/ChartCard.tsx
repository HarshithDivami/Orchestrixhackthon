import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartCardProps {
  title: string;
  type: "area" | "bar";
}

export function ChartCard({ title, type }: ChartCardProps) {
  const revenueData = [
    { month: "Jan", value: 42000 },
    { month: "Feb", value: 45000 },
    { month: "Mar", value: 53000 },
    { month: "Apr", value: 58000 },
    { month: "May", value: 61000 },
    { month: "Jun", value: 67000 },
  ];

  const projectData = [
    { status: "Completed", count: 45 },
    { status: "In Progress", count: 24 },
    { status: "On Hold", count: 8 },
    { status: "Planning", count: 12 },
  ];

  const data = type === "area" ? revenueData : projectData;

  return (
    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200">
      <h3 className="text-slate-800 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="colorValue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                color: "#1e293b",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <XAxis dataKey="status" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                color: "#1e293b",
              }}
            />
            <Bar
              dataKey="count"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}