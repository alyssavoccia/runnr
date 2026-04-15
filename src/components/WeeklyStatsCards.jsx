import { Route, Clock, Rocket, Activity } from "lucide-react";

const WeeklyStatsCards = () => {
  const cards = [
    {
      label: "Miles this week",
      value: 38.2,
      unit: "miles",
      icon: Route,
      trend: "+4.1 mi vs last week",
      trendType: "up",
      delay: "100",
    },
    {
      label: "Time this week",
      value: "5:14",
      unit: "h:mm",
      icon: Clock,
      trend: "+38 min vs last week",
      trendType: "up",
      delay: "150",
    },
    {
      label: "Avg pace",
      value: "7:34",
      unit: "/mile",
      icon: Rocket,
      trend: "−8 sec vs last week",
      trendType: "down",
      delay: "200",
    },
    {
      label: "Runs this week",
      value: 5,
      unit: "runs logged",
      icon: Activity,
      trend: "+1 run vs last week",
      trendType: "up",
      delay: "250",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-8">
      {cards.map(({ label, value, unit, icon: Icon, trend, trendType, delay }) => (
        <div
          key={label}
          className={`bg-white border border-app-border rounded-lg py-5 px-5.5 opacity-0 animate-fade-up animation-delay-${delay}`}
        >
          <div className="flex items-start justify-between mb-4">
            <p className="font-medium text-xs text-brand-muted">{label}</p>
            <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded bg-brand-100 text-brand-600">
              <Icon size={16} />
            </div>
          </div>
          <p className="font-heading font-extrabold text-3xl">{value}</p>
          <p className="text-xs text-brand-muted">{unit}</p>
          <p className={`text-xs font-semibold ${trendType === "up" ? "text-green-600" : "text-red-600"} mt-2.5`}>{trend}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyStatsCards;
