import { useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-app-border rounded-lg px-3 py-2.5 shadow-lg text-sm">
        <p className="text-brand-muted text-xs mb-1">{label}</p>
        <p className="font-bold">
          {payload[0].value} <span className="text-brand-muted text-xs">mi</span>
        </p>
        <p className="text-xs text-brand-muted">{payload[0].payload.runs} runs</p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, payload, data } = props;
  const isLatest = payload.week === data?.[data.length - 1]?.week;
  if (!cx || !cy) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={isLatest ? 3 : 2}
      fill={isLatest ? "#4165cd" : "#fff"}
      stroke={isLatest ? "#4165cd" : "#e0e9f9"}
      strokeWidth={1}
    />
  );
};

const MileageChart = ({ data }) => {
  const [activeChartTab, setActiveChartTab] = useState("12 wks");

  const avg = data.reduce((a, b) => a + b.miles, 0) / data.length;

  return (
    <div className="card opacity-0 animate-fade-up animation-delay-300">
      <div className="card-header">
        <h2 className="card-title">Weekly Mileage</h2>
        <div className="flex bg-app-background rounded-full p-0.5 border border-app-border">
          <div
            onClick={() => setActiveChartTab("12 wks")}
            className={`cursor-pointer font-semibold text-xs py-1 px-3 rounded-full transition duration-75 ease-in ${activeChartTab === "12 wks" ? "bg-white text-brand-600 shadow" : "text-brand-muted hover:text-brand-600"}`}
          >
            12 Wks
          </div>
          <div
            onClick={() => setActiveChartTab("6 mo")}
            className={`cursor-pointer font-semibold text-xs py-1 px-3 rounded-full transition duration-75 ease-in ${activeChartTab === "6 mo" ? "bg-white text-brand-600 shadow" : "text-brand-muted hover:text-brand-600"}`}
          >
            6 mo
          </div>
          <div
            onClick={() => setActiveChartTab("1 yr")}
            className={`cursor-pointer font-semibold text-xs py-1 px-3 rounded-full transition duration-75 ease-in ${activeChartTab === "1 yr" ? "bg-white text-brand-600 shadow" : "text-brand-muted hover:text-brand-600"}`}
          >
            1 yr
          </div>
        </div>
      </div>
      <div className="flex items-center py-4 px-5.5 border-b border-app-border">
        <div className="border-r border-app-border pr-6">
          <p className="font-heading font-bold text-xl tracking-tight leading-none">
            412 <span className="font-normal text-xs text-brand-muted">mi</span>
          </p>
          <p className="text-xxs text-brand-muted tracking-widest mt-px">Total</p>
        </div>
        <div className="border-r border-app-border px-6">
          <p className="font-heading font-bold text-xl tracking-tight leading-none">
            38.2 <span className="font-normal text-xs text-brand-muted">mi</span>
          </p>
          <p className="text-xxs text-brand-muted tracking-widest mt-px">This week</p>
        </div>
        <div className="border-r border-app-border px-6">
          <p className="font-heading font-bold text-xl tracking-tight leading-none">
            {avg.toFixed(1)} <span className="font-normal text-xs text-brand-muted">mi</span>
          </p>
          <p className="text-xxs text-brand-muted tracking-widest mt-px">Avg / week</p>
        </div>
        <div className="pl-6">
          <p className="font-heading font-bold text-xl tracking-tight leading-none">
            63 <span className="font-normal text-xs text-brand-muted">mi</span>
          </p>
          <p className="text-xxs text-brand-muted tracking-widest mt-px">Peak week</p>
        </div>
      </div>
      <div className="pt-6 pb-2">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 8 }}>
            <defs>
              <linearGradient id="mileageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4165cd" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#4165cd" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e9f9" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{
                fontFamily: "Google Sans",
                fontSize: 11,
                fill: "#5f6275",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontFamily: "Google Sans",
                fontSize: 11,
                fill: "#5f6275",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#f1f6fd",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <ReferenceLine y={parseFloat(avg)} stroke="#c8d9f5" strokeDasharray="4 4" strokeWidth={1.5} />
            <Area
              type="monotone"
              dataKey="miles"
              stroke="#4165cd"
              strokeWidth={2.5}
              fill="url(#mileageGrad)"
              dot={(props) => <CustomDot {...props} data={data} />}
              activeDot={{
                r: 6,
                fill: "#4165cd",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MileageChart;
