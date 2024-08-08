import React, { useState } from "react";
import SideNavigation from "./side-navigation/SideNavigation";

const App: React.FC = () => {
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  return (
    <div>
      <button onClick={toggleExpandAll}>
        {expandAll ? "Collapse All" : "Expand All"}
      </button>
      <SideNavigation expandAll={expandAll} />
    </div>
  );
};

export default App;
