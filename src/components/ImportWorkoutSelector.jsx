import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { formatPace, formatDuration } from "@/utils/workoutHelpers";

const ImportWorkoutSelector = ({ workouts, onBack }) => {
  console.log(workouts);
  const [selectedWorkouts, setSelectedWorkouts] = useState(workouts.map((workout) => workout.id));
  const [workoutDateRange, setWorkoutDateRange] = useState("all");

  const formatMonthDay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatYear = (date) => {
    return new Date(date).getFullYear();
  };

  const toggleWorkout = (id) => {
    if (selectedWorkouts.includes(id)) {
      setSelectedWorkouts(selectedWorkouts.filter((workout) => workout !== id));
    } else {
      setSelectedWorkouts([...selectedWorkouts, id]);
    }
  };

  const toggleAllWorkouts = () => {
    if (selectedWorkouts.length === workouts.length) {
      setSelectedWorkouts([]);
    } else {
      setSelectedWorkouts(workouts.map((workout) => workout.id));
    }
  };

  const filtered = useMemo(
    () =>
      workouts.filter((workout) => {
        if (workoutDateRange === "all") {
          return true;
        } else if (workoutDateRange === "3m") {
          return new Date(workout.date) > new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000);
        } else if (workoutDateRange === "6m") {
          return new Date(workout.date) > new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
        } else if (workoutDateRange === "1year") {
          return new Date(workout.date) > new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
        }
      }),
    [workouts, workoutDateRange],
  );

  useEffect(() => {
    setSelectedWorkouts(filtered.map((workout) => workout.id));
  }, [workoutDateRange, workouts]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end opacity-0 animate-fade-up animation-delay-75">
        <button onClick={onBack} className="btn btn-secondary">
          <ChevronLeft /> Back
        </button>
      </div>
      <div className="relative flex items-center gap-4 bg-white border border-app-border rounded-lg py-5 px-6 mb-7 opacity-0 animate-fade-up animation-delay-100 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:rounded-l-lg before:h-full before:bg-green-600">
        <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-full bg-green-50 border border-green-300">
          <Check className="text-green-600" size={20} strokeWidth={3} />
        </div>
        <div className="flex-1">
          <p className="font-heading font-bold">File parsed successfully</p>
          <p className="text-xs text-brand-muted">Select the workouts you would like to import.</p>
        </div>
        <div>
          <div>
            <p className="font-heading font-extrabold text-lg tracking-tight leading-none">{workouts.length}</p>
            <p className="text-xxs text-brand-muted">Workouts found</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 bg-brand-600 py-3 px-5.5 rounded-lg opacity-0 animate-fade-up animation-delay-150">
        <p className="font-medium text-sm text-brand-50/90">
          <strong className="text-brand-50">{selectedWorkouts.length}</strong> workouts selected
        </p>
        <div className="flex items-center gap-3">
          <button className="btn bg-brand-50/10 text-brand-50 hover:bg-brand-50/20">Deselect all</button>
          <button className="btn bg-white text-brand-600 hover:bg-brand-50">
            Import {selectedWorkouts.length} workouts
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-xs text-brand-muted">Date</p>
          <select
            className="cursor-pointer bg-white font-medium text-xs text-brand-muted border border-app-border-mid rounded-full py-1 px-3"
            value={workoutDateRange}
            onChange={(e) => setWorkoutDateRange(e.target.value)}
          >
            <option value="all">All time</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>
      <div className="card max-h-125 overflow-y-auto opacity-0 animate-fade-up animation-delay-200">
        <table className="w-full">
          <thead className="sticky top-0  border-b border-app-border bg-app-background">
            <tr>
              <th className="py-2.5 px-5.5">
                <button
                  onClick={toggleAllWorkouts}
                  className={`cursor-pointer w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    selectedWorkouts.length === workouts.length ? "bg-brand-500 border-brand-500" : "border-brand-muted"
                  }`}
                >
                  <Check size={11} className="text-app-background" strokeWidth={3} />
                </button>
              </th>
              <th className="py-2.5 px-5.5">
                <button className="flex items-center gap-1 cursor-pointer font-bold text-xs text-brand-muted uppercase">
                  Date <ChevronDown size={12} />
                </button>
              </th>
              <th className="py-2.5 px-5.5">
                <p className="font-bold text-left text-xs text-brand-muted uppercase">Workout</p>
              </th>
              <th className="py-2.5 px-5.5">
                <p className="font-bold text-left text-xs text-brand-muted uppercase">Distance</p>
              </th>
              <th className="py-2.5 px-5.5">
                <p className="font-bold text-left text-xs text-brand-muted uppercase">Duration</p>
              </th>
              <th className="py-2.5 px-5.5">
                <p className="font-bold text-left text-xs text-brand-muted uppercase">Pace</p>
              </th>
              <th className="py-2.5 px-5.5">
                <p className="font-bold text-left text-xs text-brand-muted uppercase">Avg HR</p>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filtered.map((workout) => {
              const isSelected = selectedWorkouts.includes(workout.id);

              return (
                <tr
                  onClick={() => toggleWorkout(workout.id)}
                  key={workout.id}
                  className="cursor-pointer hover:bg-brand-50 border-b border-app-border"
                >
                  <td className="py-2.5 px-5.5">
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? "bg-brand-500 border-brand-500" : "border-brand-muted"
                      }`}
                    >
                      {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
                    </div>
                  </td>
                  <td className="py-2.5 px-5.5">
                    <div>
                      <p className="font-heading font-bold text-sm mb-px">{formatMonthDay(workout.date)}</p>
                      <p className="text-xs text-brand-muted/90">{formatYear(workout.date)}</p>
                    </div>
                  </td>
                  <td className="py-2.5 px-5.5">
                    <div>
                      <p className="font-semibold text-sm">{workout.name}</p>
                      <p className="text-xs text-brand-muted/90">{workout.source}</p>
                    </div>
                  </td>
                  <td className="py-2.5 px-5.5">
                    <p className="font-heading font-bold text-sm">{workout.distance.toFixed(2)} mi</p>
                  </td>
                  <td className="py-2.5 px-5.5">
                    <p className="font-heading font-bold text-sm">{formatDuration(workout.duration)}</p>
                  </td>
                  <td className="py-2.5 px-5.5">
                    <div>
                      <p className="font-heading font-bold text-sm">{formatPace(workout.avgPace)}</p>
                      <p className="text-xs text-brand-muted/90">/mi</p>
                    </div>
                  </td>
                  <td className="py-2.5 px-5.5">
                    <div>
                      <p className="font-heading font-bold text-sm">{workout.avgHR ? workout.avgHr.toFixed(0) : "N/A"}</p>
                      {workout.avgHR && <p className="text-xs text-brand-muted/90">bpm</p>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportWorkoutSelector;
