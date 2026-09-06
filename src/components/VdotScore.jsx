import { getTagAccentColor, getTagColor } from "@/data/tags";

const VdotScore = () => {
  return (
    <div className="card w-full opacity-0 animate-fade-up animation-delay-400">
      <div className="card-header">
        <h2 className="card-title">VDOT Score</h2>
        <span className="card-badge">Jack Daniels Formula</span>
      </div>
      <div className="py-5 px-5.5">
        <div className="flex flex-wrap items-end justify-between pb-4.5 border-b border-app-border mb-4.5">
          <div>
            <p className="font-semibold text-xxs text-brand-muted uppercase tracking-widest mb-1">Your Score</p>
            <p className="font-heading font-extrabold text-5xl text-brand-600 tracking-tight leading-none">46.5</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-xxs text-brand-muted uppercase tracking-widest mb-1">Fitness Level</p>
            <p className="bg-brand-50 border border-brand-200 font-bold text-xs text-brand-700 py-1 px-3 rounded-full">
              Intermediate
            </p>
          </div>
        </div>
        <p className="font-bold text-xxs text-brand-muted uppercase tracking-widest mb-3">Training Pace Zones</p>
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className={`w-0.5 h-4 ${getTagAccentColor("easy")} rounded-full shrink-0`}></div>
          <p className="text-sm text-brand-mid flex-1">Easy</p>
          <p className={`font-medium text-xs ${getTagColor("easy")}`}>8:44 - 9:36</p>
        </div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className={`w-0.5 h-4 ${getTagAccentColor("race")} rounded-full shrink-0`}></div>
          <p className="text-sm text-brand-mid flex-1">Marathon</p>
          <p className={`font-medium text-xs ${getTagColor("race")}`}>7:37 - 7:51</p>
        </div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className={`w-0.5 h-4 ${getTagAccentColor("tempo")} rounded-full shrink-0`}></div>
          <p className="text-sm text-brand-mid flex-1">Threshold</p>
          <p className={`font-medium text-xs ${getTagColor("tempo")}`}>7:16 - 7:30</p>
        </div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className={`w-0.5 h-4 ${getTagAccentColor("interval")} rounded-full shrink-0`}></div>
          <p className="text-sm text-brand-mid flex-1">Interval</p>
          <p className={`font-medium text-xs ${getTagColor("interval")}`}>6:32 - 6:44</p>
        </div>
        <p className="text-xxs text-brand-muted pt-4 mt-4 border-t border-brand-100">
          Based on 5K in 21:12 on March 20, 2026
        </p>
      </div>
    </div>
  );
};

export default VdotScore;
