import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface WeekTimeData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; // Index signature for recharts compatibility
}

interface WeekTimeChartProps {
  data: WeekTimeData[];
}

function WeekTimeChart({ data }: WeekTimeChartProps) {
  return (
    <div className="bg-primary rounded-lg p-4 min-h-[300px] md:h-[41rem] flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 flex-shrink-0">
        <div>
          <p className="text-xs text-secondary">Statics</p>
          <h3 className="text-white font-medium text-sm md:text-base">Week time of projects</h3>
        </div>
        <select className="bg-base text-white text-xs px-3 py-2 md:px-2 md:py-1 rounded border border-secondary min-h-[44px] md:min-h-0">
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={24}
              formatter={(_value, entry: any) => (
                <span className="text-white text-xs">{entry.payload.name}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeekTimeChart;
