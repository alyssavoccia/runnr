import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown, Dot } from "lucide-react";
import { TAGS, getTagLabel, getTagColor, getTagBgColor, getTagBorder } from "@/data/tags";

const DATA = [
  {
    id: 1,
    date: "2026-03-28",
    name: "Morning Run",
    type: "easy",
    distance: "8.2",
    time: "1:02:02",
    pace: "7:34",
    src: "Apple Health",
  },
  {
    id: 2,
    date: "2026-03-27",
    name: "Long Run",
    type: "long",
    distance: "16.0",
    time: "2:11:12",
    pace: "8:12",
    src: "Apple Health",
  },
  {
    id: 3,
    date: "2026-03-25",
    name: "Tempo",
    type: "tempo",
    distance: "7.5",
    time: "51:00",
    pace: "6:48",
    src: "Apple Health",
  },
];

const WorkoutList = () => {
  const [activeTag, setActiveTag] = useState("all");

  const filteredWorkouts = activeTag !== "all" ? DATA.filter((workout) => workout.type === activeTag) : DATA;

  return (
    <div className="card opacity-0 animate-fade-up animation-delay-350">
      <div className="card-header">
        <h2 className="card-title">Recent Workouts</h2>
        <span className="card-badge">48 Workouts</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 py-3 px-5 border-b border-app-border">
        <button
          onClick={() => setActiveTag("all")}
          className={`cursor-pointer font-semibold text-xs py-1 px-3 border rounded-full transition duration-75 ease-in ${activeTag === "all" ? "bg-brand-dark text-white border-brand-dark" : "text-brand-muted border-app-border hover:border-brand-600 hover:text-brand-600"}`}
        >
          All
        </button>
        {TAGS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTag(id)}
            className={`cursor-pointer font-semibold text-xs py-1 px-3 border rounded-full transition duration-75 ease-in ${activeTag === id ? "bg-brand-dark text-white border-brand-dark" : "text-brand-muted border-app-border hover:border-brand-600 hover:text-brand-600"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {filteredWorkouts.length === 0 && <p className="text-sm text-brand-muted text-center py-5">No workouts found.</p>}
      {filteredWorkouts.map(({ id, date, name, type, pace, src, distance, time }) => (
        <div
          key={id}
          className="cursor-pointer flex items-center gap-4 py-4 px-5 border-b border-app-border transition duration-100 ease-in hover:bg-brand-50"
        >
          <div className="w-8 text-center">
            <p className="font-heading font-bold leading-none">{format(new Date(date), "dd")}</p>
            <p className="font-semibold text-xxs text-brand-muted uppercase tracking-wider mt-px">
              {format(new Date(date), "EEE")}
            </p>
          </div>
          <div className="w-px h-8 bg-app-border-mid shrink-0"></div>
          <div className="flex-1">
            <p className="flex items-center gap-2 font-semibold text-sm">
              {name}
              <span
                className={`font-bold text-xxs py-0.5 px-1.75 border rounded-full ${getTagColor(type)} ${getTagBorder(type)} ${getTagBgColor(type)}`}
              >
                {getTagLabel(type)}
              </span>
            </p>
            <p className="flex items-center text-xxs text-brand-muted mt-0.5">
              <span>{pace}/mi avg</span>
              <Dot size={12} />
              <span>{src}</span>
            </p>
          </div>
          <div className="flex gap-5 shrink-0">
            <div className="text-right">
              <p className="font-heading text-sm font-bold">{distance}</p>
              <p className="text-xxs text-brand-muted">mi</p>
            </div>
            <div className="text-right">
              <p className="font-heading text-sm font-bold">{time}</p>
              <p className="text-xxs text-brand-muted">time</p>
            </div>
          </div>
        </div>
      ))}
      <div className="cursor-pointer flex items-center justify-center gap-2 p-4 font-semibold text-xs text-brand-600 hover:bg-brand-50 transition duration-100 ease-in">
        <ChevronDown size={12} />
        Show all 48 workouts
      </div>
    </div>
  );
};

export default WorkoutList;
