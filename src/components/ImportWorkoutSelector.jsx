import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";
import { formatPace, formatDuration } from "@/utils/workoutHelpers";
import { useDemo } from "@/context/DemoContext";

const NOW = Date.now();

const ImportWorkoutSelector = ({ workouts, existingIds, onBack, onImport }) => {
  console.log(workouts);
  const { isDemo } = useDemo();
  const [workoutDateRange, setWorkoutDateRange] = useState("all");
  const [selectedIds, setSelectedIds] = useState(() =>
    workouts.filter((workout) => !existingIds.has(workout.id)).map((workout) => workout.id),
  );

  const formatMonthDay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatYear = (date) => {
    return new Date(date).getFullYear();
  };

  const filtered = useMemo(() => {
    return workouts.filter((workout) => {
      if (workoutDateRange === "all") {
        return true;
      }

      const workoutTime = new Date(workout.date).getTime();

      if (workoutDateRange === "3m") {
        return workoutTime > NOW - 3 * 30 * 24 * 60 * 60 * 1000;
      } else if (workoutDateRange === "6m") {
        return workoutTime > NOW - 6 * 30 * 24 * 60 * 60 * 1000;
      } else if (workoutDateRange === "1year") {
        return workoutTime > NOW - 12 * 30 * 24 * 60 * 60 * 1000;
      }
      return false;
    });
  }, [workouts, workoutDateRange]);

  const selectableWorkouts = useMemo(() => {
    return filtered.filter((workout) => !existingIds.has(workout.id));
  }, [filtered, existingIds]);

  const selectableIds = useMemo(() => {
    return selectableWorkouts.map((workout) => workout.id);
  }, [selectableWorkouts]);

  const toggleWorkout = (id) => {
    if (isDemo || existingIds.has(id)) return;

    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((workoutId) => workoutId !== id) : [...prev, id]));
  };

  const toggleAllWorkouts = () => {
    if (isDemo || selectableIds.length === 0) return;

    setSelectedIds((prev) => {
      const allSelected = selectableIds.every((id) => prev.includes(id));

      return allSelected ? [] : selectableIds;
    });
  };

  const allSelectableSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.includes(id));

  const dupeCount = workouts.filter((w) => existingIds.has(w.id)).length;

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
        <div className="flex gap-4">
          <div>
            <p className="font-heading font-extrabold text-lg tracking-tight leading-none">{workouts.length}</p>
            <p className="text-xxs text-brand-muted">Workout{workouts.length > 1 && "s"} found</p>
          </div>
          {dupeCount > 0 && (
            <div className="border-l border-app-border pl-4">
              <p className="font-heading font-extrabold text-lg tracking-tight leading-none">{dupeCount}</p>
              <p className="text-xxs text-brand-muted">duplicate{dupeCount > 1 && "s"}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 bg-brand-600 py-3 px-5.5 rounded-lg opacity-0 animate-fade-up animation-delay-150">
        <p className="font-medium text-sm text-brand-50/90">
          <strong className="text-brand-50">{selectedIds.length}</strong> workouts selected
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAllWorkouts}
            className="btn bg-brand-50/10 text-brand-50 hover:bg-brand-50/20 disabled:bg-brand-50/20 disabled:text-brand-50 disabled:cursor-not-allowed"
            disabled={selectableIds.length === 0 || isDemo}
          >
            {allSelectableSelected ? "Deselect all" : `Select all (${selectableIds.length})`}
          </button>
          <button
            onClick={() => onImport(filtered.filter((w) => selectedIds.includes(w.id)))}
            className="btn bg-white text-brand-600 hover:bg-brand-50 disabled:bg-brand-50 disabled:text-brand-600 disabled:cursor-not-allowed"
            disabled={selectedIds.length === 0 || isDemo}
          >
            Import {selectedIds.length} workouts
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
                  disabled={selectableIds.length === 0}
                  onClick={toggleAllWorkouts}
                  className={`cursor-pointer w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all disabled:cursor-not-allowed ${
                    allSelectableSelected ? "bg-brand-500 border-brand-500" : "border-brand-muted"
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
              const isDupe = existingIds.has(workout.id);
              const isSelected = selectedIds.includes(workout.id);

              return (
                <tr
                  onClick={() => toggleWorkout(workout.id)}
                  key={workout.id}
                  className={`
                  ${isDupe ? "cursor-not-allowed bg-slate-50" : "cursor-pointer hover:bg-brand-50"} border-b border-app-border`}
                >
                  <td className="py-2.5 px-5.5">
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        isDupe
                          ? "border-slate-200 bg-slate-100"
                          : isSelected
                            ? "bg-brand-500 border-brand-500"
                            : "border-brand-muted"
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
                      <p className="font-heading font-bold text-sm">{workout.avgHr ? workout.avgHr.toFixed(0) : "N/A"}</p>
                      {workout.avgHr && <p className="text-xs text-brand-muted/90">bpm</p>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-4 px-5.5 bg-white border border-app-border rounded-lg mt-5 opacity-0 animate-fade-up animation-delay-250">
        <p className="text-sm text-brand-muted">
          Importing <strong>{selectedIds.length}</strong> of <em>{filtered.length}</em> workouts
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={toggleAllWorkouts}
            className="btn btn-secondary disabled:hover:border-app-border-mid disabled:hover:text-brand-mid! disabled:cursor-not-allowed"
            disabled={selectableIds.length === 0 || isDemo}
          >
            {allSelectableSelected ? "Deselect all" : `Select all (${selectableIds.length})`}
          </button>
          <button
            onClick={() => onImport(filtered.filter((w) => selectedIds.includes(w.id)))}
            className="btn btn-primary disabled:bg-brand-700! disabled:cursor-not-allowed"
            disabled={selectedIds.length === 0 || isDemo}
          >
            Import {selectedIds.length} workouts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportWorkoutSelector;
