function resolveCol(headers, ...candidates) {
  for (const c of candidates) {
    const idx = headers.findIndex((h) => h.toLowerCase().trim() === c.toLowerCase());
    if (idx !== -1) return idx;
  }
  return -1;
}

const parseDistanceMiles = (raw, unit) => {
  if (!raw || raw === "--") return 0;

  const n = parseFloat(raw.replace(",", "."));

  if (isNaN(n)) return 0;
  if (unit && unit.toLowerCase().includes("km")) return Math.round(n * 0.621371 * 100) / 100;
  if (unit && unit.toLowerCase().includes("mi")) return Math.round(n * 100) / 100;
  if (n > 100) return Math.round(n * 0.000621371 * 100) / 100;

  return Math.round(n * 0.621371 * 100) / 100;
};

const parseDurationSecs = (raw) => {
  if (!raw || raw === "--") return 0;

  const hms = raw.match(/^(\d+):(\d+):(\d+)$/);
  if (hms) return parseInt(hms[1]) * 3600 + parseInt(hms[2]) * 60 + parseInt(hms[3]);

  const ms = raw.match(/^(\d+):(\d+)$/);
  if (ms) return parseInt(ms[1]) * 60 + parseInt(ms[2]);

  const sec = parseFloat(raw);
  if (!isNaN(sec)) return Math.round(sec);

  return 0;
};

const parsePaceSecs = (raw) => {
  if (!raw || raw === "--") return 0;

  const match = raw.match(/(\d+):(\d+)/);
  if (!match) return 0;

  const pacePerUnit = parseInt(match[1]) * 60 + parseInt(match[2]);
  if (raw.includes("/km") || raw.includes("km")) return Math.round(pacePerUnit * 1.60934);

  return pacePerUnit;
};

export const parseGarminCSV = (csvText) => {
  const lines = csvText.trim().split("\n");

  if (lines.length < 2) throw new Error("CSV file appears to be empty.");

  const rawHeader = lines[0].replace(/^\uFEFF/, "");
  const headers = rawHeader.split(",").map((h) => h.trim().replace(/^"|"$/g, ""));

  const cols = {
    date: resolveCol(headers, "Date", "Start Time", "date", "activity date"),
    name: resolveCol(headers, "Activity Name", "Name", "Title", "activity name"),
    distance: resolveCol(headers, "Distance", "Total Distance", "distance"),
    duration: resolveCol(headers, "Time", "Duration", "Elapsed Time", "Moving Time"),
    avgPace: resolveCol(headers, "Avg Pace", "Average Pace", "avg pace"),
    avgHr: resolveCol(headers, "Avg HR", "Average HR", "avg heart rate", "average heart rate"),
    maxHr: resolveCol(headers, "Max HR", "Maximum HR", "max heart rate"),
    avgCadence: resolveCol(headers, "Avg Run Cadence", "Average Run Cadence", "avg run cadence", "average run cadence"),
    maxCadence: resolveCol(headers, "Max Run Cadence", "Maximum Run Cadence", "max run cadence", "maximum run cadence"),
    avgPower: resolveCol(headers, "Avg Power", "Average Power", "avg power", "average power"),
    minPower: resolveCol(headers, "Min Power", "Minimum Power", "min power", "minimum power"),
    maxPower: resolveCol(headers, "Max Power", "Maximum Power", "max power", "maximum power"),
    calories: resolveCol(headers, "Calories", "Total Calories", "Energy (kcal)"),
    elevGain: resolveCol(headers, "Elev Gain", "Total Ascent", "Elevation Gain", "Ascent (m)", "Total Elevation Gain"),
    splits: resolveCol(headers, "Splits", "Splits", "splits"),
    timeSeries: resolveCol(headers, "Time Series", "Time Series", "time series"),
    avgSpeed: resolveCol(headers, "Avg Speed", "Average Speed", "avg speed", "average speed"),
    distUnit: resolveCol(headers, "Distance Unit", "Distance (mi)", "Distance (km)"),
  };

  const workouts = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = [];
    let inQuote = false;
    let cur = "";

    for (const ch of lines[i]) {
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        values.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }

    values.push(cur.trim());

    const get = (idx) => (idx >= 0 ? (values[idx] || "").replace(/^"|"$/g, "").trim() : "");
    const actType = get(cols.activityType).toLowerCase();

    if (
      actType &&
      ![
        "running",
        "run",
        "trail running",
        "treadmill running",
        "track running",
        "virtual run",
        "indoor running",
        "road running",
      ].includes(actType)
    )
      continue;

    const dateRaw = get(cols.date);
    if (!dateRaw) continue;

    let dateStr;

    try {
      const d = new Date(dateRaw);
      if (isNaN(d.getTime())) continue;
      dateStr = d.toISOString().split("T")[0];
    } catch {
      continue;
    }

    const distUnit = get(cols.distUnit) || "";

    const distMiles = parseDistanceMiles(get(cols.distance), distUnit || headers[cols.distance] || "");
    if (distMiles < 0.1) continue;

    const durationSecs = parseDurationSecs(get(cols.duration));
    const avgPaceSec = get(cols.avgPace)
      ? parsePaceSecs(get(cols.avgPace))
      : durationSecs > 0 && distMiles > 0
        ? Math.round(durationSecs / distMiles)
        : 0;

    const elevRaw = parseFloat(get(cols.elevGain).replace(",", "") || "0") || 0;
    const elevFt = (headers[cols.elevGain] || "").toLowerCase().includes("(m)")
      ? Math.round(elevRaw * 3.28084)
      : Math.round(elevRaw);

    workouts.push({
      id: `garmin-csv-${i}-${dateStr}-${Math.round(distMiles * 100)}`,
      date: dateStr,
      temperature: null,
      name: get(cols.name) || `Run on ${dateStr}`,
      distance: distMiles,
      duration: durationSecs,
      avgPace: avgPaceSec,
      avgHr: parseInt(get(cols.avgHr)) || 0,
      maxHr: parseInt(get(cols.maxHr)) || 0,
      avgCadence: parseInt(get(cols.avgCadence)) || 0,
      maxCadence: parseInt(get(cols.maxCadence)) || 0,
      avgPower: parseInt(get(cols.avgPower)) || 0,
      minPower: parseInt(get(cols.minPower)) || 0,
      maxPower: parseInt(get(cols.maxPower)) || 0,
      elevGain: elevFt,
      calories: parseInt(get(cols.calories).replace(",", "")) || 0,
      splits: [],
      timeSeries: [],
      avgSpeed: null,
      tag: null,
      notes: "",
      source: "Garmin Connect CSV",
    });
  }

  if (workouts.length === 0) {
    throw new Error(
      "No running activities found in this CSV. Make sure you exported from Garmin Connect → Activities and the file includes running workouts.",
    );
  }

  return workouts.sort((a, b) => b.date.localeCompare(a.date));
};

export const parseGarminTCX = (xmlText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) throw new Error("Invalid TCX/XML file — could not parse.");

  const activities = doc.querySelectorAll("Activity");
  if (!activities.length) throw new Error("No activities found in this TCX file.");

  const workouts = [];

  activities.forEach((activity, idx) => {
    const sport = (activity.getAttribute("Sport") || "").toLowerCase();
    if (sport && !["running", "run", ""].includes(sport)) return;

    const idEl = activity.querySelector("Id");
    const startTime = idEl ? idEl.textContent.trim() : "";
    let dateStr;

    try {
      dateStr = new Date(startTime).toISOString().split("T")[0];
    } catch {
      return;
    }

    const laps = activity.querySelectorAll("Lap");
    let totalDistM = 0;
    let totalTimeSec = 0;
    let totalCalories = 0;
    let hrSum = 0;
    let hrCount = 0;
    let hrMax = 0;
    let elevGainM = 0;

    const splits = [];
    const timeSeries = [];
    const cadences = [];
    const powers = [];

    laps.forEach((lap, lapIdx) => {
      const lapDistM = parseFloat(lap.querySelector("DistanceMeters")?.textContent || "0");
      const lapTimeSec = parseFloat(lap.querySelector("TotalTimeSeconds")?.textContent || "0");
      const lapCalories = parseInt(lap.querySelector("Calories")?.textContent || "0");

      totalDistM += lapDistM;
      totalTimeSec += lapTimeSec;
      totalCalories += lapCalories;

      const avgHREl = lap.querySelector("AverageHeartRateBpm Value");
      const maxHREl = lap.querySelector("MaximumHeartRateBpm Value");
      if (avgHREl) {
        hrSum += parseFloat(avgHREl.textContent);
        hrCount++;
      }
      if (maxHREl) {
        const v = parseFloat(maxHREl.textContent);
        if (v > hrMax) hrMax = v;
      }

      const trackpoints = lap.querySelectorAll("Trackpoint");
      trackpoints.forEach((tp) => {
        const time = tp.querySelector("Time")?.textContent || "";
        const dist = parseFloat(tp.querySelector("DistanceMeters")?.textContent || "0");
        const hr = parseFloat(tp.querySelector("HeartRateBpm Value")?.textContent || "0");
        const alt = parseFloat(tp.querySelector("AltitudeMeters")?.textContent || "0");

        let cadVal = NaN;
        const cadEl =
          tp.querySelector("Cadence") ||
          tp.getElementsByTagName("RunCadence")[0] ||
          tp.getElementsByTagName("ns3:RunCadence")[0];
        if (cadEl) cadVal = parseFloat(cadEl.textContent);

        let pwrVal = NaN;
        const pwrEl = tp.getElementsByTagName("Watts")[0] || tp.getElementsByTagName("ns3:Watts")[0];
        if (pwrEl) pwrVal = parseFloat(pwrEl.textContent);

        let speedVal = null;
        const speedEl = tp.getElementsByTagName("Speed")[0] || tp.getElementsByTagName("ns3:Speed")[0];

        if (speedEl) speedVal = Math.round(parseFloat(speedEl.textContent) * 2.23694 * 100) / 100;

        if (!isNaN(cadVal)) cadences.push(cadVal);
        if (!isNaN(pwrVal)) powers.push(pwrVal);

        timeSeries.push({
          time,
          distance: Math.round(dist * 0.000621371 * 100) / 100,
          heartRate: hr || null,
          altitude: alt ? Math.round(alt * 3.28084) : null,
          cadence: !isNaN(cadVal) ? cadVal : null,
          power: !isNaN(pwrVal) ? pwrVal : null,
          speed: speedVal,
        });
      });

      splits.push({
        splitNumber: lapIdx + 1,
        distance: Math.round(lapDistM * 0.000621371 * 100) / 100,
        duration: Math.round(lapTimeSec),
        calories: lapCalories,
      });
    });

    const altitudes = [...activity.querySelectorAll("AltitudeMeters")]
      .map((el) => parseFloat(el.textContent))
      .filter((v) => !isNaN(v));
    for (let i = 1; i < altitudes.length; i++) {
      const diff = altitudes[i] - altitudes[i - 1];
      if (diff > 0) elevGainM += diff;
    }

    const distMiles = Math.round(totalDistM * 0.000621371 * 100) / 100;
    if (distMiles < 0.1) return;

    const avgPaceSec = totalTimeSec > 0 && distMiles > 0 ? Math.round(totalTimeSec / distMiles) : 0;
    const avgHR = hrCount > 0 ? Math.round(hrSum / hrCount) : 0;
    const elevFt = Math.round(elevGainM * 3.28084);

    const activeCadences = cadences.filter((c) => c > 0);

    const avgCadence = activeCadences.length
      ? Math.round((activeCadences.reduce((a, b) => a + b, 0) / activeCadences.length) * 2)
      : 0;
    const maxCadence = cadences.length ? Math.max(...cadences) * 2 : 0;

    const avgPower = powers.length ? Math.round(powers.reduce((a, b) => a + b, 0) / powers.length) : 0;
    const minPower = powers.length ? Math.min(...powers) : 0;
    const maxPower = powers.length ? Math.max(...powers) : 0;

    const totalHours = totalTimeSec / 3600;
    const avgSpeedMPH = totalHours > 0 ? Math.round((distMiles / totalHours) * 100) / 100 : 0;

    const notesEl = activity.querySelector("Notes");
    const name =
      notesEl?.textContent?.trim() ||
      `Run on ${new Date(startTime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

    workouts.push({
      id: `garmin-tcx-${idx}-${dateStr}-${Math.round(distMiles * 100)}`,
      date: dateStr,
      name,
      distance: distMiles,
      duration: Math.round(totalTimeSec),
      avgPace: avgPaceSec,
      avgHr: avgHR,
      maxHr: Math.round(hrMax),
      avgCadence: avgCadence || null,
      maxCadence: maxCadence || null,
      avgPower: avgPower || null,
      minPower: powers.length ? minPower : null,
      maxPower: maxPower || null,
      elevGain: elevFt,
      calories: totalCalories,
      splits,
      timeSeries,
      avgSpeed: avgSpeedMPH || null,
      tag: null,
      notes: "",
      source: "Garmin Connect TCX",
    });
  });

  if (!workouts.length) throw new Error("No running activities found in this TCX file.");
  return workouts.sort((a, b) => b.date.localeCompare(a.date));
};

export const parseGarminGPX = (xmlText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Invalid GPX file.");

  const tracks = doc.querySelectorAll("trk");
  if (!tracks.length) throw new Error("No tracks found in this GPX file.");

  const workouts = [];
  tracks.forEach((trk, idx) => {
    const name = trk.querySelector("name")?.textContent?.trim() || "Run";
    const points = [...trk.querySelectorAll("trkpt")];
    if (points.length < 2) return;

    const firstTime = points[0].querySelector("time")?.textContent;
    const lastTime = points[points.length - 1].querySelector("time")?.textContent;
    let dateStr;
    let durationSec;
    try {
      const start = new Date(firstTime);
      const end = new Date(lastTime);
      dateStr = start.toISOString().split("T")[0];
      durationSec = Math.round((end - start) / 1000);
    } catch {
      return;
    }

    let distM = 0;
    let elevGainM = 0;
    const hrs = [];
    const cadences = [];
    const powers = [];
    const timeSeries = [];

    const extractVal = (node, tag) => {
      const el =
        node.querySelector(tag) ||
        node.querySelector(`ns3\\:${tag}`) ||
        node.querySelector(`gpxtpx\\:${tag}`) ||
        node.querySelector(`gpxpx\\:PowerInWatts`);
      return el ? parseFloat(el.textContent) || 0 : 0;
    };

    if (points.length > 0) {
      const p0 = points[0];
      const hr0 = extractVal(p0, "hr");
      const cad0 = extractVal(p0, "cad");
      const pwr0 = extractVal(p0, "power") || extractVal(p0, "PowerInWatts");
      const speed0 = parseFloat(p0.querySelector("speed")?.textContent || 0);
      const ele0 = parseFloat(p0.querySelector("ele")?.textContent || 0);

      if (hr0 > 0) hrs.push(hr0);
      if (cad0 > 0) cadences.push(cad0);
      if (pwr0 > 0) powers.push(pwr0);

      timeSeries.push({
        time: p0.querySelector("time")?.textContent || "",
        distance: 0,
        heartRate: hr0 || null,
        altitude: ele0 ? Math.round(ele0 * 3.28084) : null,
        cadence: cad0 || null,
        power: pwr0 || null,
        speed: speed0 ? Math.round(speed0 * 2.23694 * 100) / 100 : null,
      });
    }

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const lat1 = parseFloat(prev.getAttribute("lat"));
      const lon1 = parseFloat(prev.getAttribute("lon"));
      const lat2 = parseFloat(curr.getAttribute("lat"));
      const lon2 = parseFloat(curr.getAttribute("lon"));
      const R = 6371000;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
      distM += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const e1 = parseFloat(prev.querySelector("ele")?.textContent || 0);
      const e2 = parseFloat(curr.querySelector("ele")?.textContent || 0);
      if (e2 > e1) elevGainM += e2 - e1;

      const hrVal = extractVal(curr, "hr");
      const cadVal = extractVal(curr, "cad");
      const pwrVal = extractVal(curr, "power") || extractVal(curr, "PowerInWatts");
      const speedMps = parseFloat(curr.querySelector("speed")?.textContent || 0);

      if (hrVal > 0) hrs.push(hrVal);
      if (cadVal > 0) cadences.push(cadVal);
      if (pwrVal > 0) powers.push(pwrVal);

      timeSeries.push({
        time: curr.querySelector("time")?.textContent || "",
        distance: Math.round(distM * 0.000621371 * 100) / 100,
        heartRate: hrVal || null,
        altitude: e2 ? Math.round(e2 * 3.28084) : null,
        cadence: cadVal || null,
        power: pwrVal || null,
        speed: speedMps ? Math.round(speedMps * 2.23694 * 100) / 100 : null,
      });
    }

    const distMiles = Math.round(distM * 0.000621371 * 100) / 100;
    if (distMiles < 0.1) return;

    const avgHR = hrs.length ? Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length) : 0;
    const maxHR = hrs.length ? Math.max(...hrs) : 0;

    const avgCadence = cadences.length ? Math.round((cadences.reduce((a, b) => a + b, 0) / cadences.length) * 2) : 0;
    const maxCadence = cadences.length ? Math.max(...cadences) * 2 : 0;

    const avgPower = powers.length ? Math.round(powers.reduce((a, b) => a + b, 0) / powers.length) : 0;
    const minPower = powers.length ? Math.min(...powers) : 0;
    const maxPower = powers.length ? Math.max(...powers) : 0;

    const totalHours = durationSec / 3600;
    const avgSpeedMPH = totalHours > 0 ? Math.round((distMiles / totalHours) * 100) / 100 : 0;

    const splits = [];
    let currentMileMarker = 1;
    let lastSplitTime = new Date(firstTime);
    let lastSplitDistance = 0;

    timeSeries.forEach((point, pIdx) => {
      const pointTime = new Date(point.time);
      if (point.distance >= currentMileMarker || pIdx === timeSeries.length - 1) {
        const splitDist = point.distance - lastSplitDistance;
        const splitDurationSec = Math.round((pointTime - lastSplitTime) / 1000);
        if (splitDist > 0.05) {
          splits.push({
            splitNumber: currentMileMarker,
            distance: Math.round(splitDist * 100) / 100,
            duration: splitDurationSec,
            calories: null,
          });
          lastSplitDistance = point.distance;
          lastSplitTime = pointTime;
          currentMileMarker++;
        }
      }
    });

    workouts.push({
      id: `garmin-gpx-${idx}-${dateStr}-${Math.round(distMiles * 100)}`,
      date: dateStr,
      name,
      distance: distMiles,
      duration: durationSec,
      avgPace: durationSec > 0 ? Math.round(durationSec / distMiles) : 0,
      avgHr: avgHR || null,
      maxHr: maxHR || null,
      avgCadence: avgCadence || null,
      maxCadence: maxCadence || null,
      avgPower: avgPower || null,
      minPower: powers.length ? minPower : null,
      maxPower: maxPower || null,
      elevGain: Math.round(elevGainM * 3.28084),
      calories: 0,
      splits,
      timeSeries,
      avgSpeed: avgSpeedMPH || null,
      tag: null,
      notes: "",
      source: "Garmin Connect GPX",
    });
  });

  if (!workouts.length) throw new Error("No valid tracks found in this GPX file.");
  return workouts.sort((a, b) => b.date.localeCompare(a.date));
};
