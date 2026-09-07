import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDemo } from "@/context/DemoContext";
import { fetchWorkouts, saveWorkouts } from "@/data/firestoreWorkouts";

const WorkoutsContext = createContext(null);

const initialState = {
  workouts: [],
  loading: true,
  error: null,
};

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOADED":
      return {
        ...state,
        loading: false,
        workouts: action.workouts,
      };
    case "IMPORT": {
      const existingIds = new Set(state.workouts.map((w) => w.id));
      const newOnes = action.workouts.filter((w) => !existingIds.has(w.id));

      if (!newOnes.length) return state;

      const merged = [...newOnes, ...state.workouts].sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date) - new Date(a.date);
      });

      return {
        ...state,
        workouts: merged,
      };
    }
    default:
      return state;
  }
};

export const WorkoutsProvider = ({ children }) => {
  const { user } = useAuth();
  const { isDemo } = useDemo();

  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  useEffect(() => {
    if (!user) {
      dispatch({ type: "LOADED", workouts: [] });
      return;
    }

    let cancelled = false;
    dispatch({ type: "LOADING" });

    (async () => {
      try {
        const data = await fetchWorkouts(user.uid);
        if (cancelled) return;

        if (data.length === 0) {
          dispatch({ type: "LOADED", workouts: [] });
        } else {
          dispatch({ type: "LOADED", workouts: data });
        }
      } catch (err) {
        if (cancelled) return;
        console.error("Firestore load failed:", err.message);
        dispatch({ type: "ERROR", message: err.message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, user?.uid]);

  const importWorkouts = useCallback(
    async (incoming) => {
      const existingIds = new Set(state.workouts.map((w) => w.id));
      const newOnes = incoming.filter((w) => !existingIds.has(w.id));
      if (!newOnes.length) return 0;

      dispatch({ type: "IMPORT", workouts: incoming });

      if (!isDemo && user) {
        try {
          await saveWorkouts(user.uid, newOnes);
        } catch (err) {
          console.warn("Firestore bulk save failed:", err.message);
        }
      }

      return newOnes.length;
    },
    [state.workouts, user, isDemo],
  );

  const existingIds = useMemo(() => new Set(state.workouts.map((w) => w.id)), [state.workouts]);

  return (
    <WorkoutsContext.Provider
      value={{
        ...state,
        importWorkouts,
        existingIds,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkouts = () => {
  const context = useContext(WorkoutsContext);
  if (!context) throw new Error("useWorkouts must be used within WorkoutsProvider");
  return context;
};
