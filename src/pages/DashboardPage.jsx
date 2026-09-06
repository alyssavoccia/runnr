import { format } from "date-fns";
import { Upload } from "lucide-react";
import WeeklyStatsCards from "@/components/WeeklyStatsCards";
import MileageChart from "@/components/MileageChart";
import WorkoutList from "@/components/WorkoutList";
import VdotScore from "@/components/VdotScore";
import RacePredictions from "@/components/RacePredictions";

const DashboardPage = () => {
  const formattedDate = format(new Date(), "EEEE, MMMM d");

  return (
    <>
      <div className="flex flex-wrap items-end justify-between mb-9 opacity-0 animate-fade-up animation-delay-75">
        <div>
          <p className="uppercase text-xs text-brand-600 tracking-wider mb-1">{formattedDate}</p>
          <h1 className="font-bold text-2xl tracking-tight leading-none">
            Good run, <em className="italic text-brand-600">let's check in.</em>
          </h1>
        </div>
        <div className="mt-2 md:mt-0">
          <button className="btn btn-primary drop-shadow drop-shadow-brand-600/40" prefetch="none">
            <Upload />
            Import
          </button>
        </div>
      </div>

      <WeeklyStatsCards />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-start">
        <div className="col-span-2 lg:col-span-4 flex flex-col gap-6">
          <MileageChart />
          <WorkoutList />
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <VdotScore />
          <RacePredictions />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
