import React, { useState } from "react";
import SideNavigation from "./side-navigation/SideNavigation";

const App: React.FC = () => {
  const [expandAll, setExpandAll] = useState<boolean | undefined>(undefined);

  const toggleExpandAll = () => {
    setExpandAll((prevExpandAll) => {
      if (prevExpandAll === undefined || prevExpandAll === false) {
        return true; // Expand all
      }
      return false; // Collapse all
    });
  };

  return (
    <div>
      <button onClick={toggleExpandAll}>
        {expandAll === true
          ? "Collapse All"
          : expandAll === false
            ? "Expand All"
            : "Expand/Collapse All"}
      </button>
      <SideNavigation expandAll={expandAll} />
    </div>
  );
};

export default App;
