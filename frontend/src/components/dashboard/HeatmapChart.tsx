interface HeatmapChartProps {
  data: number[][];
}

function HeatmapChart({ data }: HeatmapChartProps) {
  const getColor = (value: number) => {
    if (value === 0) return "#2A3F5F";
    if (value < 3) return "#4A5F7F";
    if (value < 5) return "#6A7F9F";
    if (value < 7) return "#8A9FBF";
    return "#CDFF9A";
  };

  const months = ["January", "February", "March", "April", "May"];
  const weeks = data.length;

  return (
    <div className="bg-primary rounded-lg p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div>
          <p className="text-xs text-secondary">Statics</p>
          <h3 className="text-white font-medium text-base">Average weekly time</h3>
        </div>
        <select className="bg-base text-white text-xs px-2 py-1 rounded border border-secondary">
          <option>Show all</option>
          <option>Last month</option>
        </select>
      </div>
      <div className="relative flex-1 flex flex-col justify-center">
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
          {data.map((week, weekIndex) => (
            <div key={weekIndex} className="grid gap-0.5" style={{ gridTemplateRows: `repeat(7, 1fr)` }}>
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: getColor(day) }}
                  title={`${day} hours`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-secondary">
          <span>{months[0]}</span>
          <span>{months[months.length - 1]}</span>
        </div>
        <p className="text-white text-center mt-1 text-sm font-medium">7 hours</p>
      </div>
    </div>
  );
}

export default HeatmapChart;
