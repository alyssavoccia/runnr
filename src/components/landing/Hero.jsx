import { MoveRight } from "lucide-react";
import { ResponsiveContainer, Area, AreaChart, Tooltip, XAxis } from "recharts";

const DASHBOARD_STATS = [
  { label: "miles", value: "38.2" },
  { label: "time", value: "5:14" },
  { label: "runs", value: "5" },
  { label: "elev", value: "1,240" },
];

const CHART_DATA = [
  { week: "W1", miles: 12 },
  { week: "W2", miles: 18 },
  { week: "W3", miles: 15 },
  { week: "W4", miles: 22 },
  { week: "W5", miles: 28 },
  { week: "W6", miles: 24 },
  { week: "W7", miles: 30 },
  { week: "W8", miles: 34 },
  { week: "W9", miles: 29 },
  { week: "W10", miles: 36 },
  { week: "W11", miles: 40 },
  { week: "W12", miles: 38 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-app-border rounded px-3 py-2 shadow-sm text-xs">
      <div className="text-brand-muted mb-1">{label}</div>
      <div className="font-semibold">{payload[0].value} mi</div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-dvh grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center bg-white overflow-hidden w-full">
      {/* LEFT */}
      <div className="flex flex-col justify-center h-full px-10 pt-28 pb-0 md:pb-20">
        <h1 className="font-bold text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-tight mb-7 opacity-0 animate-fade-up animation-delay-100">
          Train with <br />
          <em className="italic text-brand-600">intention.</em>
          <br />
          Run with data.
        </h1>
        <p className="text-brand-mid leading-7 max-w-md mb-10 font-light opacity-0 animate-fade-up animation-delay-150">
          Import data from Apple Health or Garmin, auto-sync every run, and gain insights into your training.
        </p>
        <div className="flex items-center gap-5 flex-wrap opacity-0 animate-fade-up animation-delay-200">
          <a href="#" className="btn btn-primary py-3 px-7 drop-shadow drop-shadow-brand-600/40">
            Start for free
          </a>
          <button className="group cursor-pointer text-xs text-brand-muted hover:text-brand-dark flex items-center gap-1 transition duration-150 ease-in">
            Try live demo
            <MoveRight className="group-hover:translate-x-0.5 transition duration-150 ease-in" size={12} />
          </button>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex flex-col justify-center h-full md:bg-brand-50 md:border-l border-app-border px-10 md:pt-28 pb-20">
        <div className="opacity-0 animate-fade-up animation-delay-300 ">
          <div className="bg-white rounded-md border border-app-border shadow-lg shadow-brand-600/20">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-app-border bg-brand-50">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-brand-muted">runnrco.com/dashboard</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {DASHBOARD_STATS.map((stat) => (
                  <div key={stat.label} className="bg-brand-50 border border-app-border rounded px-2 md:px-3 py-2">
                    <p className="text-brand-muted text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="font-bold text-sm md:text-base">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-app-border rounded p-3 mb-3">
                <p className="text-xs text-brand-muted uppercase mb-2">Weekly Mileage</p>
                <div className="relative h-18">
                  <div className="relative h-18 min-w-25 w-full">
                    <ResponsiveContainer width="100%" height={72}>
                      <AreaChart data={CHART_DATA}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4165cd" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#4165cd" stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        <XAxis dataKey="week" hide />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }} />

                        <Area
                          type="monotone"
                          dataKey="miles"
                          stroke="#4165cd"
                          strokeWidth={2}
                          fill="url(#colorUv)"
                          dot={false}
                          activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-brand-50 border border-app-border rounded px-3 py-2">
                  <span className="text-sm flex-1">Morning Run</span>
                  <span className="text-xs text-green-700 px-2 py-0.5 rounded bg-green-100">Easy</span>
                  <span className="text-sm">8.2 mi</span>
                </div>
                <div className="flex items-center gap-3 bg-brand-50 border border-app-border rounded px-3 py-2">
                  <span className="text-sm flex-1">Long Run</span>
                  <span className="text-xs text-brand-700 px-2 py-0.5 rounded bg-brand-100">Long</span>
                  <span className="text-sm">16.0 mi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
