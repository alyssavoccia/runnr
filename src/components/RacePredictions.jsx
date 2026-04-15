import { Award } from "lucide-react";

const RacePredictions = () => {
  const predictions = [
    { label: "5K", time: "21:12", dist: "3.1 mi" },
    { label: "10K", time: "43:59", dist: "6.2 mi" },
    { label: "Half Marathon", time: "1:37:29", dist: "13.1 mi" },
    { label: "Marathon", time: "3:22:41", dist: "26.2 mi" },
  ];

  return (
    <div className="card w-full opacity-0 animate-fade-up animation-delay-450">
      <div className="card-header">
        <h2 className="card-title">Race Predictions</h2>
        <span className="card-badge">Riegel Formula</span>
      </div>
      <div className="flex flex-col gap-2 py-4 px-5.5">
        {predictions.map((race, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-3 px-4 border rounded-lg ${race.label === "Marathon" ? "bg-brand-600 border-brand-600 shadow-md shadow-brand-600/40" : "bg-app-background border-app-border"}`}
          >
            <div className="flex items-center gap-2">
              <Award className={`${race.label === "Marathon" ? "text-white" : ""}`} />
              <div>
                <p className={`text-xs ${race.label === "Marathon" ? "text-brand-50" : "text-brand-muted"}`}>{race.label}</p>
                <p className={`text-xs ${race.label === "Marathon" ? "text-brand-50" : "text-brand-muted"}`}>{race.dist}</p>
              </div>
            </div>
            <p className={`font-heading font-bold ${race.label === "Marathon" ? "text-white" : ""}`}>{race.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RacePredictions;
