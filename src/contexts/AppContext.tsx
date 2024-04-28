import {
  useState, useContext,
  createContext,
  useMemo,
  useEffect
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CourseTabs } from "src/constants/constants";

export type AppContextType = {
  activeTab: CourseTabs | null,
  setActiveTab: (tab: CourseTabs | null) => void,
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<CourseTabs | null>(CourseTabs.Courses);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    if (!activeTab && location === "/") {
      setActiveTab(CourseTabs.Courses);
    } else if (location !== "/") {
      setActiveTab(null);
    }
  }, [location]);

  const onSetActiveTab = (tab: CourseTabs | null) => {
    if (tab && location !== "/") {
      navigate("/");
    }

    setActiveTab(tab);
  };

  const value = useMemo(() => {
    return {
      activeTab,
      setActiveTab: onSetActiveTab
    };
  }, [activeTab, setActiveTab]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
