import { createContext, useContext, useCallback, useState } from "react";

const DemoContext = createContext(null);

export const DemoProvider = ({ children }) => {
  const [isDemo, setIsDemo] = useState(false);

  const enterDemo = useCallback(() => setIsDemo(true), []);
  const exitDemo = useCallback(() => setIsDemo(false), []);

  return <DemoContext.Provider value={{ isDemo, enterDemo, exitDemo }}>{children}</DemoContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemoMode must be used within DemoProvider");
  return context;
};
