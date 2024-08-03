import React, { useState, useEffect } from "react";

// Define types for the navigation data structure
interface NavItem {
  id: string;
  title: string;
  active: boolean;
  children?: NavItem[];
}

// Sample navigation data structure
const initialNavData: NavItem[] = [
  {
    id: "1",
    title: "Item 1",
    active: false,
    children: [
      {
        id: "1.1",
        title: "Item 1.1",
        active: false,
        children: [
          { id: "1.1.1", title: "Item 1.1.1", active: true },
          { id: "1.1.2", title: "Item 1.1.2", active: false },
        ],
      },
      { id: "1.2", title: "Item 1.2", active: false },
    ],
  },
  {
    id: "2",
    title: "Item 2",
    active: false,
    children: [
      { id: "2.1", title: "Item 2.1", active: false },
      { id: "2.2", title: "Item 2.2", active: false },
    ],
  },
];

const expandActivePaths = (items: NavItem[]): NavItem[] => {
  return items.map((item) => {
    if (item.children) {
      const hasActiveChild = item.children.some(
        (child) =>
          child.active ||
          (child.children &&
            expandActivePaths(child.children).some(
              (grandChild) => grandChild.active
            ))
      );
      if (hasActiveChild) {
        return {
          ...item,
          active: true,
          children: expandActivePaths(item.children),
        };
      }
    }
    return item;
  });
};

const SideNavigation: React.FC = () => {
  const [navData, setNavData] = useState<NavItem[]>([]);
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  useEffect(() => {
    setNavData(expandActivePaths(initialNavData));
  }, []);

  const toggleActiveState = (path: number[]) => {
    const updateNavData = (
      items: NavItem[],
      pathIndex: number = 0
    ): NavItem[] => {
      return items.map((item, index) => {
        if (index === path[pathIndex]) {
          if (pathIndex === path.length - 1) {
            return { ...item, active: !item.active };
          } else if (item.children) {
            return {
              ...item,
              children: updateNavData(item.children, pathIndex + 1),
            };
          }
        }
        return item;
      });
    };

    setNavData(updateNavData(navData));
  };

  const expandAll = (items: NavItem[]): NavItem[] => {
    return items.map((item) => ({
      ...item,
      active: true,
      children: item.children ? expandAll(item.children) : item.children,
    }));
  };

  const contractAll = (items: NavItem[]): NavItem[] => {
    return items.map((item) => ({
      ...item,
      active: false,
      children: item.children ? contractAll(item.children) : item.children,
    }));
  };

  const handleToggleExpandAll = () => {
    if (allExpanded) {
      setNavData(contractAll(navData));
    } else {
      setNavData(expandAll(navData));
    }
    setAllExpanded(!allExpanded);
  };

  const renderNavItems = (
    items: NavItem[],
    path: number[] = []
  ): JSX.Element => {
    return (
      <ul>
        {items.map((item, index) => {
          const currentPath = [...path, index];
          return (
            <li key={item.id}>
              <div
                onClick={() => toggleActiveState(currentPath)}
                style={{
                  cursor: "pointer",
                  fontWeight: item.active ? "bold" : "normal",
                }}
              >
                {item.children ? (item.active ? "[-] " : "[+] ") : ""}
                {item.title}
              </div>
              {item.active &&
                item.children &&
                renderNavItems(item.children, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <div>
        <button onClick={handleToggleExpandAll}>
          {allExpanded ? "Contract All" : "Expand All"}
        </button>
      </div>
      {renderNavItems(navData)}
    </div>
  );
};

export default SideNavigation;
