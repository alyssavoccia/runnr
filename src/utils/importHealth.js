import sax from "sax";

export const importHealth = async (file) => {
  const workoutsArray = [];

  const parser = sax.parser(true, { trim: true });

  let currentWorkout = null;

  parser.onopentag = (node) => {
    if (node.name === "Workout") {
      if (node.attributes.workoutActivityType === "HKWorkoutActivityTypeRunning") {
        const start = new Date(node.attributes.startDate);

        currentWorkout = {
          id: `health-${node.attributes.startDate}`,
          date: start,
          temperature: null,
          name: `Run on ${start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`,
          distance: 0,
          duration: Math.round(node.attributes.duration * 60),
          avgPace: 0,
          avgHr: null,
          maxHr: null,
          avgCadence: null,
          maxCadence: null,
          avgPower: null,
          minPower: null,
          maxPower: null,
          elevGain: null,
          calories: null,
          splits: [],
          timeSeries: [],
          avgSpeed: null,
          tag: null,
          notes: "",
          source: node.attributes.sourceName,
        };
      }
    }

    if (!currentWorkout) return;

    if (node.name === "MetadataEntry") {
      if (node.attributes.key === "HKWeatherTemperature") {
        currentWorkout.temperature = node.attributes.value;
      }
    }

    if (node.name === "WorkoutStatistics" && currentWorkout) {
      const type = node.attributes.type;

      if (type === "HKQuantityTypeIdentifierDistanceWalkingRunning") {
        currentWorkout.distance = parseFloat(node.attributes.sum) || 0;
      } else if (type === "HKQuantityTypeIdentifierHeartRate") {
        currentWorkout.avgHr = parseFloat(node.attributes.average) || null;
        currentWorkout.maxHr = parseFloat(node.attributes.maximum) || null;
      } else if (type === "HKQuantityTypeIdentifierActiveEnergyBurned") {
        currentWorkout.calories = parseFloat(node.attributes.sum) || null;
      } else if (type === "HKQuantityTypeIdentifierRunningPower") {
        currentWorkout.avgPower = parseFloat(node.attributes.average) || null;
        currentWorkout.minPower = parseFloat(node.attributes.minimum) || null;
        currentWorkout.maxPower = parseFloat(node.attributes.maximum) || null;
      } else if (type === "HKQuantityTypeIdentifierRunningSpeed") {
        currentWorkout.avgSpeed = parseFloat(node.attributes.average) || null;
      }
    }
  };

  parser.onerror = (e) => {
    console.error("Parsing error", e);
    parser.resume();
  };

  parser.onclosetag = (tagName) => {
    if (tagName === "Workout" && currentWorkout) {
      if (currentWorkout.distance > 0) {
        currentWorkout.avgPace = Math.round(currentWorkout.duration / currentWorkout.distance);
      }

      workoutsArray.push(currentWorkout);
      currentWorkout = null;
    }
  };

  const reader = file.stream().getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    parser.write(buffer);

    buffer = "";
  }

  parser.close();

  return workoutsArray;
};
