import { collection, doc, getDocs, setDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

const workoutsRef = (uid) => collection(db, "users", uid, "workouts");
const workoutDoc = (uid, id) => doc(db, "users", uid, "workouts", id);

export const fetchWorkouts = async (uid) => {
  const q = query(workoutsRef(uid), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const saveWorkout = async (uid, workout) => {
  try {
    await setDoc(workoutDoc(uid, workout.id), workout, { merge: true });
  } catch (e) {
    console.error(e.message);
  }
};

export const saveWorkouts = async (uid, workouts) => {
  await Promise.all(
    workouts.map((w) => {
      if (!w) return;
      saveWorkout(uid, w);
    }),
  );
};
