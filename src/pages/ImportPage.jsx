import { useState } from "react";
import ImportSources from "@/components/ImportSources";
import ImportZone from "@/components/ImportZone";
import ImportStatus from "@/components/ImportStatus";
import ImportWorkoutSelector from "@/components/ImportWorkoutSelector";

const GarminIcon = ({ classes }) => {
  return (
    <svg className={classes} viewBox="0 0 24 24" fill="currentcolor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>
    </svg>
  );
};

const AppleIcon = ({ classes }) => {
  return (
    <svg className={classes} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path>
    </svg>
  );
};

const SOURCES = {
  garmin: {
    id: "garmin",
    label: "Garmin Connect",
    types: "TCX",
    icon: GarminIcon,
    accept: ".tcx",
  },
  apple: {
    id: "apple",
    label: "Apple Health",
    types: "export.xml",
    icon: AppleIcon,
    accept: ".xml",
  },
};

const ImportPage = () => {
  const [source, setSource] = useState("garmin");
  const [workouts, setWorkouts] = useState(null);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="opacity-0 animate-fade-up animation-delay-75">
        <h1 className="font-bold text-2xl">Import Workouts</h1>
        <p className="text-sm text-brand-muted mt-1">Upload your run history from Garmin Connect or Apple Health.</p>
      </div>

      {!workouts && (
        <>
          <ImportSources sources={SOURCES} source={source} setSource={setSource} />
          <ImportZone source={SOURCES[source]} setWorkouts={setWorkouts} />
        </>
      )}

      {workouts && <ImportWorkoutSelector workouts={workouts} />}
    </div>
  );
};

export default ImportPage;
