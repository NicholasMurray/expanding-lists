import React, { useState, useEffect } from "react";
import styles from "./SideNavigation.module.css";

type NavItem = {
  id: string;
  label: string;
  expanded?: boolean;
  children?: NavItem[];
};

type SideNavigationProps = {
  expandAll: boolean;
};

const initialNavItems: NavItem[] = [
  {
    id: "1",
    label: "Item 1",
    expanded: true,
    children: [
      {
        id: "1-1",
        label: "Item 1.1",
        expanded: true,
        children: [
          { id: "1-1-1", label: "Item 1.1.1", expanded: true },
          { id: "1-1-2", label: "Item 1.1.2" },
        ],
      },
      { id: "1-2", label: "Item 1.2" },
    ],
  },
  {
    id: "2",
    label: "Item 2",
    children: [
      { id: "2-1", label: "Item 2.1" },
      { id: "2-2", label: "Item 2.2" },
    ],
  },
];

const SideNavigation: React.FC<SideNavigationProps> = ({ expandAll }) => {
  const [navItems, setNavItems] = useState(initialNavItems);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  useEffect(() => {
    const expand = (items: NavItem[], expanded: boolean): NavItem[] => {
      return items.map((item) => ({
        ...item,
        expanded,
        children: item.children
          ? expand(item.children, expanded)
          : item.children,
      }));
    };
    setNavItems(expand(navItems, expandAll));
  }, [expandAll]);

  const toggleItem = (id: string) => {
    const toggle = (items: NavItem[]): NavItem[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, expanded: !item.expanded };
        }
        if (item.children) {
          return { ...item, children: toggle(item.children) };
        }
        return item;
      });
    };
    setNavItems(toggle(navItems));
  };

  const handleClick = (item: NavItem) => {
    if (!item.children) {
      setActiveItemId(item.id);
    } else {
      toggleItem(item.id);
    }
  };

  const renderNavItems = (items: NavItem[]) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div
              className={`${styles.navItem} ${
                item.expanded && item.children ? styles.expanded : ""
              } ${activeItemId === item.id && !item.children ? styles.active : ""}`}
              onClick={() => handleClick(item)}
            >
              {item.label} {item.children && (item.expanded ? "-" : "+")}
            </div>
            {item.expanded && item.children && (
              <div className={styles.children}>
                {renderNavItems(item.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderNavItems(navItems)}</div>;
};

export default SideNavigation;
